"use client";

import { useEffect, useRef } from "react";

export function HomeCursor() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor");
    if (!cursor) {
      return;
    }

    const allLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a"),
    );

    let scrollTimeout: number | null = null;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.05;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleScroll = () => {
      cursor.classList.add("cursor--hidden");
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        cursor.classList.remove("cursor--hidden");
      }, 150);
    };

    const onEnter = () => cursor.classList.add("cursor--hidden");
    const onLeave = () => cursor.classList.remove("cursor--hidden");

    allLinks.forEach((link) => {
      if (!link.classList.contains("js-plane-link")) {
        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
      }
    });

    const animate = () => {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      const x = cursorX - cursor.offsetWidth / 2;
      const y = cursorY - cursor.offsetHeight / 2;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    animate();

    return () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      allLinks.forEach((link) => {
        if (!link.classList.contains("js-plane-link")) {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        }
      });

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  return (
    <div className="cursor">
      <div className="paragraph">SCROLL OR CLICK</div>
    </div>
  );
}
