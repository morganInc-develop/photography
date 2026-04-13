import { ARCHIVE_PROJECTS } from "@/components/archive/archive-data";
import WorksProject from "@/components/archive/WorksProject";
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
      <WorksProject project={project} />
    </main>
  );
}

export function generateStaticParams() {
  return ARCHIVE_PROJECTS.map((p) => ({ slug: p.slug }));
}
