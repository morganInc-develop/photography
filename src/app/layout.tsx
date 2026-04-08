import { CrtOverlay } from "@/components/home/CrtOverlay";
import { GlobalAppEffects } from "@/components/layout/GlobalAppEffects";
import { PageTransitionOverlay } from "@/components/layout/PageTransitionOverlay";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicola Romei | Digital Experience Designer",
  description:
    "Digital Experience Designer and Awwwards Judge creating immersive websites with strong visual direction, refined motion, and distinct design signature.",
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
