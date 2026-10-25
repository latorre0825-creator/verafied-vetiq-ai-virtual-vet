import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://vetiq.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1.0 },
    { path: "/guide", priority: 0.9 },
    { path: "/app", priority: 0.9 },
    { path: "/app/ai-check", priority: 0.9 },
    { path: "/app/ai-chat", priority: 0.8 },
    { path: "/app/vets", priority: 0.9 },
    { path: "/app/safety", priority: 0.8 },
    { path: "/app/premium", priority: 0.7 },
    { path: "/app/refer", priority: 0.6 },
    { path: "/app/pets", priority: 0.5 },
    { path: "/app/records", priority: 0.5 },
    { path: "/app/visits", priority: 0.5 },
  ];
  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.priority,
  }));
}
