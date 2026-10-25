"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-1.5 rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50"
    >
      <Printer className="h-4 w-4" /> Print guide
    </button>
  );
}
