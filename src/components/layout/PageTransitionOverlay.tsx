"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransitionOverlay() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Skip on initial mount - do not cover the preloader
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      return;
    }

    // Only animate on subsequent navigations
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      const timerIn = window.setTimeout(() => setAnimating(true), 0);
      const timerOut = window.setTimeout(() => setAnimating(false), 650);
      return () => {
        window.clearTimeout(timerIn);
        window.clearTimeout(timerOut);
      };
    }
  }, [pathname]);

  if (!animating) {
    return null;
  }

  return (
    <div
      className="page-transition is-active is-animating"
      aria-hidden="true"
    />
  );
}
