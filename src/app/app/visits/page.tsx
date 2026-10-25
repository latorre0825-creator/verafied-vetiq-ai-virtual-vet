"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Video, MessageCircle, Phone, Trash2, CheckCircle2, ExternalLink } from "lucide-react";

interface Appt {
  id: number; petName: string; vetName: string; scheduledAt: string; reason: string;
  visitType: string; status: string; priceCents: number; meetingLink: string; createdAt: string;
}

export default function VisitsPage() {
  const [appts, setAppts] = useState<Appt[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const d = await fetch("/api/appointments").then((r) => r.json());
      setAppts(d.appointments || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: number, status: string) {
    await fetch(`/api/appointments/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }
  async function remove(id: number) {
    if (!confirm("Cancel this visit?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    load();
  }

  const upcoming = appts.filter((a) => a.status === "upcoming");
  const past = appts.filter((a) => a.status !== "upcoming");

  const icon = (t: string) => (t === "video" ? Video : t === "chat" ? MessageCircle : Phone);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0E3D37] text-white"><CalendarCheck className="h-5 w-5" /></span>
          My Visits
        </h1>
        <Link href="/app/vets" className="rounded-2xl bg-[#F96A4B] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#e85a3b]">+ Book a vet</Link>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-400">Loading visits…</div>
      ) : appts.length === 0 ? (
        <div className="rounded-[2rem] border border-orange-100 bg-white p-10 text-center">
          <p className="text-5xl">📅</p>
          <p className="mt-3 font-extrabold">No visits yet</p>
          <p className="text-sm text-slate-500">Book a video, chat or phone visit — your AI report attaches automatically.</p>
          <Link href="/app/vets" className="mt-4 inline-block rounded-2xl bg-[#0E3D37] px-6 py-3 text-sm font-bold text-white">Find a vet →</Link>
        </div>
      ) : (
        <>
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400">Upcoming ({upcoming.length})</h2>
          <div className="grid gap-3">
            {upcoming.map((a) => {
              const Icon = icon(a.visitType);
              return (
                <div key={a.id} className="rounded-3xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0E3D37] text-white"><Icon className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold">{a.vetName} <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-emerald-700">{a.visitType}</span></p>
                      <p className="text-sm text-slate-500">🐾 {a.petName} · 📅 {a.scheduledAt}</p>
                      <p className="mt-0.5 text-xs text-slate-400">“{a.reason}”</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800 ring-1 ring-emerald-200">CONFIRMED</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.meetingLink && (
                      <a href={a.meetingLink} target="_blank" className="flex items-center gap-1.5 rounded-xl bg-[#F96A4B] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#e85a3b]">
                        <ExternalLink className="h-3.5 w-3.5" /> Join {a.visitType} room
                      </a>
                    )}
                    <button onClick={() => setStatus(a.id, "completed")} className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"><CheckCircle2 className="h-3.5 w-3.5" /> Mark done</button>
                    <button onClick={() => remove(a.id)} className="flex items-center gap-1 rounded-xl border border-red-200 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Cancel</button>
                  </div>
                </div>
              );
            })}
            {upcoming.length === 0 && <p className="text-sm text-slate-400">Nothing upcoming — book your next checkup.</p>}
          </div>

          {past.length > 0 && (
            <>
              <h2 className="pt-2 text-sm font-extrabold uppercase tracking-widest text-slate-400">Past ({past.length})</h2>
              <div className="grid gap-2">
                {past.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm opacity-75 ring-1 ring-orange-100">
                    <span className="font-extrabold">{a.vetName}</span>
                    <span className="text-slate-500">{a.petName} · {a.scheduledAt}</span>
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${a.status === "completed" ? "bg-slate-100 text-slate-500" : "bg-red-50 text-red-500"}`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
