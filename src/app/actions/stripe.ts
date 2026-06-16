"use server";

import Stripe from "stripe";
import { getProductById } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

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
  return stripe.checkout.sessions.create({
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
