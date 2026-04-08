import { ARCHIVE_PROJECTS } from "@/components/archive/archive-data";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WorksProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = ARCHIVE_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-wrapper">
      <div className="works-project">
        <header className="works-project__header">
          <Link href="/the-archive" className="link-group is--dark">
            <p data-underline-link className="paragraph">
              ← back to archive
            </p>
          </Link>
        </header>

        <section className="works-project__hero">
          <div className="works-project__meta">
            <p className="paragraph">({project.index})</p>
          </div>
          <h1 className="works-project__title h-h1">{project.name}</h1>
          <p className="works-project__desc paragraph is--medium">
            {project.description}
          </p>
        </section>

        <div className="works-project__cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.name}
            className="img is--cover"
          />
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return ARCHIVE_PROJECTS.map((p) => ({ slug: p.slug }));
}
