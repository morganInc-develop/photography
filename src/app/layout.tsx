import { CrtOverlay } from "@/components/home/CrtOverlay";
import { GlobalAppEffects } from "@/components/layout/GlobalAppEffects";
import { PageTransitionOverlay } from "@/components/layout/PageTransitionOverlay";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Made Invincible | Photography and Videography",
  description:
    "Made Invincible is a photography and videography studio creating cinematic portraits, motion pieces, and editorial visual storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="body min-h-full">
        <GlobalAppEffects />
        {children}
        <PageTransitionOverlay />
        <CrtOverlay />
      </body>
    </html>
  );
}
