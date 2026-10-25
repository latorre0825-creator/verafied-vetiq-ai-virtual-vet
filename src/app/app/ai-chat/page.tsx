"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircleHeart, Send, Loader2, Video, PawPrint, Sparkles } from "lucide-react";
import { petEmoji } from "@/lib/format";

interface Msg { role: "user" | "assistant"; text: string; }

const QUICK = [
  "🐶 Dog vomiting 3× since morning",
  "☠️ Ate chocolate — what do I do?",
  "🐱 Cat sneezing + runny eyes",
  "🐰 Rabbit not eating, no poops",
  "👁️ Red squinty eye",
  "🦜 Bird fluffed + sleepy",
];

export default function AiChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hey! I'm Dr. Paw 🐾 — your AI first-response vet. Tell me your pet's species + what's happening (e.g. “dog limping since yesterday”). For emergencies (collapse, blue gums, can't breathe, ate poison) skip chat and go to ER / video vet NOW." },
  ]);
  const [input, setInput] = useState("");
  const [species, setSpecies] = useState("dog");
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const next = [...msgs, { role: "user" as const, text: content }];
    setMsgs(next);
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: next, species }),
      });
      const data = await res.json();
      setMsgs([...next, { role: "assistant", text: data.reply || "Hmm, let me think… can you add species + duration?" }]);
    } catch {
      setMsgs([...next, { role: "assistant", text: "Connection hiccup — try again, or run the full AI Symptom Check for a structured report." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-140px)] min-h-[540px] max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-xl">
      {/* header */}
      <div className="flex items-center gap-3 bg-[#0E3D37] p-4 text-white">
        <span className="relative grid h-11 w-11 place-items-center rounded-full bg-emerald-500 text-xl">🐾
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-300 ring-2 ring-[#0E3D37]" />
        </span>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-sm font-extrabold"><MessageCircleHeart className="h-4 w-4 text-emerald-300" /> Dr. Paw — AI Vet <span className="rounded-full bg-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-200">ONLINE 24/7</span></p>
          <p className="text-xs text-emerald-200">First-response triage · escalates to real vets when needed</p>
        </div>
        <div className="hidden gap-1 sm:flex">
          {["dog", "cat", "rabbit", "bird", "other"].map((s) => (
            <button key={s} onClick={() => setSpecies(s)} title={s} className={`rounded-full px-2 py-1 text-sm ${species === s ? "bg-white text-emerald-900" : "bg-white/10 hover:bg-white/20"}`}>
              {petEmoji(s)}
            </button>
          ))}
        </div>
        <Link href="/app/vets" className="hidden items-center gap-1 rounded-full bg-[#F96A4B] px-3 py-1.5 text-xs font-extrabold sm:flex"><Video className="h-3.5 w-3.5" /> Real vet</Link>
      </div>

      {/* quick prompts */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-orange-100 bg-[#FFF9F0] px-4 py-2.5">
        {QUICK.map((q) => (
          <button key={q} onClick={() => send(q)} className="shrink-0 rounded-full border border-emerald-900/15 bg-white px-3 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-50">
            {q}
          </button>
        ))}
      </div>

      {/* messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-[#FFF9F0] p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${m.role === "user" ? "rounded-br-lg bg-[#0E3D37] text-white" : "rounded-bl-lg border border-orange-100 bg-white text-slate-700"}`}>
              {m.role === "assistant" && <p className="mb-1 flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-600"><Sparkles className="h-3 w-3" /> Dr. Paw</p>}
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-3xl rounded-bl-lg border border-orange-100 bg-white px-4 py-3 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" /> Dr. Paw is thinking…
            </div>
          </div>
        )}
        <div ref={bottom} />
      </div>

      {/* input */}
      <div className="border-t border-orange-100 bg-white p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={`Describe ${species === "other" ? "your pet's" : `your ${species}'s`} symptom… (e.g. vomiting, itching, not eating)`}
            className="flex-1 rounded-2xl border border-slate-200 bg-[#FFF9F0] px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />
          <button onClick={() => send()} disabled={loading || !input.trim()} className="grid h-[46px] w-[52px] place-items-center rounded-2xl bg-[#F96A4B] text-white hover:bg-[#e85a3b] disabled:opacity-40">
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
          <PawPrint className="h-3 w-3" /> AI first-aid info only — not a diagnosis. Red flags? Skip chat: <Link href="/app/ai-check" className="font-bold text-emerald-700">run triage</Link> or <Link href="/app/vets" className="font-bold text-emerald-700">video a vet</Link>.
        </p>
      </div>
    </div>
  );
}
