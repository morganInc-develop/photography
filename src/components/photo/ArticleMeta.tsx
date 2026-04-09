import type { ArtboardPhoto } from "@/components/home/home-data";
import Image from "next/image";
import Link from "next/link";

type Props = {
  photo: ArtboardPhoto;
  displayIndex: string;
  totalCount: number;
  previousHref: string;
  nextHref: string;
};

export function ArticleMeta({
  photo,
  displayIndex,
  totalCount,
  previousHref,
  nextHref,
}: Props) {
  return (
    <section className="relative flex h-full flex-col border-l border-black/10">
      <div className="flex items-center justify-between px-5 pt-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-black/55 md:px-12 md:pr-16 md:pt-16">
        <Link
          data-article-control
          href="/"
          className="transition hover:text-black"
        >
          Close
        </Link>
        <p data-article-control>
          {displayIndex} / {String(totalCount).padStart(2, "0")}
        </p>
      </div>

      <div className="px-5 pt-7 md:hidden">
        <div data-article-visual className="relative overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 2.5rem), 0px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-28 pt-8 md:px-12 md:pr-16 md:pb-12 md:pt-[33vh]">
        <p
          data-article-meta
          className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/45"
        >
          {photo.location} · {photo.year}
        </p>

        <h1
          data-article-title
          className="mt-4 max-w-[10ch] font-[700] uppercase leading-[0.88] tracking-[-0.05em] text-[clamp(2rem,8vw,3.5rem)] md:text-[clamp(3rem,5vw,5.5rem)]"
        >
          {photo.title}
        </h1>

        <p
          data-article-copy
          className="mt-6 max-w-[38ch] text-[0.98rem] leading-[1.55] text-black/78"
        >
          {photo.description}
        </p>

        <div
          data-article-copy
          className="mt-8 max-w-[16rem] border-t border-black/12 pt-3"
        >
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-black/55">
            {photo.id}
          </p>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-[#f5f4f0]/96 px-4 py-3 backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-2">
          <Link
            href={previousHref}
            className="text-left text-[0.78rem] font-medium uppercase tracking-[0.16em] text-black/70"
          >
            ← Prev
          </Link>
          <Link
            href={nextHref}
            className="text-right text-[0.78rem] font-medium uppercase tracking-[0.16em] text-black/70"
          >
            Next →
          </Link>
        </div>
      </div>
    </section>
  );
}
