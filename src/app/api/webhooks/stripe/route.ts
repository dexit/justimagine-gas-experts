import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return new Response(
      JSON.stringify({ error: "Invalid signature" }),
      { status: 400 }
    );
  }

  // Log events for debugging
  console.log(`[webhook] Event: ${event.type}`, event.data.object);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[webhook] Payment success:", session.id, session.customer_email);
      // TODO: Save order, send confirmation email
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[webhook] Checkout expired:", session.id);
      break;
    }
    case "charge.failed": {
      const charge = event.data.object as Stripe.Charge;
      console.error("[webhook] Charge failed:", charge.id, charge.failure_message);
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
