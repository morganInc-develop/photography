import { ARTBOARD_PHOTOS } from "@/components/home/home-data";
import { ArticleSplit } from "@/components/photo/ArticleSplit";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const orderedPhotos = [...ARTBOARD_PHOTOS].sort(
  (left, right) => Number(left.id) - Number(right.id),
);

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  const currentIndex = orderedPhotos.findIndex((photo) => photo.id === id);
  const photo = orderedPhotos[currentIndex];

  if (currentIndex === -1 || !photo) {
    notFound();
  }

  const previousPhoto =
    orderedPhotos[
      (currentIndex - 1 + orderedPhotos.length) % orderedPhotos.length
    ];
  const nextPhoto = orderedPhotos[(currentIndex + 1) % orderedPhotos.length];
  const totalCount = orderedPhotos.length;
  const displayIndex = String(currentIndex + 1).padStart(2, "0");

  return (
    <ArticleSplit
      photos={orderedPhotos}
      currentIndex={currentIndex}
      photo={photo}
      previousPhoto={previousPhoto}
      nextPhoto={nextPhoto}
      displayIndex={displayIndex}
      totalCount={totalCount}
    />
  );
}

export function generateStaticParams() {
  return orderedPhotos.map((photo) => ({ id: photo.id }));
}
