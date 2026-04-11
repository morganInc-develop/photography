"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";

type Props = {
  scopeRef: RefObject<HTMLElement | null>;
  rightColumnRef: RefObject<HTMLElement | null>;
  photoId: string;
};

export function ArticleEntrance({ scopeRef, rightColumnRef, photoId }: Props) {
  const hasMounted = useRef(false);

  useEffect(() => {
    const isInitialMount = !hasMounted.current;
    const scope = isInitialMount ? scopeRef.current : rightColumnRef.current;

    hasMounted.current = true;

    if (!scope) {
      return;
    }

    const context = gsap.context(() => {
      if (isInitialMount) {
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

        return;
      }

      const selector =
        "[data-article-visual], [data-article-meta], [data-article-title], [data-article-copy]";

      gsap
        .timeline()
        .to(selector, {
          autoAlpha: 0,
          y: -8,
          duration: 0.18,
          ease: "power1.in",
        })
        .to(selector, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
        });
    }, scope);

    return () => {
      context.revert();
    };
  }, [photoId, rightColumnRef, scopeRef]);

  return null;
}
