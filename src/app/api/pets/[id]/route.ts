import { NextResponse } from "next/server";
import { db } from "@/db";
import { pets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(pets).where(eq(pets.id, Number(id)));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const b = await req.json();
    const updated = await db
      .update(pets)
      .set({
        name: b.name !== undefined ? String(b.name) : undefined,
        species: b.species !== undefined ? String(b.species).toLowerCase() : undefined,
        breed: b.breed !== undefined ? String(b.breed) : undefined,
        ageYears: b.ageYears !== undefined ? Number(b.ageYears) : undefined,
        weightKg: b.weightKg !== undefined ? Number(b.weightKg) : undefined,
        gender: b.gender !== undefined ? String(b.gender) : undefined,
        color: b.color !== undefined ? String(b.color) : undefined,
        imageUrl: b.imageUrl !== undefined ? String(b.imageUrl) : undefined,
        ownerName: b.ownerName !== undefined ? String(b.ownerName) : undefined,
        notes: b.notes !== undefined ? String(b.notes) : undefined,
        neutered: b.neutered !== undefined ? Boolean(b.neutered) : undefined,
      })
      .where(eq(pets.id, Number(id)))
      .returning();
    return NextResponse.json({ pet: updated[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
