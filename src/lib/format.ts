export function money(cents: number | null | undefined) {
  if (cents == null) return "$—";
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export function timeAgo(date: string | Date | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString();
}

export function petEmoji(species: string) {
  const s = (species || "").toLowerCase();
  if (s.includes("dog")) return "🐶";
  if (s.includes("cat")) return "🐱";
  if (s.includes("rabbit") || s.includes("bunny")) return "🐰";
  if (s.includes("bird") || s.includes("parrot")) return "🦜";
  if (s.includes("reptile") || s.includes("lizard") || s.includes("snake")) return "🦎";
  if (s.includes("hamster") || s.includes("guinea") || s.includes("rat") || s.includes("mouse")) return "🐹";
  if (s.includes("horse")) return "🐴";
  if (s.includes("turtle") || s.includes("tortoise")) return "🐢";
  if (s.includes("fish")) return "🐠";
  return "🐾";
}

export const SPECIES_EMOJI: Record<string, string> = {
  dog: "🐶",
  cat: "🐱",
  rabbit: "🐰",
  bird: "🦜",
  reptile: "🦎",
  other: "🐾",
};
