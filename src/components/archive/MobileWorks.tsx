import type { ArchiveProject } from "@/components/archive/archive-data";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import Link from "next/link";

type MobileWorksProps = {
  projects: ArchiveProject[];
};

export default function MobileWorks({ projects }: MobileWorksProps) {
  return (
    <section className="section is--mobile">
      <div className="section__works-mobile">
        <ArchiveHeader mobile />

        <div className="wm__title-mobile-wrap">
          <div className="wm__title-mobile">
            <p data-split="heading" className="paragraph is--medium">
              What appears here is not a sequence of outcomes, but a record of decisions. Different
              contexts, different constraints, the same insistence on clarity, structure, and
              presence.
            </p>
            <div className="paragraph is--eyebrow">
              THIS ARCHIVE DOES NOT
              <br />
              COLLECT RESULTS.
              <br />
              IT PRESERVES PROCESS.
            </div>
            <h1 data-blink-text className="h-h1 is--huge is--black archive-blink-heading">
              ( THE ARCHIVE )
            </h1>
          </div>
        </div>

        <div role="list" className="works__mobile-list">
          {projects.map((project) => (
            <div key={project.slug} role="listitem" className="collection-item-5">
              <div className="wm__img">
                <img loading="lazy" src={project.coverImage} alt="" className="img is--cover" />
              </div>

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

              <Link href={project.href} aria-label="staggering button" className="btn-animate-chars">
                <div className="btn-animate-chars__bg-3" />
                <span data-button-animate-chars className="btn-animate-chars__text paragraph">
                  EXPLORE CASE
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
