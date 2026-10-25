"use client";

import { useState } from "react";
import { Loader2, Check, Mail } from "lucide-react";

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  async function submit() {
    if (!email.includes("@")) return;
    setState("busy");
    try {
      const ref = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ref") || "" : "";
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: ref ? "referral" : "landing", referrerCode: ref }),
      });
      setState("done");
    } catch {
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className={`flex flex-wrap items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${dark ? "bg-emerald-500/20 text-emerald-200" : "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"}`}>
        <Check className="h-4 w-4" /> You&apos;re in! 🐾
        <a href="/guide" className={`rounded-full px-3 py-1 text-xs font-extrabold ${dark ? "bg-white text-emerald-900" : "bg-emerald-600 text-white"}`}>
          Open your free first-aid guide →
        </a>
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <label className={`flex flex-1 items-center gap-2 rounded-2xl px-4 py-3 ${dark ? "bg-white/10 ring-1 ring-white/20" : "bg-white ring-1 ring-emerald-900/15"}`}>
        <Mail className={`h-4 w-4 ${dark ? "text-emerald-300" : "text-slate-400"}`} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="your@email.com"
          className={`w-full bg-transparent text-sm font-medium outline-none ${dark ? "text-white placeholder:text-emerald-200/50" : "text-slate-900 placeholder:text-slate-400"}`}
        />
      </label>
      <button
        onClick={submit}
        disabled={state === "busy"}
        className="flex items-center justify-center gap-2 rounded-2xl bg-[#F96A4B] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#e85a3b] disabled:opacity-60"
      >
        {state === "busy" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Get free first-aid guide
      </button>
    </div>
  );
}
