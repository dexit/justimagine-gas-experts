"use server";

import Stripe from "stripe";
import { getProductById } from "@/lib/products";

// Lazy init: Create Stripe instance on first use (not at module load)
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }
    stripeInstance = new Stripe(key, {
      apiVersion: "2024-12-18.acacia",
    });
  }
  return stripeInstance;
}

export interface CheckoutInput {
  productId: string;
  serviceSlug: string;
  customerEmail: string;
  customerName: string;
  area: string;
  extras: Array<{ label: string; priceInCents: number }>;
}

export async function createCheckoutSession(input: CheckoutInput) {
  // Validate product exist + price safe server-side
  const product = getProductById(input.productId);
  if (!product) throw new Error("Product not found");

  // Validate extras safe
  for (const ex of input.extras) {
    if (!ex.label?.trim() || ex.priceInCents <= 0) {
      throw new Error("Invalid extra");
    }
  }

  // Build line items → base + extras only
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "gbp",
        product_data: {
          name: product.name,
          description: `Area: ${input.area}`,
        },
        unit_amount: product.priceInCents,
      },
      quantity: 1,
    },
  ];

  // Add extras
  for (const ex of input.extras) {
    items.push({
      price_data: {
        currency: "gbp",
        product_data: { name: `Extra: ${ex.label}` },
        unit_amount: ex.priceInCents,
      },
      quantity: 1,
    });
  }

  // Create session
  return getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/service-request?cancelled=true`,
    customer_email: input.customerEmail,
    metadata: {
      serviceSlug: input.serviceSlug,
      customerName: input.customerName,
      area: input.area,
    },
  });
}

export interface PaymentInput {
  refId: string;
  email: string;
  name: string;
  service: string;
  baseAmountPounds: number;
  surchargePercent: number;
}

// CC payment with surcharge
export async function createPaymentSession(input: PaymentInput) {
  const baseCents = Math.round(input.baseAmountPounds * 100);
  const surchargeCents = Math.round(baseCents * input.surchargePercent);
  const totalCents = baseCents + surchargeCents;

  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "gbp",
        product_data: {
          name: input.service,
          description: `Enquiry: ${input.refId}`,
        },
        unit_amount: baseCents,
      },
      quantity: 1,
    },
  ];

  // Add surcharge if > 0
  if (surchargeCents > 0) {
    items.push({
      price_data: {
        currency: "gbp",
        product_data: { name: "Processing fee (+5%)" },
        unit_amount: surchargeCents,
      },
      quantity: 1,
    });
  }

  return getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment-success?ref=${input.refId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment-cancelled?ref=${input.refId}`,
    customer_email: input.email,
    metadata: {
      refId: input.refId,
      service: input.service,
    },
  });
}

export interface InvoiceInput {
  refId: string;
  email: string;
  name: string;
  service: string;
  amountPounds: number;
}

// Invoice for manual bank transfer
export async function createInvoice(input: InvoiceInput) {
  const amountCents = Math.round(input.amountPounds * 100);

  try {
    // Create invoice
    const invoice = await getStripe().invoices.create({
      customer_email: input.email,
      currency: "gbp",
      collection_method: "send_invoice",
      days_until_due: 14,
      metadata: {
        refId: input.refId,
        service: input.service,
      },
    });

    // Add line item
    await getStripe().invoiceItems.create({
      invoice: invoice.id,
      customer: invoice.customer as string,
      amount: amountCents,
      currency: "gbp",
      description: `${input.service} - Ref: ${input.refId}`,
    });

    // Finalize + send
    const finalized = await getStripe().invoices.finalizeInvoice(invoice.id);
    await getStripe().invoices.sendInvoice(invoice.id);

    return {
      ok: true,
      invoiceId: invoice.id,
      url: finalized.hosted_invoice_url || "",
    };
  } catch (err) {
    throw new Error(
      `Invoice creation failed: ${err instanceof Error ? err.message : "Unknown error"}`
    );
  }
}
