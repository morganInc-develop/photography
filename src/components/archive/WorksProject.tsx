"use client";

import type { ArchiveProject } from "@/components/archive/archive-data";
import { ARCHIVE_PROJECTS } from "@/components/archive/archive-data";
import { CustomEase } from "gsap/CustomEase";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Props = { project: ArchiveProject };

export default function WorksProject({ project }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

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
          const h = el.querySelector<HTMLElement>("[data-current-time-hours]");
          const min = el.querySelector<HTMLElement>(
            "[data-current-time-minutes]",
          );
          const s = el.querySelector<HTMLElement>(
            "[data-current-time-seconds]",
          );
          const tzEl = el.querySelector<HTMLElement>(
            "[data-current-time-timezone]",
          );
          if (h) h.textContent = parsed.hours;
          if (min) min.textContent = parsed.minutes;
          if (s) s.textContent = parsed.seconds;
          if (tzEl) tzEl.textContent = parsed.timezone;
        });
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const bg = root.querySelector(".works-project__background");
      const topbar = root.querySelector(".works-project__topbar");
      const micros = root.querySelectorAll<HTMLElement>(
        ".works-project__micro",
      );
      const hint = root.querySelector<HTMLElement>(".works-project__hint");
      const titleLines = root.querySelectorAll<HTMLElement>(
        ".works-project__title-line",
      );

      gsap.set([bg, topbar, hint], { autoAlpha: 0 });
      gsap.set(Array.from(micros), { autoAlpha: 0 });
      gsap.set(Array.from(titleLines), { y: 56, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(bg, { autoAlpha: 1, duration: 1.4, ease: "power2.out" })
        .to(topbar, { autoAlpha: 1, duration: 0.6 }, "-=0.8")
        .to(
          Array.from(micros),
          { autoAlpha: 1, duration: 0.5, stagger: 0.12 },
          "-=0.45",
        )
        .to(
          Array.from(titleLines),
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.07,
            ease: "power4.out",
          },
          "-=0.55",
        )
        .to(hint, { autoAlpha: 1, duration: 0.5 }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, []);

  const totalCount = String(ARCHIVE_PROJECTS.length).padStart(3, "0");

  return (
    <>
      <div className="works-project" ref={rootRef}>
        {/* ── BACKGROUND ── */}
        <div className="works-project__background">
          <Image
            src={project.coverImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="works-project__background-image works-project__background-image--soft"
          />
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="100vw"
            className="works-project__background-image works-project__background-image--sharp"
          />
          <div className="works-project__background-wash" />
          <div className="works-project__background-vignette" />
          <div className="works-project__background-lines" />
        </div>

        {/* ── TOPBAR ── */}
        <header className="works-project__topbar">
          <div className="works-project__back">
            <Link href="/the-archive" className="link-group is--dark">
              <p data-underline-link="alt" className="paragraph">
                ← back to archive
              </p>
            </Link>
            <div className="works-project__clock">
              <p data-current-time="America/New_York" className="paragraph">
                <span data-current-time-hours>00</span>:
                <span data-current-time-minutes>00</span>:
                <span data-current-time-seconds>00</span>{" "}
                <span data-current-time-timezone>ET</span>
              </p>
            </div>
          </div>
          <p className="works-project__blurb">{project.description}</p>
        </header>

        {/* ── FLOATING MICRO LABELS ── */}
        <div className="works-project__micro works-project__micro--center">
          <p className="paragraph">
            {project.index} / {totalCount}
          </p>
        </div>
        <div className="works-project__micro works-project__micro--right">
          <p className="paragraph">GBA™ Studio</p>
        </div>

        {/* ── FOREGROUND TITLE ── */}
        <div className="works-project__foreground">
          <p className="works-project__hint paragraph">scroll to explore ↓</p>
          <div className="works-project__title-stage">
            <div className="works-project__title-layer">
              <h1 className="works-project__title-line">{project.name}</h1>
              <p className="works-project__title-line" aria-hidden="true">
                {project.name}
              </p>
              <p className="works-project__title-line" aria-hidden="true">
                {project.name}
              </p>
              <p className="works-project__title-line" aria-hidden="true">
                {project.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── COLLAGE ── */}
      <style>{`
        .archive-collage-item img {
          filter: grayscale(100%);
          transition: filter 0.4s ease;
        }
        .archive-collage-item:hover img {
          filter: none;
        }
      `}</style>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "3px",
          background: "#000",
          padding: "3px",
        }}
      >
        {project.images.map((src, i) => (
          <div
            key={src}
            className="archive-collage-item"
            style={{
              position: "relative",
              aspectRatio: "3/2",
              overflow: "hidden",
              gridColumn: i === 0 || i % 7 === 0 ? "span 2" : undefined,
            }}
          >
            <Image
              src={src}
              alt={`${project.name} — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="img is--cover"
            />
          </div>
        ))}
      </section>
    </>
  );
}
