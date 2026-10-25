"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Video, MessageCircle, Phone, Star, Search, BadgeCheck, Clock3, X, Loader2, Stethoscope, CheckCircle2 } from "lucide-react";
import { money } from "@/lib/format";

interface Vet {
  id: number; name: string; title: string; specialties: string; species: string;
  rating: number; reviewsCount: number; priceCents: number; yearsExp: number;
  languages: string; avatarUrl: string; bio: string; clinic: string;
  isOnline: boolean; nextSlot: string; consultsDone: number; verified: boolean;
}
interface Pet { id: number; name: string; species: string; }

const SLOTS = ["Today 4:30 PM", "Today 6:10 PM", "Today 8:00 PM", "Tomorrow 9:00 AM", "Tomorrow 11:30 AM", "Tomorrow 2:00 PM"];

function VetsInner() {
  const params = useSearchParams();
  const [vets, setVets] = useState<Vet[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [booking, setBooking] = useState<Vet | null>(null);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [petName, setPetName] = useState("");
  const [reason, setReason] = useState("");
  const [visitType, setVisitType] = useState("video");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState("");
  const [joinOpen, setJoinOpen] = useState(params.get("join") === "1");
  const [joinDone, setJoinDone] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", specialties: "General Practice", species: "Dogs, Cats", priceCents: 2900, yearsExp: 5, languages: "English", bio: "" });

  useEffect(() => {
    fetch("/api/vets").then((r) => r.json()).then((d) => setVets(d.vets || [])).catch(() => {});
    fetch("/api/pets").then((r) => r.json()).then((d) => {
      setPets(d.pets || []);
      if (d.pets?.length) setPetName(d.pets[0].name);
    }).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return vets.filter((v) => {
      const hit = (v.name + " " + v.specialties + " " + v.species + " " + v.bio).toLowerCase().includes(q.toLowerCase());
      if (!hit) return false;
      if (filter === "online") return v.isOnline;
      if (filter === "cats") return v.species.toLowerCase().includes("cat");
      if (filter === "dogs") return v.species.toLowerCase().includes("dog");
      if (filter === "exotics") return /rabbit|bird|reptile|exotic|small/i.test(v.species + " " + v.specialties);
      if (filter === "budget") return v.priceCents <= 2900;
      return true;
    });
  }, [vets, q, filter]);

  async function confirmBooking() {
    if (!booking) return;
    setSaving(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petName: petName || "My pet",
          vetId: booking.id,
          vetName: booking.name,
          scheduledAt: slot,
          reason: reason || "General checkup (AI report attached)",
          visitType,
          priceCents: booking.priceCents,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDone(`✅ Booked! ${booking.name} · ${slot} · ${visitType} · Room: ${data.appointment.meetingLink}`);
      setBooking(null);
      setReason("");
    } catch (e) {
      setDone(e instanceof Error ? e.message : "Booking failed");
    } finally {
      setSaving(false);
    }
  }

  async function joinAsVet() {
    if (!joinForm.name.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/vets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...joinForm, avatarUrl: "", isOnline: true, nextSlot: "Today", consultsDone: 0 }),
      });
      setJoinDone(true);
      const d = await fetch("/api/vets").then((r) => r.json());
      setVets(d.vets || []);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F96A4B] text-white"><Video className="h-5 w-5" /></span>
            Find a real vet — video in minutes
          </h1>
          <p className="mt-1 text-sm text-slate-500">{vets.filter((v) => v.isOnline).length} online now · licensed DVMs · your AI report goes to the vet automatically</p>
        </div>
        <button onClick={() => setJoinOpen(true)} className="rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50 px-4 py-2.5 text-sm font-extrabold text-emerald-800 hover:bg-emerald-100">
          <Stethoscope className="mr-1 inline h-4 w-4" /> I&apos;m a vet — join & earn
        </button>
      </div>

      {done && (
        <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-200">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {done}
        </div>
      )}

      {/* search + filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-orange-100 bg-white px-4 py-2.5">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: skin, rabbit, behavior, urinary, Spanish…" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {[["all", "All"], ["online", "🟢 Online"], ["dogs", "🐶 Dogs"], ["cats", "🐱 Cats"], ["exotics", "🐰 Exotics"], ["budget", "💰 Under $30"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold ${filter === v ? "bg-[#0E3D37] text-white" : "bg-white text-slate-600 ring-1 ring-orange-100"}`}>{l}</button>
          ))}
        </div>
      </div>

      {/* cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((v) => (
          <div key={v.id} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition hover:shadow-lg">
            <div className="flex gap-3.5">
              {v.avatarUrl ? (
                <img src={v.avatarUrl} alt={v.name} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
              ) : (
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-lg font-extrabold text-emerald-800">{v.name.replace("Dr. ", "").split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
              )}
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-1.5 font-extrabold">
                  {v.name}
                  {v.verified && <BadgeCheck className="h-4 w-4 text-sky-500" />}
                  {v.isOnline ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">● ONLINE</span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-500">OFFLINE</span>
                  )}
                </p>
                <p className="text-xs font-semibold text-slate-500">{v.title}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Star className="h-3.5 w-3.5 fill-current" /> {v.rating.toFixed(2)} <span className="font-medium text-slate-400">({v.reviewsCount} reviews · {v.consultsDone?.toLocaleString()}+ consults · {v.yearsExp}y exp)</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-emerald-800">{money(v.priceCents)}</p>
                <p className="text-[10px] font-semibold text-slate-400">per visit</p>
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] font-bold">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800 ring-1 ring-emerald-100">{v.specialties}</span>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-800 ring-1 ring-orange-100">{v.species}</span>
              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-slate-600 ring-1 ring-slate-100">🗣 {v.languages}</span>
            </div>
            <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{v.bio}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Clock3 className="h-3.5 w-3.5" /> Next: {v.nextSlot} · {v.clinic}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <button onClick={() => { setBooking(v); setVisitType("video"); }} className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#0E3D37] py-2.5 text-xs font-extrabold text-white hover:bg-[#125048]"><Video className="h-3.5 w-3.5" /> Video</button>
              <button onClick={() => { setBooking(v); setVisitType("chat"); }} className="flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-2.5 text-xs font-extrabold text-white hover:bg-emerald-700"><MessageCircle className="h-3.5 w-3.5" /> Chat</button>
              <button onClick={() => { setBooking(v); setVisitType("phone"); }} className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-slate-50"><Phone className="h-3.5 w-3.5" /> Phone</button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-400">No vets match “{q}”. Try “skin”, “rabbit” or “behavior”.</div>
      )}

      {/* booking modal */}
      {booking && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setBooking(null)}>
          <div className="w-full max-w-md rounded-[1.8rem] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold">Book {booking.name}</h3>
                <p className="text-xs text-slate-500">{booking.specialties} · {money(booking.priceCents)} · AI report attached free</p>
              </div>
              <button onClick={() => setBooking(null)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 space-y-3 text-sm font-bold">
              <label>Visit type
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {[["video", "🎥 Video"], ["chat", "💬 Chat"], ["phone", "📞 Phone"]].map(([v, l]) => (
                    <button key={v} onClick={() => setVisitType(v)} className={`rounded-xl py-2 text-xs font-extrabold ${visitType === v ? "bg-[#0E3D37] text-white" : "bg-slate-100 text-slate-600"}`}>{l}</button>
                  ))}
                </div>
              </label>
              <label>Time slot
                <div className="mt-1 grid grid-cols-2 gap-1.5">
                  {SLOTS.map((s) => (
                    <button key={s} onClick={() => setSlot(s)} className={`rounded-xl px-2 py-2 text-xs font-bold ${slot === s ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>{s}</button>
                  ))}
                </div>
              </label>
              <label>Pet
                <input value={petName} onChange={(e) => setPetName(e.target.value)} list="petlist" placeholder="Pet name" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" />
                <datalist id="petlist">{pets.map((p) => <option key={p.id} value={p.name} />)}</datalist>
              </label>
              <label>Reason for visit
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2} placeholder="e.g. Vomiting + lethargy — AI said urgent, report attached" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" />
              </label>
            </div>
            <button onClick={confirmBooking} disabled={saving} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F96A4B] py-3 text-sm font-extrabold text-white hover:bg-[#e85a3b] disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Confirm {visitType} visit · {money(booking.priceCents)}
            </button>
            <p className="mt-2 text-center text-[11px] text-slate-400">Free cancellation up to 2h before · Aftercare plan included</p>
            <a href="/app/premium" className="mt-2 block rounded-xl bg-amber-50 px-3 py-2 text-center text-[11px] font-extrabold text-amber-800 ring-1 ring-amber-200">👑 Plus members save 20% on this visit — upgrade for $9/mo</a>
          </div>
        </div>
      )}

      {/* join modal */}
      {joinOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 p-4" onClick={() => setJoinOpen(false)}>
          <div className="w-full max-w-md rounded-[1.8rem] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {!joinDone ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="flex items-center gap-1.5 font-extrabold"><Stethoscope className="h-4 w-4 text-emerald-700" /> Join VetIQ as a vet</h3>
                    <p className="text-xs text-slate-500">Your virtual practice in 5 minutes · keep 80% · AI intake notes</p>
                  </div>
                  <button onClick={() => setJoinOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-100"><X className="h-4 w-4" /></button>
                </div>
                <div className="mt-4 space-y-2.5 text-sm font-bold">
                  <label>Full name + title<input value={joinForm.name} onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })} placeholder="Dr. Jane Doe, DVM" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
                  <div className="grid grid-cols-2 gap-2">
                    <label>Specialties<input value={joinForm.specialties} onChange={(e) => setJoinForm({ ...joinForm, specialties: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
                    <label>Species<input value={joinForm.species} onChange={(e) => setJoinForm({ ...joinForm, species: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <label>Price/visit ($)<input type="number" value={Math.round(joinForm.priceCents / 100)} onChange={(e) => setJoinForm({ ...joinForm, priceCents: Number(e.target.value) * 100 })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
                    <label>Years exp<input type="number" value={joinForm.yearsExp} onChange={(e) => setJoinForm({ ...joinForm, yearsExp: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
                  </div>
                  <label>Languages<input value={joinForm.languages} onChange={(e) => setJoinForm({ ...joinForm, languages: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
                  <label>Bio<textarea value={joinForm.bio} onChange={(e) => setJoinForm({ ...joinForm, bio: e.target.value })} rows={2} placeholder="Your superpower + who you love treating…" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
                </div>
                <button onClick={joinAsVet} disabled={saving || !joinForm.name.trim()} className="mt-4 w-full rounded-2xl bg-[#0E3D37] py-3 text-sm font-extrabold text-white hover:bg-[#125048] disabled:opacity-40">
                  {saving ? "Publishing…" : "Publish my vet profile →"}
                </button>
              </>
            ) : (
              <div className="py-6 text-center">
                <p className="text-4xl">🎉</p>
                <h3 className="mt-2 font-extrabold">Welcome aboard, Doctor!</h3>
                <p className="mt-1 text-sm text-slate-500">Your profile is live below. Verification team will review your license within 24h.</p>
                <button onClick={() => setJoinOpen(false)} className="mt-4 rounded-2xl bg-[#0E3D37] px-6 py-2.5 text-sm font-bold text-white">See my profile</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function VetsPage() {
  return (
    <Suspense fallback={<div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-400">Loading vets…</div>}>
      <VetsInner />
    </Suspense>
  );
}
