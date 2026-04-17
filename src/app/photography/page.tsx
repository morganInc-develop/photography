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

  const collectionIndex =
    collections.findIndex((entry) => entry.slug === requestedCollection) !== -1
      ? collections.findIndex((entry) => entry.slug === requestedCollection)
      : collections.findIndex((entry) =>
          entry.photos.some((photo) => photo.id === requestedPhotoId),
        );

  const collection =
    collections[Math.max(0, collectionIndex)] ?? collections[0];

  if (!collection) {
    return null;
  }

  const idx = Math.max(0, collectionIndex);
  const prevCollection = idx > 0 ? collections[idx - 1] : null;
  const nextCollection =
    idx < collections.length - 1 ? collections[idx + 1] : null;

  const initialPhotoId =
    collection.photos.find((photo) => photo.id === requestedPhotoId)?.id ??
    collection.photos[0]?.id;

  return (
    <ArticleSplit
      key={`${collection.slug}:${initialPhotoId ?? "default"}`}
      collection={collection}
      photos={collection.photos}
      initialPhotoId={initialPhotoId}
      prevCollection={
        prevCollection
          ? { slug: prevCollection.slug, name: prevCollection.name }
          : null
      }
      nextCollection={
        nextCollection
          ? { slug: nextCollection.slug, name: nextCollection.name }
          : null
      }
    />
  );
}
