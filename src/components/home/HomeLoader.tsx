"use client";

import {
  LOADER_MANIFESTO,
  PRELOADER_IMAGES,
} from "@/components/home/home-data";
import { ensureSignatureEase } from "@/components/home/gsap-signature";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

type HomeLoaderProps = {
  onComplete: () => void;
};

const HOME_LOADER_SEEN_KEY = "made-invincible-home-loader-seen";

export function HomeLoader({ onComplete }: HomeLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const skipAnimationRef = useRef(false);

  const chars = useMemo(() => [...LOADER_MANIFESTO], []);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    try {
      if (window.sessionStorage.getItem(HOME_LOADER_SEEN_KEY) === "true") {
        skipAnimationRef.current = true;
        gsap.set(root, { display: "none", opacity: 0, pointerEvents: "none" });

        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current();
        }
        return;
      }

      window.sessionStorage.setItem(HOME_LOADER_SEEN_KEY, "true");
    } catch {
      // Fall back to the normal animation if storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (skipAnimationRef.current) {
      return;
    }

    const root = rootRef.current;
    if (!root) {
      return;
    }

    ensureSignatureEase();

    const images = Array.from(
      root.querySelectorAll<HTMLElement>("[data-load-img]"),
    );
    const countEl = root.querySelector<HTMLElement>("[data-count]");
    const lineWrap = root.querySelector<HTMLElement>(".preloader__line");
    const lineFill = root.querySelector<HTMLElement>(".line__animate");
    const textWrap = root.querySelector<HTMLElement>("[data-load-text]");
    const charsEls = Array.from(root.querySelectorAll<HTMLElement>(".st-char"));

    if (!countEl || !lineFill) {
      return;
    }

    const counter = { val: 0 };

    gsap.set(root, { display: "flex", opacity: 1 });
    gsap.set(lineFill, { scaleX: 0.07, transformOrigin: "0% 50%" });
    gsap.set(charsEls, { opacity: 0 });
    gsap.set(images, { clipPath: "inset(0 0 100% 0)" });

    const timeline = gsap.timeline({
      defaults: { ease: "signature" },
      onComplete: () => {
        if (completedRef.current) {
          return;
        }
        completedRef.current = true;
        onCompleteRef.current();
      },
    });

    timeline.to(
      counter,
      {
        val: 100,
        duration: 2.5,
        ease: "none",
        onUpdate: () => {
          const value = Math.floor(counter.val);
          countEl.textContent = String(value);
          gsap.set(lineFill, { scaleX: Math.max(0.07, value / 100) });
        },
      },
      0,
    );

    timeline.to(
      charsEls,
      {
        opacity: 1,
        duration: 0.1,
        ease: "none",
        stagger: 0.01,
      },
      0.3,
    );

    images.forEach((image, index) => {
      timeline.to(
        image,
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
        },
        0.5 + index * 0.3,
      );
    });

    timeline.to(
      [lineWrap, countEl, textWrap].filter(Boolean),
      { opacity: 0, duration: 0.4 },
      2.6,
    );

    timeline.to(
      root,
      {
        opacity: 0,
        duration: 0.4,
      },
      3,
    );

    timeline.set(root, { display: "none", pointerEvents: "none" });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="preloader">
      <div className="preloader__content">
        <div data-load-wrap className="preloader__img-wrap">
          {PRELOADER_IMAGES.map((src, index) => (
            <div
              key={src}
              data-load-img
              className="pi__img"
              style={{ zIndex: index + 1 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={src} className="img is--cover" />
            </div>
          ))}
        </div>

        <div className="preloader__counter-wrap">
          <div data-count className="paragraph counter-element">
            0
          </div>
          <div className="preloader__line">
            <div className="line__animate" />
          </div>
        </div>

        <div className="preloader__intro-wrap">
          <div
            data-load-text
            className="iw__text"
            aria-label={LOADER_MANIFESTO}
          >
            <div className="paragraph">
              {chars.map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="st-char"
                  aria-hidden="true"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
