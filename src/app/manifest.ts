import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VetIQ — AI Pet Doctor + Real Vets",
    short_name: "VetIQ",
    description:
      "Free AI pet triage in 60 seconds, poison checker, and licensed vets on video from $25. Every species welcome. By VeRaFIED Studios.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFF9F0",
    theme_color: "#0E3D37",
    categories: ["medical", "health", "lifestyle"],
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcuts: [
      { name: "AI Symptom Check", url: "/app/ai-check", description: "60-second emergency triage" },
      { name: "Poison Checker", url: "/app/safety", description: "Is it toxic? Check now" },
      { name: "Find a Vet", url: "/app/vets", description: "Video vets from $25" },
    ],
  };
}
