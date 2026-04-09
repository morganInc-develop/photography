"use client";

import {
  ARCHIVE_MANIFESTO,
  ARCHIVE_PROJECTS,
  ARCHIVE_SCRAMBLE_WORDS,
} from "@/components/archive/archive-data";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import ClientsMode from "@/components/archive/ClientsMode";
import GalleryMode from "@/components/archive/GalleryMode";
import MobileWorks from "@/components/archive/MobileWorks";
import WorksControls from "@/components/archive/WorksControls";
import WorksTags from "@/components/archive/WorksTags";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/dist/Observer";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ArchiveMode = "gallery" | "clients";

const LAST_INDEX = ARCHIVE_PROJECTS.length - 1;

export default function ArchivePage() {
  const [mode, setMode] = useState<ArchiveMode>("gallery");
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredClientIndex, setHoveredClientIndex] = useState<number | null>(
    null,
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const minimapRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const scrambleRef = useRef<HTMLSpanElement | null>(null);

  const imagePreviewRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const galleryItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const clientNameWrapRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const clientPreviewWrapperRefs = useRef<Array<HTMLDivElement | null>>([]);

  const activeIndexRef = useRef(0);
  const modeRef = useRef<ArchiveMode>("gallery");
  const targetIndexRef = useRef(0);
  const currentIndexRef = useRef(0);
  const velocityRef = useRef(0);
  const isDesktopRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    modeRef.current = mode;
    if (mode === "gallery") {
      targetIndexRef.current = activeIndexRef.current;
      currentIndexRef.current = activeIndexRef.current;
      velocityRef.current = 0;
    }
  }, [mode]);

  useEffect(() => {
    gsap.registerPlugin(
      ScrollTrigger,
      SplitText,
      CustomEase,
      Observer,
      ScrambleTextPlugin,
    );
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
  }, []);

  useEffect(() => {
    const updateDesktopState = () => {
      const isDesktop = window.innerWidth > 1000;
      isDesktopRef.current = isDesktop;
      document.body.style.overflow = isDesktop ? "hidden" : "";
    };

    document.body.classList.add("is--archive");
    updateDesktopState();
    window.addEventListener("resize", updateDesktopState);

    return () => {
      document.body.classList.remove("is--archive");
      document.body.style.overflow = "";
      window.removeEventListener("resize", updateDesktopState);
    };
  }, []);

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
      const match = value.match(/(\d+):(\d+):(\d+)\s*([\w+]+)/);
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
          const tz = el.getAttribute("data-current-time") ?? "Europe/Amsterdam";
          const formatted = formatter(tz).format(new Date());
          const parsed = parse(formatted);

          if (!parsed) {
            return;
          }

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

          if (hoursEl) {
            hoursEl.textContent = parsed.hours;
          }
          if (minutesEl) {
            minutesEl.textContent = parsed.minutes;
          }
          if (secondsEl) {
            secondsEl.textContent = parsed.seconds;
          }
          if (timezoneEl) {
            timezoneEl.textContent = parsed.timezone;
          }
        });
    };

    update();
    const intervalId = window.setInterval(update, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const targets = root.querySelectorAll<HTMLElement>(
      "[data-button-animate-chars]",
    );
    targets.forEach((el) => {
      if (el.dataset.charsReady === "true") {
        return;
      }

      const text = el.textContent ?? "";
      el.innerHTML = "";
      [...text].forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.transitionDelay = `${0.01 * index}s`;
        if (char === " ") {
          span.style.whiteSpace = "pre";
        }
        el.appendChild(span);
      });

      el.dataset.charsReady = "true";
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const splits: SplitText[] = [];
    const animations: gsap.core.Tween[] = [];

    const headings = root.querySelectorAll<HTMLElement>(
      '[data-split="heading"]',
    );
    headings.forEach((el) => {
      gsap.set(el, { autoAlpha: 1 });

      const split = new SplitText(el, {
        type: "lines",
        linesClass: "mask-line",
      });
      splits.push(split);

      split.lines.forEach((line) => {
        const inner = document.createElement("div");
        inner.style.display = "block";
        while (line.firstChild) {
          inner.appendChild(line.firstChild);
        }
        line.appendChild(inner);
      });

      const lines = el.querySelectorAll<HTMLElement>(".mask-line > div");
      const tween = gsap.from(lines, {
        yPercent: 100,
        duration: 0.85,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      animations.push(tween);
    });

    return () => {
      animations.forEach((animation) => animation.kill());
      splits.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const heading = rootRef.current?.querySelector<HTMLElement>(
      ".archive-blink-heading",
    );
    if (!heading) {
      return;
    }

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: gsap.utils.random(2, 5),
    });
    tl.to(heading, { opacity: 0.7, duration: 0.05, ease: "none" })
      .to(heading, { opacity: 1, duration: 0.05, ease: "none" })
      .to(heading, { opacity: 0.8, duration: 0.03, ease: "none" })
      .to(heading, { opacity: 1, duration: 0.05, ease: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const scrambleTarget = scrambleRef.current;
    if (!scrambleTarget) {
      return;
    }

    let index = 0;
    const intervalId = window.setInterval(() => {
      index = (index + 1) % ARCHIVE_SCRAMBLE_WORDS.length;
      gsap.to(scrambleTarget, {
        duration: 0.8,
        scrambleText: {
          text: ARCHIVE_SCRAMBLE_WORDS[index],
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          speed: 0.5,
        },
      } as gsap.TweenVars);
    }, 2500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (!isDesktopRef.current || modeRef.current !== "gallery") {
        return;
      }

      event.preventDefault();
      velocityRef.current += event.deltaY * 0.003;
    };

    const tick = () => {
      if (!isDesktopRef.current || modeRef.current !== "gallery") {
        return;
      }

      velocityRef.current *= 0.88;
      targetIndexRef.current += velocityRef.current;
      targetIndexRef.current = gsap.utils.clamp(
        0,
        LAST_INDEX,
        targetIndexRef.current,
      );
      currentIndexRef.current +=
        (targetIndexRef.current - currentIndexRef.current) * 0.08;

      const snappedIndex = Math.round(currentIndexRef.current);
      if (snappedIndex !== activeIndexRef.current) {
        activeIndexRef.current = snappedIndex;
        setActiveIndex(snappedIndex);
      }
    };

    gsap.ticker.add(tick);
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    imagePreviewRefs.current.forEach((preview, index) => {
      if (!preview) {
        return;
      }

      gsap.set(preview, {
        autoAlpha: index === activeIndex ? 1 : 0,
        zIndex: index === activeIndex ? 2 : 1,
      });
    });

    const nextImage = imagePreviewRefs.current[activeIndex];
    if (!nextImage) {
      return;
    }

    gsap.fromTo(
      nextImage,
      { clipPath: "inset(50% round 0.2em)" },
      { clipPath: "inset(0% round 0.2em)", duration: 0.9, ease: "power4.out" },
    );
  }, [activeIndex]);

  useEffect(() => {
    if (mode !== "clients") {
      return;
    }

    const wraps = clientNameWrapRefs.current.filter(
      (node): node is HTMLAnchorElement => !!node,
    );
    gsap.set(wraps, { opacity: 0, yPercent: 100 });

    const tween = gsap.to(wraps, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.05,
      duration: 0.7,
      ease: "power3.out",
    });

    return () => {
      tween.kill();
    };
  }, [mode]);

  useEffect(() => {
    const wrappers = clientPreviewWrapperRefs.current;

    wrappers.forEach((wrapper, index) => {
      if (!wrapper) {
        return;
      }

      const image = wrapper.querySelector("img");

      if (mode === "clients" && hoveredClientIndex === index) {
        gsap.to(wrapper, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.5,
          ease: "power4.out",
        });

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.25, opacity: 0.65 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              overwrite: true,
            },
          );
        }

        return;
      }

      gsap.to(wrapper, {
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        duration: 0.35,
        ease: "power2.in",
      });
    });
  }, [hoveredClientIndex, mode]);

  useEffect(() => {
    const headerItems = rootRef.current?.querySelectorAll(
      "[data-archive-header-item]",
    );
    const controls = rootRef.current?.querySelector(
      "[data-archive-enter='controls']",
    );
    const tags = rootRef.current?.querySelector("[data-archive-enter='tags']");
    const minimap = minimapRef.current;
    const activeImage = imagePreviewRefs.current[0];

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headerItems?.length) {
      tl.from(headerItems, { opacity: 0, y: -10, duration: 0.6, stagger: 0.1 });
    }

    if (galleryItemRefs.current.length) {
      tl.from(
        galleryItemRefs.current.filter(
          (node): node is HTMLDivElement => !!node,
        ),
        { opacity: 0, x: -20, duration: 0.7, stagger: 0.05 },
        "-=0.35",
      );
    }

    if (activeImage) {
      tl.fromTo(
        activeImage,
        { clipPath: "inset(50% round 0.2em)" },
        { clipPath: "inset(0% round 0.2em)", duration: 1, ease: "power4.out" },
        "-=0.45",
      );
    }

    if (minimap) {
      tl.from(minimap, { opacity: 0, x: 20, duration: 0.6 }, "-=0.7");
    }

    tl.from(
      [controls, tags].filter(Boolean),
      { opacity: 0, duration: 0.5 },
      "-=0.35",
    );

    return () => {
      tl.kill();
    };
  }, []);

  const selectIndex = (index: number) => {
    const next = gsap.utils.clamp(0, LAST_INDEX, index);
    targetIndexRef.current = next;
    currentIndexRef.current = next;
    velocityRef.current = 0;

    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  };

  return (
    <main className="page-wrapper archive-page" ref={rootRef}>
      <div className="archive-app">
        <section className="section is--works">
          <ArchiveHeader />

          <div className="works__tr is--def">
            <p
              data-split="heading"
              className="paragraph is--medium is--archive"
            >
              {ARCHIVE_MANIFESTO} <span ref={scrambleRef}>PRACTICE</span>.
            </p>

            <div className="text__col is--dark is--archive">
              <Link href="/" className="link-group is--dark">
                <p data-underline-link className="paragraph">
                  back to works
                </p>
              </Link>
            </div>
          </div>

          <GalleryMode
            mode={mode}
            projects={ARCHIVE_PROJECTS}
            activeIndex={activeIndex}
            onSelect={selectIndex}
            imagePreviewRefs={imagePreviewRefs}
            galleryItemRefs={galleryItemRefs}
            minimapRef={minimapRef}
            indicatorRef={indicatorRef}
          />

          <ClientsMode
            mode={mode}
            projects={ARCHIVE_PROJECTS}
            onHoverStart={setHoveredClientIndex}
            onHoverEnd={() => setHoveredClientIndex(null)}
            nameWrapRefs={clientNameWrapRefs}
            previewWrapperRefs={clientPreviewWrapperRefs}
          />

          <WorksControls mode={mode} setMode={setMode} />
          <WorksTags />
        </section>

        <MobileWorks projects={ARCHIVE_PROJECTS} />
      </div>
    </main>
  );
}
