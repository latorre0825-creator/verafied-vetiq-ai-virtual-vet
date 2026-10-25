"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket, Copy, Check, Globe, Smartphone, Store, Apple, ExternalLink } from "lucide-react";
import InstallAppButton from "@/components/InstallAppButton";

const STORE_LISTING = {
  title: "VetIQ: AI Pet Doctor & Real Vets",
  subtitle: "Free AI triage · Poison checker · Video vets from $25 · Every species",
  short: "Your pet's doctor, 24/7. Free AI symptom triage in 60 seconds, household poison checker with toxic doses, and licensed vets on video from $25. Dogs, cats, rabbits, birds, horses & more.",
  full: `🐾 THE FIRST ALL-IN-ONE ONLINE ANIMAL HOSPITAL

Nobody should panic-Google at 2am while their pet is sick. VetIQ gives you a complete pet hospital in your pocket:

🤖 FREE AI TRIAGE — 60 SECONDS
• Urgency score across 19 symptom groups
• Species-smart: knows rabbit GI stasis, cat lilies, dog bloat & more
• Step-by-step first aid: what to do, what NOT to do
• Emergency radar flags life-threatening signs instantly

☠️ POISON & FOOD CHECKER
• Chocolate dose calculator by weight
• 14+ household killers with toxic doses
• Exactly what to tell the ER vet

🩺 REAL LICENSED VETS — FROM $25
• Video, chat or phone in ~8 minutes
• Filter by species, specialty, language & price
• Your AI report attaches automatically

📋 PET PASSPORTS & RECORDS
• Vaccine schedules & reminders
• Health timeline, weight tracking
• Share with any clinic

💬 DR. PAW — 24/7 AI CHAT
Ask anything: behavior, dosing, post-vaccine worries. Escalates to emergency guidance when red flags appear.

Every species welcome: dogs, cats, rabbits, birds, hamsters, reptiles, horses, turtles, fish.

Built with 💚 by VeRaFIED Studios — Luis & Tiffaney Latorre. Renovators turned builders, bringing new life to pet care with will, heart, and love for the community.

⚠️ AI guidance is first-response information only, not a diagnosis. Emergencies always need a licensed vet in person.`,
  keywords: "pet health, AI vet, online veterinarian, pet symptom checker, pet poison, dog health, cat health, emergency vet, video vet, pet first aid",
};

const STEPS = [
  {
    icon: Globe,
    t: "1. Deploy the website (10 min, free)",
    items: [
      "Push this project to GitHub, then import at vercel.com → it auto-deploys with a free URL",
      "Add a PostgreSQL database (Vercel Postgres or neon.tech free tier) and set DATABASE_URL",
      "Buy your domain (~$12/yr at Namecheap/Cloudflare) — e.g. vetiq.app or getvetiq.com — and connect it in Vercel",
      "Set NEXT_PUBLIC_SITE_URL to your domain so sitemap + share cards use it",
    ],
  },
  {
    icon: Smartphone,
    t: "2. Phone app — LIVE RIGHT NOW (PWA)",
    items: [
      "VetIQ is already installable! The 'Install app' button adds it to any Android/iPhone home screen",
      "Full-screen, app icon, shortcuts to AI Check / Poison / Vets — no store approval, no fees, updates instantly",
      "Marketing angle: 'Install our free app in 5 seconds — no app store needed'",
    ],
  },
  {
    icon: Store,
    t: "3. Google Play Store (~2–3 days)",
    items: [
      "Create a Google Play Developer account ($25 one-time) at play.google.com/console",
      "Go to pwabuilder.com → enter your live domain → it packages VetIQ as an Android app (TWA) automatically",
      "Upload the .aab file, paste the store listing copy below, add screenshots (grab them from the app)",
      "Health apps note: include the medical disclaimer (already in the copy) — approval is usually smooth",
    ],
  },
  {
    icon: Apple,
    t: "4. Apple App Store (~1–2 weeks)",
    items: [
      "Apple Developer account ($99/yr) at developer.apple.com",
      "Use pwabuilder.com iOS package, or Capacitor (capacitorjs.com) to wrap the site in a native shell",
      "Apple is stricter: the PWA install flow (step 2) covers iPhone users from DAY ONE while you wait",
      "Tip: submit with the 'Medical' disclaimer prominent and real vet profiles visible",
    ],
  },
];

export default function LaunchPage() {
  const [copied, setCopied] = useState("");

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F96A4B] text-white"><Rocket className="h-5 w-5" /></span>
          Launch Center — web + app marketplaces
        </h1>
        <InstallAppButton />
      </div>

      {/* status banner */}
      <div className="rounded-[2rem] bg-[#0B2F2B] p-6 text-white">
        <h2 className="font-extrabold">📡 Launch status</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["🌐 Website", "LIVE", "Deployed & working", true],
            ["📲 Phone app (PWA)", "LIVE", "Installable right now", true],
            ["🤖 Google Play", "READY", "Package via PWABuilder", false],
            ["🍎 App Store", "READY", "Package via PWABuilder/Capacitor", false],
          ].map(([t, s, d, live]) => (
            <div key={t as string} className="rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/10">
              <p className="text-sm font-extrabold">{t}</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold ${live ? "bg-emerald-400 text-emerald-950" : "bg-amber-400 text-amber-950"}`}>{s}</span>
              <p className="mt-1 text-[11px] text-emerald-100">{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* steps */}
      <div className="grid gap-4 md:grid-cols-2">
        {STEPS.map((s) => (
          <div key={s.t} className="rounded-3xl border border-orange-100 bg-white p-5">
            <h3 className="flex items-center gap-2 font-extrabold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0E3D37] text-white"><s.icon className="h-4 w-4" /></span>{s.t}</h3>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-600">
              {s.items.map((i) => <li key={i} className="flex gap-2"><span className="text-emerald-600">✓</span>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* store listing copy */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5">
        <h2 className="font-extrabold">📝 Store listing copy — ready to paste</h2>
        <p className="text-xs text-slate-400">Approved-style copy for Google Play & App Store. Tap any block to copy.</p>
        <div className="mt-3 space-y-2">
          {[
            ["App title (30 chars)", STORE_LISTING.title, "t1"],
            ["Subtitle / short description (80 chars)", STORE_LISTING.subtitle, "t2"],
            ["Promo text", STORE_LISTING.short, "t3"],
            ["Keywords", STORE_LISTING.keywords, "t4"],
          ].map(([label, text, id]) => (
            <button key={id} onClick={() => copy(text, id)} className="block w-full rounded-2xl bg-[#FFF9F0] p-3.5 text-left ring-1 ring-orange-100 transition hover:ring-emerald-300">
              <p className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                {label}
                <span className="flex items-center gap-1 text-[#F96A4B]">{copied === id ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}</span>
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{text}</p>
            </button>
          ))}
          <button onClick={() => copy(STORE_LISTING.full, "full")} className="block w-full rounded-2xl bg-[#FFF9F0] p-3.5 text-left ring-1 ring-orange-100 transition hover:ring-emerald-300">
            <p className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Full description (4000 chars)
              <span className="flex items-center gap-1 text-[#F96A4B]">{copied === "full" ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}</span>
            </p>
            <pre className="mt-1 max-h-48 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-600">{STORE_LISTING.full}</pre>
          </button>
        </div>
      </div>

      {/* quick links */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5">
        <h2 className="font-extrabold">🔗 Launch tools</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["Vercel (deploy web)", "https://vercel.com/new"],
            ["Neon (free Postgres)", "https://neon.tech"],
            ["PWABuilder (package for stores)", "https://www.pwabuilder.com"],
            ["Google Play Console", "https://play.google.com/console"],
            ["Apple Developer", "https://developer.apple.com"],
            ["Google Search Console (SEO)", "https://search.google.com/search-console"],
            ["Namecheap (domain)", "https://www.namecheap.com"],
          ].map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-2xl bg-slate-100 px-4 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-emerald-100 hover:text-emerald-900">
              {name} <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/app/business" className="rounded-2xl bg-[#0E3D37] px-5 py-2.5 text-sm font-extrabold text-white">Business HQ →</Link>
          <Link href="/app/refer" className="rounded-2xl bg-[#F96A4B] px-5 py-2.5 text-sm font-extrabold text-white">Referral toolkit →</Link>
          <Link href="/guide" className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700">Free guide (lead magnet) →</Link>
        </div>
      </div>
    </div>
  );
}
