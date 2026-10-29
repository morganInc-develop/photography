import type { ArchiveProject } from "@/components/archive/archive-data";
import { ARCHIVE_PROJECTS } from "@/components/archive/archive-data";
import ArchiveClock from "@/components/archive/ArchiveClock";
import { ArchiveVideoPlayer } from "@/components/photo/ArchiveVideoPlayer";
import { getArchiveWebImage } from "@/lib/archive/archive-image";
import Image from "next/image";
import Link from "next/link";

type Props = { project: ArchiveProject };

export default function WorksProject({ project }: Props) {
  const totalCount = String(ARCHIVE_PROJECTS.length).padStart(3, "0");

  return (
    <>
      <div className="works-project">
        {/* ── BACKGROUND ── */}
        <div className="works-project__background">
          <Image
            src={getArchiveWebImage(project.coverImage)}
            alt=""
            fill
            preload
            sizes="100vw"
            unoptimized
            className="works-project__background-image works-project__background-image--soft"
          />
          <Image
            src={getArchiveWebImage(project.coverImage)}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="works-project__background-image works-project__background-image--sharp"
          />
          <div className="works-project__background-wash" />
          <div className="works-project__background-vignette" />
          <div className="works-project__background-lines" />
        </div>

        {/* ── TOPBAR ── */}
        <header className="works-project__topbar">
          <div className="works-project__back">
            <Link href="/the-archive" className="link-group is--dark">
              <p data-underline-link="alt" className="paragraph">
                ← back to archive
              </p>
            </Link>
            <div className="works-project__clock">
              <ArchiveClock />
            </div>
          </div>
          <p className="works-project__blurb">{project.description}</p>
        </header>

        {/* ── FLOATING MICRO LABELS ── */}
        <div className="works-project__micro works-project__micro--center">
          <p className="paragraph">
            {project.index} / {totalCount}
          </p>
        </div>
        <div className="works-project__micro works-project__micro--right">
          <p className="paragraph">GBA™ Studio</p>
        </div>

        {/* ── FOREGROUND TITLE ── */}
        <div className="works-project__foreground">
          <p className="works-project__hint paragraph">scroll to explore ↓</p>
          <div className="works-project__title-stage">
            <div className="works-project__title-layer">
              <h1 className="works-project__title-line">{project.name}</h1>
              <p className="works-project__title-line" aria-hidden="true">
                {project.name}
              </p>
              <p className="works-project__title-line" aria-hidden="true">
                {project.name}
              </p>
              <p className="works-project__title-line" aria-hidden="true">
                {project.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── COLLAGE ── */}
      <style>{`
        .archive-collage-item img {
          filter: grayscale(100%);
          transition: filter 0.4s ease;
        }
        .archive-collage-item:hover img {
          filter: none;
        }
        .works-project__video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          background: #000;
          border: 0;
        }
      `}</style>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "3px",
          background: "#000",
          padding: "3px",
        }}
      >
        {project.images.map((src, i) => (
          <div
            key={src}
            className="archive-collage-item"
            style={{
              position: "relative",
              aspectRatio: "3/2",
              overflow: "hidden",
              gridColumn: i === 0 || i % 7 === 0 ? "span 2" : undefined,
            }}
          >
            <Image
              src={getArchiveWebImage(src)}
              alt={`${project.name} — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
              className="img is--cover"
            />
          </div>
        ))}
      </section>

      {/* ── ARTIST INFO ── */}
      {project.videoEmbedSrc ||
      project.videos?.length ||
      project.links?.length ? (
        <section
          style={{
            background: "#0a0a0a",
            padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {project.videoEmbedSrc ? (
            <div
              style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}
            >
              <iframe
                src={project.videoEmbedSrc}
                title={`${project.name} — performance`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                }}
              />
            </div>
          ) : null}

          {project.videos?.map((video) => (
            <div
              key={video.src}
              style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}
            >
              <ArchiveVideoPlayer
                video={video}
                className="works-project__video"
                poster={getArchiveWebImage(project.coverImage)}
              />
            </div>
          ))}

          {project.links?.length ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#fff",
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    paddingBottom: "2px",
                    fontFamily:
                      '"SFMono-Regular","IBM Plex Mono","Courier New",monospace',
                    transition: "border-color 0.2s ease",
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  );
}
