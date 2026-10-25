"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShieldAlert, Search, Siren, PhoneCall, Video, Calculator } from "lucide-react";
import { POISON_DB, searchPoison } from "@/lib/vet-ai";

const dangerStyle: Record<string, string> = {
  emergency: "bg-red-500 text-white",
  high: "bg-red-100 text-red-700 ring-1 ring-red-200",
  moderate: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  low: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
};

export default function SafetyPage() {
  const [q, setQ] = useState("");
  const [weight, setWeight] = useState(10);
  const [chocGrams, setChocGrams] = useState(50);
  const [chocType, setChocType] = useState("milk");

  const results = useMemo(() => searchPoison(q), [q]);

  // chocolate estimator: theobromine mg/g approx
  const theoPerG: Record<string, number> = { white: 0.25, milk: 2.3, dark: 5.3, baking: 16 };
  const theoMg = chocGrams * (theoPerG[chocType] ?? 2.3);
  const perKg = weight > 0 ? theoMg / weight : 0;
  const chocLevel = perKg >= 40 ? "emergency" : perKg >= 20 ? "high" : perKg >= 10 ? "moderate" : "low";
  const chocMsg =
    chocLevel === "emergency"
      ? "🚨 ER NOW — seizures/heart risk dose. Vet may induce vomiting + charcoal + IV."
      : chocLevel === "high"
        ? "⚠️ Urgent vet within 2h — likely vomiting, restlessness, fast heart."
        : chocLevel === "moderate"
          ? "🟡 Call vet today — mild signs possible (vomit, diarrhea). Monitor 24h."
          : "✅ Likely mild — monitor 12–24h, offer water + bland food. Vet if vomiting.";

  return (
    <div className="space-y-5">
      <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-red-500 text-white"><ShieldAlert className="h-5 w-5" /></span>
        Poison & food safety checker
      </h1>

      {/* ER banner */}
      <div className="flex flex-col gap-3 rounded-[1.8rem] bg-[#0B2F2B] p-5 text-white sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="flex items-center gap-1.5 font-extrabold text-red-300"><Siren className="h-4 w-4" /> Eaten in the last 2 hours?</p>
          <p className="mt-1 text-sm text-emerald-100">Don&apos;t wait for signs. Note <b>WHAT + HOW MUCH + WHEN + WEIGHT</b> and call now — vomiting can only be induced early and only if the vet says so.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/vets" className="flex items-center gap-1.5 rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-extrabold hover:bg-red-600"><Video className="h-4 w-4" /> Video vet now</Link>
          <a href="tel:+1800" className="flex items-center gap-1.5 rounded-2xl border border-white/25 px-4 py-2.5 text-sm font-bold hover:bg-white/10"><PhoneCall className="h-4 w-4" /> Poison line</a>
        </div>
      </div>

      {/* search */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5">
        <label className="flex items-center gap-2 rounded-2xl bg-[#FFF9F0] px-4 py-3 ring-1 ring-orange-100">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a food, plant or product… (chocolate, xylitol, lily, grapes, onion…)" className="w-full bg-transparent text-sm font-medium outline-none" />
        </label>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {results.map((p) => (
            <div key={p.name} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-extrabold">{p.name}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${dangerStyle[p.danger]}`}>{p.danger}</span>
              </div>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-400">Affects: {p.species}</p>
              <p className="mt-1.5 text-xs"><b>Toxic dose:</b> {p.toxicDose}</p>
              <p className="mt-1 text-xs text-slate-600"><b>Signs:</b> {p.signs}</p>
              <p className="mt-1.5 rounded-xl bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-700">👉 {p.action}</p>
            </div>
          ))}
          {results.length === 0 && (
            <div className="col-span-full rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
              Nothing found for “{q}”. Try “gum”, “onion”, “rat” or “cleaning”. When in doubt, treat as urgent and ask Dr. Paw or a vet.
            </div>
          )}
        </div>
      </div>

      {/* chocolate calculator */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-orange-100 bg-white p-5">
          <h2 className="flex items-center gap-1.5 font-extrabold"><Calculator className="h-4 w-4 text-amber-600" /> 🍫 Chocolate dose calculator</h2>
          <div className="mt-3 grid grid-cols-2 gap-2.5 text-sm font-bold">
            <label>Pet weight (kg)<input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-amber-500" /></label>
            <label>Eaten (grams)<input type="number" value={chocGrams} onChange={(e) => setChocGrams(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-amber-500" /></label>
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {[["milk", "🥛 Milk"], ["dark", "🍫 Dark"], ["baking", "⬛ Baking"], ["white", "🤍 White"]].map(([v, l]) => (
              <button key={v} onClick={() => setChocType(v)} className={`flex-1 rounded-xl py-2 text-xs font-extrabold ${chocType === v ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600"}`}>{l}</button>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-[#FFF9F0] p-3.5 ring-1 ring-orange-100">
            <p className="text-sm">≈ <b>{theoMg.toFixed(0)} mg</b> theobromine · <b>{perKg.toFixed(1)} mg/kg</b></p>
            <p className={`mt-1.5 rounded-xl px-3 py-2 text-sm font-bold ${chocLevel === "emergency" ? "bg-red-500 text-white" : chocLevel === "high" ? "bg-red-100 text-red-700" : chocLevel === "moderate" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{chocMsg}</p>
            <p className="mt-1.5 text-[11px] text-slate-400">Estimator only — cocoa % varies. Always confirm with a vet; bring the wrapper.</p>
          </div>
        </div>

        <div className="rounded-3xl bg-red-50 p-5 ring-1 ring-red-100">
          <h2 className="flex items-center gap-1.5 font-extrabold text-red-700"><Siren className="h-4 w-4" /> The 8 “go NOW” red flags</h2>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-red-900/90">
            {[
              ["Gums pale/white/blue", "Circulation or oxygen failing"],
              ["Collapse / seizure >5 min", "Heart, brain or toxin emergency"],
              ["Can't breathe / belly effort", "Airway, heart or heatstroke"],
              ["Hard swollen belly + dry retching (dogs)", "Bloat/GDV — fatal in hours"],
              ["Male cat straining, NO urine", "Blocked bladder — fatal 24–48h"],
              ["Bleeding 10+ min / hit by car", "Internal injury likely"],
              ["Ate xylitol, rat bait, antifreeze, lilies", "Killer toxins, act in minutes"],
              ["Puppy: bloody foul diarrhea + vomiting", "Parvo — isolate + ER"],
            ].map(([t, d]) => (
              <li key={t} className="rounded-xl bg-white px-3 py-2 ring-1 ring-red-100">
                <span className="font-extrabold">• {t}</span>
                <span className="block text-xs font-medium text-red-800/70">{d}</span>
              </li>
            ))}
          </ul>
          <Link href="/app/ai-check" className="mt-3 block rounded-2xl bg-red-500 py-2.5 text-center text-sm font-extrabold text-white hover:bg-red-600">Run emergency AI triage →</Link>
        </div>
      </div>

      {/* all poisons quick list */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5">
        <h2 className="font-extrabold">☠️ Top household killers — pet-proof today</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {POISON_DB.map((p) => (
            <button key={p.name} onClick={() => setQ(p.name.split(" ")[0])} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-red-100 hover:text-red-700">
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
