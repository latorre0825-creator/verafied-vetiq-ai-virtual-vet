"use client";

import { useEffect, useState } from "react";
import { Smartphone, Check, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallAppButton({ compact = false }: { compact?: boolean }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      setDeferred(null);
    } else {
      // iOS Safari or already-handled browsers
      setShowIosHelp(true);
    }
  }

  if (installed) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-100 font-extrabold text-emerald-800 ${compact ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}`}>
        <Check className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} /> App installed 🐾
      </span>
    );
  }

  return (
    <>
      <button
        onClick={install}
        className={`inline-flex items-center gap-1.5 rounded-full bg-[#0E3D37] font-extrabold text-white shadow-lg transition hover:bg-[#125048] ${compact ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}`}
      >
        <Smartphone className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} /> Install app — free
      </button>
      {showIosHelp && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setShowIosHelp(false)}>
          <div className="w-full max-w-sm rounded-[1.8rem] bg-white p-6 text-slate-900 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-3xl">📲</p>
            <h3 className="mt-2 font-extrabold">Add VetIQ to your home screen</h3>
            <ol className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><span className="font-extrabold text-emerald-700">1.</span> Tap the <Share className="inline h-4 w-4" /> <b>Share</b> button in your browser</li>
              <li className="flex items-start gap-2"><span className="font-extrabold text-emerald-700">2.</span> Scroll and tap <b>“Add to Home Screen”</b></li>
              <li className="flex items-start gap-2"><span className="font-extrabold text-emerald-700">3.</span> Tap <b>Add</b> — VetIQ appears like a real app 🐾</li>
            </ol>
            <button onClick={() => setShowIosHelp(false)} className="mt-4 w-full rounded-2xl bg-[#0E3D37] py-2.5 text-sm font-extrabold text-white">Got it!</button>
          </div>
        </div>
      )}
    </>
  );
}
