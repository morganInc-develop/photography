"use client";

import { usePathname } from "next/navigation";

export function PageTransitionOverlay() {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="page-transition is-active is-animating"
      aria-hidden="true"
    />
  );
}
