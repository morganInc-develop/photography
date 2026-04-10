"use client";

import type { ArtboardPhoto } from "@/components/home/home-data";
import { ArticleEditorialSection } from "@/components/photo/ArticleEditorialSection";
import { ArticleEntrance } from "@/components/photo/ArticleEntrance";
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

const CARD_PATTERNS = [
  { width: "clamp(13rem, 17.5vw, 22rem)", aspectRatio: "3 / 4", offset: 24 },
  { width: "clamp(11.7rem, 15vw, 18.2rem)", aspectRatio: "1 / 1", offset: 6 },
  { width: "clamp(14.3rem, 20.8vw, 26rem)", aspectRatio: "4 / 5", offset: 34 },
  { width: "clamp(13rem, 16.3vw, 20.2rem)", aspectRatio: "4 / 5", offset: 14 },
  { width: "clamp(14.3rem, 19.5vw, 23.4rem)", aspectRatio: "5 / 4", offset: 0 },
] as const;

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

const WHEEL_THRESHOLD = 45;
const SWIPE_THRESHOLD = 56;
const DRAG_THRESHOLD = 56;
const NAVIGATION_COOLDOWN_MS = 700;

export function ArticleSplit({ photos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scopeRef = useRef<HTMLElement>(null);
  const activeCardRef = useRef<HTMLButtonElement>(null);
  const timelineViewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const hasDragged = useRef(false);
  const lastNavigationAt = useRef(0);
  const photo = photos[currentIndex] ?? photos[0];
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
    activeCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentIndex]);

  // Convert vertical wheel to horizontal scroll on the timeline
  useEffect(() => {
    const viewport = timelineViewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
      if (maxScrollLeft <= 0) return;
      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (delta === 0) return;
      event.preventDefault();
      const multiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 18
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? viewport.clientWidth * 0.85
            : 1;
      viewport.scrollLeft += delta * multiplier;
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    if (photos.length <= 1) {
      return;
    }

    const canNavigate = () =>
      Date.now() - lastNavigationAt.current > NAVIGATION_COOLDOWN_MS;

    const navigateBy = (delta: number) => {
      if (!canNavigate()) {
        return;
      }

      lastNavigationAt.current = Date.now();
      updateCurrentIndex(delta);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) < WHEEL_THRESHOLD) {
        return;
      }

      if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
        return;
      }

      navigateBy(event.deltaX > 0 ? 1 : -1);
    };

    const onMouseDown = (event: MouseEvent) => {
      dragStartX.current = event.clientX;
      hasDragged.current = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (dragStartX.current === null) return;

      if (Math.abs(event.clientX - dragStartX.current) > 4) {
        hasDragged.current = true;
      }
    };

    const onMouseUp = (event: MouseEvent) => {
      const startX = dragStartX.current;
      dragStartX.current = null;

      if (startX === null || !hasDragged.current) return;

      const deltaX = event.clientX - startX;
      if (Math.abs(deltaX) < DRAG_THRESHOLD) return;

      navigateBy(deltaX < 0 ? 1 : -1);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startX = touchStartX.current;
      const endX = event.changedTouches[0]?.clientX;

      touchStartX.current = null;

      if (startX == null || endX == null) {
        return;
      }

      const deltaX = endX - startX;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
        return;
      }

      navigateBy(deltaX < 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [photos.length, updateCurrentIndex]);

  if (!photo) {
    return null;
  }

  return (
    <main
      ref={scopeRef}
      className="relative min-h-screen [overflow-x:clip] bg-white text-[#050505]"
    >
      <ArticleEntrance scopeRef={scopeRef} photoId={String(currentIndex)} />

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
        <section className="sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-hidden border-r border-black/10 bg-white">
          {/* Horizontal scrolling photo cards */}
          <div className="absolute inset-x-0 top-0 bottom-20">
            <div
              ref={timelineViewportRef}
              className="lookback-scrollbar flex h-full items-center overflow-x-auto overflow-y-hidden px-[6vw]"
            >
              <div className="flex min-w-max items-end gap-[clamp(0.75rem,1.4vw,1.5rem)] pb-10 pt-8">
                {photos.map((item, index) => {
                  const isCurrent = item.id === photo.id;
                  const distance = Math.abs(index - currentIndex);
                  const pattern = CARD_PATTERNS[index % CARD_PATTERNS.length];
                  const category = getTimelineCategory(index);
                  const month = getTimelineMonth(index, totalCount);
                  const itemDisplayIndex = getDisplayIndex(index);
                  const offset =
                    pattern.offset +
                    (isCurrent
                      ? 0
                      : distance === 1
                        ? 12
                        : distance === 2
                          ? 4
                          : 20);
                  const opacity = isCurrent
                    ? 1
                    : distance <= 1
                      ? 0.96
                      : distance <= 3
                        ? 0.84
                        : 0.62;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      aria-current={isCurrent ? "true" : undefined}
                      aria-label={`View ${item.title}`}
                      ref={isCurrent ? activeCardRef : undefined}
                      className={`group relative shrink-0 text-left transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCurrent ? "z-20" : "z-10 hover:opacity-100"
                      }`}
                      style={{
                        opacity,
                        width: pattern.width,
                        transform: `translateY(${offset}px) scale(${isCurrent ? 1.02 : 1})`,
                      }}
                    >
                      <p
                        className={`absolute -top-5 left-0 text-[0.72rem] uppercase tracking-[0.14em] text-black/72 transition duration-300 ${
                          isCurrent
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                        }`}
                        style={betterOffMono}
                      >
                        {itemDisplayIndex}
                      </p>

                      <div
                        data-article-visual
                        className="relative overflow-hidden bg-[#f1efe7] transition duration-500 group-hover:scale-[1.01]"
                        style={{ aspectRatio: pattern.aspectRatio }}
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 22vw"
                          priority={isCurrent}
                          className="object-cover grayscale saturate-0 transition duration-500 group-hover:grayscale-0 group-hover:saturate-100 group-focus-visible:grayscale-0 group-focus-visible:saturate-100"
                        />
                      </div>

                      <div
                        className={`mt-3 transition duration-300 ${
                          isCurrent
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                        }`}
                      >
                        <p
                          className="text-[0.72rem] uppercase tracking-[0.12em] text-black/78"
                          style={betterOffMono}
                        >
                          {category} ({month.toUpperCase()})
                        </p>
                        <p
                          className="mt-1 max-w-[18ch] text-[0.9rem] tracking-[-0.03em] text-black/78"
                          style={betterOffSans}
                        >
                          {item.title} / {item.location}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
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

        <div className="bg-[#fbfaf6]">
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

      <div className="md:hidden">
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
