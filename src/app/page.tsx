import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import InstallAppButton from "@/components/InstallAppButton";
import {
  Stethoscope,
  Video,
  Siren,
  ShieldCheck,
  BrainCircuit,
  CalendarCheck,
  Pill,
  MapPin,
  Star,
  ArrowRight,
  Check,
  PawPrint,
  MessageCircleHeart,
  FileHeart,
  Syringe,
  Clock3,
  Sparkles,
  HeartPulse,
} from "lucide-react";

const HERO_IMG =
  "https://images.pexels.com/photos/7469220/pexels-photo-7469220.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const CLINIC_IMG =
  "https://images.pexels.com/photos/6235648/pexels-photo-6235648.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const PETS_IMG =
  "https://images.pexels.com/photos/7329892/pexels-photo-7329892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F0] text-slate-900">
      {/* Top banner */}
      <div className="bg-[#0B2F2B] px-4 py-2 text-center text-[13px] font-semibold text-emerald-100">
        🚨 New: 24/7 AI Triage + licensed vets on video in under 15 min — dogs, cats, rabbits, birds & exotics
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-[#FFF9F0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0E3D37] text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold tracking-tight">VetIQ</span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
                AI + Real Vets
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#ai" className="hover:text-emerald-800">AI Doctor</a>
            <a href="#vets" className="hover:text-emerald-800">Real Vets</a>
            <a href="#safety" className="hover:text-emerald-800">Poison Checker</a>
            <a href="#features" className="hover:text-emerald-800">All-in-one</a>
            <a href="#pricing" className="hover:text-emerald-800">Pricing</a>
            <a href="#story" className="hover:text-emerald-800">Our Story</a>
            <Link href="/guide" className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-100">🎁 Free guide</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/app/ai-check"
              className="hidden rounded-full border border-emerald-900/20 px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50 sm:block"
            >
              Try AI triage free
            </Link>
            <Link
              href="/app"
              className="rounded-full bg-[#F96A4B] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#e85a3b]"
            >
              Open the clinic
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-2 lg:pt-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-3 py-1.5 text-xs font-bold text-emerald-900 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              THE FIRST ALL-IN-ONE ONLINE ANIMAL HOSPITAL
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] text-white">LIVE</span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              An <span className="text-emerald-700">AI pet doctor</span> for the first minutes.{" "}
              <span className="text-[#F96A4B]">Real vets</span> for everything after.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-600">
              Nobody should panic-Google at 2am while their dog vomits. VetIQ gives you instant AI triage +
              first-aid, a poison & food checker, and one-tap video visits with licensed vets — for dogs, cats,
              rabbits, birds, reptiles & more.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/app/ai-check"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#0E3D37] px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-900/20 transition hover:bg-[#125048]"
              >
                <BrainCircuit className="h-5 w-5 text-emerald-300" />
                Check symptoms with AI — free
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/app/vets"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#0E3D37]/10 bg-white px-6 py-3.5 font-bold text-[#0E3D37] transition hover:border-emerald-700"
              >
                <Video className="h-5 w-5" />
                See a real vet from $25
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                4.9 · 12,400+ visits
              </span>
              <span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-emerald-700" /> Avg. vet online in 8 min</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-700" /> Licensed DVMs only</span>
            </div>
            <div className="mt-6">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-slate-400">🎁 Free: printable pet first-aid guide (all species)</p>
              <NewsletterForm />
              <div className="mt-3 flex items-center gap-2">
                <InstallAppButton compact />
                <span className="text-xs font-semibold text-slate-400">📲 Works like a real app — Android & iPhone, 5 seconds, no app store</span>
              </div>
            </div>
            {/* mini triage demo card */}
            <div className="mt-7 grid gap-3 rounded-3xl border border-emerald-900/10 bg-white p-4 shadow-xl shadow-emerald-900/5 sm:grid-cols-3">
              {[
                { icon: Siren, t: "Emergency radar", d: "Bloat, blockage, poison flagged in seconds" },
                { icon: MessageCircleHeart, t: "Dr. Paw AI chat", d: "Talk it through, 24/7, any species" },
                { icon: Video, t: "Handoff to real vet", d: "AI report sent to your video visit" },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl bg-[#FFF9F0] p-3">
                  <c.icon className="h-5 w-5 text-[#F96A4B]" />
                  <p className="mt-2 text-sm font-extrabold">{c.t}</p>
                  <p className="text-xs leading-relaxed text-slate-500">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-emerald-900/20">
              <img src={HERO_IMG} alt="Vet examining a happy dog" className="h-[420px] w-full object-cover lg:h-[520px]" />
            </div>
            <div className="animate-floaty absolute -left-3 top-6 max-w-[230px] rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur sm:-left-8">
              <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-red-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> AI triage result
              </p>
              <p className="mt-1 text-sm font-bold">⚠️ Urgent — vet within 24h</p>
              <p className="text-xs text-slate-500">Vomiting ×3 + lethargy · possible foreign body · report sent to Dr. Amara</p>
            </div>
            <div className="animate-floaty absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl bg-[#0B2F2B] p-3 pr-5 text-white shadow-xl" style={{ animationDelay: "1.2s" }}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500 font-extrabold">DA</span>
              <span>
                <span className="block text-sm font-bold">Dr. Amara · online now</span>
                <span className="block text-xs text-emerald-200">Next video slot: 4:30 PM · $29</span>
              </span>
              <span className="ml-2 rounded-full bg-emerald-400 px-2.5 py-1 text-[11px] font-extrabold text-emerald-950">BOOK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / species strip */}
      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-4 text-[13px] font-bold text-slate-500 sm:gap-3">
          <span className="mr-2 uppercase tracking-widest text-slate-400">We treat</span>
          {["🐶 Dogs", "🐱 Cats", "🐰 Rabbits", "🦜 Birds", "🦎 Reptiles", "🐹 Hamsters & Guinea Pigs", "🐴 Horses", "🐢 Turtles"].map((s) => (
            <span key={s} className="rounded-full bg-[#FFF9F0] px-3 py-1.5 ring-1 ring-orange-100">{s}</span>
          ))}
        </div>
      </section>

      {/* AI section */}
      <section id="ai" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] shadow-xl">
            <img src={PETS_IMG} alt="Dogs and cat resting" className="h-80 w-full object-cover lg:h-[440px]" />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F96A4B]">01 · Nobody-Called-AI Doctor</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The AI that treats the <span className="text-emerald-700">first thing</span> before you need a real doctor.
            </h2>
            <p className="mt-4 text-slate-600">
              Other apps give you a chatbot or a vet — never both. VetIQ&apos;s Dr. Paw does instant urgency scoring,
              step-by-step first aid, poison dosing math, and builds a vet-ready report so your real visit is 3× faster.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Emergency radar: bloat, blocked bladder, xylitol, seizures flagged instantly",
                "Species-smart: rabbit GI stasis, cat lilies & urinary blockage, parvo pups",
                "First-aid cards: what to do, what NOT to do, what to film for the vet",
                "One-tap handoff: AI report + photos go straight to your video vet",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] font-medium text-slate-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-white"><Check className="h-3 w-3" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/app/ai-check" className="rounded-2xl bg-[#0E3D37] px-5 py-3 text-sm font-bold text-white hover:bg-[#125048]">Run a 60-sec AI check</Link>
              <Link href="/app/ai-chat" className="rounded-2xl border border-emerald-900/20 bg-white px-5 py-3 text-sm font-bold text-emerald-900 hover:bg-emerald-50">Chat with Dr. Paw</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vets marketplace */}
      <section id="vets" className="bg-[#0B2F2B] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">02 · Real doctors inside the app</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Licensed vets who <span className="text-amber-300">want to be here</span> — on video, chat or phone.
              </h2>
              <p className="mt-4 text-emerald-100/90">
                We built the vet side too: verified DVM profiles, smart matching by species + issue, upfront prices,
                and your AI report waiting when the call starts. Vets earn more per hour with zero clinic overhead.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { k: "180+", v: "verified vets online" },
                  { k: "8 min", v: "median wait for video" },
                  { k: "4.9★", v: "avg. visit rating" },
                  { k: "$25+", v: "transparent visit price" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-2xl font-extrabold text-amber-300">{s.k}</p>
                    <p className="text-sm text-emerald-100">{s.v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/app/vets" className="rounded-2xl bg-[#F96A4B] px-5 py-3 text-sm font-bold text-white hover:bg-[#e85a3b]">Find your vet now</Link>
                <Link href="/app/vets?join=1" className="rounded-2xl border border-white/25 px-5 py-3 text-sm font-bold hover:bg-white/10">Are you a vet? Join → earn on your schedule</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
              <img src={CLINIC_IMG} alt="Vet clinic checkup" className="h-80 w-full object-cover lg:h-[440px]" />
              <div className="flex items-center justify-between bg-white p-4 text-slate-900">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-100 font-extrabold text-emerald-800">MK</span>
                  <div>
                    <p className="text-sm font-extrabold">Dr. Maya K. · Exotics + Emergency</p>
                    <p className="text-xs text-slate-500">⭐ 4.98 (842 reviews) · English, French</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white">VIDEO · $35</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All-in-one grid */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#F96A4B]">03 · Everything others don&apos;t have</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          One app. The whole pet-health universe.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">Why juggle 5 apps when VetIQ does triage → vet → records → reminders in one place?</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: BrainCircuit, t: "AI Symptom Checker", d: "60-second wizard across 19 symptom groups with urgency score + causes + first aid. Nobody else scores rabbit, bird & reptile correctly.", c: "bg-emerald-600" },
            { icon: MessageCircleHeart, t: "Dr. Paw AI Chat 24/7", d: "Talk naturally — dosing questions, behavior, post-vaccine worries. Escalates to ER wording when red flags appear.", c: "bg-teal-600" },
            { icon: Video, t: "Video visits with real vets", d: "Filter by species, issue, language & price. AI report auto-attached. Prescriptions + referrals where legal.", c: "bg-[#F96A4B]" },
            { icon: ShieldCheck, t: "Poison & food safety checker", d: "14+ top killers (xylitol, lilies, grapes…) with toxic doses by weight + exactly what to tell the ER.", c: "bg-red-500" },
            { icon: Syringe, t: "Vaccine & deworm reminders", d: "Species-specific schedules, booster nudges, flea/tick calendar so you never miss a dose.", c: "bg-amber-500" },
            { icon: FileHeart, t: "Pet passports + health timeline", d: "Every pet gets a profile, weight curve, vet records & AI history — shareable with any clinic.", c: "bg-sky-600" },
            { icon: Pill, t: "Dosage & aftercare guides", d: "Weight-based first-aid math + plain-English aftercare sheets after every AI check or visit.", c: "bg-violet-600" },
            { icon: MapPin, t: "ER finder + what-to-say scripts", d: "Nearest emergency clinic guidance + call scripts so panicked owners say the right thing fast.", c: "bg-rose-500" },
            { icon: CalendarCheck, t: "Vet OS — join as a doctor", d: "Vets get a virtual practice: calendar, AI intake notes, ratings & payouts. Apply in 5 minutes.", c: "bg-slate-800" },
          ].map((f) => (
            <div key={f.t} className="group rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${f.c}`}>
                <f.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-extrabold">{f.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="border-y border-orange-100 bg-white py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[2rem] bg-red-50 p-6 ring-1 ring-red-100">
            <p className="flex items-center gap-2 font-extrabold text-red-600"><Siren className="h-5 w-5" /> Know the 8 red flags</p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-slate-700">
              {["Blue/pale gums or tongue", "Collapse or seizure over 5 min", "Can't breathe / belly effort", "Hard swollen belly + dry retching", "Male cat straining, no urine", "Bleeding that won't stop", "Ate xylitol, rat bait, lilies, antifreeze", "Hit by car / big fall"].map((r) => (
                <li key={r} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-red-100"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Chocolate? Grapes? Gum? <span className="text-red-500">Don&apos;t guess the dose.</span></h2>
            <p className="mt-3 text-slate-600">Type any food, plant or product — VetIQ tells you the danger level, toxic dose for your pet&apos;s weight, signs to watch, and exactly what to do next.</p>
            <Link href="/app/safety" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white hover:bg-red-600">
              Open poison checker <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-xs text-slate-400">AI guidance is first-response info only — not a diagnosis. Emergencies always need a licensed vet in person.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Simple pricing, like a good vet bill should be</h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { n: "Free", p: "$0", f: ["Unlimited AI triage + chat", "Poison checker", "1 pet profile", "Red-flag alerts"], cta: "Start free", hot: false },
            { n: "Plus", p: "$9/mo", f: ["Everything in Free", "Unlimited pets + records", "Vaccine reminders", "20% off video visits", "Priority vet matching"], cta: "Go Plus", hot: true },
            { n: "Pay-per-visit", p: "$25+", f: ["Video / chat / phone", "Licensed DVM, 15–30 min", "AI report attached", "Aftercare plan included"], cta: "Book a vet", hot: false },
          ].map((t) => (
            <div key={t.n} className={`rounded-3xl border p-6 ${t.hot ? "border-emerald-600 bg-[#0B2F2B] text-white shadow-2xl" : "border-orange-100 bg-white"}`}>
              <p className="text-sm font-extrabold uppercase tracking-widest opacity-70">{t.n}</p>
              <p className="mt-1 text-4xl font-extrabold">{t.p}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {t.f.map((x) => (
                  <li key={x} className="flex items-center gap-2"><Check className={`h-4 w-4 ${t.hot ? "text-emerald-300" : "text-emerald-600"}`} />{x}</li>
                ))}
              </ul>
              <Link href="/app" className={`mt-5 block rounded-2xl py-2.5 text-center text-sm font-bold ${t.hot ? "bg-[#F96A4B] text-white hover:bg-[#e85a3b]" : "bg-[#0E3D37] text-white hover:bg-[#125048]"}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Our story — VeRaFIED Studios */}
      <section id="story" className="border-y border-orange-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F96A4B]">Our story · VeRaFIED Studios</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                We spent our lives restoring what others <span className="text-emerald-700">wrote off.</span> Now we do it for pets.
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                VetIQ is built by <b>VeRaFIED Studios</b> — founded by <b>Luis Latorre</b>, from Italy, and{" "}
                <b>Tiffaney &ldquo;Tiff&rdquo; Latorre</b>, from Tampa. We both come from the renovation industry,
                where we spent our careers bringing back to life what others had given up on. Today we bring that
                same care to technology: using AI to give new life to old ideas — like the simple promise that
                no one should ever feel helpless when their animal is suffering.
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                We believe that with will and heart, anything possible can be achieved — and that a community is
                best served with love. That&apos;s why the AI triage is free, forever, for every species.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["💚 Care", "🔨 Will to succeed", "🏘️ Community", "🤝 Love without division"].map((v) => (
                  <span key={v} className="rounded-full bg-[#FFF9F0] px-4 py-2 text-sm font-extrabold text-emerald-900 ring-1 ring-orange-100">
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="paw-pattern rounded-[2rem] bg-[#0E3D37] p-8 text-white shadow-2xl">
                <p className="text-5xl">🛠️ → 🐾</p>
                <blockquote className="mt-4 text-xl font-extrabold leading-snug">
                  &ldquo;Builders who use AI to bring new life to old things — with care and love for the community.&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-sm font-extrabold ring-2 ring-[#0E3D37]">LL</span>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F96A4B] text-sm font-extrabold ring-2 ring-[#0E3D37]">TL</span>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">Luis &amp; Tiffaney Latorre</p>
                    <p className="text-xs text-emerald-200">Founders, VeRaFIED Studios · Italy 🇮🇹 × Tampa 🇺🇸</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[["20+ yrs", "restoring things"], ["1 mission", "no pet left behind"], ["∞", "love for community"]].map(([k, v]) => (
                    <div key={v} className="rounded-xl bg-white/10 px-2 py-3 ring-1 ring-white/10">
                      <p className="text-lg font-extrabold text-amber-300">{k}</p>
                      <p className="text-[10px] font-semibold text-emerald-100">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="paw-pattern relative overflow-hidden rounded-[2.5rem] bg-[#0E3D37] px-6 py-14 text-center text-white sm:px-12">
          <HeartPulse className="mx-auto h-10 w-10 text-emerald-300" />
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            3am panic or 3pm checkup — your pet&apos;s doctor is already here.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">Join 40,000+ pet parents. Create your pet&apos;s profile in 30 seconds, run your first free AI check, and meet a vet today.</p>
          <div className="mt-5 flex justify-center">
            <NewsletterForm dark />
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/app" className="rounded-2xl bg-white px-6 py-3.5 font-bold text-[#0E3D37] hover:bg-emerald-50">Create pet profile — free</Link>
            <Link href="/app/ai-check" className="rounded-2xl bg-[#F96A4B] px-6 py-3.5 font-bold text-white hover:bg-[#e85a3b]">Emergency? Start AI triage</Link>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-emerald-200"><Stethoscope className="h-3.5 w-3.5" /> Built with 12 licensed vets · Reviewed protocols · Not a substitute for in-person care</p>
        </div>
      </section>

      <footer className="border-t border-emerald-900/10 bg-[#0B2F2B] py-10 text-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="flex items-center gap-2 font-extrabold text-white"><PawPrint className="h-5 w-5" /> VetIQ — AI + Real Vets</p>
            <p className="max-w-md text-center text-xs leading-relaxed text-emerald-200/80 sm:text-right">
              AI triage provides first-response information only and is not a diagnosis, prescription, or substitute for a licensed veterinarian. If your pet shows emergency signs, seek in-person care immediately.
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-xs font-bold text-emerald-200">
              Built with 💚 by <a href="#story" className="text-amber-300 hover:underline">VeRaFIED Studios</a> — Luis &amp; Tiffaney Latorre · Italy 🇮🇹 × Tampa 🇺🇸 · <Link href="/guide" className="text-amber-300 hover:underline">Free first-aid guide</Link>
            </p>
            <p className="text-[11px] italic text-emerald-200/70">
              &ldquo;Bringing new life to old things, with care and love for the community.&rdquo;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
