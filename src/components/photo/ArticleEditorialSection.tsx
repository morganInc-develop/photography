import type { ArtboardPhoto } from "@/components/home/home-data";
import Image from "next/image";
import Link from "next/link";

type Props = {
  photos: ArtboardPhoto[];
  photo: ArtboardPhoto;
  previousPhoto: ArtboardPhoto;
  nextPhoto: ArtboardPhoto;
  currentIndex: number;
  displayIndex: string;
  category: string;
  month: string;
};

function getPrimaryLocation(location: string) {
  return location.split(",")[0]?.trim() || location;
}

function getEditorialHeadline(photo: ArtboardPhoto) {
  const primaryLocation = getPrimaryLocation(photo.location);
  return `${photo.title} in ${primaryLocation}`;
}

function getEditorialParagraphs(
  photo: ArtboardPhoto,
  category: string,
  month: string,
) {
  const primaryLocation = getPrimaryLocation(photo.location);

  return [
    photo.description,
    `${photo.title} sits inside the ${category.toLowerCase()} register of the Lookback archive, where photographs are sequenced less like isolated posts and more like editorial chapters. ${primaryLocation} gives the image its anchor, while ${month.toLowerCase()} positions it inside the broader calendar rhythm of the timeline.`,
    `The lower composition keeps adjacent works in view on purpose. Instead of cutting the photograph loose from the archive, the layout lets neighboring frames bleed into the margins so the page reads like one moving spread inside a larger visual index.`,
  ];
}

function getSourceLabel(src: string) {
  try {
    const hostname = new URL(src).hostname;

    if (hostname.includes("unsplash")) {
      return "Unsplash";
    }

    if (hostname.includes("pexels")) {
      return "Pexels";
    }

    return hostname.replace(/^www\./, "");
  } catch {
    return "Source";
  }
}

export function ArticleEditorialSection({
  photos,
  photo,
  previousPhoto,
  nextPhoto,
  currentIndex,
  displayIndex,
  category,
  month,
}: Props) {
  const primaryLocation = getPrimaryLocation(photo.location);
  const paragraphs = getEditorialParagraphs(photo, category, month);
  const sourceLabel = getSourceLabel(photo.src);
  const supportingPhotos = [
    photos[(currentIndex + 2) % photos.length],
    photos[(currentIndex + 3) % photos.length],
    photos[(currentIndex + 4) % photos.length],
  ];
  const primarySupportPhoto = supportingPhotos[0] ?? nextPhoto;
  const secondarySupportPhotos = supportingPhotos.slice(1);
  const headline = getEditorialHeadline(photo);

  return (
    <>
      <section className="hidden bg-[#fbfaf6] md:block">
        <div className="px-8 pt-14 lg:px-14 lg:pt-20">
          <div className="relative mx-auto flex h-[clamp(32rem,70vh,44rem)] max-w-[44rem] items-center justify-center overflow-hidden">
            <div
              data-article-visual
              className="relative z-10 w-[54%] max-w-[21rem]"
            >
              <p className="mb-3 text-[0.78rem] uppercase tracking-[0.08em] text-black/72">
                {displayIndex}
              </p>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ece8dc]">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 30vw, 21rem"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-[0.78rem] uppercase tracking-[0.08em] text-black/72">
                {category.toUpperCase()} ({month.toUpperCase()})
              </p>
            </div>
          </div>

          <div className="mt-16">
            <div className="pb-16 pt-14 lg:pt-20">
              <div className="mt-14 max-w-[46rem] space-y-10">
                <div
                  data-article-visual
                  className="relative aspect-[16/9] overflow-hidden bg-[#ece8dc]"
                >
                  <Image
                    src={primarySupportPhoto.src}
                    alt={primarySupportPhoto.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 46rem"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-8" data-article-copy>
                  {secondarySupportPhotos.map((supportPhoto, index) => (
                    <div key={supportPhoto.id} data-article-visual>
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#ece8dc]">
                        <Image
                          src={supportPhoto.src}
                          alt={supportPhoto.title}
                          fill
                          sizes="(max-width: 1024px) 30vw, 18rem"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-2 text-[0.78rem] uppercase tracking-[0.08em] text-black/72">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#fbfaf6] px-4 py-8 md:hidden">
        <div className="flex items-center justify-between text-[0.86rem] tracking-[-0.02em]">
          <Link href="/" className="transition hover:text-black/60">
            Close
          </Link>
          <Link
            href={photo.src}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition hover:text-black/60"
          >
            {sourceLabel} ↗
          </Link>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="bg-[#eadbff] px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#8767ba]">
            {category}
          </span>
          <p className="text-[0.9rem] uppercase tracking-[0.08em] text-black/78">
            ({month})
          </p>
        </div>

        <h2
          className="mt-5 max-w-[10ch] text-[clamp(2.8rem,12vw,4.4rem)] font-[700] uppercase leading-[0.9] tracking-[-0.065em] text-black"
          style={{ fontFamily: '"Host Grotesk", system-ui, sans-serif' }}
        >
          {headline}
        </h2>

        <div
          className="mt-7 space-y-7 text-[1rem] leading-[1.42] tracking-[-0.025em] text-black/82"
          style={{ fontFamily: '"Host Grotesk", system-ui, sans-serif' }}
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 space-y-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#ece8dc]">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[previousPhoto, nextPhoto].map((supportPhoto) => (
              <div key={supportPhoto.id}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ece8dc]">
                  <Image
                    src={supportPhoto.src}
                    alt={supportPhoto.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-[0.74rem] uppercase tracking-[0.08em] text-black/72">
                  {supportPhoto.title}
                </p>
              </div>
            ))}
          </div>

          <div className="relative aspect-[16/10] overflow-hidden bg-[#ece8dc]">
            <Image
              src={primarySupportPhoto.src}
              alt={primarySupportPhoto.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-7 border-t border-black/10 pt-3">
          <p className="text-[0.72rem] uppercase tracking-[0.12em] text-black/72">
            {displayIndex} · {primaryLocation} · {photo.year}
          </p>
        </div>
      </section>
    </>
  );
}
