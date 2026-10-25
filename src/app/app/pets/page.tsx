"use client";

import { useEffect, useState } from "react";
import { PawPrint, Plus, Trash2, Pencil, X, Loader2 } from "lucide-react";
import { petEmoji } from "@/lib/format";

interface Pet {
  id: number; name: string; species: string; breed: string; ageYears: number;
  weightKg: number; gender: string; color: string; imageUrl: string;
  ownerName: string; notes: string; neutered: boolean;
}

const EMPTY = { name: "", species: "dog", breed: "", ageYears: 2, weightKg: 8, gender: "Male", color: "", imageUrl: "", ownerName: "", notes: "", neutered: false };

const STOCK: Record<string, string> = {
  dog: "https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  cat: "https://images.pexels.com/photos/36407054/pexels-photo-36407054.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  rabbit: "https://images.pexels.com/photos/7329892/pexels-photo-7329892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pet | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const d = await fetch("/api/pets").then((r) => r.json());
      setPets(d.pets || []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function startNew() {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  }
  function startEdit(p: Pet) {
    setEditing(p);
    setForm({ name: p.name, species: p.species, breed: p.breed, ageYears: p.ageYears, weightKg: p.weightKg, gender: p.gender, color: p.color || "", imageUrl: p.imageUrl || "", ownerName: p.ownerName || "", notes: p.notes || "", neutered: p.neutered });
    setOpen(true);
  }

  async function save() {
    if (!form.name.trim()) return alert("Give your pet a name 🐾");
    setSaving(true);
    try {
      const payload = { ...form, breed: form.breed || "Mixed", imageUrl: form.imageUrl || STOCK[form.species] || "" };
      if (editing) {
        await fetch(`/api/pets/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        await fetch("/api/pets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
      setOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Remove this pet profile?")) return;
    await fetch(`/api/pets/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0E3D37] text-white"><PawPrint className="h-5 w-5" /></span>
          My Pets — passports
        </h1>
        <button onClick={startNew} className="flex items-center gap-1.5 rounded-2xl bg-[#F96A4B] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#e85a3b]">
          <Plus className="h-4 w-4" /> Add pet
        </button>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center text-sm text-slate-400">Loading pets…</div>
      ) : pets.length === 0 ? (
        <div className="rounded-[2rem] border border-orange-100 bg-white p-10 text-center">
          <p className="text-5xl">🐾</p>
          <p className="mt-3 font-extrabold">No pets yet — add your first buddy</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">Profiles power smarter AI triage (weight-based dosing), vaccine reminders & vet handoffs.</p>
          <button onClick={startNew} className="mt-4 rounded-2xl bg-[#0E3D37] px-6 py-3 text-sm font-bold text-white">Create profile — 30 sec</button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pets.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
              <div className="relative h-40 bg-emerald-50">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-6xl">{petEmoji(p.species)}</div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide backdrop-blur">{petEmoji(p.species)} {p.species}</span>
                <div className="absolute right-3 top-3 flex gap-1.5">
                  <button onClick={() => startEdit(p)} className="grid h-8 w-8 place-items-center rounded-full bg-white/90 backdrop-blur hover:bg-white"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => remove(p.id)} className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-red-500 backdrop-blur hover:bg-white"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-extrabold">{p.name}</h3>
                  <p className="text-xs font-semibold text-slate-400">{p.breed}</p>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1.5 text-center">
                  {[["Age", `${p.ageYears}y`], ["Weight", `${p.weightKg}kg`], ["Sex", p.gender], [p.neutered ? "Fixed" : "Intact", p.neutered ? "✓" : "—"]].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-[#FFF9F0] py-1.5 ring-1 ring-orange-100">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{k}</p>
                      <p className="text-xs font-extrabold">{v}</p>
                    </div>
                  ))}
                </div>
                {p.notes && <p className="mt-2.5 rounded-xl bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">📝 {p.notes}</p>}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a href="/app/ai-check" className="rounded-xl bg-[#0E3D37] py-2 text-center text-xs font-extrabold text-white">AI check {p.name}</a>
                  <a href="/app/records" className="rounded-xl border border-slate-200 py-2 text-center text-xs font-extrabold text-slate-600">Health records</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-[1.8rem] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">{editing ? `Edit ${editing.name}` : "＋ New pet profile"}</h3>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <label className="text-xs font-bold">Name*<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Biscuit" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium outline-none focus:border-emerald-500" /></label>
              <label className="text-xs font-bold">Species
                <select value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none">
                  {["dog", "cat", "rabbit", "bird", "reptile", "other"].map((s) => <option key={s} value={s}>{petEmoji(s)} {s}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold">Breed<input value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} placeholder="Golden Retriever" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="text-xs font-bold">Owner<input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} placeholder="Your name" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="text-xs font-bold">Age (years)<input type="number" step={0.5} value={form.ageYears} onChange={(e) => setForm({ ...form, ageYears: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="text-xs font-bold">Weight (kg)<input type="number" step={0.5} value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="text-xs font-bold">Sex
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none">
                  {["Male", "Female", "Unknown"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold">Color<input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="Golden" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="text-xs font-bold sm:col-span-2">Photo URL (optional)<input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://…" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="text-xs font-bold sm:col-span-2">Notes (allergies, meds, quirks)<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} placeholder="Allergic to chicken, scared of thunder…" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none" /></label>
              <label className="flex items-center gap-2 text-xs font-bold sm:col-span-2">
                <input type="checkbox" checked={form.neutered} onChange={(e) => setForm({ ...form, neutered: e.target.checked })} className="h-4 w-4 accent-emerald-600" /> Spayed / neutered
              </label>
            </div>
            <button onClick={save} disabled={saving} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0E3D37] py-3 text-sm font-extrabold text-white disabled:opacity-50">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} {editing ? "Save changes" : "Create pet passport 🐾"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
