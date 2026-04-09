import type { ArchiveProject } from "@/components/archive/archive-data";
import Image from "next/image";
import Link from "next/link";
import type { MutableRefObject } from "react";

type ClientsModeProps = {
  mode: "gallery" | "clients";
  projects: ArchiveProject[];
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  nameWrapRefs: MutableRefObject<Array<HTMLAnchorElement | null>>;
  previewWrapperRefs: MutableRefObject<Array<HTMLDivElement | null>>;
};

export default function ClientsMode({
  mode,
  projects,
  onHoverStart,
  onHoverEnd,
  nameWrapRefs,
  previewWrapperRefs,
}: ClientsModeProps) {
  return (
    <div className={mode === "clients" ? "clients active" : "clients"}>
      <div className="clients__tag">
        <p className="paragraph">( HOVER TO REVEAL )</p>
        <p className="paragraph">( CLICK TO EXPLORE )</p>
      </div>

      <div className="list__titles-collection">
        <div role="list" className="clients-list">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              role="listitem"
              className="client-name"
              onMouseEnter={() => onHoverStart(index)}
              onMouseLeave={onHoverEnd}
            >
              <Link
                href={project.href}
                className="cn__wrap"
                ref={(node) => {
                  nameWrapRefs.current[index] = node;
                }}
              >
                <h1 className="paragraph is--list">{project.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="client__preview--wrap">
        <div className="clients-preview">
          {projects.map((project, index) => (
            <div
              key={`${project.slug}-preview`}
              ref={(node) => {
                previewWrapperRefs.current[index] = node;
              }}
              className="client-img-wrapper"
            >
              <Image
                src={project.coverImage}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="img is--cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
