import type { ArtboardPhoto } from "@/components/home/home-data";
import Image from "next/image";

type Props = {
  photo: ArtboardPhoto;
  previousPhoto: ArtboardPhoto;
  nextPhoto: ArtboardPhoto;
  displayIndex: string;
  totalCount: number;
};

export function ArticleStage({
  photo,
  previousPhoto,
  nextPhoto,
  displayIndex,
  totalCount,
}: Props) {
  return (
    <section className="relative hidden h-full overflow-hidden md:block">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          data-article-visual
          className="absolute left-[-10%] top-1/2 w-[28%] -translate-y-1/2 opacity-40 grayscale-[0.2]"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={previousPhoto.src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
        </div>

        <div data-article-visual className="relative w-[48%] max-w-[30rem]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              priority
              sizes="(max-width: 1024px) 40vw, 30rem"
              className="object-cover"
            />
          </div>

          <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/45">
            {displayIndex} / {String(totalCount).padStart(2, "0")}
          </p>
        </div>

        <div
          data-article-visual
          className="absolute right-[-10%] top-1/2 w-[28%] -translate-y-1/2 opacity-40 grayscale-[0.2]"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={nextPhoto.src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
