"use client";

import type { ArtboardPhoto } from "@/components/home/home-data";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  photos: ArtboardPhoto[];
  photo: ArtboardPhoto;
  previousPhoto: ArtboardPhoto;
  nextPhoto: ArtboardPhoto;
  currentIndex: number;
  displayIndex: string;
  category: string;
  month: string;
};

function getPrimaryLocation(location: string) {
  return location.split(",")[0]?.trim() || location;
}

function getEditorialHeadline(photo: ArtboardPhoto) {
  const primaryLocation = getPrimaryLocation(photo.location);
  return `${photo.title} in ${primaryLocation}`;
}

function getEditorialParagraphs(
  photo: ArtboardPhoto,
  category: string,
  month: string,
) {
  const primaryLocation = getPrimaryLocation(photo.location);
  return [
    photo.description,
    `${photo.title} sits inside the ${category.toLowerCase()} register of the Lookback archive, where photographs are sequenced less like isolated posts and more like editorial chapters. ${primaryLocation} gives the image its anchor, while ${month.toLowerCase()} positions it inside the broader calendar rhythm of the timeline.`,
    `The lower composition keeps adjacent works in view on purpose. Instead of cutting the photograph loose from the archive, the layout lets neighboring frames bleed into the margins so the page reads like one moving spread inside a larger visual index.`,
  ];
}

function getSourceLabel(src: string) {
  try {
    const hostname = new URL(src).hostname;
    if (hostname.includes("unsplash")) return "Unsplash";
    if (hostname.includes("pexels")) return "Pexels";
    return hostname.replace(/^www\./, "");
  } catch {
    return "Source";
  }
}

const ease = cubicBezier(0.16, 1, 0.3, 1);
const vp = { once: true, margin: "-6%" } as const;
const vpLg = { once: true, margin: "-8%" } as const;

const betterOffSans = { fontFamily: '"Host Grotesk", system-ui, sans-serif' };
const betterOffMono = {
  fontFamily:
    '"SFMono-Regular", "IBM Plex Mono", "Cascadia Mono", "Courier New", monospace',
};
const betterOffDisplay = {
  fontFamily: '"Easegeometricb", Impact, sans-serif',
};

export function ArticleEditorialSection({
  photos,
  photo,
  previousPhoto,
  nextPhoto,
  currentIndex,
  displayIndex,
  category,
  month,
}: Props) {
  const primaryLocation = getPrimaryLocation(photo.location);
  const paragraphs = getEditorialParagraphs(photo, category, month);
  const sourceLabel = getSourceLabel(photo.src);
  const supportingPhotos = [
    photos[(currentIndex + 2) % photos.length],
    photos[(currentIndex + 3) % photos.length],
    photos[(currentIndex + 4) % photos.length],
  ];
  const primarySupportPhoto = supportingPhotos[0] ?? nextPhoto;
  const secondarySupportPhotos = supportingPhotos.slice(1);
  const headline = getEditorialHeadline(photo);

  return (
    <>
      {/* ── DESKTOP ── */}
      <section className="hidden bg-white md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {/* ── INTRO ── */}
            <div className="px-8 pt-12 lg:px-14 lg:pt-16">
              {/* Top bar */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="bg-black px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white"
                    style={betterOffMono}
                  >
                    {category}
                  </span>
                  <span
                    className="text-[0.72rem] uppercase tracking-[0.1em] text-black/40"
                    style={betterOffMono}
                  >
                    {month}
                  </span>
                </div>
                <Link
                  href={photo.src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.72rem] uppercase tracking-[0.1em] text-black/40 underline underline-offset-2 transition hover:text-black/70"
                  style={betterOffMono}
                >
                  {sourceLabel} ↗
                </Link>
              </motion.div>

              {/* Large headline */}
              <motion.h2
                className="mt-6 max-w-[14ch] text-[clamp(2.6rem,4.2vw,4rem)] font-[700] uppercase leading-[0.88] tracking-[-0.065em] text-black"
                style={betterOffDisplay}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease, delay: 0.06 }}
              >
                {headline}
              </motion.h2>

              {/* Metadata row */}
              <motion.div
                className="mt-5 flex items-center gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, ease, delay: 0.12 }}
              >
                <span
                  className="text-[0.72rem] uppercase tracking-[0.12em] text-black/50"
                  style={betterOffMono}
                >
                  {primaryLocation}
                </span>
                <span className="h-px w-6 bg-black/20" />
                <span
                  className="text-[0.72rem] uppercase tracking-[0.12em] text-black/50"
                  style={betterOffMono}
                >
                  {photo.year}
                </span>
                <span className="h-px w-6 bg-black/20" />
                <span
                  className="text-[0.72rem] uppercase tracking-[0.12em] text-black/50"
                  style={betterOffMono}
                >
                  {displayIndex}
                </span>
              </motion.div>

              {/* Opening paragraph */}
              <motion.p
                className="mt-7 max-w-[44ch] text-[1.02rem] leading-[1.52] tracking-[-0.022em] text-black/78"
                style={betterOffSans}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease, delay: 0.18 }}
              >
                {paragraphs[0]}
              </motion.p>
            </div>

            {/* ── MAIN IMAGE ── */}
            <div className="mt-12 px-8 lg:px-14">
              <motion.div
                className="overflow-hidden bg-[#ece8dc]"
                style={{ aspectRatio: "4 / 5", maxWidth: "21rem" }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vpLg}
                transition={{ duration: 0.85, ease }}
              >
                <motion.div
                  className="relative h-full w-full"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={vpLg}
                  transition={{ duration: 1.1, ease }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 30vw, 21rem"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>

              <motion.p
                className="mt-3 text-[0.72rem] uppercase tracking-[0.1em] text-black/45"
                style={betterOffMono}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                {category.toUpperCase()} — {month.toUpperCase()} — {photo.year}
              </motion.p>
            </div>

            {/* ── SECOND PARAGRAPH ── */}
            <div className="mt-14 px-8 lg:px-14">
              <motion.p
                className="max-w-[44ch] text-[1.02rem] leading-[1.52] tracking-[-0.022em] text-black/78"
                style={betterOffSans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease }}
              >
                {paragraphs[1]}
              </motion.p>
            </div>

            {/* ── DIVIDER ── */}
            <div className="mt-14 px-8 lg:px-14">
              <motion.div
                className="h-px w-full bg-black/10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
                transition={{ duration: 0.8, ease }}
              />
            </div>

            {/* ── PULL QUOTE ── */}
            <div className="mt-14 px-8 lg:px-14">
              <motion.blockquote
                className="max-w-[28ch] text-[clamp(1.5rem,2.4vw,2.1rem)] font-[500] leading-[1.18] tracking-[-0.04em] text-black"
                style={betterOffSans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.75, ease }}
              >
                &ldquo;{photo.title} — {primaryLocation}, {photo.year}.&rdquo;
              </motion.blockquote>
            </div>

            {/* ── WIDE SUPPORT IMAGE ── */}
            <div className="mt-14 px-8 lg:px-14">
              <motion.div
                className="overflow-hidden bg-[#ece8dc]"
                style={{ aspectRatio: "16 / 9" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vpLg}
                transition={{ duration: 0.9, ease }}
              >
                <motion.div
                  className="relative h-full w-full"
                  initial={{ scale: 1.07 }}
                  whileInView={{ scale: 1 }}
                  viewport={vpLg}
                  transition={{ duration: 1.2, ease }}
                >
                  <Image
                    src={primarySupportPhoto.src}
                    alt={primarySupportPhoto.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 46rem"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* ── THIRD PARAGRAPH ── */}
            <div className="mt-14 px-8 lg:px-14">
              <motion.p
                className="max-w-[44ch] text-[1.02rem] leading-[1.52] tracking-[-0.022em] text-black/78"
                style={betterOffSans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease }}
              >
                {paragraphs[2]}
              </motion.p>
            </div>

            {/* ── SECONDARY SUPPORT IMAGES ── */}
            <div className="mt-14 px-8 pb-20 lg:px-14">
              <div className="flex gap-5">
                {secondarySupportPhotos.map((supportPhoto, index) => (
                  <motion.div
                    key={supportPhoto.id}
                    className="flex-1"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.75, ease, delay: index * 0.1 }}
                  >
                    <div className="overflow-hidden bg-[#ece8dc]">
                      <motion.div
                        className="relative"
                        style={{ aspectRatio: "4 / 3" }}
                        initial={{ scale: 1.06 }}
                        whileInView={{ scale: 1 }}
                        viewport={vp}
                        transition={{
                          duration: 1,
                          ease,
                          delay: index * 0.1,
                        }}
                      >
                        <Image
                          src={supportPhoto.src}
                          alt={supportPhoto.title}
                          fill
                          sizes="(max-width: 1024px) 30vw, 18rem"
                          className="object-cover"
                        />
                      </motion.div>
                    </div>
                    <motion.p
                      className="mt-2 text-[0.72rem] uppercase tracking-[0.08em] text-black/50"
                      style={betterOffMono}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={vp}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: index * 0.1 + 0.1,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")} —{" "}
                      {supportPhoto.title}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div
                className="mt-12 flex items-center justify-between border-t border-black/10 pt-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <p
                  className="text-[0.72rem] uppercase tracking-[0.12em] text-black/40"
                  style={betterOffMono}
                >
                  {displayIndex} · {primaryLocation} · {photo.year}
                </p>
                <p
                  className="text-[0.72rem] uppercase tracking-[0.12em] text-black/40"
                  style={betterOffMono}
                >
                  Lookback Archive
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── MOBILE ── */}
      <section className="border-t border-black/10 bg-white px-4 py-8 md:hidden">
        <div className="flex items-center justify-between text-[0.86rem] tracking-[-0.02em]">
          <Link href="/" className="transition hover:text-black/60">
            Close
          </Link>
          <Link
            href={photo.src}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition hover:text-black/60"
          >
            {sourceLabel} ↗
          </Link>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="bg-[#eadbff] px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#8767ba]">
            {category}
          </span>
          <p className="text-[0.9rem] uppercase tracking-[0.08em] text-black/78">
            ({month})
          </p>
        </div>

        <h2
          className="mt-5 max-w-[10ch] text-[clamp(2.8rem,12vw,4.4rem)] font-[700] uppercase leading-[0.9] tracking-[-0.065em] text-black"
          style={{ fontFamily: '"Host Grotesk", system-ui, sans-serif' }}
        >
          {headline}
        </h2>

        {/* Image 1 — right under the headline */}
        <div
          className="mt-6 overflow-hidden bg-[#ece8dc]"
          style={{ aspectRatio: "4 / 3" }}
        >
          <div className="relative h-full w-full">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Paragraph 1 */}
        <p
          className="mt-6 text-[1rem] leading-[1.42] tracking-[-0.025em] text-black/82"
          style={{ fontFamily: '"Host Grotesk", system-ui, sans-serif' }}
        >
          {paragraphs[0]}
        </p>

        {/* Image 2 — right after paragraph 1 */}
        <div
          className="mt-6 overflow-hidden bg-[#ece8dc]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <div className="relative h-full w-full">
            <Image
              src={primarySupportPhoto.src}
              alt={primarySupportPhoto.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Paragraph 2 */}
        <p
          className="mt-6 text-[1rem] leading-[1.42] tracking-[-0.025em] text-black/82"
          style={{ fontFamily: '"Host Grotesk", system-ui, sans-serif' }}
        >
          {paragraphs[1]}
        </p>

        {/* Images 3 & 4 — two secondary images side by side */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {secondarySupportPhotos.map((supportPhoto, index) => (
            <div key={supportPhoto.id}>
              <div
                className="overflow-hidden bg-[#ece8dc]"
                style={{ aspectRatio: "3 / 2" }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={supportPhoto.src}
                    alt={supportPhoto.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.08em] text-black/72">
                {String(index + 1).padStart(2, "0")} — {supportPhoto.title}
              </p>
            </div>
          ))}
        </div>

        {/* Paragraph 3 */}
        <p
          className="mt-6 text-[1rem] leading-[1.42] tracking-[-0.025em] text-black/82"
          style={{ fontFamily: '"Host Grotesk", system-ui, sans-serif' }}
        >
          {paragraphs[2]}
        </p>

        <div className="mt-7 border-t border-black/10 pt-3">
          <p className="text-[0.72rem] uppercase tracking-[0.12em] text-black/72">
            {displayIndex} · {primaryLocation} · {photo.year}
          </p>
        </div>
      </section>
    </>
  );
}
