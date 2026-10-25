import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(subscriptions).orderBy(desc(subscriptions.createdAt)).limit(100);
    return NextResponse.json({ subscriptions: rows });
  } catch (e) {
    return NextResponse.json({ subscriptions: [], error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const email = String(b.email || "").trim().toLowerCase();
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    const plan = b.plan === "pro" ? "pro" : "plus";
    const inserted = await db
      .insert(subscriptions)
      .values({
        email,
        plan,
        priceCents: plan === "pro" ? 1900 : 900,
        status: "active",
        referralCode: String(b.referralCode || ""),
      } as never)
      .returning();
    return NextResponse.json({ subscription: inserted[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
