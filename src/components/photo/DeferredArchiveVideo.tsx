"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  className?: string;
  poster?: string;
};

export function DeferredArchiveVideo({
  src,
  title,
  className,
  poster,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [preload, setPreload] = useState<"none" | "metadata" | "auto">(
    "none",
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const connection = (
      navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      }
    ).connection;
    const reducedData =
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (!("IntersectionObserver" in window)) {
      setPreload(reducedData ? "metadata" : "auto");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPreload(reducedData ? "metadata" : "auto");
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      preload={preload}
      playsInline
      className={className}
      aria-label={title}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
