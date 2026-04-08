"use client";

import {
  DEMO_VIDEO_PLACEHOLDER,
  DEMO_VIDEO_SRC,
} from "@/components/home/home-data";
import { SplitCharButton } from "@/components/ui/SplitCharButton";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type ArtboardDemoPanelProps = {
  visible: boolean;
};

export function ArtboardDemoPanel({ visible }: ArtboardDemoPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "paused" | "ready">("idle");
  const open = visible && !dismissed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !open) {
      return;
    }

    let hls: Hls | null = null;

    const playSafely = () => {
      setStatus("loading");
      video.play().catch(() => {
        setStatus("ready");
      });
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = DEMO_VIDEO_SRC;
      video.addEventListener("loadedmetadata", playSafely, { once: true });
    } else if (Hls.isSupported()) {
      hls = new Hls({ maxBufferLength: 10 });
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => hls?.loadSource(DEMO_VIDEO_SRC));
      hls.on(Hls.Events.MANIFEST_PARSED, playSafely);
    } else {
      video.src = DEMO_VIDEO_SRC;
      playSafely();
    }

    const onPlay = () => setStatus("playing");
    const onPause = () => setStatus("paused");
    const onWaiting = () => setStatus("loading");
    const onCanPlay = () => setStatus("ready");

    video.addEventListener("play", onPlay);
    video.addEventListener("playing", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && open) {
          playSafely();
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("playing", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);

      if (hls) {
        hls.destroy();
      }
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="hero__tab-wrap" style={{ opacity: visible ? 1 : 0 }}>
      <div className="hero__tab">
        <div className="tab__video">
          <div className="tab__demo">
            <div
              data-bunny-background-init
              data-player-activated={status === "playing" ? "true" : "false"}
              data-player-src={DEMO_VIDEO_SRC}
              data-player-status={status}
              className="bunny-bg"
            >
              <video
                ref={videoRef}
                preload="auto"
                width={1920}
                height={1080}
                playsInline
                muted
                loop
                className="bunny-bg__video"
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width="auto"
                loading="lazy"
                alt="Nicola Romei Digital Designer portfolio experience explanation"
                src={DEMO_VIDEO_PLACEHOLDER}
                className="bunny-bg__placeholder"
              />

              <div className="bunny-bg__loading" aria-hidden={status !== "loading"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="bunny-bg__loading-svg"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                  >
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="rotate"
                      dur="1s"
                      from="0 50 50"
                      to="360 50 50"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
            </div>

            <div className="demo-section__fade-left" />
          </div>
        </div>

        <div className="tab__desc">
          <p className="paragraph">
            SCROLL / DRAG TO INTERACT W/ THE ARTBOARD or click on the grid to explore the archive.
            <br />
            <br />
            THE ARTBOARD SERVES AS A STRUCTURED ENVIRONMENT WHERE CREATIONS, SYSTEMS, AND DESIGN
            RESEARCH ACCUMULATED OVER TIME ARE ORGANIZED, PRESERVED, AND CONTINUOUSLY REVISITED.
          </p>
          <SplitCharButton label="CLOSE" onClick={() => setDismissed(true)} />
        </div>
      </div>
    </div>
  );
}
