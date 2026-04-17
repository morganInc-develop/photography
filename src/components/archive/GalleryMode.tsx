import type { ArchiveProject } from "@/components/archive/archive-data";
import Image from "next/image";
import Link from "next/link";
import type { MutableRefObject, RefObject } from "react";

type GalleryModeProps = {
  mode: "gallery" | "clients";
  projects: ArchiveProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
  imagePreviewRefs: MutableRefObject<Array<HTMLAnchorElement | null>>;
  galleryItemRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  minimapRef: RefObject<HTMLDivElement | null>;
  indicatorRef: RefObject<HTMLDivElement | null>;
};

export default function GalleryMode({
  mode,
  projects,
  activeIndex,
  onSelect,
  imagePreviewRefs,
  galleryItemRefs,
  minimapRef,
  indicatorRef,
}: GalleryModeProps) {
  const current = projects[activeIndex] ?? projects[0];

  return (
    <div
      className={
        mode === "gallery" ? "gallery__container active" : "gallery__container"
      }
    >
      <div className="site-info">
        <div role="list" className="gallery__names">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              role="listitem"
              data-name={project.slug}
              data-index={index}
              ref={(node) => {
                galleryItemRefs.current[index] = node;
              }}
              className={
                index === activeIndex ? "gallery__item active" : "gallery__item"
              }
              onMouseEnter={() => onSelect(index)}
            >
              <p className="paragraph">({project.index})</p>
              <p className="paragraph">{project.name}</p>
              <Link href={project.href} className="link-group is--dark">
                <p data-underline-link className="paragraph">
                  see collection
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="img-site__list">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={project.href}
            role="listitem"
            ref={(node) => {
              imagePreviewRefs.current[index] =
                node as HTMLAnchorElement | null;
            }}
            className={
              index === activeIndex ? "img-preview active" : "img-preview"
            }
            aria-label={`Open ${project.name}`}
          >
            <Image
              src={project.coverImage}
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="img is--cover"
              style={{
                filter: index === activeIndex ? "none" : "grayscale(100%)",
                transition: "filter 0.4s ease",
              }}
            />
          </Link>
        ))}
      </div>

      <div className="minimap" ref={minimapRef}>
        <div
          ref={indicatorRef}
          className="indicator"
          style={{ transform: `translateY(${activeIndex * 100}%)` }}
        />
        <div role="list" className="items">
          {projects.map((project, index) => (
            <button
              key={`${project.slug}-thumb`}
              type="button"
              role="listitem"
              className={index === activeIndex ? "item active" : "item"}
              onClick={() => onSelect(index)}
            >
              <Image
                src={project.coverImage}
                alt={project.description}
                fill
                sizes="4rem"
                className="img is--cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-active__info">
        <p className="paragraph">( {current.index} )</p>
        <p className="paragraph">{current.name}</p>
      </div>
    </div>
  );
}
