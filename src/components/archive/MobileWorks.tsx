import type { ArchiveProject } from "@/components/archive/archive-data";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import Image from "next/image";
import Link from "next/link";

type ArchiveMode = "gallery" | "clients";

type MobileWorksProps = {
  projects: ArchiveProject[];
  mode: ArchiveMode;
  setMode: (mode: ArchiveMode) => void;
};

export default function MobileWorks({
  projects,
  mode,
  setMode,
}: MobileWorksProps) {
  return (
    <section className="section is--mobile">
      <div className="section__works-mobile">
        <ArchiveHeader mobile />

        <div className="wm__title-mobile-wrap">
          <div className="wm__title-mobile">
            <p data-split="heading" className="paragraph is--medium">
              What appears here is not a sequence of outcomes, but a record of
              decisions. Different contexts, different constraints, the same
              insistence on clarity, structure, and presence.
            </p>
            <div className="paragraph is--eyebrow">
              THIS ARCHIVE DOES NOT
              <br />
              COLLECT RESULTS.
              <br />
              IT PRESERVES PROCESS.
            </div>
            <h1
              data-blink-text
              className="h-h1 is--huge is--black archive-blink-heading"
            >
              ( THE ARCHIVE )
            </h1>
          </div>
        </div>

        <div className="works__controls works__controls--mobile">
          <div
            className="wc__wrap"
            role="tablist"
            aria-label="Archive display mode"
          >
            <button
              type="button"
              data-control="gallery"
              className={
                mode === "gallery" ? "controls__left active" : "controls__left"
              }
              aria-pressed={mode === "gallery"}
              onClick={() => setMode("gallery")}
            >
              <p className="paragraph">GALLERY</p>
            </button>
            <button
              type="button"
              data-control="clients"
              className={
                mode === "clients"
                  ? "controls__right active"
                  : "controls__right"
              }
              aria-pressed={mode === "clients"}
              onClick={() => setMode("clients")}
            >
              <p className="paragraph">LIST</p>
            </button>
          </div>
        </div>

        {mode === "gallery" ? (
          <div role="list" className="works__mobile-gallery">
            {projects.map((project) => (
              <div
                key={project.slug}
                role="listitem"
                className="wm__gallery-item"
              >
                <Link
                  href={project.href}
                  aria-label={`Open ${project.name}`}
                  className="wm__gallery-img"
                >
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    sizes="50vw"
                    className="img is--cover"
                  />
                </Link>
                <div className="wm__gallery-label">
                  <p className="paragraph">({project.index})</p>
                  <p className="paragraph">{project.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div role="list" className="works__mobile-list">
            {projects.map((project) => (
              <div
                key={project.slug}
                role="listitem"
                className="collection-item-5"
              >
                <Link
                  href={project.href}
                  aria-label={`Open ${project.name}`}
                  className="wm__img"
                >
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    sizes="100vw"
                    className="img is--cover"
                  />
                </Link>

                <div className="wm__content-2">
                  <div className="wm__title">
                    <p className="paragraph">({project.index})</p>
                    <p className="paragraph-9">{project.name}</p>
                  </div>
                </div>

                <div className="wm__content-2 is--desc">
                  <p data-split="heading" className="paragraph">
                    {project.description}
                  </p>
                </div>

                <Link
                  href={project.href}
                  aria-label="staggering button"
                  className="btn-animate-chars"
                >
                  <div className="btn-animate-chars__bg-3" />
                  <span
                    data-button-animate-chars
                    className="btn-animate-chars__text paragraph"
                  >
                    EXPLORE CASE
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
