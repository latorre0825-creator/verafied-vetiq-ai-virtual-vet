"use client";

import { useEffect, useState } from "react";
import { FileHeart, Plus, Trash2, X, Syringe, Pill, Stethoscope, Scissors, Weight, Tag } from "lucide-react";

interface Rec { id: number; petName: string; kind: string; title: string; recordDate: string; vetClinic: string; notes: string; }
interface Pet { id: number; name: string; }

const KINDS = [
  { id: "vaccination", label: "💉 Vaccination", icon: Syringe },
  { id: "checkup", label: "🩺 Checkup", icon: Stethoscope },
  { id: "medication", label: "💊 Medication", icon: Pill },
  { id: "surgery", label: "✂️ Surgery", icon: Scissors },
  { id: "weight", label: "⚖️ Weight", icon: Weight },
  { id: "other", label: "🏷️ Other", icon: Tag },
];

const VAX_SCHEDULE = [
  { pet: "Puppies (dogs)", items: ["6–8 wks: DHPP #1 + deworm", "10–12 wks: DHPP #2 + Lepto #1", "14–16 wks: DHPP #3 + Rabies", "12 mo: boosters, then 1–3 yearly"] },
  { pet: "Kittens (cats)", items: ["6–8 wks: FVRCP #1 + deworm", "10–12 wks: FVRCP #2 + FeLV #1", "14–16 wks: FVRCP #3 + Rabies", "12 mo: boosters, then 1–3 yearly"] },
  { pet: "Rabbits", items: ["5–7 wks: RHDV2 (where available)", "Annual RHDV + myxo per region", "Parasite check every 6 mo"] },
];

export default function RecordsPage() {
  const [recs, setRecs] = useState<Rec[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ petName: "", kind: "vaccination", title: "", recordDate: new Date().toISOString().slice(0, 10), vetClinic: "", notes: "" });

  async function load() {
    const [r, p] = await Promise.all([
      fetch("/api/records").then((x) => x.json()).catch(() => ({ records: [] })),
      fetch("/api/pets").then((x) => x.json()).catch(() => ({ pets: [] })),
    ]);
    setRecs(r.records || []);
    setPets(p.pets || []);
    if (p.pets?.length && !form.petName) setForm((f) => ({ ...f, petName: p.pets[0].name }));
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!form.title || !form.recordDate) return alert("Title + date required");
    await fetch("/api/records", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setOpen(false);
    setForm({ petName: pets[0]?.name || "", kind: "vaccination", title: "", recordDate: new Date().toISOString().slice(0, 10), vetClinic: "", notes: "" });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete record?")) return;
    await fetch(`/api/records/${id}`, { method: "DELETE" });
    load();
  }

  const shown = filter === "all" ? recs : recs.filter((r) => r.kind === filter || r.petName === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0E3D37] text-white"><FileHeart className="h-5 w-5" /></span>
          Health records & vaccines
        </h1>
        <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 rounded-2xl bg-[#0E3D37] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#125048]">
          <Plus className="h-4 w-4" /> Add record
        </button>
      </div>

      {/* vaccine schedule */}
      <div className="grid gap-3 md:grid-cols-3">
        {VAX_SCHEDULE.map((s) => (
          <div key={s.pet} className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-extrabold">📅 {s.pet}</p>
            <ul className="mt-2 space-y-1 text-xs leading-relaxed text-amber-900/90">
              {s.items.map((i) => <li key={i}>• {i}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* filters */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        <button onClick={() => setFilter("all")} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold ${filter === "all" ? "bg-[#0E3D37] text-white" : "bg-white text-slate-600 ring-1 ring-orange-100"}`}>All</button>
        {KINDS.map((k) => (
          <button key={k.id} onClick={() => setFilter(k.id)} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold ${filter === k.id ? "bg-[#0E3D37] text-white" : "bg-white text-slate-600 ring-1 ring-orange-100"}`}>{k.label}</button>
        ))}
        {pets.map((p) => (
          <button key={p.id} onClick={() => setFilter(p.name)} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold ${filter === p.name ? "bg-[#F96A4B] text-white" : "bg-white text-slate-600 ring-1 ring-orange-100"}`}>🐾 {p.name}</button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="rounded-[2rem] border border-orange-100 bg-white p-10 text-center">
          <p className="text-5xl">💉</p>
          <p className="mt-3 font-extrabold">No records yet</p>
          <p className="text-sm text-slate-500">Log vaccines, meds, surgeries & weights — never lose a vet card again.</p>
          <button onClick={() => setOpen(true)} className="mt-4 rounded-2xl bg-[#0E3D37] px-6 py-3 text-sm font-bold text-white">Add first record</button>
        </div>
      ) : (
        <div className="relative space-y-0">
          <div className="absolute bottom-4 left-[27px] top-4 w-0.5 bg-orange-100" />
          {shown.map((r) => {
            const k = KINDS.find((x) => x.id === r.kind) || KINDS[5];
            return (
              <div key={r.id} className="relative flex gap-3 pb-3">
                <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-orange-100 bg-white text-xl shadow-sm">{k.label.split(" ")[0]}</span>
                <div className="flex-1 rounded-2xl border border-orange-100 bg-white p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-extrabold">{r.title}</p>
                      <p className="text-xs text-slate-500">🐾 {r.petName || "—"} · 📅 {r.recordDate}{r.vetClinic ? ` · 🏥 ${r.vetClinic}` : ""} · <span className="font-bold capitalize text-emerald-700">{r.kind}</span></p>
                    </div>
                    <button onClick={() => remove(r.id)} className="grid h-7 w-7 place-items-center rounded-full bg-red-50 text-red-400 hover:bg-red-100"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                  {r.notes && <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{r.notes}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-[1.8rem] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">＋ New health record</h3>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 space-y-2.5 text-sm font-bold">
              <div className="grid grid-cols-2 gap-2">
                <label>Pet
                  <input value={form.petName} onChange={(e) => setForm({ ...form, petName: e.target.value })} list="pets" placeholder="Biscuit" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" />
                  <datalist id="pets">{pets.map((p) => <option key={p.id} value={p.name} />)}</datalist>
                </label>
                <label>Type
                  <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none">
                    {KINDS.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
                  </select>
                </label>
              </div>
              <label>Title*<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Rabies booster / NexGard / 500g weight…" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
              <div className="grid grid-cols-2 gap-2">
                <label>Date*<input type="date" value={form.recordDate} onChange={(e) => setForm({ ...form, recordDate: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none" /></label>
                <label>Clinic<input value={form.vetClinic} onChange={(e) => setForm({ ...form, vetClinic: e.target.value })} placeholder="VetIQ / City Vet" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
              </div>
              <label>Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} placeholder="Batch no., next due, reaction…" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
            </div>
            <button onClick={save} className="mt-4 w-full rounded-2xl bg-[#0E3D37] py-3 text-sm font-extrabold text-white">Save record ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}
