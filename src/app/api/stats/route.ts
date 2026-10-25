import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointments, subscriptions, leads, aiConsults, pets, vets } from "@/db/schema";
import { sql, ne } from "drizzle-orm";

export async function GET() {
  try {
    const [apptAgg] = await db
      .select({
        count: sql<number>`count(*)::int`,
        revenue: sql<number>`coalesce(sum(${appointments.priceCents}),0)::int`,
      })
      .from(appointments)
      .where(ne(appointments.status, "cancelled"));

    const [subAgg] = await db
      .select({
        count: sql<number>`count(*)::int`,
        mrr: sql<number>`coalesce(sum(${subscriptions.priceCents}),0)::int`,
      })
      .from(subscriptions);

    const [leadAgg] = await db.select({ count: sql<number>`count(*)::int` }).from(leads);
    const [consultAgg] = await db.select({ count: sql<number>`count(*)::int` }).from(aiConsults);
    const [petAgg] = await db.select({ count: sql<number>`count(*)::int` }).from(pets);
    const [vetAgg] = await db.select({ count: sql<number>`count(*)::int` }).from(vets);

    const visitRevenue = apptAgg?.revenue ?? 0;
    const mrr = subAgg?.mrr ?? 0;
    // platform keeps 20% of visit fees + 100% of subscriptions
    const platformCut = Math.round(visitRevenue * 0.2);

    return NextResponse.json({
      stats: {
        visits: apptAgg?.count ?? 0,
        visitRevenueCents: visitRevenue,
        platformCutCents: platformCut,
        subscribers: subAgg?.count ?? 0,
        mrrCents: mrr,
        totalRevenueCents: platformCut + mrr,
        leads: leadAgg?.count ?? 0,
        aiConsults: consultAgg?.count ?? 0,
        pets: petAgg?.count ?? 0,
        vets: vetAgg?.count ?? 0,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
