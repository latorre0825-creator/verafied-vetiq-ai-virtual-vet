"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PawPrint,
  LayoutDashboard,
  BrainCircuit,
  MessageCircleHeart,
  Video,
  CalendarCheck,
  FileHeart,
  ShieldAlert,
  Plus,
  Siren,
  Crown,
  Megaphone,
  BarChart3,
  Rocket,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/ai-check", label: "AI Symptom Check", icon: BrainCircuit },
  { href: "/app/ai-chat", label: "Dr. Paw Chat", icon: MessageCircleHeart },
  { href: "/app/vets", label: "Find a Vet", icon: Video },
  { href: "/app/visits", label: "My Visits", icon: CalendarCheck },
  { href: "/app/pets", label: "My Pets", icon: PawPrint },
  { href: "/app/records", label: "Health Records", icon: FileHeart },
  { href: "/app/safety", label: "Poison Checker", icon: ShieldAlert },
  { href: "/app/premium", label: "Go Premium", icon: Crown },
  { href: "/app/refer", label: "Refer & Earn $5", icon: Megaphone },
  { href: "/app/business", label: "Business HQ", icon: BarChart3 },
  { href: "/app/launch", label: "Launch Center", icon: Rocket },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 font-bold lg:hidden"
              aria-label="Menu"
            >
              ☰
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0E3D37] text-white">
                <PawPrint className="h-4 w-4" />
              </span>
              <span className="text-base font-extrabold">VetIQ Clinic</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/app/ai-check"
              className="animate-pulse-ring hidden items-center gap-1.5 rounded-full bg-red-500 px-4 py-2 text-xs font-extrabold text-white sm:flex"
            >
              <Siren className="h-3.5 w-3.5" /> EMERGENCY? AI TRIAGE
            </Link>
            <Link
              href="/app/pets"
              className="flex items-center gap-1.5 rounded-full bg-[#0E3D37] px-4 py-2 text-xs font-bold text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add pet
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-5 sm:px-6">
        {/* sidebar */}
        <aside
          className={`${
            open ? "block" : "hidden"
          } w-60 shrink-0 lg:block`}
        >
          <nav className="sticky top-[68px] space-y-1 rounded-3xl border border-orange-100 bg-white p-3 shadow-sm">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-bold transition ${
                    active
                      ? "bg-[#0E3D37] text-white shadow-lg shadow-emerald-900/20"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-900"
                  }`}
                >
                  <n.icon className={`h-[18px] w-[18px] ${active ? "text-emerald-300" : "text-slate-400"}`} />
                  {n.label}
                  {n.href === "/app/vets" && (
                    <span className="ml-auto rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-extrabold text-white">
                      12 online
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#0E3D37] to-[#17685e] p-4 text-white">
              <p className="text-sm font-extrabold">🩺 Vet? Earn with VetIQ</p>
              <p className="mt-1 text-xs leading-relaxed text-emerald-100">
                Set your hours, get AI intake notes, keep 80% of every visit.
              </p>
              <Link
                href="/app/vets?join=1"
                className="mt-3 block rounded-xl bg-white py-2 text-center text-xs font-extrabold text-emerald-900"
              >
                Join as a doctor →
              </Link>
            </div>
            <p className="px-3 pb-1 pt-3 text-center text-[10px] font-semibold leading-relaxed text-slate-400">
              Built with 💚 by <span className="font-extrabold text-emerald-700">VeRaFIED Studios</span>
              <br />Luis &amp; Tiff Latorre · 🇮🇹 × 🇺🇸
            </p>
          </nav>
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
