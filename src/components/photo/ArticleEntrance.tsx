"use client";

import { gsap } from "gsap";
import { useEffect, type RefObject } from "react";

type Props = {
  scopeRef: RefObject<HTMLElement | null>;
  photoId: string;
};

export function ArticleEntrance({ scopeRef, photoId }: Props) {
  useEffect(() => {
    if (!scopeRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set("[data-article-control]", { autoAlpha: 0 });
      gsap.set("[data-article-visual]", { autoAlpha: 0, y: 18 });
      gsap.set("[data-article-meta]", { autoAlpha: 0, y: 8 });
      gsap.set("[data-article-title]", { autoAlpha: 0, y: 16 });
      gsap.set("[data-article-copy]", { autoAlpha: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      timeline
        .to("[data-article-control]", {
          autoAlpha: 1,
          duration: 0.3,
          stagger: 0.04,
        })
        .to(
          "[data-article-visual]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          0.05,
        )
        .to(
          "[data-article-meta]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          },
          0.18,
        )
        .to(
          "[data-article-title]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
          },
          0.28,
        )
        .to(
          "[data-article-copy]",
          {
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.05,
          },
          0.46,
        );
    }, scopeRef);

    return () => {
      context.revert();
    };
  }, [photoId, scopeRef]);

  return null;
}
