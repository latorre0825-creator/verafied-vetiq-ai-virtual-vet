import { NextResponse } from "next/server";
import { db } from "@/db";
import { healthRecords } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(healthRecords).orderBy(desc(healthRecords.createdAt)).limit(100);
    return NextResponse.json({ records: rows });
  } catch (e) {
    return NextResponse.json({ records: [], error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.title || !b.recordDate) {
      return NextResponse.json({ error: "Title and date required" }, { status: 400 });
    }
    const inserted = await db
      .insert(healthRecords)
      .values({
        petId: b.petId ? Number(b.petId) : null,
        petName: String(b.petName || ""),
        kind: String(b.kind || "checkup"),
        title: String(b.title),
        recordDate: String(b.recordDate),
        vetClinic: String(b.vetClinic || ""),
        notes: String(b.notes || ""),
      } as never)
      .returning();
    return NextResponse.json({ record: inserted[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
