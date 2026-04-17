"use client";

import { ArticleEditorialSection } from "@/components/photo/ArticleEditorialSection";
import { ArticleEntrance } from "@/components/photo/ArticleEntrance";
import { PhotoLoader } from "@/components/photo/PhotoLoader";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import type { ArchiveCollection, ArchivePhoto } from "@/lib/archive/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type CollectionRef = { slug: string; name: string };

type Props = {
  collection: ArchiveCollection;
  photos: ArchivePhoto[];
  initialPhotoId?: string;
  prevCollection?: CollectionRef | null;
  nextCollection?: CollectionRef | null;
};

function getDisplayIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ArticleSplit({
  collection,
  photos,
  initialPhotoId,
  prevCollection,
  nextCollection,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const initialIndex = photos.findIndex(
      (photo) => photo.id === initialPhotoId,
    );
    return initialIndex >= 0 ? initialIndex : 0;
  });
  const [loadedPhotoId, setLoadedPhotoId] = useState<string | null>(null);

  const router = useRouter();
  const scopeRef = useRef<HTMLElement>(null);
  const desktopRightColumnRef = useRef<HTMLDivElement>(null);
  const mobileRightColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLElement>(null);

  const photo = photos[currentIndex] ?? photos[0];
  const prevCard = currentIndex > 0 ? photos[currentIndex - 1] : null;
  const nextCard =
    currentIndex < photos.length - 1 ? photos[currentIndex + 1] : null;
  const nextPhoto = photos[(currentIndex + 1) % photos.length] ?? photo;
  const totalCount = photos.length;
  const displayIndex = getDisplayIndex(currentIndex);
  const totalCountLabel = String(totalCount).padStart(2, "0");
  const imageLoaded = loadedPhotoId === photo?.id;

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

  const updateCurrentIndex = useCallback(
    (delta: number) => {
      setCurrentIndex((index) =>
        Math.max(0, Math.min(photos.length - 1, index + delta)),
      );
    },
    [photos.length],
  );

  useEffect(() => {
    const formatter = (tz: string) =>
      new Intl.DateTimeFormat([], {
        timeZone: tz,
        timeZoneName: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

    const parse = (value: string) => {
      const match = value.match(/(\d+):(\d+):(\d+)\s*([A-Za-z0-9+-]+)/);
      return match
        ? {
            hours: match[1],
            minutes: match[2],
            seconds: match[3],
            timezone: match[4],
          }
        : null;
    };

    const update = () => {
      document
        .querySelectorAll<HTMLElement>("[data-current-time]")
        .forEach((el) => {
          const tz = el.getAttribute("data-current-time") ?? "America/New_York";
          const parsed = parse(formatter(tz).format(new Date()));
          if (!parsed) return;
          const hoursEl = el.querySelector<HTMLElement>(
            "[data-current-time-hours]",
          );
          const minutesEl = el.querySelector<HTMLElement>(
            "[data-current-time-minutes]",
          );
          const secondsEl = el.querySelector<HTMLElement>(
            "[data-current-time-seconds]",
          );
          const timezoneEl = el.querySelector<HTMLElement>(
            "[data-current-time-timezone]",
          );
          if (hoursEl) hoursEl.textContent = parsed.hours;
          if (minutesEl) minutesEl.textContent = parsed.minutes;
          if (secondsEl) secondsEl.textContent = parsed.seconds;
          if (timezoneEl) timezoneEl.textContent = parsed.timezone;
        });
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
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
      <div className="photo-page-nav sticky top-0 z-[60] bg-white/92 backdrop-blur-sm border-b border-black/8">
        <ArchiveHeader showPhotoLinks />
      </div>

      <ArticleEntrance
        scopeRef={scopeRef}
        rightColumnRef={rightColumnRef}
        photoId={photo.id}
      />

      {/* Desktop: title bar with collection nav arrows flanking the title */}
      <div className="hidden md:flex items-center justify-between sticky top-[4.25rem] z-50 w-full bg-white/92 backdrop-blur-sm border-b border-black/8 px-6 py-2">
        {prevCollection ? (
          <button
            type="button"
            onClick={() =>
              router.push(
                `/photography?collection=${encodeURIComponent(prevCollection.slug)}`,
              )
            }
            aria-label={`Previous collection: ${prevCollection.name}`}
            className="group flex items-center gap-2 opacity-40 transition-opacity duration-300 hover:opacity-90"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path
                d="M9 1L1 5L9 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="square"
              />
            </svg>
            <span
              className="text-[0.58rem] uppercase tracking-[0.16em] text-black/80 leading-none"
              style={betterOffMono}
            >
              {prevCollection.name}
            </span>
          </button>
        ) : (
          <div />
        )}

        <p
          data-article-title
          className="text-[clamp(4.8rem,8.3vw,7.4rem)] font-[700] uppercase leading-[0.8] tracking-[-0.08em] text-black"
          style={betterOffDisplay}
        >
          {collection.name}
        </p>

        {nextCollection ? (
          <button
            type="button"
            onClick={() =>
              router.push(
                `/photography?collection=${encodeURIComponent(nextCollection.slug)}`,
              )
            }
            aria-label={`Next collection: ${nextCollection.name}`}
            className="group flex items-center gap-2 opacity-40 transition-opacity duration-300 hover:opacity-90"
          >
            <span
              className="text-[0.58rem] uppercase tracking-[0.16em] text-black/80 leading-none"
              style={betterOffMono}
            >
              {nextCollection.name}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M1 1L9 5L1 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="square"
              />
            </svg>
          </button>
        ) : (
          <div />
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-[42vw_1fr]">
        <section className="sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-hidden border-r border-black/10 bg-white">
          <div className="flex h-full items-center justify-center gap-[clamp(0.75rem,1.4vw,1.5rem)] px-6 pb-16">
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
                      onLoad={() => setLoadedPhotoId(photo.id)}
                    />
                  </motion.div>
                </AnimatePresence>
                <PhotoLoader loading={!imageLoaded} />
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
                  {collection.tag.toUpperCase()} · FRAME {displayIndex}
                </motion.p>
              </AnimatePresence>
            </div>

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
                Start
              </p>
              <p
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.72rem] uppercase tracking-[0.12em] text-black/74"
                style={betterOffMono}
              >
                Mid
              </p>
              <p
                className="absolute bottom-0 right-0 text-[0.72rem] uppercase tracking-[0.12em] text-black/74"
                style={betterOffMono}
              >
                End
              </p>
            </div>
          </div>
        </section>

        <div ref={desktopRightColumnRef} className="bg-white">
          <ArticleEditorialSection
            collection={collection}
            photos={photos}
            photo={photo}
            nextPhoto={nextPhoto}
            currentIndex={currentIndex}
            displayIndex={displayIndex}
            totalCountLabel={totalCountLabel}
          />
        </div>
      </div>

      <div className="md:hidden">
        <div className="sticky top-[3.5rem] z-30 bg-white border-b border-black/10">
          <div className="flex items-end justify-center gap-3 px-4 pt-4 pb-2">
            <div
              className="shrink-0"
              style={{ width: "clamp(4.5rem, 20vw, 6.5rem)" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {prevCard ? (
                  <motion.button
                    key={prevCard.id}
                    type="button"
                    onClick={() => updateCurrentIndex(-1)}
                    aria-label={`View ${prevCard.title}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 0.48, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
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
                        sizes="20vw"
                        className="object-cover grayscale"
                      />
                    </div>
                  </motion.button>
                ) : (
                  <div style={{ aspectRatio: "3 / 4" }} />
                )}
              </AnimatePresence>
            </div>

            <div
              className="shrink-0"
              style={{ width: "clamp(6rem, 28vw, 9rem)" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={`m-label-top-${photo.id}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-black/72"
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
                    initial={{ scale: 1.12, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: -16 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      priority
                      sizes="28vw"
                      className="object-cover"
                      onLoad={() => setLoadedPhotoId(photo.id)}
                    />
                  </motion.div>
                </AnimatePresence>
                <PhotoLoader loading={!imageLoaded} />
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={`m-label-bottom-${photo.id}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.14,
                  }}
                  className="mt-1.5 text-[0.6rem] uppercase tracking-[0.1em] text-black/72"
                  style={betterOffMono}
                >
                  {collection.tag.toUpperCase()} · FRAME {displayIndex}
                </motion.p>
              </AnimatePresence>
            </div>

            <div
              className="shrink-0"
              style={{ width: "clamp(4.5rem, 20vw, 6.5rem)" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {nextCard ? (
                  <motion.button
                    key={nextCard.id}
                    type="button"
                    onClick={() => updateCurrentIndex(1)}
                    aria-label={`View ${nextCard.title}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 0.48, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
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
                        sizes="20vw"
                        className="object-cover grayscale"
                      />
                    </div>
                  </motion.button>
                ) : (
                  <div style={{ aspectRatio: "3 / 4" }} />
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pointer-events-none mx-4 pb-2">
            <div className="relative h-9">
              <div className="absolute inset-x-0 top-0 h-[11px] bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.2)_0,rgba(0,0,0,0.2)_1px,transparent_1px,transparent_8px)]" />
              <div className="absolute left-0 top-[-0.3rem] h-8 w-px bg-black/38" />
              <div className="absolute left-1/2 top-[-0.3rem] h-8 w-px -translate-x-1/2 bg-black/38" />
              <div className="absolute right-0 top-[-0.3rem] h-8 w-px bg-black/38" />
              <p
                className="absolute bottom-0 left-0 text-[0.62rem] uppercase tracking-[0.1em] text-black/74"
                style={betterOffMono}
              >
                Start
              </p>
              <p
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.1em] text-black/74"
                style={betterOffMono}
              >
                Mid
              </p>
              <p
                className="absolute bottom-0 right-0 text-[0.62rem] uppercase tracking-[0.1em] text-black/74"
                style={betterOffMono}
              >
                End
              </p>
            </div>
          </div>

          {/* Mobile collection nav arrows — sit just below the timeline, inside the sticky header */}
          {(prevCollection || nextCollection) && (
            <div className="flex items-center justify-between px-4 pb-2">
              {prevCollection ? (
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/photography?collection=${encodeURIComponent(prevCollection.slug)}`,
                    )
                  }
                  aria-label={`Previous collection: ${prevCollection.name}`}
                  className="group flex items-center gap-1.5 opacity-50 transition-opacity duration-300 active:opacity-90"
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="shrink-0">
                    <path d="M9 1L1 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                  </svg>
                  <span className="text-[0.55rem] uppercase tracking-[0.14em] text-black/70 leading-none" style={betterOffMono}>
                    {prevCollection.name}
                  </span>
                </button>
              ) : (
                <div />
              )}
              {nextCollection ? (
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/photography?collection=${encodeURIComponent(nextCollection.slug)}`,
                    )
                  }
                  aria-label={`Next collection: ${nextCollection.name}`}
                  className="group flex items-center gap-1.5 opacity-50 transition-opacity duration-300 active:opacity-90"
                >
                  <span className="text-[0.55rem] uppercase tracking-[0.14em] text-black/70 leading-none" style={betterOffMono}>
                    {nextCollection.name}
                  </span>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="shrink-0">
                    <path d="M1 1L9 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
                  </svg>
                </button>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>

        <div ref={mobileRightColumnRef} className="px-4 pt-5 pb-24">
          <p
            data-article-meta
            className="text-[0.72rem] uppercase tracking-[0.14em] text-black/55"
            style={betterOffMono}
          >
            {collection.location} · {photo.year} · {collection.tag}
          </p>
          <h1
            data-article-title
            className="mt-3 max-w-[10ch] text-[clamp(2.4rem,11vw,4rem)] font-[700] uppercase leading-[0.86] tracking-[-0.07em] text-black"
            style={betterOffSans}
          >
            {collection.name}
          </h1>
          <p
            data-article-copy
            className="mt-4 max-w-[34ch] text-[0.98rem] leading-[1.42] tracking-[-0.02em] text-black/74"
            style={betterOffSans}
          >
            {collection.intro}
          </p>
          <div data-article-copy className="mt-6 border-t border-black/10 pt-3">
            <p
              className="text-[0.72rem] uppercase tracking-[0.12em] text-black/74"
              style={betterOffMono}
            >
              {displayIndex} / {totalCountLabel} · {photo.title}
            </p>
          </div>

          <ArticleEditorialSection
            collection={collection}
            photos={photos}
            photo={photo}
            nextPhoto={nextPhoto}
            currentIndex={currentIndex}
            displayIndex={displayIndex}
            totalCountLabel={totalCountLabel}
          />
        </div>
      </div>
    </main>
  );
}
