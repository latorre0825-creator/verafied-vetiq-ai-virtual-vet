import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vetiq.app"),
  title: {
    default: "VetIQ — AI Pet Doctor + Real Vets On-Demand | by VeRaFIED Studios",
    template: "%s | VetIQ",
  },
  description:
    "The first all-in-one pet hospital online: instant AI triage & first-aid, poison checker, plus video visits with licensed vets. For dogs, cats, rabbits, birds & more. Built with love by VeRaFIED Studios — Luis & Tiffaney Latorre.",
  authors: [{ name: "VeRaFIED Studios" }],
  keywords: ["AI vet", "online veterinarian", "pet triage", "pet poison checker", "video vet", "pet first aid", "emergency vet online", "VeRaFIED Studios"],
  openGraph: {
    title: "VetIQ — AI Pet Doctor + Real Vets On-Demand",
    description:
      "Free AI triage in 60 seconds. Licensed vets on video from $25. Poison checker, first-aid guides & pet passports — every species welcome. 🐾",
    url: "/",
    siteName: "VetIQ",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "VetIQ — AI Pet Doctor + Real Vets" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VetIQ — AI Pet Doctor + Real Vets On-Demand 🐾",
    description: "Free AI triage, poison checker & video vets from $25. The first all-in-one online animal hospital.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon-512.png", sizes: "512x512" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VetIQ",
  },
};

export const viewport = {
  themeColor: "#0E3D37",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FFF9F0] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
