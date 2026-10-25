import { NextResponse } from "next/server";
import { db } from "@/db";
import { vets } from "@/db/schema";
import { SEED_VETS } from "@/lib/seed-vets";

export async function GET() {
  try {
    let rows = await db.select().from(vets);
    if (rows.length === 0) {
      await db.insert(vets).values(SEED_VETS as never);
      rows = await db.select().from(vets);
    }
    return NextResponse.json({ vets: rows });
  } catch (e) {
    return NextResponse.json({ vets: [], error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.name) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const inserted = await db
      .insert(vets)
      .values({
        name: String(b.name),
        title: String(b.title || "DVM"),
        specialties: String(b.specialties || "General Practice"),
        species: String(b.species || "Dogs, Cats"),
        rating: Number(b.rating ?? 5),
        reviewsCount: Number(b.reviewsCount ?? 0),
        priceCents: Number(b.priceCents ?? 2500),
        yearsExp: Number(b.yearsExp ?? 3),
        languages: String(b.languages || "English"),
        avatarUrl: String(b.avatarUrl || ""),
        bio: String(b.bio || ""),
        clinic: String(b.clinic || "VetIQ Virtual Clinic"),
        isOnline: b.isOnline ?? true,
        nextSlot: String(b.nextSlot || "Today"),
        consultsDone: Number(b.consultsDone ?? 0),
        verified: true,
      } as never)
      .returning();
    return NextResponse.json({ vet: inserted[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
