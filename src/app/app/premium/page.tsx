"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Crown, Check, Loader2, X, ShieldCheck, Zap, Gift, CreditCard } from "lucide-react";

const PLANS = [
  {
    id: "plus",
    name: "VetIQ Plus",
    price: 9,
    tagline: "For every loving pet parent",
    perks: [
      "Unlimited pets + full health passports",
      "Vaccine, deworm & flea reminders",
      "20% OFF every vet video visit",
      "Priority vet matching (skip the queue)",
      "Weight & symptom trend tracking",
      "Family sharing (up to 4 people)",
    ],
    hot: true,
  },
  {
    id: "pro",
    name: "VetIQ Pro",
    price: 19,
    tagline: "Breeders, rescues & multi-pet homes",
    perks: [
      "Everything in Plus",
      "UNLIMITED free chat visits with vets",
      "35% OFF video visits",
      "2 free video visits every month",
      "Dedicated care coordinator",
      "Rescue/shelter bulk pet import",
    ],
    hot: false,
  },
];

interface Sub { id: number; email: string; plan: string; createdAt: string; }

export default function PremiumPage() {
  const [checkout, setCheckout] = useState<(typeof PLANS)[0] | null>(null);
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [subs, setSubs] = useState<Sub[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/subscribe").then((r) => r.json()).then((d) => setSubs(d.subscriptions || [])).catch(() => {});
  }, [success]);

  // Show welcome banner after Stripe redirect
  useEffect(() => {
    if (searchParams.get("success") === "1") {
      const plan = searchParams.get("plan") || "Premium";
      setSuccess(plan);
      // Clean the URL so refresh doesn't re-trigger
      window.history.replaceState({}, "", "/app/premium");
    }
  }, [searchParams]);

  async function pay() {
    if (!email.includes("@")) return alert("Enter a valid email");
    setSaving(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: checkout?.id,
          email,
          successUrl: window.location.origin + "/app/premium?success=1",
          cancelUrl: window.location.origin + "/app/premium",
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Payment failed");
    } finally {
      setSaving(false);
    }
  }

  const isMember = subs.length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-800 ring-1 ring-amber-200">
          <Crown className="h-3.5 w-3.5" /> VetIQ Premium
        </span>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Save money on every visit. <span className="text-emerald-700">Never miss a vaccine.</span>
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Members save an average of <b>$127/year</b> on vet visits — and their pets get seen first.
        </p>
      </div>

      {success && (
        <div className="rounded-3xl bg-[#0B2F2B] p-6 text-center text-white">
          <p className="text-4xl">🎉</p>
          <h2 className="mt-2 text-xl font-extrabold">Welcome to {success}!</h2>
          <p className="mt-1 text-sm text-emerald-200">Your discounts are active right now. Member #{1000 + subs.length}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/app/vets" className="rounded-2xl bg-[#F96A4B] px-5 py-2.5 text-sm font-extrabold">Book with 20% off →</Link>
            <Link href="/app/refer" className="rounded-2xl border border-white/25 px-5 py-2.5 text-sm font-bold">Gift a friend $5 →</Link>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {PLANS.map((p) => (
          <div key={p.id} className={`relative rounded-[2rem] p-6 ${p.hot ? "bg-[#0B2F2B] text-white shadow-2xl ring-4 ring-amber-300" : "border border-orange-100 bg-white"}`}>
            {p.hot && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-amber-950">
                🔥 Most popular · launch price
              </span>
            )}
            <p className={`text-sm font-extrabold uppercase tracking-widest ${p.hot ? "text-amber-300" : "text-emerald-700"}`}>{p.name}</p>
            <p className={`text-xs ${p.hot ? "text-emerald-200" : "text-slate-400"}`}>{p.tagline}</p>
            <p className="mt-3 text-5xl font-extrabold">${p.price}<span className="text-lg font-bold opacity-60">/mo</span></p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {p.perks.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.hot ? "text-emerald-300" : "text-emerald-600"}`} /> {x}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setCheckout(p)}
              className={`mt-5 w-full rounded-2xl py-3 text-sm font-extrabold transition ${p.hot ? "bg-[#F96A4B] text-white hover:bg-[#e85a3b]" : "bg-[#0E3D37] text-white hover:bg-[#125048]"}`}
            >
              Start {p.name} — 7 days free
            </button>
            <p className={`mt-2 text-center text-[11px] ${p.hot ? "text-emerald-200/70" : "text-slate-400"}`}>Cancel anytime · No hidden fees</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: Zap, t: "Instant savings", d: "Discount auto-applies at every booking" },
          { icon: ShieldCheck, t: "7-day free trial", d: "Full refund within 30 days, no questions" },
          { icon: Gift, t: "Refer & earn", d: "$5 credit for every friend who joins" },
        ].map((b) => (
          <div key={b.t} className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-white p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><b.icon className="h-4 w-4" /></span>
            <span><span className="block text-sm font-extrabold">{b.t}</span><span className="block text-xs text-slate-500">{b.d}</span></span>
          </div>
        ))}
      </div>

      {isMember && (
        <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-200">
          💚 {subs.length} active member{subs.length > 1 ? "s" : ""} on this clinic — latest: {subs[0]?.email} ({subs[0]?.plan})
        </div>
      )}

      {/* checkout modal */}
      {checkout && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setCheckout(null)}>
          <div className="w-full max-w-sm rounded-[1.8rem] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 font-extrabold"><CreditCard className="h-4 w-4 text-emerald-700" /> Checkout — {checkout.name}</h3>
              <button onClick={() => setCheckout(null)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-3 rounded-2xl bg-[#FFF9F0] p-3 text-sm ring-1 ring-orange-100">
              <p className="font-extrabold">{checkout.name} · ${checkout.price}/mo</p>
              <p className="text-xs text-slate-500">7 days free, then billed monthly. Cancel anytime.</p>
            </div>
            <div className="mt-3 space-y-2.5 text-sm font-bold">
              <label>Email*<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
              <label>Card number (demo)<input value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-medium outline-none focus:border-emerald-500" /></label>
            </div>
            <button onClick={pay} disabled={saving} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F96A4B] py-3 text-sm font-extrabold text-white disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crown className="h-4 w-4" />} Start free trial
            </button>
            <p className="mt-2 text-center text-[11px] text-slate-400">🔒 Secure checkout via Stripe. You’ll be redirected to complete payment.</p>
          </div>
        </div>
      )}
    </div>
  );
}
