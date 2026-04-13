"use client";

import {
  DEMO_VIDEO_PLACEHOLDER,
  DEMO_VIDEO_SRC,
} from "@/components/home/home-data";
import ChromaKeyVideo from "@/components/ui/ChromaKeyVideo";
import { SplitCharButton } from "@/components/ui/SplitCharButton";
import { cubicBezier, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = cubicBezier(0.16, 1, 0.3, 1);
const vp = { once: true, margin: "-6%" } as const;
const vpLg = { once: true, margin: "-8%" } as const;

const mono = {
  fontFamily:
    '"SFMono-Regular", "IBM Plex Mono", "Cascadia Mono", "Courier New", monospace',
};
const display = { fontFamily: '"Easegeometricb", Impact, sans-serif' };
const sans = { fontFamily: '"Host Grotesk", system-ui, sans-serif' };

const SERVICES = [
  {
    id: "01",
    title: "PORTRAITURE",
    desc: "Studio and location portraits built on light, stillness, and the kind of eye contact that holds long after the frame.",
  },
  {
    id: "02",
    title: "CAMPAIGNS",
    desc: "Conceptual visual campaigns for brands and artists — from single-image anchors to multi-channel series.",
  },
  {
    id: "03",
    title: "SHORT-FORM FILM",
    desc: "Narrative motion work and artist films. Cinematic pacing, deliberate colour, no generic content.",
  },
  {
    id: "04",
    title: "EDITORIAL",
    desc: "Print and digital editorial — fashion, culture, and music — sequenced as spreads, not isolated posts.",
  },
];

const GEAR = [
  {
    id: "01",
    category: "BODY",
    name: "Sony ZV-E10 Mark II",
    desc: "APS-C mirrorless. Compact form factor with vlog-oriented ergonomics, 4K 60p, and a wide dynamic range profile built for editorial colour grading.",
  },
  {
    id: "02",
    category: "LENS",
    name: "Tamron 17–70mm f/2.8",
    desc: "Di III-A VC RXD. A constant-aperture walk-around covering wide environmental context through tight compression — the single lens that does all of it.",
  },
  {
    id: "03",
    category: "FILTRATION",
    name: "K&F Concept ND + CPL (Combined)",
    desc: "Variable ND stacked with a circular polariser in a single 67mm ring. Controls exposure in natural light while cutting surface glare and lifting colour saturation simultaneously.",
  },
];

export default function ProfilePage() {
  const overlayVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    if (!isOverlayOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOverlayOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOverlayOpen]);

  useEffect(() => {
    const video = overlayVideoRef.current;
    if (!video) return;
    if (isOverlayOpen) {
      void video.play().catch(() => {});
      return;
    }
    video.pause();
    video.currentTime = 0;
  }, [isOverlayOpen]);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* ── NAV STRIP ── */}
        <div className="flex items-center justify-between px-6 pt-6 md:px-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SplitCharButton href="/" label="BACK" />
          </motion.div>
          <motion.p
            className="text-[0.68rem] uppercase tracking-[0.14em] text-black/40"
            style={mono}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            MADE INVINCIBLE — THE PROFILE
          </motion.p>
        </div>

        {/* ── HERO ── */}
        <section className="px-6 pt-14 md:px-10 lg:px-14">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
          >
            <span
              className="bg-black px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white"
              style={mono}
            >
              STUDIO
            </span>
            <span
              className="text-[0.68rem] uppercase tracking-[0.12em] text-black/40"
              style={mono}
            >
              EST. 2019 — NEW YORK
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 max-w-[12ch] text-[clamp(3.2rem,7vw,6.5rem)] font-[700] uppercase leading-[0.88] tracking-[-0.065em] text-black"
            style={display}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.22 }}
          >
            MADE INVINCIBLE
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[42ch] text-[1.05rem] leading-[1.5] tracking-[-0.022em] text-black/72"
            style={sans}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.3 }}
          >
            A photography and videography studio crafting portraits, campaigns,
            and short-form films with a cinematic, editorial point of view. This
            is not a showcase — it is the trace of a practice.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            {[
              ["DISCIPLINE", "PHOTOGRAPHY · FILM"],
              ["BASED IN", "NEW YORK, NY"],
              ["AVAILABLE FOR", "COMMISSIONS"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <p
                  className="text-[0.62rem] uppercase tracking-[0.16em] text-black/35"
                  style={mono}
                >
                  {label}
                </p>
                <p
                  className="text-[0.72rem] uppercase tracking-[0.1em] text-black"
                  style={mono}
                >
                  {value}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── VIDEO ── */}
        <section className="mt-14 px-6 md:px-10 lg:px-14">
          <motion.div
            className="relative overflow-hidden bg-[#1a1a1a]"
            style={{ aspectRatio: "16 / 9" }}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vpLg}
            transition={{ duration: 0.9, ease }}
          >
            {/* Poster */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEMO_VIDEO_PLACEHOLDER}
              alt="Made Invincible intro reel"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark scrim */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SplitCharButton
                label="PLAY INTRO"
                onClick={() => setIsOverlayOpen(true)}
              />
            </div>

            {/* Video caption */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <p
                className="text-[0.65rem] uppercase tracking-[0.14em] text-white/60"
                style={mono}
              >
                MADE INVINCIBLE — INTRO REEL
              </p>
              <p
                className="text-[0.65rem] uppercase tracking-[0.14em] text-white/60"
                style={mono}
              >
                2024
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── SERVICES ── */}
        <section className="mt-14 px-6 md:px-10 lg:px-14">
          <motion.p
            className="mb-8 text-[0.68rem] uppercase tracking-[0.18em] text-black/40"
            style={mono}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            SERVICES
          </motion.p>

          <div className="border-t border-black/10">
            <div className="flex flex-wrap">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="flex w-full flex-col gap-3 border-b border-black/10 py-8 pr-8 sm:w-1/2 sm:odd:border-r"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.6, ease, delay: index * 0.07 }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[0.62rem] tracking-[0.1em] text-black/30"
                      style={mono}
                    >
                      {service.id}
                    </span>
                    <span
                      className="text-[0.78rem] font-[600] uppercase tracking-[0.12em] text-black"
                      style={mono}
                    >
                      {service.title}
                    </span>
                  </div>
                  <p
                    className="max-w-[34ch] text-[0.92rem] leading-[1.48] tracking-[-0.018em] text-black/60"
                    style={sans}
                  >
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT + GEAR ── */}
        <section className="mt-16 px-6 md:px-10 lg:px-14">
          <div className="[display:grid] gap-14 [grid-template-columns:minmax(0,1fr)] lg:[grid-template-columns:minmax(0,1fr)_minmax(18rem,24rem)] lg:items-start lg:gap-20">
            <div>
              <motion.p
                className="max-w-[52ch] text-[1.05rem] leading-[1.55] tracking-[-0.022em] text-black/78"
                style={sans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease }}
              >
                The studio was built around one question: what does it look like
                when an image carries actual weight? Not the weight of
                production value or technical precision, but the weight of
                something witnessed and held. Every commission starts there —
                with what the image needs to do before it does anything else.
              </motion.p>

              <motion.div
                className="mt-12 h-px w-full bg-black/10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
                transition={{ duration: 0.8, ease }}
              />

              <motion.blockquote
                className="mt-12 max-w-[30ch] text-[clamp(1.6rem,2.6vw,2.3rem)] font-[500] leading-[1.16] tracking-[-0.04em] text-black"
                style={sans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.75, ease }}
              >
                &ldquo;The image has to earn the space it takes up.&rdquo;
              </motion.blockquote>

              <motion.p
                className="mt-12 max-w-[52ch] text-[1.05rem] leading-[1.55] tracking-[-0.022em] text-black/78"
                style={sans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease, delay: 0.05 }}
              >
                The work spans still photography and motion — portraits for
                artists and musicians, commercial campaigns for independent
                brands, and short-form documentary films. What holds it together
                is not a single aesthetic but a consistent disposition: slow,
                attentive, and committed to images that resist quick
                consumption.
              </motion.p>

              <motion.p
                className="mt-7 max-w-[52ch] text-[1.05rem] leading-[1.55] tracking-[-0.022em] text-black/78"
                style={sans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease, delay: 0.08 }}
              >
                The studio takes a limited number of commissions each season to
                keep the work close and considered. If the brief calls for
                something specific, novel, or simply more personal than generic
                content, this is the right place.
              </motion.p>
            </div>

            <aside className="relative isolate">
              <motion.div
                className="pointer-events-none absolute right-0 top-[4.5rem] z-0 flex justify-end"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vpLg}
                transition={{ duration: 0.9, ease }}
              >
                <div className="w-[14.4rem] max-w-none shrink-0 translate-x-[6%]">
                  <ChromaKeyVideo
                    className="w-full"
                    src="/greenscreen.mp4"
                    threshold={70}
                    loop
                    autoPlay
                    muted
                  />
                </div>
              </motion.div>

              <div className="relative z-10">
                <motion.p
                  className="mb-8 text-[0.68rem] uppercase tracking-[0.18em] text-black/40"
                  style={mono}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  GEAR
                </motion.p>

                <div className="border-t border-black/10">
                  {GEAR.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex flex-col gap-2 border-b border-black/10 py-8"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={vp}
                      transition={{ duration: 0.6, ease, delay: index * 0.07 }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="text-[0.62rem] tracking-[0.1em] text-black/30"
                          style={mono}
                        >
                          {item.id}
                        </span>
                        <span
                          className="text-[0.68rem] uppercase tracking-[0.14em] text-black/40"
                          style={mono}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p
                        className="text-[0.88rem] font-[600] uppercase tracking-[0.08em] text-black"
                        style={mono}
                      >
                        {item.name}
                      </p>
                      <p
                        className="max-w-[32ch] text-[0.92rem] leading-[1.5] tracking-[-0.018em] text-black/60"
                        style={sans}
                      >
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mt-20 px-6 pb-24 md:px-10 lg:px-14">
          <motion.div
            className="flex flex-col gap-6 border-t border-black/10 pt-12 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, ease }}
          >
            <div className="flex flex-col gap-3">
              <p
                className="text-[0.68rem] uppercase tracking-[0.16em] text-black/35"
                style={mono}
              >
                READY TO WORK TOGETHER?
              </p>
              <p
                className="max-w-[36ch] text-[1.02rem] leading-[1.45] tracking-[-0.02em] text-black/70"
                style={sans}
              >
                Commissions open. Limited availability per season.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <SplitCharButton href="/the-archive" label="VIEW ARCHIVE" />
              <SplitCharButton href="/booking" label="BOOK NOW" />
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <p
              className="text-[0.68rem] uppercase tracking-[0.12em] text-black/30"
              style={mono}
            >
              MADE INVINCIBLE © 2024
            </p>
            <p
              className="text-[0.68rem] uppercase tracking-[0.12em] text-black/30"
              style={mono}
            >
              NEW YORK, NY
            </p>
          </motion.div>
        </section>
      </main>

      {/* ── VIDEO OVERLAY ── */}
      {isOverlayOpen && (
        <div
          className="intro-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Made Invincible intro video"
          onClick={() => setIsOverlayOpen(false)}
        >
          <div className="intro-overlay__chrome">
            <SplitCharButton
              label="CLOSE"
              onClick={() => setIsOverlayOpen(false)}
            />
          </div>

          <div
            className="intro-overlay__media"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={overlayVideoRef}
              className="intro-overlay__video"
              src={DEMO_VIDEO_SRC}
              poster={DEMO_VIDEO_PLACEHOLDER}
              playsInline
              controls
              preload="metadata"
            />
          </div>
        </div>
      )}
    </>
  );
}
