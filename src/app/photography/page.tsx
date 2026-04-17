import { ArticleSplit } from "@/components/photo/ArticleSplit";
import { getArchiveCollections } from "@/lib/archive/archive-data.server";

function firstValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function PhotographyPage(
  props: PageProps<"/photography">,
) {
  const [collections, searchParams] = await Promise.all([
    getArchiveCollections(),
    props.searchParams,
  ]);

  const requestedCollection = firstValue(searchParams.collection);
  const requestedPhotoId = firstValue(searchParams.photo);

  const collection =
    collections.find((entry) => entry.slug === requestedCollection) ??
    collections.find((entry) =>
      entry.photos.some((photo) => photo.id === requestedPhotoId),
    ) ??
    collections[0];

  if (!collection) {
    return null;
  }

  const initialPhotoId =
    collection.photos.find((photo) => photo.id === requestedPhotoId)?.id ??
    collection.photos[0]?.id;

  return (
    <ArticleSplit
      key={`${collection.slug}:${initialPhotoId ?? "default"}`}
      collection={collection}
      photos={collection.photos}
      initialPhotoId={initialPhotoId}
    />
  );
}
