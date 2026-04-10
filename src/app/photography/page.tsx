import { ARTBOARD_PHOTOS } from "@/components/home/home-data";
import { ArticleSplit } from "@/components/photo/ArticleSplit";
import { Suspense } from "react";

const orderedPhotos = [...ARTBOARD_PHOTOS].sort(
  (left, right) => Number(left.id) - Number(right.id),
);

export default function PhotographyPage() {
  return (
    <Suspense>
      <ArticleSplit photos={orderedPhotos} />
    </Suspense>
  );
}
