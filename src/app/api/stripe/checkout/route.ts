import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  try {
    const { plan, email, successUrl, cancelUrl } = await req.json();
    
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const priceId = plan === "pro" 
      ? process.env.STRIPE_PRO_PRICE_ID 
      : process.env.STRIPE_PLUS_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ error: "Price ID missing" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL || ""}/app/premium?success=1`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL || ""}/app/premium`,
      metadata: { plan, email },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
