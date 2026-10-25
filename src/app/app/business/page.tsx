"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, DollarSign, Users, BrainCircuit, Video, Crown, Megaphone, PawPrint, Stethoscope, Rocket } from "lucide-react";
import { money } from "@/lib/format";

interface Stats {
  visits: number; visitRevenueCents: number; platformCutCents: number;
  subscribers: number; mrrCents: number; totalRevenueCents: number;
  leads: number; aiConsults: number; pets: number; vets: number;
}

const STREAMS = [
  { icon: Video, t: "Vet visit commissions", d: "Platform keeps 20% of every $25–$39 visit. Vets keep 80% — happy vets, zero overhead.", status: "LIVE" },
  { icon: Crown, t: "Plus & Pro subscriptions", d: "$9 / $19 monthly recurring. Reminders + discounts = sticky retention.", status: "LIVE" },
  { icon: Megaphone, t: "Referral growth loop", d: "Give $5 / get $5 — CAC near zero, every owner becomes a marketer.", status: "LIVE" },
  { icon: Stethoscope, t: "Vet SaaS tools (next)", d: "Charge vets $29/mo for calendar, AI intake notes & payouts dashboard.", status: "ROADMAP" },
  { icon: PawPrint, t: "Pharmacy & food affiliate (next)", d: "Flea meds, prescription diets — 10–15% affiliate margins post-visit.", status: "ROADMAP" },
  { icon: Users, t: "Pet insurance leads (next)", d: "$30–$80 per qualified insurance referral from health-record data (opt-in).", status: "ROADMAP" },
];

const PLAYBOOK = [
  { wk: "Tonight", moves: ["Post launch in 5 local pet Facebook groups + Nextdoor", "DM 10 vet friends the 'Join as a doctor' link", "Post the poison-checker on X/TikTok: '1 gum stick can kill a small dog'"] },
  { wk: "Week 1", moves: ["TikTok/Reels: 'AI triaged my dog at 2am' storytime (emotional + demo)", "Partner 3 groomers & 2 shelters: QR code poster, $5 credit per scan", "Google Business profile: '24/7 online vet' — rank for 'emergency vet near me'"] },
  { wk: "Week 2–4", moves: ["SEO pages: 'can dogs eat X' ×50 — poison DB auto-generates them", "Referral push: double credit weekend ($10/$10)", "Onboard 20 vets with 0% commission first month promo"] },
];

export default function BusinessPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then((d) => setStats(d.stats || null)).catch(() => {});
  }, []);

  const kpis = stats
    ? [
        { icon: DollarSign, k: money(stats.totalRevenueCents), v: "Platform revenue (20% cut + MRR)", c: "bg-emerald-600" },
        { icon: Crown, k: money(stats.mrrCents) + "/mo", v: `MRR · ${stats.subscribers} subscriber${stats.subscribers === 1 ? "" : "s"}`, c: "bg-amber-500" },
        { icon: Video, k: String(stats.visits), v: `Visits booked · ${money(stats.visitRevenueCents)} GMV`, c: "bg-[#F96A4B]" },
        { icon: BrainCircuit, k: String(stats.aiConsults), v: "AI triages run (top of funnel)", c: "bg-teal-600" },
        { icon: Users, k: String(stats.leads), v: "Marketing leads captured", c: "bg-sky-600" },
        { icon: Stethoscope, k: String(stats.vets), v: "Vets on the platform", c: "bg-slate-800" },
      ]
    : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0E3D37] text-white"><BarChart3 className="h-5 w-5" /></span>
          Business HQ — live money dashboard
        </h1>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-800">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> LAUNCH NIGHT MODE
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {kpis.length ? kpis.map((s) => (
          <div key={s.v} className="rounded-3xl border border-orange-100 bg-white p-4">
            <span className={`grid h-9 w-9 place-items-center rounded-xl text-white ${s.c}`}><s.icon className="h-4 w-4" /></span>
            <p className="mt-2 text-2xl font-extrabold">{s.k}</p>
            <p className="text-xs font-semibold text-slate-400">{s.v}</p>
          </div>
        )) : (
          <div className="col-span-full rounded-3xl bg-white p-8 text-center text-sm text-slate-400">Loading live stats…</div>
        )}
      </div>

      {/* funnel */}
      {stats && (
        <div className="rounded-3xl border border-orange-100 bg-white p-5">
          <h2 className="font-extrabold">🔻 The money funnel</h2>
          <div className="mt-3 space-y-2">
            {[
              { label: "Free AI triages (hook)", val: stats.aiConsults, max: Math.max(stats.aiConsults, 1), color: "bg-teal-500" },
              { label: "Leads captured", val: stats.leads, max: Math.max(stats.aiConsults, stats.leads, 1), color: "bg-sky-500" },
              { label: "Paid vet visits", val: stats.visits, max: Math.max(stats.aiConsults, stats.visits, 1), color: "bg-[#F96A4B]" },
              { label: "Subscribers (recurring 💰)", val: stats.subscribers, max: Math.max(stats.aiConsults, stats.subscribers, 1), color: "bg-amber-500" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-xs font-bold text-slate-600">{f.label}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className={`flex h-full items-center rounded-full px-2 text-[10px] font-extrabold text-white ${f.color}`} style={{ width: `${Math.max((f.val / f.max) * 100, 8)}%` }}>
                    {f.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">Free AI → trust → paid visit → subscription. Every triage result has a “Book a real vet” button baked in.</p>
        </div>
      )}

      {/* revenue streams */}
      <div>
        <h2 className="font-extrabold">💰 6 revenue streams</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STREAMS.map((s) => (
            <div key={s.t} className="rounded-3xl border border-orange-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0E3D37] text-white"><s.icon className="h-4 w-4" /></span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${s.status === "LIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{s.status}</span>
              </div>
              <p className="mt-2.5 text-sm font-extrabold">{s.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* marketing playbook */}
      <div className="rounded-[2rem] bg-[#0B2F2B] p-6 text-white">
        <h2 className="flex items-center gap-2 font-extrabold"><Rocket className="h-5 w-5 text-amber-300" /> Launch marketing playbook</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {PLAYBOOK.map((p) => (
            <div key={p.wk} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              <p className="text-sm font-extrabold text-amber-300">{p.wk}</p>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed text-emerald-50">
                {p.moves.map((m) => <li key={m} className="flex gap-1.5"><span>✅</span>{m}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/app/launch" className="rounded-2xl bg-amber-400 px-5 py-2.5 text-sm font-extrabold text-amber-950 hover:bg-amber-300">🚀 Launch Center: web + app stores →</Link>
          <Link href="/app/refer" className="rounded-2xl bg-[#F96A4B] px-5 py-2.5 text-sm font-extrabold hover:bg-[#e85a3b]">Open referral toolkit →</Link>
          <Link href="/app/premium" className="rounded-2xl border border-white/25 px-5 py-2.5 text-sm font-bold hover:bg-white/10">View subscription plans</Link>
          <Link href="/app/vets?join=1" className="rounded-2xl border border-white/25 px-5 py-2.5 text-sm font-bold hover:bg-white/10">Recruit vets</Link>
        </div>
      </div>
    </div>
  );
}
