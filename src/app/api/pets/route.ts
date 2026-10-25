import { NextResponse } from "next/server";
import { db } from "@/db";
import { pets } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(pets).orderBy(desc(pets.createdAt));
    return NextResponse.json({ pets: rows });
  } catch (e) {
    return NextResponse.json({ pets: [], error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.name || !b.species) {
      return NextResponse.json({ error: "Name and species required" }, { status: 400 });
    }
    const inserted = await db
      .insert(pets)
      .values({
        name: String(b.name),
        species: String(b.species).toLowerCase(),
        breed: String(b.breed || "Mixed"),
        ageYears: Number(b.ageYears ?? 1),
        weightKg: Number(b.weightKg ?? 5),
        gender: String(b.gender || "Unknown"),
        color: String(b.color || ""),
        imageUrl: String(b.imageUrl || ""),
        ownerName: String(b.ownerName || ""),
        notes: String(b.notes || ""),
        neutered: Boolean(b.neutered),
      })
      .returning();
    return NextResponse.json({ pet: inserted[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
