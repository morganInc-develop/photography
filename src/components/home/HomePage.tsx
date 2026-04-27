"use client";

import { ArtboardCanvas } from "@/components/home/ArtboardCanvas";
import { BlinkWordmark } from "@/components/home/BlinkWordmark";
import { HomeCursor } from "@/components/home/HomeCursor";
import { HomeLoader } from "@/components/home/HomeLoader";
import { HomeMetaRail } from "@/components/home/HomeMetaRail";
import { LandscapeWarning } from "@/components/home/LandscapeWarning";
import { ensureSignatureEase } from "@/components/home/gsap-signature";
import type { ArchivePhoto } from "@/lib/archive/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useCallback, useEffect } from "react";

type HomePageProps = {
  photos: ArchivePhoto[];
};

export default function HomePage({ photos }: HomePageProps) {
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

  const handleLoaderComplete = useCallback(() => {}, []);

  return (
    <main data-barba="wrapper" className="page-wrapper">
      <div data-barba-namespace="home" data-barba="container" className="app">
        <HomeLoader onComplete={handleLoaderComplete} />
        <LandscapeWarning />

        <section className="section is--hero">
          <HomeMetaRail />
          <ArtboardCanvas photos={photos} />
          {/* <ArtboardDemoPanel visible /> */}
          <BlinkWordmark />
        </section>

        <HomeCursor />
      </div>
    </main>
  );
}
