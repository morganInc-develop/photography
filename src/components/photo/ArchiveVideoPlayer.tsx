import type { ArchiveVideo } from "@/lib/archive/types";

type Props = {
  video: ArchiveVideo;
  className?: string;
};

export function ArchiveVideoPlayer({ video, className }: Props) {
  if (video.kind === "embed") {
    return (
      <iframe
        src={video.src}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={className}
      />
    );
  }

  return (
    <video
      controls
      preload="metadata"
      playsInline
      className={className}
      aria-label={video.title}
    >
      <source src={video.src} type={video.mimeType ?? "video/mp4"} />
      Your browser does not support the video tag.
    </video>
  );
}
