"use client";

import {
  DEMO_VIDEO_PLACEHOLDER,
  DEMO_VIDEO_SRC,
} from "@/components/home/home-data";
import { SplitCharButton } from "@/components/ui/SplitCharButton";
import { useEffect, useRef, useState } from "react";

type ArtboardDemoPanelProps = {
  visible: boolean;
};

export function ArtboardDemoPanel({ visible }: ArtboardDemoPanelProps) {
  const overlayVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const open = visible;

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOverlayOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOverlayOpen]);

  useEffect(() => {
    const video = overlayVideoRef.current;
    if (!video) {
      return;
    }

    if (isOverlayOpen) {
      void video.play().catch(() => {
        // Native controls remain available if autoplay is blocked.
      });
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isOverlayOpen]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="hero__tab-wrap" style={{ opacity: visible ? 1 : 0 }}>
        <div className="hero__tab">
          <div className="tab__video">
            <div className="tab__demo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Made Invincible intro poster"
                src={DEMO_VIDEO_PLACEHOLDER}
                className="bunny-bg__poster"
              />

              <div className="bunny-bg__action">
                <SplitCharButton
                  label="PLAY INTRO"
                  onClick={() => setIsOverlayOpen(true)}
                />
              </div>

              <div className="demo-section__fade-left" />
            </div>
          </div>

          <div className="tab__desc">
            <p className="paragraph">
              MADE INVINCIBLE IS A PHOTOGRAPHY AND VIDEOGRAPHY STUDIO CRAFTING
              PORTRAITS, CAMPAIGNS, AND SHORT-FORM FILMS WITH A CINEMATIC,
              EDITORIAL POINT OF VIEW.
              <br />
              <br />
              THIS SPACE HIGHLIGHTS STILL IMAGERY, MOTION WORK, AND VISUAL
              STORYTELLING BUILT FOR ARTISTS, BRANDS, AND PEOPLE WHO WANT
              SOMETHING MORE PERSONAL THAN GENERIC CONTENT.
            </p>
            <SplitCharButton href="" label="BOOK NOW" />
          </div>
        </div>
      </div>

      {isOverlayOpen ? (
        <div
          className="intro-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Made Invincible intro video"
          onClick={() => setIsOverlayOpen(false)}
        >
          <div className="intro-overlay__chrome">
            <SplitCharButton
              label="CLOSE"
              onClick={() => setIsOverlayOpen(false)}
            />
          </div>

          <div
            className="intro-overlay__media"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              ref={overlayVideoRef}
              className="intro-overlay__video"
              src={DEMO_VIDEO_SRC}
              poster={DEMO_VIDEO_PLACEHOLDER}
              playsInline
              controls
              preload="metadata"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
