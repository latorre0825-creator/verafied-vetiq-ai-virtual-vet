import { NextResponse } from "next/server";
import { db } from "@/db";
import { aiConsults } from "@/db/schema";
import { runTriage } from "@/lib/vet-ai";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db.select().from(aiConsults).orderBy(desc(aiConsults.createdAt)).limit(20);
    return NextResponse.json({ consults: rows });
  } catch {
    return NextResponse.json({ consults: [] });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const symptomIds: string[] = Array.isArray(b.symptomIds) ? b.symptomIds : [];
    if (!symptomIds.length && !b.extraNotes) {
      return NextResponse.json({ error: "Pick at least one symptom or describe the issue" }, { status: 400 });
    }
    const result = runTriage({
      species: String(b.species || "dog").toLowerCase(),
      ageYears: Number(b.ageYears ?? 2),
      weightKg: Number(b.weightKg ?? 5),
      symptomIds,
      duration: String(b.duration || ""),
      extraNotes: String(b.extraNotes || ""),
      petName: String(b.petName || ""),
    });

    let saved: unknown = null;
    try {
      const inserted = await db
        .insert(aiConsults)
        .values({
          petId: b.petId ? Number(b.petId) : null,
          petName: String(b.petName || ""),
          species: String(b.species || "dog").toLowerCase(),
          symptoms: symptomIds,
          duration: String(b.duration || ""),
          extraNotes: String(b.extraNotes || ""),
          triageLevel: result.level,
          urgencyScore: result.score,
          summary: result.summary,
          possibleCauses: result.possibleCauses,
          immediateActions: result.immediateActions,
          homeCare: result.homeCare,
          seeVetWhen: result.seeVetWhen,
        } as never)
        .returning();
      saved = inserted[0];
    } catch {
      saved = null;
    }

    return NextResponse.json({ result, saved });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
