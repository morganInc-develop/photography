export type ArchivePhoto = {
  id: string;
  src: string;
  webSrc: string;
  title: string;
  year: string;
  location: string;
  description: string;
  alt: string;
  collectionSlug: string;
  collectionName: string;
};

export type ArchiveVideo = {
  kind: "embed" | "file";
  src: string;
  title: string;
  mimeType?: string;
};

export type ArchiveLink = { href: string; label: string };

export type ArchiveCollection = {
  slug: string;
  folderName: string;
  name: string;
  headline: string;
  location: string;
  year: string;
  tag: string;
  intro: string;
  outro: string;
  photos: ArchivePhoto[];
  coverImage: string;
  videos?: ArchiveVideo[];
  videoEmbedSrc?: string;
  links?: ArchiveLink[];
};

export function getCollectionVideos(
  collection: Pick<ArchiveCollection, "name" | "videos" | "videoEmbedSrc">,
): ArchiveVideo[] {
  if (collection.videos?.length) {
    return collection.videos;
  }

  return collection.videoEmbedSrc
    ? [
        {
          kind: "embed",
          src: collection.videoEmbedSrc,
          title: `${collection.name} — performance`,
        },
      ]
    : [];
}
