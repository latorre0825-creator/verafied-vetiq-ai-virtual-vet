"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BrainCircuit, ArrowRight, ArrowLeft, Siren, CheckCircle2, AlertTriangle,
  Info, Video, RotateCcw, PawPrint, Loader2,
} from "lucide-react";
import { SYMPTOM_CATALOG, DURATION_OPTIONS, SPECIES_OPTIONS, type TriageResult } from "@/lib/vet-ai";
import { petEmoji } from "@/lib/format";

interface Pet { id: number; name: string; species: string; breed: string; ageYears: number; weightKg: number; }

const STEPS = ["Pet", "Symptoms", "Details", "Result"];

export default function AiCheckPage() {
  const [step, setStep] = useState(0);
  const [pets, setPets] = useState<Pet[]>([]);
  const [petId, setPetId] = useState<number | null>(null);
  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("dog");
  const [ageYears, setAgeYears] = useState(2);
  const [weightKg, setWeightKg] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState(DURATION_OPTIONS[1]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/pets").then((r) => r.json()).then((d) => {
      if (d.pets?.length) {
        setPets(d.pets);
        const first = d.pets[0];
        setPetId(first.id);
        setPetName(first.name);
        setSpecies(first.species);
        setAgeYears(first.ageYears);
        setWeightKg(first.weightKg);
      }
    }).catch(() => {});
  }, []);

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function pickPet(p: Pet | null) {
    if (!p) {
      setPetId(null);
      return;
    }
    setPetId(p.id);
    setPetName(p.name);
    setSpecies(p.species);
    setAgeYears(p.ageYears);
    setWeightKg(p.weightKg);
  }

  async function submit() {
    if (!selected.length && !notes.trim()) {
      setError("Select at least one symptom or describe what's happening.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId, petName, species, ageYears, weightKg, symptomIds: selected, duration, extraNotes: notes }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const levelStyle: Record<string, { bg: string; ring: string; icon: typeof Siren; label: string }> = {
    emergency: { bg: "bg-red-500", ring: "ring-red-200", icon: Siren, label: "EMERGENCY" },
    urgent: { bg: "bg-amber-500", ring: "ring-amber-200", icon: AlertTriangle, label: "URGENT" },
    routine: { bg: "bg-sky-500", ring: "ring-sky-200", icon: Info, label: "ROUTINE" },
    info: { bg: "bg-emerald-500", ring: "ring-emerald-200", icon: CheckCircle2, label: "MONITOR AT HOME" },
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0E3D37] text-white"><BrainCircuit className="h-5 w-5" /></span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">AI Symptom Check — free, 60 seconds</h1>
          <p className="text-sm text-slate-500">Instant urgency score + first-aid + vet-ready report. All species.</p>
        </div>
      </div>

      {/* stepper */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-extrabold ${i <= step ? "bg-[#0E3D37] text-white" : "bg-white text-slate-400 ring-1 ring-orange-100"}`}>
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i <= step ? "bg-white/20" : "bg-slate-100"}`}>{i + 1}</span>
              {s}
            </div>
            {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-emerald-500" : "bg-orange-100"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="rounded-3xl border border-orange-100 bg-white p-5 sm:p-6">
          <h2 className="font-extrabold">Who needs help? 🐾</h2>
          {pets.length > 0 && (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {pets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => pickPet(p)}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${petId === p.id ? "border-emerald-600 bg-emerald-50" : "border-slate-100 hover:border-emerald-200"}`}
                >
                  <span className="text-2xl">{petEmoji(p.species)}</span>
                  <span>
                    <span className="block text-sm font-extrabold">{p.name}</span>
                    <span className="block text-xs capitalize text-slate-500">{p.species} · {p.breed} · {p.ageYears}y · {p.weightKg}kg</span>
                  </span>
                  {petId === p.id && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-600" />}
                </button>
              ))}
              <button
                onClick={() => { setPetId(null); setPetName(""); }}
                className={`rounded-2xl border-2 border-dashed p-3 text-sm font-bold ${petId === null ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 text-slate-500"}`}
              >
                + Different / new pet
              </button>
            </div>
          )}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-bold">Pet name
              <input value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="e.g. Biscuit" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium outline-none focus:border-emerald-500" />
            </label>
            <label className="text-sm font-bold">Species
              <div className="mt-1 flex flex-wrap gap-1.5">
                {SPECIES_OPTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => setSpecies(s)} className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${species === s ? "bg-[#0E3D37] text-white" : "bg-slate-100 text-slate-600 hover:bg-emerald-100"}`}>
                    {petEmoji(s)} {s}
                  </button>
                ))}
              </div>
            </label>
            <label className="text-sm font-bold">Age (years)
              <input type="number" min={0} max={30} step={0.5} value={ageYears} onChange={(e) => setAgeYears(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
            </label>
            <label className="text-sm font-bold">Weight (kg)
              <input type="number" min={0.2} max={150} step={0.5} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500" />
            </label>
          </div>
          <button onClick={() => setStep(1)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0E3D37] py-3 text-sm font-extrabold text-white hover:bg-[#125048]">
            Continue to symptoms <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="rounded-3xl border border-orange-100 bg-white p-5 sm:p-6">
          <h2 className="font-extrabold">What&apos;s happening with {petName || `your ${species}`}? <span className="font-medium text-slate-400">(tap all that apply)</span></h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {SYMPTOM_CATALOG.map((s) => {
              const on = selected.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`flex items-start gap-2.5 rounded-2xl border-2 p-3 text-left text-sm transition ${on ? "border-emerald-600 bg-emerald-50" : "border-slate-100 hover:border-emerald-200"}`}
                >
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${on ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-200 text-transparent"}`}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="font-bold">{s.label}</span>
                    {s.emergency && <span className="ml-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-extrabold text-red-600">RED FLAG</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex gap-2">
            <button onClick={() => setStep(0)} className="flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600"><ArrowLeft className="h-4 w-4" /> Back</button>
            <button onClick={() => setStep(2)} disabled={!selected.length} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0E3D37] py-3 text-sm font-extrabold text-white hover:bg-[#125048] disabled:opacity-40">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-3xl border border-orange-100 bg-white p-5 sm:p-6">
          <h2 className="font-extrabold">A few more details = sharper triage 🔍</h2>
          <p className="mt-3 text-sm font-bold">How long has this been going on?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((d) => (
              <button key={d} onClick={() => setDuration(d)} className={`rounded-full px-3.5 py-2 text-xs font-bold ${duration === d ? "bg-[#0E3D37] text-white" : "bg-slate-100 text-slate-600 hover:bg-emerald-100"}`}>{d}</button>
            ))}
          </div>
          <label className="mt-4 block text-sm font-bold">
            Describe in your own words <span className="font-medium text-slate-400">(foods eaten, vomit count, breathing, gums color, accidents…)</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="e.g. Vomited 3× since morning, won't eat, gums look pale, got into trash yesterday…" className="mt-2 w-full rounded-2xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500" />
          </label>
          {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">{error}</p>}
          <div className="mt-5 flex gap-2">
            <button onClick={() => setStep(1)} className="flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600"><ArrowLeft className="h-4 w-4" /> Back</button>
            <button onClick={submit} disabled={loading} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F96A4B] py-3 text-sm font-extrabold text-white hover:bg-[#e85a3b] disabled:opacity-60">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing…</> : <><BrainCircuit className="h-4 w-4" /> Get AI triage now</>}
            </button>
          </div>
        </div>
      )}

      {step === 3 && result && (
        <div className="space-y-4">
          {(() => {
            const st = levelStyle[result.level];
            return (
              <div className={`rounded-3xl bg-white p-5 ring-4 sm:p-6 ${st.ring}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold text-white ${st.bg}`}>
                    <st.icon className="h-4 w-4" /> {st.label} · SCORE {result.score}/100
                  </span>
                  <div className="h-2.5 min-w-[140px] flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${st.bg}`} style={{ width: `${result.score}%` }} />
                  </div>
                </div>
                <h2 className="mt-3 text-xl font-extrabold tracking-tight">{result.headline}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{result.summary}</p>
                <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                  👉 {result.seeVetWhen}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.level === "emergency" ? (
                    <Link href="/app/vets" className="animate-pulse-ring rounded-2xl bg-red-500 px-5 py-2.5 text-sm font-extrabold text-white">🚨 Find ER / video vet now</Link>
                  ) : (
                    <Link href="/app/vets" className="flex items-center gap-1.5 rounded-2xl bg-[#0E3D37] px-5 py-2.5 text-sm font-extrabold text-white"><Video className="h-4 w-4" /> Book a real vet — report attached</Link>
                  )}
                  <button onClick={() => { setResult(null); setSelected([]); setNotes(""); setStep(0); }} className="flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600"><RotateCcw className="h-4 w-4" /> New check</button>
                </div>
              </div>
            );
          })()}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-orange-100 bg-white p-5">
              <h3 className="font-extrabold">🔎 Possible causes <span className="text-xs font-medium text-slate-400">(not a diagnosis)</span></h3>
              <div className="mt-3 space-y-2.5">
                {result.possibleCauses.map((c, i) => (
                  <div key={i} className="rounded-2xl bg-[#FFF9F0] p-3 ring-1 ring-orange-100">
                    <p className="text-sm font-extrabold">{c.name} <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] ${c.likelihood === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>{c.likelihood}</span></p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-[#0E3D37] p-5 text-white">
                <h3 className="font-extrabold">✅ Do this right now</h3>
                <ul className="mt-2.5 space-y-2">
                  {result.immediateActions.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-emerald-50"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[11px] font-extrabold">{i + 1}</span>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-orange-100 bg-white p-5">
                <h3 className="font-extrabold">🏠 Home care (next 48h)</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                  {result.homeCare.map((h, i) => <li key={i} className="flex gap-2"><span>•</span>{h}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-red-200 bg-red-50 p-5">
              <h3 className="flex items-center gap-1.5 font-extrabold text-red-700"><Siren className="h-4 w-4" /> Rush to ER if you see:</h3>
              <ul className="mt-2 space-y-1 text-[13px] font-medium text-red-900/90">
                {result.redFlags.map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-orange-100 bg-white p-5">
              <h3 className="font-extrabold">❓ Tell the vet this next:</h3>
              <ul className="mt-2 space-y-1.5 text-[13px] text-slate-600">
                {result.followUpQuestions.map((q, i) => <li key={i} className="rounded-xl bg-slate-50 px-3 py-2">{q}</li>)}
              </ul>
              <Link href="/app/ai-chat" className="mt-3 block rounded-2xl bg-emerald-600 py-2.5 text-center text-sm font-extrabold text-white hover:bg-emerald-700">Continue in Dr. Paw chat →</Link>
            </div>
          </div>

          <p className="flex items-start gap-2 rounded-2xl bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
            <PawPrint className="mt-0.5 h-4 w-4 shrink-0" />
            VetIQ AI gives first-response guidance, not a diagnosis or prescription. It can miss things — when in doubt, a licensed vet exam (video or in-person) is always the safer call. This report was saved to your pet&apos;s timeline.
          </p>
        </div>
      )}
    </div>
  );
}
