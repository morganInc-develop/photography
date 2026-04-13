"use client";

import { useEffect, useRef } from "react";

interface ChromaKeyVideoProps {
  src: string;
  /** Green screen similarity threshold, 0–255. Default: 80 */
  threshold?: number;
  className?: string;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
}

/**
 * Renders a video with green-screen removed via per-frame canvas pixel keying.
 * Transparent pixels show through whatever is behind the canvas.
 */
export default function ChromaKeyVideo({
  src,
  threshold = 80,
  className,
  loop = true,
  autoPlay = true,
  muted = true,
}: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    function processFrame() {
      if (!video || !canvas || !ctx) return;
      if (video.readyState < video.HAVE_CURRENT_DATA) {
        rafRef.current = requestAnimationFrame(processFrame);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Key out pixels where green dominates by at least `threshold`
        if (g - r > threshold && g - b > threshold) {
          data[i + 3] = 0; // transparent
        }
      }

      ctx.putImageData(frame, 0, 0);
      rafRef.current = requestAnimationFrame(processFrame);
    }

    function onCanPlay() {
      if (autoPlay) void video?.play().catch(() => {});
      rafRef.current = requestAnimationFrame(processFrame);
    }

    video.addEventListener("canplay", onCanPlay);
    // If already ready
    if (video.readyState >= video.HAVE_CURRENT_DATA) onCanPlay();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      cancelAnimationFrame(rafRef.current);
    };
  }, [src, threshold, autoPlay]);

  return (
    <div className={className}>
      {/* Hidden source video */}
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted={muted}
        playsInline
        style={{ display: "none" }}
        crossOrigin="anonymous"
      />
      {/* Composited output — scales to natural video aspect ratio */}
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </div>
  );
}
