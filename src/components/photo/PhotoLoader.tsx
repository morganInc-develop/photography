"use client";

import { ensureSignatureEase } from "@/components/home/gsap-signature";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type PhotoLoaderProps = {
  loading: boolean;
};

export function PhotoLoader({ loading }: PhotoLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    ensureSignatureEase();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (loading) {
      const countEl = root.querySelector<HTMLElement>("[data-pl-count]");
      const lineFill = root.querySelector<HTMLElement>("[data-pl-line]");
      if (!countEl || !lineFill) return;

      gsap.set(root, { display: "flex", opacity: 1, pointerEvents: "none" });
      gsap.set(lineFill, { scaleX: 0.05, transformOrigin: "0% 50%" });

      const counter = { val: 0 };
      const tl = gsap.timeline({ defaults: { ease: "signature" } });
      tlRef.current = tl;

      tl.to(
        counter,
        {
          val: 100,
          duration: 2.2,
          ease: "none",
          onUpdate: () => {
            const v = Math.floor(counter.val);
            countEl.textContent = String(v);
            gsap.set(lineFill, { scaleX: Math.max(0.05, v / 100) });
          },
        },
        0,
      );
    } else {
      const tl = gsap.timeline();
      tlRef.current = tl;
      tl.to(root, { opacity: 0, duration: 0.4 });
      tl.set(root, { display: "none", pointerEvents: "none" });
    }

    return () => {
      tlRef.current?.kill();
    };
  }, [loading]);

  return (
    <div
      ref={rootRef}
      style={{ display: "none" }}
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end gap-3 bg-black/72 pb-5 backdrop-blur-[2px]"
    >
      <p
        data-pl-count
        className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/60"
      >
        0
      </p>
      <div className="w-[60%] overflow-hidden">
        <div data-pl-line className="h-px w-full origin-left bg-white/50" />
      </div>
    </div>
  );
}
