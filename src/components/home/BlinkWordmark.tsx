"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function BlinkWordmark() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) {
      return;
    }

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: gsap.utils.random(2, 5),
    });

    tl.to(el, { opacity: 0.7, duration: 0.05, ease: "none" })
      .to(el, { opacity: 1, duration: 0.05, ease: "none" })
      .to(el, { opacity: 0.8, duration: 0.03, ease: "none" })
      .to(el, { opacity: 1, duration: 0.05, ease: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="st__bottom">
      <div className="text__row">
        <h1 ref={headingRef} data-blink-text className="h-h1">
          the artboard™
        </h1>
      </div>
    </div>
  );
}
