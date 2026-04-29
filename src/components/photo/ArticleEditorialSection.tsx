"use client";

import { ArchiveVideoPlayer } from "@/components/photo/ArchiveVideoPlayer";
import { PhotoLoader } from "@/components/photo/PhotoLoader";
import {
  getCollectionVideos,
  type ArchiveCollection,
  type ArchivePhoto,
} from "@/lib/archive/types";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  collection: ArchiveCollection;
  photos: ArchivePhoto[];
  photo: ArchivePhoto;
  nextPhoto: ArchivePhoto;
  currentIndex: number;
  displayIndex: string;
  totalCountLabel: string;
};

function getEditorialParagraphs(
  collection: ArchiveCollection,
  photo: ArchivePhoto,
) {
  return [collection.intro, photo.description, collection.outro];
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
  collection,
  photos,
  photo,
  nextPhoto,
  currentIndex,
  displayIndex,
  totalCountLabel,
}: Props) {
  const [loadedMainImageId, setLoadedMainImageId] = useState<string | null>(
    null,
  );
  const mainImageLoaded = loadedMainImageId === photo.id;

  const paragraphs = getEditorialParagraphs(collection, photo);
  const videos = getCollectionVideos(collection);
  const supportingPhotos = [
    photos[(currentIndex + 2) % photos.length],
    photos[(currentIndex + 3) % photos.length],
    photos[(currentIndex + 4) % photos.length],
  ];
  const primarySupportPhoto = supportingPhotos[0] ?? nextPhoto;
  const secondarySupportPhotos = supportingPhotos.slice(1);

  return (
    <>
      <section className="hidden bg-white md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="px-8 pt-12 lg:px-14 lg:pt-16">
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
                    {collection.tag}
                  </span>
                  <span
                    className="text-[0.72rem] uppercase tracking-[0.1em] text-black/40"
                    style={betterOffMono}
                  >
                    {displayIndex} / {totalCountLabel}
                  </span>
                </div>
                <Link
                  href={photo.src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.72rem] uppercase tracking-[0.1em] text-black/40 underline underline-offset-2 transition hover:text-black/70"
                  style={betterOffMono}
                >
                  open frame ↗
                </Link>
              </motion.div>

              <motion.h2
                className="mt-6 max-w-[14ch] text-[clamp(2.6rem,4.2vw,4rem)] font-[700] uppercase leading-[0.88] tracking-[-0.065em] text-black"
                style={betterOffDisplay}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.65, ease, delay: 0.06 }}
              >
                {collection.headline}
              </motion.h2>

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
                  {collection.location}
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

            <div className="mt-12 px-8 lg:px-14">
              <motion.div
                className="relative overflow-hidden bg-[#ece8dc]"
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
                    onLoad={() => setLoadedMainImageId(photo.id)}
                  />
                </motion.div>
                <PhotoLoader loading={!mainImageLoaded} />
              </motion.div>

              <motion.p
                className="mt-2 text-[0.72rem] uppercase tracking-[0.08em] text-black/50"
                style={betterOffMono}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                {photo.title.toUpperCase()} — {collection.name.toUpperCase()} —{" "}
                {photo.year}
              </motion.p>
            </div>

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

            <div className="mt-14 px-8 lg:px-14">
              <motion.blockquote
                className="max-w-[28ch] text-[clamp(1.5rem,2.4vw,2.1rem)] font-[500] leading-[1.18] tracking-[-0.04em] text-black"
                style={betterOffSans}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.75, ease }}
              >
                &ldquo;{photo.title} — {collection.location}, {photo.year}
                .&rdquo;
              </motion.blockquote>
            </div>

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
                  {displayIndex} · {collection.location} · {photo.year}
                </p>
                <p
                  className="text-[0.72rem] uppercase tracking-[0.12em] text-black/40"
                  style={betterOffMono}
                >
                  personal archive
                </p>
              </motion.div>

              {videos.length
                ? videos.map((video, index) => (
                    <motion.div
                      key={video.src}
                      className="mt-14 w-full overflow-hidden bg-black"
                      style={{ aspectRatio: "16/9" }}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={vpLg}
                      transition={{
                        duration: 0.85,
                        ease,
                        delay: index * 0.05,
                      }}
                    >
                      <ArchiveVideoPlayer
                        video={video}
                        className="h-full w-full border-0"
                      />
                    </motion.div>
                  ))
                : null}

              {collection.links?.length ? (
                <motion.div
                  className="mt-8 flex flex-wrap gap-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {collection.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-b border-black/30 pb-0.5 text-[0.68rem] uppercase tracking-[0.16em] text-black/60 transition-colors duration-200 hover:text-black"
                      style={betterOffMono}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

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
            open frame ↗
          </Link>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="bg-[#f1ebe0] px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-black/78">
            {collection.tag}
          </span>
          <p className="text-[0.9rem] uppercase tracking-[0.08em] text-black/78">
            ({displayIndex} / {totalCountLabel})
          </p>
        </div>

        <h2
          className="mt-5 max-w-[10ch] text-[clamp(2.8rem,12vw,4.4rem)] font-[700] uppercase leading-[0.9] tracking-[-0.065em] text-black"
          style={betterOffDisplay}
        >
          {collection.headline}
        </h2>

        <div
          className="relative mt-6 overflow-hidden bg-[#ece8dc]"
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
          <PhotoLoader loading={!mainImageLoaded} />
        </div>

        <p
          className="mt-6 text-[1rem] leading-[1.42] tracking-[-0.025em] text-black/82"
          style={betterOffSans}
        >
          {paragraphs[0]}
        </p>

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

        <p
          className="mt-6 text-[1rem] leading-[1.42] tracking-[-0.025em] text-black/82"
          style={betterOffSans}
        >
          {paragraphs[1]}
        </p>

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

        <p
          className="mt-6 text-[1rem] leading-[1.42] tracking-[-0.025em] text-black/82"
          style={betterOffSans}
        >
          {paragraphs[2]}
        </p>

        <div className="mt-7 border-t border-black/10 pt-3">
          <p className="text-[0.72rem] uppercase tracking-[0.12em] text-black/72">
            {displayIndex} · {collection.location} · {photo.year}
          </p>
        </div>

        {videos.length
          ? videos.map((video) => (
              <div
                key={video.src}
                className="mt-8 w-full overflow-hidden bg-black"
                style={{ aspectRatio: "16/9" }}
              >
                <ArchiveVideoPlayer
                  video={video}
                  className="h-full w-full border-0"
                />
              </div>
            ))
          : null}

        {collection.links?.length ? (
          <div className="mt-6 flex flex-wrap gap-4">
            {collection.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="border-b border-black/30 pb-0.5 text-[0.68rem] uppercase tracking-[0.16em] text-black/60 transition-colors duration-200 active:text-black"
                style={betterOffMono}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}
