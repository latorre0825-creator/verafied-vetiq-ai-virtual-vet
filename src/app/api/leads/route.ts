import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
    return NextResponse.json({ leads: rows });
  } catch (e) {
    return NextResponse.json({ leads: [], error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const email = String(b.email || "").trim().toLowerCase();
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    const inserted = await db
      .insert(leads)
      .values({
        email,
        source: String(b.source || "landing"),
        referrerCode: String(b.referrerCode || ""),
      } as never)
      .returning();
    return NextResponse.json({ lead: inserted[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
