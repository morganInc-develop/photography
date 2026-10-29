import type { ArchiveVideo } from "@/lib/archive/types";

type Props = {
  video: ArchiveVideo;
  className?: string;
  poster?: string;
};

export function ArchiveVideoPlayer({ video, className, poster }: Props) {
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
      preload="none"
      playsInline
      className={className}
      aria-label={video.title}
      poster={poster}
    >
      <source src={video.src} type={video.mimeType ?? "video/mp4"} />
      Your browser does not support the video tag.
    </video>
  );
}
