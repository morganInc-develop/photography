"use client";

import { ArtboardCanvas } from "@/components/home/ArtboardCanvas";
import { ArtboardDemoPanel } from "@/components/home/ArtboardDemoPanel";
import { BlinkWordmark } from "@/components/home/BlinkWordmark";
import { HomeCursor } from "@/components/home/HomeCursor";
import { HomeLoader } from "@/components/home/HomeLoader";
import { HomeMetaRail } from "@/components/home/HomeMetaRail";
import { LandscapeWarning } from "@/components/home/LandscapeWarning";
import { ProgressiveBlur } from "@/components/home/ProgressiveBlur";
import { ensureSignatureEase } from "@/components/home/gsap-signature";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useCallback, useEffect, useRef, useState } from "react";

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    ensureSignatureEase();
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const splits: SplitText[] = [];
    const animations: gsap.core.Tween[] = [];

    const headings = gsap.utils.toArray<HTMLElement>('[data-split="heading"]');
    headings.forEach((heading) => {
      gsap.set(heading, { autoAlpha: 1 });

      const split = new SplitText(heading, {
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

      const lines = heading.querySelectorAll<HTMLElement>(".mask-line > div");
      animations.push(
        gsap.from(lines, {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: heading,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }),
      );
    });

    return () => {
      animations.forEach((animation) => animation.kill());
      splits.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleLoaderComplete = useCallback(() => {
    if (hasCompletedRef.current) {
      return;
    }
    hasCompletedRef.current = true;
    setLoaderDone(true);
  }, []);

  return (
    <main data-barba="wrapper" className="page-wrapper">
      <div data-barba-namespace="home" data-barba="container" className="app">
        <HomeLoader onComplete={handleLoaderComplete} />
        <ProgressiveBlur />
        <LandscapeWarning />

        <section className="section is--hero">
          <HomeMetaRail />
          <ArtboardCanvas />
          <ArtboardDemoPanel visible={loaderDone} />
          <BlinkWordmark />
        </section>

        <HomeCursor />
      </div>
    </main>
  );
}
