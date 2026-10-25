import { NextResponse } from "next/server";
import { chatReply, type ChatMsg } from "@/lib/vet-ai";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const history: ChatMsg[] = Array.isArray(b.history) ? b.history : [];
    const species = String(b.species || "dog").toLowerCase();
    const safe = history.slice(-12).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      text: String(m.text || "").slice(0, 2000),
    }));
    const reply = chatReply(safe, species);
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
