"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BrainCircuit,
  MessageCircleHeart,
  Video,
  ShieldAlert,
  PawPrint,
  CalendarCheck,
  ArrowRight,
  Siren,
  Star,
  Plus,
} from "lucide-react";
import { petEmoji, timeAgo, money } from "@/lib/format";

interface Pet { id: number; name: string; species: string; breed: string; ageYears: number; weightKg: number; imageUrl?: string; }
interface Vet { id: number; name: string; specialties: string; rating: number; isOnline: boolean; nextSlot: string; priceCents: number; avatarUrl: string; }
interface Appt { id: number; petName: string; vetName: string; scheduledAt: string; status: string; visitType: string; }
interface Consult { id: number; petName: string; triageLevel: string; urgencyScore: number; createdAt: string; summary: string; }

export default function OverviewPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [vets, setVets] = useState<Vet[]>([]);
  const [appts, setAppts] = useState<Appt[]>([]);
  const [consults, setConsults] = useState<Consult[]>([]);

  useEffect(() => {
    fetch("/api/pets").then((r) => r.json()).then((d) => setPets(d.pets || [])).catch(() => {});
    fetch("/api/vets").then((r) => r.json()).then((d) => setVets(d.vets || [])).catch(() => {});
    fetch("/api/appointments").then((r) => r.json()).then((d) => setAppts(d.appointments || [])).catch(() => {});
    fetch("/api/ai-triage").then((r) => r.json()).then((d) => setConsults(d.consults || [])).catch(() => {});
  }, []);

  const upcoming = appts.filter((a) => a.status === "upcoming").slice(0, 3);
  const online = vets.filter((v) => v.isOnline);

  return (
    <div className="space-y-5">
      {/* hero */}
      <div className="paw-pattern relative overflow-hidden rounded-[2rem] bg-[#0E3D37] p-6 text-white sm:p-8">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> {online.length || 12} vets online now
          </p>
          <h1 className="mt-3 max-w-lg text-2xl font-extrabold leading-tight sm:text-3xl">
            How is your buddy feeling today? Start with AI, finish with a real vet. 🐾
          </h1>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link href="/app/ai-check" className="flex items-center gap-2 rounded-2xl bg-[#F96A4B] px-5 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-[#e85a3b]">
              <BrainCircuit className="h-4 w-4" /> AI symptom check — 60 sec
            </Link>
            <Link href="/app/vets" className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-emerald-950 hover:bg-emerald-50">
              <Video className="h-4 w-4" /> Book video vet
            </Link>
            <Link href="/app/ai-chat" className="flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
              <MessageCircleHeart className="h-4 w-4" /> Ask Dr. Paw
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 text-[10rem] opacity-10">🐾</div>
      </div>

      {/* quick actions */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { href: "/app/ai-check", icon: BrainCircuit, t: "AI Triage", d: "Urgency + first aid", bg: "bg-emerald-600" },
          { href: "/app/ai-chat", icon: MessageCircleHeart, t: "Dr. Paw Chat", d: "24/7 Q&A", bg: "bg-teal-500" },
          { href: "/app/vets", icon: Video, t: "Video Vet", d: "From $25 · ~8 min", bg: "bg-[#F96A4B]" },
          { href: "/app/safety", icon: ShieldAlert, t: "Poison Check", d: "Foods & toxins", bg: "bg-red-500" },
        ].map((a) => (
          <Link key={a.t} href={a.href} className="group rounded-3xl border border-orange-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <span className={`grid h-10 w-10 place-items-center rounded-2xl text-white ${a.bg}`}><a.icon className="h-5 w-5" /></span>
            <p className="mt-2.5 text-sm font-extrabold">{a.t}</p>
            <p className="text-xs text-slate-500">{a.d}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* pets */}
        <div className="rounded-3xl border border-orange-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-extrabold"><PawPrint className="h-4 w-4 text-emerald-700" /> My pets ({pets.length})</h2>
            <Link href="/app/pets" className="text-xs font-bold text-emerald-700 hover:underline">Manage →</Link>
          </div>
          {pets.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-[#FFF9F0] p-4 text-center">
              <p className="text-3xl">🐾</p>
              <p className="mt-1 text-sm font-bold">No pets yet</p>
              <p className="text-xs text-slate-500">Add your first buddy in 30 seconds.</p>
              <Link href="/app/pets" className="mt-3 inline-flex items-center gap-1 rounded-xl bg-[#0E3D37] px-4 py-2 text-xs font-bold text-white"><Plus className="h-3.5 w-3.5" /> Add pet</Link>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {pets.slice(0, 4).map((p) => (
                <Link key={p.id} href="/app/pets" className="flex items-center gap-3 rounded-2xl bg-[#FFF9F0] p-2.5 ring-1 ring-orange-100 transition hover:ring-emerald-300">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="h-11 w-11 rounded-xl object-cover" />
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-xl">{petEmoji(p.species)}</span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold">{p.name} <span className="font-medium text-slate-400">· {p.breed}</span></span>
                    <span className="block text-xs text-slate-500 capitalize">{p.species} · {p.ageYears}y · {p.weightKg}kg</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-300" />
                </Link>
              ))}
            </div>
          )}
          {/* red flags mini */}
          <div className="mt-4 rounded-2xl bg-red-50 p-3 ring-1 ring-red-100">
            <p className="flex items-center gap-1.5 text-xs font-extrabold text-red-600"><Siren className="h-3.5 w-3.5" /> Go to ER now if:</p>
            <p className="mt-1 text-[11px] leading-relaxed text-red-900/80">Blue/pale gums · collapse · can&apos;t breathe · hard belly + retching · male cat, no urine · ate xylitol/rat bait/lilies</p>
          </div>
        </div>

        {/* upcoming visits */}
        <div className="rounded-3xl border border-orange-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-extrabold"><CalendarCheck className="h-4 w-4 text-emerald-700" /> Upcoming visits</h2>
            <Link href="/app/visits" className="text-xs font-bold text-emerald-700 hover:underline">All →</Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-[#FFF9F0] p-4 text-center">
              <p className="text-3xl">📅</p>
              <p className="mt-1 text-sm font-bold">No visits booked</p>
              <p className="text-xs text-slate-500">Video vets available today from $25.</p>
              <Link href="/app/vets" className="mt-3 inline-block rounded-xl bg-[#F96A4B] px-4 py-2 text-xs font-bold text-white">Find a vet</Link>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {upcoming.map((a) => (
                <div key={a.id} className="rounded-2xl bg-[#FFF9F0] p-3 ring-1 ring-orange-100">
                  <p className="text-sm font-extrabold">{a.vetName}</p>
                  <p className="text-xs text-slate-500">{a.petName} · {a.visitType} · {a.scheduledAt}</p>
                  <span className="mt-1.5 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">CONFIRMED</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Latest AI checks</h3>
            {consults.length === 0 ? (
              <p className="mt-2 text-xs text-slate-400">No AI checks yet — run your first free one.</p>
            ) : (
              <div className="mt-2 space-y-2">
                {consults.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs">
                    <span className={`rounded-full px-2 py-0.5 font-extrabold uppercase ${c.triageLevel === "emergency" ? "bg-red-100 text-red-700" : c.triageLevel === "urgent" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{c.triageLevel}</span>
                    <span className="truncate font-semibold">{c.petName || "Pet"} · score {c.urgencyScore}</span>
                    <span className="ml-auto shrink-0 text-slate-400">{timeAgo(c.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* vets online */}
        <div className="rounded-3xl border border-orange-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-extrabold"><Video className="h-4 w-4 text-emerald-700" /> Vets online</h2>
            <Link href="/app/vets" className="text-xs font-bold text-emerald-700 hover:underline">See all →</Link>
          </div>
          <div className="mt-3 space-y-2">
            {vets.slice(0, 4).map((v) => (
              <Link key={v.id} href="/app/vets" className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-emerald-50/60">
                {v.avatarUrl ? (
                  <img src={v.avatarUrl} alt={v.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-100" />
                ) : (
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-100 font-extrabold text-emerald-800">{v.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-extrabold">{v.name}
                    {v.isOnline && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                  </span>
                  <span className="block truncate text-xs text-slate-500">{v.specialties} · ⭐ {v.rating}</span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-extrabold text-emerald-800">{money(v.priceCents)}</span>
                  <span className="block text-[10px] text-slate-400">{v.nextSlot}</span>
                </span>
              </Link>
            ))}
            {vets.length === 0 && <p className="text-sm text-slate-400">Loading vets…</p>}
          </div>
          <Link href="/app/vets?join=1" className="mt-3 flex items-center justify-center gap-1 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 py-2.5 text-xs font-extrabold text-emerald-800">
            <Star className="h-3.5 w-3.5" /> Are you a vet? Join & earn →
          </Link>
        </div>
      </div>

      {/* launch night: money + marketing row */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/app/premium" className="group flex items-center gap-4 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-400 p-5 text-amber-950 shadow-lg transition hover:-translate-y-0.5">
          <span className="text-4xl">👑</span>
          <span>
            <span className="block font-extrabold">Go Premium — save 20% on every visit</span>
            <span className="block text-sm font-semibold opacity-80">$9/mo · reminders · priority matching · 7 days free</span>
          </span>
          <ArrowRight className="ml-auto h-5 w-5 transition group-hover:translate-x-1" />
        </Link>
        <Link href="/app/refer" className="group flex items-center gap-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-5 text-white shadow-lg transition hover:-translate-y-0.5">
          <span className="text-4xl">🎁</span>
          <span>
            <span className="block font-extrabold">Refer a friend — give $5, get $5</span>
            <span className="block text-sm font-semibold opacity-80">Copy your link · share captions · track your credit</span>
          </span>
          <ArrowRight className="ml-auto h-5 w-5 transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* how it works */}
      <div className="grid gap-3 rounded-[2rem] border border-orange-100 bg-white p-5 sm:grid-cols-3 sm:p-6">
        {[
          { n: "1", t: "AI first-response (free)", d: "Describe symptoms → urgency score + first-aid + poison check in 60 seconds." },
          { n: "2", t: "Real vet on video ($25+)", d: "Your AI report + photos go to the vet automatically. Prescriptions where legal." },
          { n: "3", t: "Records + reminders", d: "Visit notes, vaccine schedule & weight tracking saved to your pet's passport." },
        ].map((s) => (
          <div key={s.n} className="flex gap-3 rounded-2xl bg-[#FFF9F0] p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0E3D37] font-extrabold text-white">{s.n}</span>
            <span><span className="block text-sm font-extrabold">{s.t}</span><span className="block text-xs leading-relaxed text-slate-500">{s.d}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
