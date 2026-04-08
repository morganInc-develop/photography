import { ARTBOARD_PHOTOS } from "@/components/home/home-data";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  const photo = ARTBOARD_PHOTOS.find((p) => p.id === id);

  if (!photo) {
    notFound();
  }

  return (
    <main className="page-wrapper">
      <div className="works-project">
        <header className="works-project__header">
          <Link href="/" className="link-group is--dark">
            <p data-underline-link className="paragraph">
              ← back to artboard
            </p>
          </Link>
        </header>

        <section className="works-project__hero">
          <div className="works-project__meta">
            <p className="paragraph">({photo.id})</p>
            <p className="paragraph">{photo.year} — {photo.location}</p>
          </div>
          <h1 className="works-project__title h-h1">{photo.title}</h1>
          <p className="works-project__desc paragraph is--medium">
            {photo.description}
          </p>
        </section>

        <div className="works-project__cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.title}
            className="img is--cover"
          />
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return ARTBOARD_PHOTOS.map((p) => ({ id: p.id }));
}
