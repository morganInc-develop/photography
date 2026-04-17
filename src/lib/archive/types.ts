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
};
