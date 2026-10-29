import type { ArchiveVideo } from "@/lib/archive/types";
import { DeferredArchiveVideo } from "@/components/photo/DeferredArchiveVideo";

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
    <DeferredArchiveVideo
      src={video.src}
      title={video.title}
      className={className}
      poster={poster}
    />
  );
}
