import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint, Siren, ArrowRight, Printer } from "lucide-react";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Free Pet First-Aid Guide (All Species) — VetIQ",
  description:
    "Printable emergency first-aid guide for dogs, cats, rabbits, birds, hamsters, horses, turtles & fish. Red flags, poison list, vital signs, and what to do in the first 10 minutes. Free from VetIQ by VeRaFIED Studios.",
};

const RED_FLAGS = [
  ["Gums pale, white or blue", "Oxygen/circulation failing — ER immediately"],
  ["Collapse, or seizure over 5 minutes", "Heart, brain or toxin emergency"],
  ["Can't breathe / open-mouth breathing (cats)", "Airway, heart or heatstroke emergency"],
  ["Hard swollen belly + retching, nothing comes up (dogs)", "Bloat/GDV — fatal in 1–2 hours"],
  ["Male cat straining with NO urine", "Blocked bladder — fatal in 24–48h"],
  ["Bleeding that won't stop after 10 min pressure", "Possible internal injury"],
  ["Ate xylitol, rat bait, antifreeze, lilies (cats), grapes", "Killer toxins — minutes matter"],
  ["Hit by car / fall from height", "Internal bleeding possible even if walking"],
];

const VITALS = [
  ["Dog", "38.3–39.2°C", "60–140 bpm", "10–35 /min", "Gums pink, refill <2 sec"],
  ["Cat", "38.0–39.2°C", "140–220 bpm", "20–30 /min", "Never open-mouth breathing"],
  ["Rabbit", "38.5–40°C", "130–325 bpm", "30–60 /min", "No poop 8–12h = emergency"],
  ["Bird", "40–42°C", "150–600 bpm", "15–45 /min", "Fluffed + on cage floor = ER"],
  ["Horse", "37.2–38.3°C", "28–44 bpm", "8–16 /min", "No droppings + rolling = colic"],
];

const FIRST_10 = [
  { t: "1. Breathe & stay calm", d: "Pets mirror panic. Speak low, move slow. Panic wastes the minutes that matter." },
  { t: "2. Check the ABC", d: "Airway clear? Breathing — count for 15 sec × 4. Circulation — gum color + press gum, color should return under 2 sec." },
  { t: "3. Stop visible bleeding", d: "Firm pressure with clean cloth 5–10 minutes WITHOUT peeking. Snug bandage for limbs (one finger must fit under)." },
  { t: "4. Do NOT give human meds", d: "Ibuprofen and paracetamol can kill dogs and cats. No milk, no salt water, no forced vomiting unless a vet says so." },
  { t: "5. Note WHAT + WHEN + HOW MUCH", d: "For toxins: product name, grams eaten, time, pet weight. Bring the wrapper. This is the first thing every vet asks." },
  { t: "6. Call ahead & transport safely", d: "Call the clinic while en route so they prep. Small pets: towel-lined box, kept warm, dark and quiet." },
];

const POISONS = [
  "Xylitol (sugar-free gum, some peanut butters) — 1 stick can kill a small dog",
  "Chocolate (dark/baking worst) — note grams + pet weight",
  "Grapes & raisins — NO safe dose, kidney failure",
  "Lilies — pollen alone can kill a cat",
  "Onion, garlic, leek — red blood cell damage, signs 2–5 days later",
  "Rat bait & slug pellets — internal bleeding days later",
  "Antifreeze — 1 teaspoon can kill a cat; tastes sweet",
  "Human painkillers (ibuprofen, paracetamol) — never give",
  "Cooked bones — splinter & perforate the gut",
  "Dog flea spot-on used on cats (permethrin) — seizures, wash off + ER",
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#FFF9F0] text-slate-900">
      {/* header (hidden on print) */}
      <header className="border-b border-orange-100 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0E3D37] text-white"><PawPrint className="h-4 w-4" /></span>
            <span className="font-extrabold">VetIQ</span>
          </Link>
          <div className="flex gap-2">
            <PrintButton />
            <Link href="/app/ai-check" className="rounded-full bg-[#F96A4B] px-4 py-2 text-sm font-bold text-white">Run AI triage →</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 print:py-2">
        {/* title */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-red-700">
            <Siren className="h-3.5 w-3.5" /> Keep this on your fridge
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pet Emergency First-Aid Guide 🐾
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            The first 10 minutes decide everything. Free for every pet parent, every species — from VetIQ by VeRaFIED Studios. Print it, share it, save a life.
          </p>
        </div>

        {/* red flags */}
        <section className="mt-8 rounded-3xl border-2 border-red-200 bg-white p-5 print:break-inside-avoid">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-red-600"><Siren className="h-5 w-5" /> 8 red flags = go to the ER NOW (don&apos;t wait, don&apos;t Google)</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {RED_FLAGS.map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-red-50 p-3 ring-1 ring-red-100">
                <p className="text-sm font-extrabold">🚨 {t}</p>
                <p className="text-xs text-red-800/80">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* first 10 minutes */}
        <section className="mt-6 rounded-3xl border border-orange-100 bg-white p-5 print:break-inside-avoid">
          <h2 className="text-lg font-extrabold">⏱️ The first 10 minutes — in order</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {FIRST_10.map((s) => (
              <div key={s.t} className="rounded-2xl bg-[#FFF9F0] p-3.5 ring-1 ring-orange-100">
                <p className="text-sm font-extrabold text-emerald-900">{s.t}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* vitals table */}
        <section className="mt-6 rounded-3xl border border-orange-100 bg-white p-5 print:break-inside-avoid">
          <h2 className="text-lg font-extrabold">🌡️ Normal vital signs — know your baseline</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead>
                <tr className="border-b-2 border-emerald-900/10 text-[11px] font-extrabold uppercase tracking-wide text-slate-400">
                  <th className="py-2 pr-3">Species</th><th className="py-2 pr-3">Temp</th><th className="py-2 pr-3">Heart</th><th className="py-2 pr-3">Breathing</th><th className="py-2">Quick check</th>
                </tr>
              </thead>
              <tbody>
                {VITALS.map((r) => (
                  <tr key={r[0]} className="border-b border-orange-100 font-semibold">
                    <td className="py-2.5 pr-3 font-extrabold">{r[0]}</td>
                    <td className="py-2.5 pr-3">{r[1]}</td>
                    <td className="py-2.5 pr-3">{r[2]}</td>
                    <td className="py-2.5 pr-3">{r[3]}</td>
                    <td className="py-2.5 text-slate-500">{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Tip: count breaths while your pet rests TODAY so you know their normal. Resting breaths over 40/min (dog/cat) = call a vet.</p>
        </section>

        {/* poisons */}
        <section className="mt-6 rounded-3xl border border-orange-100 bg-white p-5 print:break-inside-avoid">
          <h2 className="text-lg font-extrabold">☠️ Top 10 household killers — pet-proof this week</h2>
          <ul className="mt-3 grid gap-1.5 text-sm font-semibold text-slate-700 sm:grid-cols-2">
            {POISONS.map((p) => <li key={p} className="rounded-xl bg-slate-50 px-3 py-2 text-xs">• {p}</li>)}
          </ul>
          <p className="mt-2 text-[11px] text-slate-400">Full interactive checker with toxic doses by weight: vetiq → Poison Checker.</p>
        </section>

        {/* emergency contacts card */}
        <section className="mt-6 rounded-3xl bg-[#0B2F2B] p-5 text-white print:break-inside-avoid">
          <h2 className="text-lg font-extrabold">📇 Fill in & stick on the fridge</h2>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {["My vet: ________________", "Nearest 24h ER vet: ________________", "Poison helpline: ________________", "Pet weight: ______ kg · Microchip #: ________", "Allergies / meds: ________________", "Backup contact: ________________"].map((l) => (
              <p key={l} className="rounded-xl bg-white/10 px-3 py-2.5 font-mono text-xs ring-1 ring-white/10">{l}</p>
            ))}
          </div>
        </section>

        {/* CTA (hidden on print) */}
        <section className="mt-8 rounded-[2rem] border border-orange-100 bg-white p-6 text-center print:hidden">
          <p className="text-3xl">🐶🐱🐰🦜🐴🐢</p>
          <h2 className="mt-2 text-xl font-extrabold">When something feels wrong — don&apos;t guess alone.</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">Free AI triage in 60 seconds, licensed vets on video from $25. Every species welcome.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/app/ai-check" className="inline-flex items-center gap-2 rounded-2xl bg-[#0E3D37] px-6 py-3 text-sm font-extrabold text-white">Run free AI check <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/app/vets" className="rounded-2xl border-2 border-emerald-900/15 px-6 py-3 text-sm font-extrabold text-emerald-900">See a real vet</Link>
          </div>
        </section>

        <footer className="mt-8 border-t border-orange-100 pt-4 text-center text-[11px] leading-relaxed text-slate-400">
          <p className="font-bold text-slate-500">VetIQ — AI Pet Doctor + Real Vets · vetiq.app</p>
          <p>Built with 💚 by VeRaFIED Studios — Luis &amp; Tiffaney Latorre. First-response info only, not a substitute for a licensed veterinarian.</p>
          <p className="print:hidden"><Printer className="mr-1 inline h-3 w-3" /> This page is print-optimized — Ctrl/Cmd+P makes a perfect fridge handout.</p>
        </footer>
      </main>
    </div>
  );
}
