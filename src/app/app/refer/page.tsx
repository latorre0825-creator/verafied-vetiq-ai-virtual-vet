"use client";

import { useEffect, useMemo, useState } from "react";
import { Megaphone, Copy, Check, Gift, Users, TrendingUp, Share2, Mail, Loader2 } from "lucide-react";

interface Lead { id: number; email: string; source: string; referrerCode: string; createdAt: string; }

const CAPTIONS = [
  "🐾 My dog got sick at 2am and this app's AI told me EXACTLY what to do before the vet opened. Free AI pet triage + real vets on video → ",
  "☠️ Did you know ONE stick of sugar-free gum can kill a small dog? This free poison checker saved my sanity → ",
  "🩺 Skip the $200 'just in case' clinic trip. AI triage first (free), real vet on video from $25 if needed → ",
  "🐰 Rabbit people! It knows GI stasis is an emergency. Finally an app that treats ALL animals, not just dogs → ",
];

export default function ReferPage() {
  const [email, setEmail] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [leadsList, setLeadsList] = useState<Lead[]>([]);
  const [copied, setCopied] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [origin, setOrigin] = useState("https://vetiq.app");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch("/api/leads").then((r) => r.json()).then((d) => setLeadsList(d.leads || [])).catch(() => {});
  }, [sent]);

  const code = useMemo(() => {
    const base = email.split("@")[0] || "friend";
    return (base.replace(/[^a-z0-9]/gi, "").slice(0, 8) || "friend").toUpperCase() + "5";
  }, [email]);

  const link = `${origin}/?ref=${code}`;

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(""), 1500);
  }

  async function invite() {
    if (!friendEmail.includes("@")) return alert("Enter your friend's email");
    setSending(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: friendEmail, source: "referral", referrerCode: code }),
      });
      setSent(true);
      setFriendEmail("");
      setTimeout(() => setSent(false), 2500);
    } finally {
      setSending(false);
    }
  }

  const myReferrals = leadsList.filter((l) => l.referrerCode === code);
  const credit = myReferrals.length * 5;

  const shareTargets = [
    { name: "WhatsApp", emoji: "💬", url: `https://wa.me/?text=${encodeURIComponent(CAPTIONS[0] + link)}` },
    { name: "X / Twitter", emoji: "🐦", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(CAPTIONS[2] + link)}` },
    { name: "Facebook", emoji: "📘", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}` },
    { name: "Telegram", emoji: "✈️", url: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(CAPTIONS[1])}` },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F96A4B] text-white"><Megaphone className="h-5 w-5" /></span>
        Refer & Earn — give $5, get $5
      </h1>

      {/* stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Users, k: String(myReferrals.length), v: "friends joined", c: "text-emerald-700" },
          { icon: Gift, k: `$${credit}`, v: "your credit", c: "text-[#F96A4B]" },
          { icon: TrendingUp, k: String(leadsList.length), v: "total VetIQ signups", c: "text-sky-600" },
        ].map((s) => (
          <div key={s.v} className="rounded-3xl border border-orange-100 bg-white p-4 text-center">
            <s.icon className={`mx-auto h-5 w-5 ${s.c}`} />
            <p className="mt-1 text-2xl font-extrabold">{s.k}</p>
            <p className="text-xs font-semibold text-slate-400">{s.v}</p>
          </div>
        ))}
      </div>

      {/* link generator */}
      <div className="rounded-[2rem] bg-[#0B2F2B] p-6 text-white">
        <h2 className="font-extrabold">1️⃣ Your magic link</h2>
        <p className="mt-1 text-sm text-emerald-200">Enter your email → get your personal code. Friends get $5 off their first vet visit, you get $5 credit when they book.</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white placeholder:text-emerald-200/50 outline-none ring-1 ring-white/20 focus:ring-emerald-400" />
          <button onClick={() => copy(link, "link")} className="flex items-center justify-center gap-2 rounded-2xl bg-[#F96A4B] px-5 py-3 text-sm font-extrabold hover:bg-[#e85a3b]">
            {copied === "link" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied === "link" ? "Copied!" : "Copy link"}
          </button>
        </div>
        <p className="mt-2 rounded-xl bg-white/10 px-3 py-2 font-mono text-xs text-emerald-100">{link} <span className="ml-2 rounded bg-amber-400/20 px-1.5 py-0.5 font-sans font-extrabold text-amber-300">CODE: {code}</span></p>
        <div className="mt-4 flex flex-wrap gap-2">
          {shareTargets.map((t) => (
            <a key={t.name} href={t.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-bold ring-1 ring-white/15 hover:bg-white/20">
              {t.emoji} {t.name}
            </a>
          ))}
          <button onClick={() => copy(CAPTIONS[0] + link, "cap")} className="flex items-center gap-1.5 rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-bold ring-1 ring-white/15 hover:bg-white/20">
            <Share2 className="h-4 w-4" /> {copied === "cap" ? "Copied!" : "Copy caption"}
          </button>
        </div>
      </div>

      {/* direct invite */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5">
        <h2 className="flex items-center gap-1.5 font-extrabold"><Mail className="h-4 w-4 text-emerald-700" /> 2️⃣ Invite a friend directly</h2>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} placeholder="friend@email.com" className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
          <button onClick={invite} disabled={sending} className="flex items-center justify-center gap-2 rounded-2xl bg-[#0E3D37] px-6 py-3 text-sm font-extrabold text-white disabled:opacity-50">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : sent ? <Check className="h-4 w-4" /> : <Gift className="h-4 w-4" />}
            {sent ? "Invite sent! 🎉" : "Send $5 invite"}
          </button>
        </div>
      </div>

      {/* ready-made marketing captions */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5">
        <h2 className="font-extrabold">3️⃣ Ready-to-post captions (copy & blast 🚀)</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {CAPTIONS.map((c, i) => (
            <button key={i} onClick={() => copy(c + link, `c${i}`)} className="rounded-2xl bg-[#FFF9F0] p-3.5 text-left text-xs leading-relaxed text-slate-600 ring-1 ring-orange-100 transition hover:ring-emerald-300">
              {c}<span className="font-bold text-emerald-700">{link}</span>
              <span className="mt-2 flex items-center gap-1 text-[11px] font-extrabold text-[#F96A4B]">
                {copied === `c${i}` ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Tap to copy</>}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* recent signups */}
      {leadsList.length > 0 && (
        <div className="rounded-3xl border border-orange-100 bg-white p-5">
          <h2 className="font-extrabold">📈 Latest signups</h2>
          <div className="mt-2 space-y-1.5">
            {leadsList.slice(0, 6).map((l) => (
              <div key={l.id} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs">
                <span className="font-bold">{l.email.replace(/(.{2}).+(@.+)/, "$1•••$2")}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-extrabold uppercase text-emerald-700">{l.source}</span>
                {l.referrerCode && <span className="text-slate-400">via {l.referrerCode}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
