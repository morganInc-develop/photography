import { LiveClock } from "@/components/home/LiveClock";
import { ARTBOARD_PHOTOS } from "@/components/home/home-data";
import { PhotoCarouselNavigator } from "@/components/photo/PhotoCarouselNavigator";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

function buildDisplayLines(photo: (typeof ARTBOARD_PHOTOS)[number]) {
  const locationParts = photo.location
    .split(",")
    .map((part) => part.trim().toUpperCase())
    .filter(Boolean);

  const lines = [photo.title.toUpperCase(), ...locationParts];
  if (lines.length < 4) {
    lines.push(photo.year);
  }
  return lines.slice(0, 4);
}

function buildMicroPhrase(description: string) {
  const words = description.replace(/[—.,]/g, "").split(/\s+/).filter(Boolean);

  return words.slice(0, 7).join(" ").toUpperCase();
}

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  const currentIndex = ARTBOARD_PHOTOS.findIndex((p) => p.id === id);
  const photo = ARTBOARD_PHOTOS[currentIndex];

  if (currentIndex === -1 || !photo) {
    notFound();
  }

  const displayLines = buildDisplayLines(photo);
  const microPhrase = buildMicroPhrase(photo.description);
  const previousPhoto =
    ARTBOARD_PHOTOS[
      (currentIndex - 1 + ARTBOARD_PHOTOS.length) % ARTBOARD_PHOTOS.length
    ];
  const nextPhoto =
    ARTBOARD_PHOTOS[(currentIndex + 1) % ARTBOARD_PHOTOS.length];

  return (
    <main className="works-project">
      <div className="works-project__background" aria-hidden="true">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          className="works-project__background-image works-project__background-image--soft"
        />
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          sizes="100vw"
          className="works-project__background-image works-project__background-image--sharp"
        />
        <div className="works-project__background-wash" />
        <div className="works-project__background-vignette" />
        <div className="works-project__background-lines" />
      </div>

      <header className="works-project__topbar">
        <div className="works-project__back">
          <Link href="/" className="link-group is--light">
            <p data-underline-link className="paragraph">
              back to artboard™
            </p>
          </Link>
          <div className="works-project__clock">
            <LiveClock timezone="Europe/Rome" />
          </div>
        </div>

        <p className="works-project__blurb">{photo.description}</p>
      </header>

      <div className="works-project__micro works-project__micro--center">
        <p className="paragraph">{microPhrase}</p>
      </div>

      <div className="works-project__micro works-project__micro--right">
        <p className="paragraph">
          {photo.id}
          <br />
          {photo.year}
          <br />
          {photo.location.toUpperCase()}
        </p>
      </div>

      <PhotoCarouselNavigator
        previousHref={`/photo/${previousPhoto.id}`}
        nextHref={`/photo/${nextPhoto.id}`}
      />

      <section className="works-project__foreground">
        <h1 className="sr-only">
          {photo.title} {photo.location} {photo.year}
        </h1>

        <p className="works-project__hint paragraph">
          scroll left or right to view other in the catalog.
        </p>

        <div className="works-project__title-stage" aria-hidden="true">
          <div className="works-project__title-layer">
            {displayLines.map((line, index) => (
              <p key={`${line}-${index}`} className="works-project__title-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return ARTBOARD_PHOTOS.map((p) => ({ id: p.id }));
}
