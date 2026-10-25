import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(appointments).orderBy(desc(appointments.createdAt)).limit(50);
    return NextResponse.json({ appointments: rows });
  } catch (e) {
    return NextResponse.json({ appointments: [], error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.vetName || !b.scheduledAt) {
      return NextResponse.json({ error: "Vet and time required" }, { status: 400 });
    }
    const inserted = await db
      .insert(appointments)
      .values({
        petId: b.petId ? Number(b.petId) : null,
        petName: String(b.petName || "My pet"),
        vetId: b.vetId ? Number(b.vetId) : null,
        vetName: String(b.vetName),
        scheduledAt: String(b.scheduledAt),
        reason: String(b.reason || "General checkup"),
        visitType: String(b.visitType || "video"),
        status: "upcoming",
        notes: String(b.notes || ""),
        priceCents: Number(b.priceCents ?? 2900),
        meetingLink: `https://vetiq.video/room/${Math.random().toString(36).slice(2, 8)}`,
      } as never)
      .returning();
    return NextResponse.json({ appointment: inserted[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
