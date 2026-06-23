import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import type {
  ArchiveCollection,
  ArchivePhoto,
  ArchiveVideo,
} from "@/lib/archive/types";

const ARCHIVE_ROOT = path.join(process.cwd(), "public", "Archive");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const COLLECTION_ORDER = [
  "Codex New",
  "CheckSean",
  "Amari",
  "Black Love",
  "Headspace",
  "Imperfect",
  "CT Shutdown",
  "Night",
  "Sookwyd",
  "Sxint",
  "Glo Rich",
  "Studio",
] as const;

const WEB_IMAGE_EXTENSIONS = [".webp", ".avif", ".jpg", ".jpeg", ".png"];

type CollectionSeed = {
  name: string;
  headline: string;
  location: string;
  tag: string;
  intro: string;
  outro: string;
  photoLabel: string;
  captionTemplates: string[];
  videos?: ArchiveVideo[];
  videoEmbedSrc?: string;
  links?: { href: string; label: string }[];
};

const COLLECTION_SEEDS: Record<string, CollectionSeed> = {
  "Codex New": {
    name: "Codex New",
    headline:
      "Codex New, a streetwear story moving from hard daylight into concrete shadow",
    location: "Urban campaign",
    tag: "streetwear editorial",
    intro:
      "Codex New follows two subjects through brick corridors, painted walls, open campus paths, and the low ceiling of a parking structure. The clothes stay central, but the sequence also holds onto gesture, friendship, and the loose pace of a day spent moving between locations.",
    outro:
      "The campaign shifts from bright color and direct sun into darker concrete frames without losing its continuity. Apparel details, repeated poses, and the contrast between the two subjects give the full set the rhythm of a lived-in lookbook.",
    photoLabel: "Codex New frame",
    captionTemplates: [
      "A Codex New portrait balancing the apparel against brick, concrete, and open daylight.",
      "One of the closer campaign frames, held on styling, texture, and the subject's stance.",
      "A two-person Codex New frame where the clothing and relationship share the composition.",
      "Another streetwear study from the set, moving between graphic color and harder architectural lines.",
    ],
  },
  CheckSean: {
    name: "CheckSean",
    headline: "CheckSean, a tight motion piece built around presence and pace",
    location: "Motion study",
    tag: "video portrait",
    intro:
      "CheckSean is held as a motion-first entry: one focused video, cut down for the site and supported by a still frame so it can live cleanly inside the archive.",
    outro:
      "The piece stays direct and compact, built around movement, timing, and the feeling of watching a moment unfold instead of freezing it.",
    photoLabel: "CheckSean still",
    captionTemplates: [
      "A still frame from the CheckSean video, used as the entry point into the motion piece.",
      "A quiet frame pulled from the CheckSean cut before the video takes over.",
    ],
    videos: [
      {
        kind: "file",
        src: "/Archive/CheckSean/CheckSean.mp4",
        title: "CheckSean motion piece",
        mimeType: "video/mp4",
      },
    ],
  },
  Amari: {
    name: "Amari",
    headline: "Amari, portrait frames with a soft but deliberate charge",
    location: "Portrait session",
    tag: "portrait study",
    intro:
      "This Amari set leans into close portrait energy: clean light, small gestures, hair detail, and frames that feel composed without losing the person inside them.",
    outro:
      "The sequence moves between direct portraits and quieter details, keeping the session polished but still personal.",
    photoLabel: "Amari portrait",
    captionTemplates: [
      "A composed Amari portrait with the frame held close to expression and styling.",
      "One of the softer Amari frames, built around light, detail, and presence.",
      "A direct portrait from the Amari session with the subject carrying the image.",
      "A detail-led Amari frame that keeps the session tactile and personal.",
    ],
    videos: [
      {
        kind: "file",
        src: "/Archive/Amari/Amari-live.mp4",
        title: "Amari motion piece",
        mimeType: "video/mp4",
      },
    ],
  },
  "Black Love": {
    name: "Black Love",
    headline: "Black Love, intimate frames held close and unforced",
    location: "Portrait session",
    tag: "couple study",
    intro:
      "Black Love is a short, intimate set with the focus kept on closeness, ease, and the small body language that makes the images feel lived in.",
    outro:
      "The folder stays simple on purpose: a few stills and one motion piece that keep the connection at the center.",
    photoLabel: "Black Love frame",
    captionTemplates: [
      "An intimate Black Love frame built around closeness and ease.",
      "A quiet portrait moment from Black Love with the connection carrying the image.",
      "One more Black Love still, direct and unforced.",
    ],
    videos: [
      {
        kind: "file",
        src: "/Archive/Black Love/Black Love-live.mp4",
        title: "Black Love motion piece",
        mimeType: "video/mp4",
      },
    ],
  },
  Headspace: {
    name: "Headspace",
    headline: "Headspace, interior mood and portrait rhythm in the same room",
    location: "Creative session",
    tag: "visual study",
    intro:
      "Headspace moves through a controlled room with a reflective mood: portraits, details, and graphic elements that make the set feel like a visual state of mind.",
    outro:
      "The images keep returning to atmosphere and expression, with the motion clips extending that same quiet pressure.",
    photoLabel: "Headspace frame",
    captionTemplates: [
      "A Headspace frame with the room and subject holding the same mood.",
      "One of the quieter Headspace images, built from expression and atmosphere.",
      "A graphic detail from Headspace that keeps the set feeling designed but human.",
      "Another Headspace still with the portrait energy pulled into the room around it.",
    ],
    videos: [
      {
        kind: "file",
        src: "/Archive/Headspace/Headspace-live-01.mp4",
        title: "Headspace motion piece 01",
        mimeType: "video/mp4",
      },
      {
        kind: "file",
        src: "/Archive/Headspace/Headspace-live-02.mp4",
        title: "Headspace motion piece 02",
        mimeType: "video/mp4",
      },
    ],
  },
  Imperfect: {
    name: "Imperfect",
    headline: "Imperfect, portraits with the rough edges left in place",
    location: "Portrait session",
    tag: "portrait study",
    intro:
      "Imperfect keeps the frame honest: close portraits, natural tension, and the kind of moments that feel stronger because they are not polished flat.",
    outro:
      "The set works best as a portrait sequence with texture still attached, carrying the same feeling into the motion piece.",
    photoLabel: "Imperfect portrait",
    captionTemplates: [
      "An Imperfect portrait with the rougher edge left intact.",
      "One of the closer Imperfect frames, held on expression and texture.",
      "A direct still from Imperfect with the portrait energy kept raw.",
      "Another Imperfect frame where the mood matters more than polish.",
    ],
    videos: [
      {
        kind: "file",
        src: "/Archive/Imperfect/Imperfect-live.mp4",
        title: "Imperfect motion piece",
        mimeType: "video/mp4",
      },
    ],
  },
  "CT Shutdown": {
    name: "CT Shutdown",
    headline:
      "CT Shutdown, the room itself held in full before the night let go",
    location: "CT Shutdown",
    tag: "show diary",
    intro:
      "This folder pulls back just enough to hold the whole CT Shutdown room instead of only one performer at a time. It keeps the stage light, the crowd pressure, and the rough edges that made the night feel alive while it was happening.",
    outro:
      "These frames work like the wider memory of the show. Not cleanup shots, not venue coverage, just direct proof of how the room looked once everything locked in and got loud.",
    photoLabel: "CT Shutdown frame",
    captionTemplates: [
      "A full-room CT Shutdown frame with the night still in motion.",
      "One of the wider documents from CT Shutdown, kept rough on purpose.",
      "Stage light and crowd pressure from the middle of the CT Shutdown set.",
      "Another direct frame from CT Shutdown while the room was still packed in.",
    ],
    videos: [
      {
        kind: "file",
        src: "/Archive/CT Shutdown/CT Shutdown-live-01.mp4",
        title: "CT Shutdown live document 01",
      },
      {
        kind: "file",
        src: "/Archive/CT Shutdown/CT Shutdown-live-02.mp4",
        title: "CT Shutdown live document 02",
      },
    ],
  },
  Night: {
    name: "Night",
    headline:
      "Night at CT Shutdown, two low-light frames held close to the set",
    location: "CT Shutdown",
    tag: "artist spotlight",
    intro:
      "These Night frames stay tight on the performer and the light coming off the stage. The set is short, but the mood is there: dark room, direct flash, and the kind of close distance that makes the whole thing feel immediate.",
    outro:
      "It sits naturally with the other CT Shutdown artist folders. Just enough stills to hold onto the energy without trying to over-explain the night.",
    photoLabel: "Night frame",
    captionTemplates: [
      "A low-light performance frame from Night at CT Shutdown.",
      "One of the Night stills pulled straight from the middle of the set.",
      "Another close frame from Night while the room stayed dark and loud.",
      "A direct Night document with the stage light doing most of the work.",
    ],
    videos: [
      {
        kind: "file",
        src: "/Archive/Night/Night-live.mp4",
        title: "Night at CT Shutdown",
      },
    ],
  },
  Sookwyd: {
    name: "Sookwyd",
    headline: "Sookwyd at CT Shutdown, close frames from the middle of the set",
    location: "CT Shutdown",
    tag: "artist spotlight",
    intro:
      "These photographs are from Sookwyd performing at CT Shutdown. The set stays tight on the performer, the lights, and the pressure that sits in the room when everybody is pushed toward the front.",
    outro:
      "Like the other recent CT Shutdown folders, this one works best as a direct document of the night. No cleanup, no distance, just the performer and the atmosphere while it was still loud.",
    photoLabel: "Sookwyd frame",
    captionTemplates: [
      "A close performance frame from Sookwyd at CT Shutdown.",
      "One of the new Sookwyd stills held tight to the stage at CT Shutdown.",
      "Another live document from Sookwyd's CT Shutdown set.",
      "A front-of-room Sookwyd frame with the set still in motion.",
    ],
    videos: [
      {
        kind: "embed",
        src: "https://www.youtube.com/embed/OJOIs6nvPS8",
        title: "Sookwyd at CT Shutdown",
      },
      {
        kind: "file",
        src: "/Archive/Sookwyd/Sookwyd-live.mp4",
        title: "Sookwyd live document",
      },
    ],
    videoEmbedSrc: "https://www.youtube.com/embed/OJOIs6nvPS8",
    links: [
      {
        href: "https://linktr.ee/soooooook?utm_source=linktree_profile_share&ltsid=5fdf166e-490d-4f14-9c2f-7153092e4533",
        label: "LINKTREE",
      },
    ],
  },
  Sxint: {
    name: "Sxint",
    headline:
      "Sxint at CT Shutdown, live wire energy from the floor to the mic",
    location: "CT Shutdown",
    tag: "live set",
    intro:
      "These frames are from Sxint performing at CT Shutdown. Proud of my brother. Everything in this set stays close to the stage and the way the room felt while the music was actually hitting.",
    outro:
      "The photos are rough in the right way: red light, motion blur, crowd pressure, and that split-second feeling you only get when the set is happening in front of you instead of being cleaned up after.",
    photoLabel: "Sxint live frame",
    captionTemplates: [
      "A close live frame from the middle of Sxint's CT Shutdown set.",
      "Stage-side motion from Sxint at CT Shutdown while the room was still moving.",
      "One more live document from Sxint's CT Shutdown performance.",
      "A rough-edged frame from Sxint at CT Shutdown with the crowd still pushing in.",
    ],
    videos: [
      {
        kind: "embed",
        src: "https://www.youtube.com/embed/YehcLLPVav8?si=I47XRdYln3u6WHx8",
        title: "Sxint at CT Shutdown",
      },
      {
        kind: "file",
        src: "/Archive/Sxint/Sxint-live.mp4",
        title: "Sxint live document",
      },
    ],
    videoEmbedSrc:
      "https://www.youtube.com/embed/YehcLLPVav8?si=I47XRdYln3u6WHx8",
    links: [
      {
        href: "https://www.youtube.com/@UCm0QFpsEycfF3FEQ6eZWd3w",
        label: "YOUTUBE",
      },
      { href: "https://soundcloud.com/user-495163601", label: "SOUNDCLOUD" },
      {
        href: "https://open.spotify.com/artist/0Il5MAzLKVR47Q7nHSlfz5",
        label: "SPOTIFY",
      },
      { href: "https://www.instagram.com/hatesxint/", label: "INSTAGRAM" },
    ],
  },
  "Glo Rich": {
    name: "Glo Rich",
    headline:
      "Glo Rich at CT Shutdown, front-and-center from the latest underground show",
    location: "CT Shutdown",
    tag: "artist spotlight",
    intro:
      "This Glo Rich set comes out of CT Shutdown and sits at the front of the archive as part of the latest work. The goal here was to keep the focus on the performer and the heat of the room without sanding the edges off it.",
    outro:
      "These images work like live notes from the night: direct, immediate, and built around the performer more than the venue. They are there to hold onto the atmosphere while it was still loud.",
    photoLabel: "Glo Rich frame",
    captionTemplates: [
      "A fresh performance frame from Glo Rich at CT Shutdown.",
      "One of the newer Glo Rich images pulled from the CT Shutdown set.",
      "A front-row still from Glo Rich's CT Shutdown appearance.",
      "Another live document of Glo Rich inside the CT Shutdown room.",
    ],
    videos: [
      {
        kind: "embed",
        src: "https://www.youtube.com/embed/BniimZibwEU?si=4ZWfaaU1UuC72MDg",
        title: "Glo Rich at CT Shutdown",
      },
      {
        kind: "file",
        src: "/Archive/Glo Rich/Glo Rich-live.mp4",
        title: "Glo Rich live document",
      },
    ],
    videoEmbedSrc:
      "https://www.youtube.com/embed/BniimZibwEU?si=4ZWfaaU1UuC72MDg",
    links: [
      {
        href: "https://linktr.ee/Glorich100?utm_source=linktree_profile_share&ltsid=aaadd2e8-0692-44c0-b5f3-6b8bd3a9bd98",
        label: "LINKTREE",
      },
    ],
  },
  Studio: {
    name: "Studio",
    headline: "Studio nights with the screens glowing and everybody locked in",
    location: "Home studio",
    tag: "studio night",
    intro:
      "These are from studio nights when the room is doing its thing and everybody is focused. Purple lights, screens on, music getting worked on, gear spread out, and that feeling where time kind of disappears for a while.",
    outro:
      "I like how lived-in these feel. Not a polished behind-the-scenes set, more like honest room energy while something is actually being made.",
    photoLabel: "Studio night",
    captionTemplates: [
      "A studio frame from the middle of the session while everything was still in motion.",
      "One of those room shots where the lights and the mess tell the whole story.",
      "A quick studio moment with the setup doing what it does best.",
      "This one feels like the kind of night where nobody notices how late it is until way later.",
    ],
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPublicPath(folderName: string, fileName: string) {
  return path.posix.join("/Archive", folderName, fileName);
}

function toWebPublicPath(
  folderName: string,
  fileName: string,
  webFileNames: Set<string>,
) {
  const base = path.parse(fileName).name;
  const webFileName =
    WEB_IMAGE_EXTENSIONS.map((extension) => `${base}${extension}`).find(
      (candidate) => webFileNames.has(candidate),
    ) ?? `${base}.jpg`;

  return path.posix.join("/Archive-web", folderName, webFileName);
}

function getCaption(seed: CollectionSeed, index: number) {
  return seed.captionTemplates[index % seed.captionTemplates.length];
}

function getFallbackSeed(folderName: string): CollectionSeed {
  return {
    name: folderName,
    headline: `${folderName}, little moments from real life`,
    location: folderName,
    tag: "photo diary",
    intro:
      "A small folder from real life, kept simple on purpose and built out of the frames that felt worth holding onto.",
    outro:
      "Nothing too polished here. Just everyday moments, small details, and the kind of pictures that make sense once you see them all together.",
    photoLabel: `${folderName} frame`,
    captionTemplates: [
      "A quick frame from this set that felt worth keeping.",
      "One more little moment from the folder.",
    ],
  };
}

export const getArchiveCollections = cache(
  async (): Promise<ArchiveCollection[]> => {
    const entries = await fs.readdir(ARCHIVE_ROOT, { withFileTypes: true });
    const folders = new Set(
      entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name),
    );
    const preferredFolders = new Set<string>(COLLECTION_ORDER);

    const orderedFolders = [
      ...COLLECTION_ORDER.filter((folderName) => folders.has(folderName)),
      ...[...folders].filter((folderName) => !preferredFolders.has(folderName)),
    ];

    const collections = await Promise.all(
      orderedFolders.map(async (folderName) => {
        const seed =
          COLLECTION_SEEDS[folderName] ?? getFallbackSeed(folderName);
        const folderPath = path.join(ARCHIVE_ROOT, folderName);
        const fileNames = (await fs.readdir(folderPath))
          .filter((fileName) =>
            IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()),
          )
          .sort((left, right) =>
            left.localeCompare(right, undefined, { numeric: true }),
          );
        const webFolderPath = path.join(
          process.cwd(),
          "public",
          "Archive-web",
          folderName,
        );
        const webFileNames = new Set(
          await fs
            .readdir(webFolderPath)
            .then((entries) =>
              entries.filter((fileName) =>
                WEB_IMAGE_EXTENSIONS.includes(
                  path.extname(fileName).toLowerCase(),
                ),
              ),
            )
            .catch(() => []),
        );

        const slug = slugify(folderName);
        const photos = await Promise.all(
          fileNames.map(async (fileName, index): Promise<ArchivePhoto> => {
            const filePath = path.join(folderPath, fileName);
            const stats = await fs.stat(filePath);
            const displayIndex = String(index + 1).padStart(2, "0");

            return {
              id: `${slug}-${displayIndex}`,
              src: toPublicPath(folderName, fileName),
              webSrc: toWebPublicPath(folderName, fileName, webFileNames),
              title: `${seed.photoLabel} ${displayIndex}`,
              year: String(stats.birthtime.getFullYear()),
              location: seed.location,
              description: getCaption(seed, index),
              alt: `${seed.name} ${displayIndex}`,
              collectionSlug: slug,
              collectionName: seed.name,
            };
          }),
        );

        return {
          slug,
          folderName,
          name: seed.name,
          headline: seed.headline,
          location: seed.location,
          year: photos[0]?.year ?? "",
          tag: seed.tag,
          intro: seed.intro,
          outro: seed.outro,
          photos,
          coverImage: photos[0]?.src ?? "",
          videos: seed.videos,
          videoEmbedSrc: seed.videoEmbedSrc,
          links: seed.links,
        } satisfies ArchiveCollection;
      }),
    );

    return collections.filter((collection) => collection.photos.length > 0);
  },
);

export const getArtboardPhotos = cache(async (): Promise<ArchivePhoto[]> => {
  const collections = await getArchiveCollections();
  const featuredCollectionNames = new Set([
    "Codex New",
    "CheckSean",
    "Amari",
    "Black Love",
    "Headspace",
    "Imperfect",
    "CT Shutdown",
    "Night",
    "Sookwyd",
    "Sxint",
    "Glo Rich",
  ]);

  const featuredCollections = collections.filter((collection) =>
    featuredCollectionNames.has(collection.name),
  );
  const standardCollections = collections.filter(
    (collection) => !featuredCollectionNames.has(collection.name),
  );

  // Build interleaved featured photos so the newest work lands first.
  const featuredPhotos: ArchivePhoto[] = [];
  const featuredMaxCount = Math.max(
    0,
    ...featuredCollections.map((collection) => collection.photos.length),
  );
  for (let index = 0; index < featuredMaxCount; index += 1) {
    featuredCollections.forEach((collection) => {
      const photo = collection.photos[index];
      if (photo) {
        featuredPhotos.push(photo);
      }
    });
  }

  // Build interleaved standard photos
  const standardPhotos: ArchivePhoto[] = [];
  const maxCount = Math.max(
    0,
    ...standardCollections.map((collection) => collection.photos.length),
  );
  for (let index = 0; index < maxCount; index += 1) {
    standardCollections.forEach((collection) => {
      const photo = collection.photos[index];
      if (photo) {
        standardPhotos.push(photo);
      }
    });
  }

  // The home artboard reveals the first three columns on load. Keep featured work
  // in those visible slots row-by-row, and use standard photos only in the two
  // off-screen filler columns between featured rows.
  const openingSequence: ArchivePhoto[] = [];
  let standardOffset = 0;

  for (let index = 0; index < featuredPhotos.length; index += 3) {
    openingSequence.push(...featuredPhotos.slice(index, index + 3));

    if (index + 3 < featuredPhotos.length) {
      openingSequence.push(
        ...standardPhotos.slice(standardOffset, standardOffset + 2),
      );
      standardOffset += 2;
    }
  }

  return [...openingSequence, ...standardPhotos.slice(standardOffset)];
});
