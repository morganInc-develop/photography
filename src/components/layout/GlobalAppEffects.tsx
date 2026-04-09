"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function GlobalAppEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      gestureOrientation: "vertical",
      orientation: "vertical",
      smoothWheel: true,
    });

    let rafId = 0;

    const onFrame = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(onFrame);
    };

    rafId = window.requestAnimationFrame(onFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is--home", pathname === "/");
    document.body.classList.toggle("is--photo", pathname.startsWith("/photo/"));
    return () => {
      document.body.classList.remove("is--home");
      document.body.classList.remove("is--photo");
    };
  }, [pathname]);

  return null;
}
