"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  previousHref: string;
  nextHref: string;
};

const WHEEL_THRESHOLD = 45;
const SWIPE_THRESHOLD = 56;
const DRAG_THRESHOLD = 56;
const NAVIGATION_COOLDOWN_MS = 700;

export function PhotoCarouselNavigator({ previousHref, nextHref }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const touchStartX = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const hasDragged = useRef(false);
  const lastNavigationAt = useRef(0);

  useEffect(() => {
    const canNavigate = () =>
      Date.now() - lastNavigationAt.current > NAVIGATION_COOLDOWN_MS;

    const navigateTo = (href: string) => {
      if (!canNavigate() || href === pathname) {
        return;
      }
      lastNavigationAt.current = Date.now();
      router.push(href);
    };

    // ── Horizontal trackpad / mouse wheel ──────────────────────────────────
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < WHEEL_THRESHOLD) {
        return;
      }
      if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
        return;
      }
      navigateTo(event.deltaX > 0 ? nextHref : previousHref);
    };

    // ── Mouse drag ─────────────────────────────────────────────────────────
    const onMouseDown = (event: MouseEvent) => {
      dragStartX.current = event.clientX;
      hasDragged.current = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (dragStartX.current === null) return;
      if (Math.abs(event.clientX - dragStartX.current) > 4) {
        hasDragged.current = true;
      }
    };

    const onMouseUp = (event: MouseEvent) => {
      const startX = dragStartX.current;
      dragStartX.current = null;

      if (startX === null || !hasDragged.current) return;

      const deltaX = event.clientX - startX;
      if (Math.abs(deltaX) < DRAG_THRESHOLD) return;

      navigateTo(deltaX < 0 ? nextHref : previousHref);
    };

    // ── Touch swipe ────────────────────────────────────────────────────────
    const onTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const startX = touchStartX.current;
      const endX = event.changedTouches[0]?.clientX;

      touchStartX.current = null;

      if (startX == null || endX == null) {
        return;
      }

      const deltaX = endX - startX;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
        return;
      }

      navigateTo(deltaX < 0 ? nextHref : previousHref);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [nextHref, pathname, previousHref, router]);

  return null;
}
