"use client";

import type { ArtboardPhoto } from "@/components/home/home-data";
import { ArticleEditorialSection } from "@/components/photo/ArticleEditorialSection";
import { ArticleEntrance } from "@/components/photo/ArticleEntrance";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  photos: ArtboardPhoto[];
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const CATEGORIES = ["Showcase", "Inspire", "Study", "Archive"] as const;

function getTimelineMonth(index: number, totalCount: number) {
  if (totalCount <= 1) {
    return MONTHS[0];
  }

  const progress = index / (totalCount - 1);
  const monthIndex = Math.min(
    MONTHS.length - 1,
    Math.floor(progress * (MONTHS.length - 1)),
  );

  return MONTHS[monthIndex];
}

function getTimelineCategory(index: number) {
  return CATEGORIES[index % CATEGORIES.length];
}

function getDisplayIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ArticleSplit({ photos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scopeRef = useRef<HTMLElement>(null);
  const desktopRightColumnRef = useRef<HTMLDivElement>(null);
  const mobileRightColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLElement>(null);

  const photo = photos[currentIndex] ?? photos[0];

  // Non-wrapping: null at the edges — used for the 3-card left column
  const prevCard = currentIndex > 0 ? photos[currentIndex - 1] : null;
  const nextCard =
    currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;

  // Wrapping: always defined — used for the editorial section's supporting images
  const previousPhoto =
    photos[(currentIndex - 1 + photos.length) % photos.length] ?? photo;
  const nextPhoto = photos[(currentIndex + 1) % photos.length] ?? photo;

  const totalCount = photos.length;
  const displayIndex = getDisplayIndex(currentIndex);
  const totalCountLabel = String(totalCount).padStart(2, "0");
  const currentMonth = getTimelineMonth(currentIndex, totalCount);

  const betterOffDisplay = {
    fontFamily: '"Easegeometricb", Impact, sans-serif',
  } as const;
  const betterOffSans = {
    fontFamily: '"Host Grotesk", system-ui, sans-serif',
  } as const;
  const betterOffMono = {
    fontFamily:
      '"SFMono-Regular", "IBM Plex Mono", "Cascadia Mono", "Courier New", monospace',
  } as const;

  const searchParams = useSearchParams();

  const updateCurrentIndex = useCallback(
    (delta: number) => {
      setCurrentIndex((index) =>
        Math.max(0, Math.min(photos.length - 1, index + delta)),
      );
    },
    [photos.length],
  );

  useEffect(() => {
    const photoId = searchParams.get("photo");
    if (!photoId) return;
    const index = photos.findIndex((p) => p.id === photoId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncRightColumnRef = () => {
      rightColumnRef.current = mediaQuery.matches
        ? desktopRightColumnRef.current
        : mobileRightColumnRef.current;
    };

    syncRightColumnRef();
    mediaQuery.addEventListener("change", syncRightColumnRef);

    return () => {
      mediaQuery.removeEventListener("change", syncRightColumnRef);
    };
  }, []);

  if (!photo) {
    return null;
  }

  return (
    <main
      ref={scopeRef}
      className="relative min-h-screen [overflow-x:clip] bg-white text-[#050505]"
    >
      <ArticleEntrance
        scopeRef={scopeRef}
        rightColumnRef={rightColumnRef}
        photoId={String(currentIndex)}
      />

      <div className="sticky top-0 z-50 w-full text-center bg-white/92 backdrop-blur-sm border-b border-black/8 py-3 pointer-events-none">
        <p
          data-article-title
          className="text-[clamp(4.8rem,8.3vw,7.4rem)] font-[700] uppercase leading-[0.8] tracking-[-0.08em] text-black"
          style={betterOffDisplay}
        >
          Made Invincible
        </p>
      </div>

      <div className="hidden md:grid md:grid-cols-[42vw_1fr]">
        {/* LEFT COLUMN — 3-card timeline */}
        <section className="sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-hidden border-r border-black/10 bg-white">
          <div className="flex h-full items-center justify-center gap-[clamp(0.75rem,1.4vw,1.5rem)] px-6 pb-16">
            {/* Previous card — clickable, subdued */}
            <div
              className="shrink-0"
              style={{ width: "clamp(7rem, 10vw, 13rem)" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {prevCard ? (
                  <motion.button
                    key={prevCard.id}
                    type="button"
                    onClick={() => updateCurrentIndex(-1)}
                    aria-label={`View ${prevCard.title}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 0.48, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="group w-full"
                    whileHover={{ opacity: 0.72 }}
                  >
                    <div
                      className="relative overflow-hidden bg-[#f1efe7] transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ aspectRatio: "3 / 4" }}
                    >
                      <Image
                        src={prevCard.src}
                        alt=""
                        fill
                        sizes="13vw"
                        className="object-cover grayscale"
                      />
                    </div>
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Current card — highlighted, full color, zoom-in on change */}
            <div
              className="shrink-0"
              style={{ width: "clamp(11rem, 16vw, 20rem)" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={`label-top-${photo.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-2 text-[0.72rem] uppercase tracking-[0.14em] text-black/72"
                  style={betterOffMono}
                >
                  {displayIndex} / {totalCountLabel}
                </motion.p>
              </AnimatePresence>

              <div
                className="relative overflow-hidden bg-[#f1efe7]"
                style={{ aspectRatio: "3 / 4" }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={photo.id}
                    initial={{ scale: 1.14, opacity: 0, y: 28 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.95,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      priority
                      sizes="20vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={`label-bottom-${photo.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.18,
                  }}
                  className="mt-2 text-[0.72rem] uppercase tracking-[0.12em] text-black/72"
                  style={betterOffMono}
                >
                  {getTimelineCategory(currentIndex)} (
                  {currentMonth.toUpperCase()})
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Next card — clickable, subdued */}
            <div
              className="shrink-0"
              style={{ width: "clamp(7rem, 10vw, 13rem)" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {nextCard ? (
                  <motion.button
                    key={nextCard.id}
                    type="button"
                    onClick={() => updateCurrentIndex(1)}
                    aria-label={`View ${nextCard.title}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 0.48, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="group w-full"
                    whileHover={{ opacity: 0.72 }}
                  >
                    <div
                      className="relative overflow-hidden bg-[#f1efe7] transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ aspectRatio: "3 / 4" }}
                    >
                      <Image
                        src={nextCard.src}
                        alt=""
                        fill
                        sizes="13vw"
                        className="object-cover grayscale"
                      />
                    </div>
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* Horizontal tick ruler */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0">
            <div className="relative mx-4 h-14">
              <div className="absolute inset-x-0 top-4 h-[13px] bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.22)_0,rgba(0,0,0,0.22)_1px,transparent_1px,transparent_8px)]" />
              <div className="absolute left-0 top-[-0.45rem] h-11 w-px bg-black/38" />
              <div className="absolute left-1/2 top-[-0.45rem] h-11 w-px -translate-x-1/2 bg-black/38" />
              <div className="absolute right-0 top-[-0.45rem] h-11 w-px bg-black/38" />
              <p
                className="absolute bottom-0 left-0 text-[0.72rem] uppercase tracking-[0.12em] text-black/74"
                style={betterOffMono}
              >
                January
              </p>
              <p
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.72rem] uppercase tracking-[0.12em] text-black/74"
                style={betterOffMono}
              >
                June
              </p>
              <p
                className="absolute bottom-0 right-0 text-[0.72rem] uppercase tracking-[0.12em] text-black/74"
                style={betterOffMono}
              >
                December
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN — scrolls with the page */}
        <div ref={desktopRightColumnRef} className="bg-white">
          <ArticleEditorialSection
            photos={photos}
            photo={photo}
            previousPhoto={previousPhoto}
            nextPhoto={nextPhoto}
            currentIndex={currentIndex}
            displayIndex={displayIndex}
            category={getTimelineCategory(currentIndex)}
            month={currentMonth}
          />
        </div>
      </div>

      {/* Mobile layout */}
      <section className="relative flex min-h-screen flex-col bg-white px-4 pb-24 pt-4 md:hidden">
        <div className="flex items-center justify-end gap-4">
          <div
            data-article-control
            className="flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white/90 px-2.5 py-1.5"
          >
            <div className="relative h-5 w-5 overflow-hidden rounded-full bg-[#ec3d2f]">
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="20px"
                className="object-cover opacity-70 mix-blend-multiply"
              />
            </div>
            <p
              className="text-[0.8rem] tracking-[-0.03em] text-black/88"
              style={betterOffSans}
            >
              {displayIndex}/{totalCountLabel}
            </p>
          </div>
        </div>

        <div data-article-visual className="mt-4 overflow-hidden bg-[#f1efe7]">
          <div className="relative aspect-[4/5]">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-5">
          <p
            data-article-meta
            className="text-[0.72rem] uppercase tracking-[0.14em] text-black/55"
            style={betterOffMono}
          >
            {photo.location} · {photo.year} · {currentMonth}
          </p>
          <h1
            data-article-title
            className="mt-3 max-w-[10ch] text-[clamp(2.4rem,11vw,4rem)] font-[700] uppercase leading-[0.86] tracking-[-0.07em] text-black"
            style={betterOffSans}
          >
            {photo.title}
          </h1>
          <p
            data-article-copy
            className="mt-4 max-w-[34ch] text-[0.98rem] leading-[1.42] tracking-[-0.02em] text-black/74"
            style={betterOffSans}
          >
            {photo.description}
          </p>
          <div data-article-copy className="mt-6 border-t border-black/10 pt-3">
            <p
              className="text-[0.72rem] uppercase tracking-[0.12em] text-black/74"
              style={betterOffMono}
            >
              {displayIndex} / {totalCountLabel} ·{" "}
              {getTimelineCategory(currentIndex)} ({currentMonth.toUpperCase()})
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-16 left-0 right-0 z-10">
          <div className="relative mx-4 h-9">
            <div className="absolute inset-x-0 top-0 h-[11px] bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.2)_0,rgba(0,0,0,0.2)_1px,transparent_1px,transparent_8px)]" />
            <div className="absolute left-1/2 top-[-0.3rem] h-8 w-px -translate-x-1/2 bg-black/38" />
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/96 px-4 py-3 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => updateCurrentIndex(-1)}
              data-article-control
              className="rounded-full border border-black/10 px-4 py-3 text-left text-[0.76rem] uppercase tracking-[0.12em] text-black/72"
              style={betterOffMono}
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => updateCurrentIndex(1)}
              data-article-control
              className="rounded-full border border-black/10 px-4 py-3 text-right text-[0.76rem] uppercase tracking-[0.12em] text-black/72"
              style={betterOffMono}
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      <div ref={mobileRightColumnRef} className="md:hidden">
        <ArticleEditorialSection
          photos={photos}
          photo={photo}
          previousPhoto={previousPhoto}
          nextPhoto={nextPhoto}
          currentIndex={currentIndex}
          displayIndex={displayIndex}
          category={getTimelineCategory(currentIndex)}
          month={currentMonth}
        />
      </div>
    </main>
  );
}
