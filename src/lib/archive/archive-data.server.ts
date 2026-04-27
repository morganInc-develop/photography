import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import type { ArchiveCollection, ArchivePhoto } from "@/lib/archive/types";

const ARCHIVE_ROOT = path.join(process.cwd(), "public", "Archive");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const COLLECTION_ORDER = [
  "Sookwyd",
  "Sxint",
  "Glo Rich",
  "NYC",
  "Beach",
  "Gym",
  "Late Night Munchies",
  "Studio",
  "SuperSandwhich",
  "Larp",
] as const;

type CollectionSeed = {
  name: string;
  headline: string;
  location: string;
  tag: string;
  intro: string;
  outro: string;
  photoLabel: string;
  captionTemplates: string[];
  videoEmbedSrc?: string;
  links?: { href: string; label: string }[];
};

const COLLECTION_SEEDS: Record<string, CollectionSeed> = {
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
    videoEmbedSrc:
      "https://www.youtube.com/embed/BniimZibwEU?si=4ZWfaaU1UuC72MDg",
    links: [
      {
        href: "https://linktr.ee/Glorich100?utm_source=linktree_profile_share&ltsid=aaadd2e8-0692-44c0-b5f3-6b8bd3a9bd98",
        label: "LINKTREE",
      },
    ],
  },
  NYC: {
    name: "NYC",
    headline: "NYC, quick stops and whatever caught my eye",
    location: "New York City",
    tag: "city day",
    intro:
      "This set came from one of those city days where I was mostly just walking, looking up, and shooting whatever felt fun in the moment. Nothing too planned, just moving through the city and keeping the camera close.",
    outro:
      "A lot of these frames are just little proof-of-life moments: store displays, street corners, traffic lights, and random details that felt good enough to keep. It is less about making a perfect New York story and more about remembering how the day actually felt.",
    photoLabel: "NYC frame",
    captionTemplates: [
      "A little city frame from the middle of the day. Just me catching a quick detail before moving on.",
      "One of those NYC moments where something small stood out enough to get its own shot.",
      "A casual stop in the city diary. Nothing staged, just whatever was right in front of me.",
      "This one feels like the in-between part of the day that usually ends up being my favorite.",
    ],
  },
  Beach: {
    name: "Beach",
    headline: "Beach, mostly wind, water, and space to breathe",
    location: "Beachfront",
    tag: "day off",
    intro:
      "This folder is basically me slowing down and letting the water do most of the work. I was not chasing some big perfect beach shot, I was just outside, taking in the quiet and grabbing the frames that felt calm.",
    outro:
      "Most of these are simple on purpose. Water, shoreline, sky, and that nice empty feeling you only really get near the beach when everything is moving but nothing feels rushed.",
    photoLabel: "Beach diary",
    captionTemplates: [
      "A quiet beach frame with nothing to prove. Just water, air, and a little breathing room.",
      "One more shoreline shot from a slow day by the water.",
      "This one is mostly about the feeling of being there more than any single subject.",
      "A simple beach moment that felt worth keeping exactly as it was.",
    ],
  },
  Gym: {
    name: "Gym",
    headline: "Gym nights, purple machines, regular life stuff",
    location: "Gym floor",
    tag: "routine",
    intro:
      "This set is straight-up everyday life. Nothing glamorous about it. Just a regular gym night, purple machines everywhere, people locked into their own routines, and me grabbing the kind of frames I usually remember later.",
    outro:
      "I like these because they feel honest. It is not a fitness campaign or anything polished, just the room, the repetition, and the little rhythm that comes with showing up.",
    photoLabel: "Gym night",
    captionTemplates: [
      "A quick gym snapshot from the middle of the routine.",
      "Just a normal night at the gym, caught as-is.",
      "One of those frames that feels more about the room and the energy than any one person in it.",
      "A casual everyday shot from the workout part of the week.",
    ],
  },
  "Late Night Munchies": {
    name: "Late Night Munchies",
    headline: "Late nights, random stops, and the ride in between",
    location: "After-hours run",
    tag: "after dark",
    intro:
      "This folder feels the most like a real diary to me. It is late-night driving, food runs, hanging around, weird lighting, and all the random little scenes that happen when nobody is trying too hard and everybody is just outside living.",
    outro:
      "There is car light, parking garage energy, empty spots, and those blurry night moments that do not need to be perfect to feel memorable. It is just what the night looked like while it was happening.",
    photoLabel: "Late-night frame",
    captionTemplates: [
      "A late-night frame from somewhere between the drive, the stop, and the hangout.",
      "This one has that after-dark energy where everything looks a little better than it does in the daytime.",
      "One more frame from the part of the night where plans stop being clear and it gets more fun.",
      "A small moment from the late-night run that felt worth saving.",
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
  SuperSandwhich: {
    name: "Super Sandwich",
    headline: "A sandwich stop that turned into a whole little night",
    location: "Super Sandwich",
    tag: "food run",
    intro:
      "This set starts with the sandwich spot but it is really more about the whole mood around it. Neon signs, empty chairs, food-run timing, and then the night stretching into people talking and hanging out after.",
    outro:
      "It has that casual 'we were just out' energy that I always end up loving most later. A little bit of food, a little bit of conversation, and a lot of random moments that made the night feel full.",
    photoLabel: "Food-run frame",
    captionTemplates: [
      "A quick frame from the sandwich run while the place was still glowing.",
      "One of those food-stop shots where the mood matters more than the menu.",
      "A casual little night-out frame from the middle of the hang.",
      "This one feels like the part of the night where nobody is in a rush to leave.",
    ],
  },
  Larp: {
    name: "Larp",
    headline: "Mirror checks, camera in hand, figuring stuff out at home",
    location: "At home",
    tag: "home setup",
    intro:
      "This one is super casual. It is basically me in the mirror, checking the setup, testing the camera, and grabbing a few frames in the middle of the process. Nothing fancy, just part of the day.",
    outro:
      "I kept these because they feel personal in a good way. More like little self-check moments than full portraits, and that is exactly why I like them.",
    photoLabel: "Mirror frame",
    captionTemplates: [
      "A mirror shot from the middle of figuring out the setup.",
      "One more at-home frame with the camera already in hand.",
      "A casual self-check moment that felt worth keeping.",
      "This one is less about posing and more about catching the process as it happened.",
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

function toWebPublicPath(folderName: string, fileName: string) {
  const base = path.parse(fileName).name + ".jpg";
  return path.posix.join("/Archive-web", folderName, base);
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
      entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name),
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

        const slug = slugify(folderName);
        const photos = await Promise.all(
          fileNames.map(async (fileName, index): Promise<ArchivePhoto> => {
            const filePath = path.join(folderPath, fileName);
            const stats = await fs.stat(filePath);
            const displayIndex = String(index + 1).padStart(2, "0");

            return {
              id: `${slug}-${displayIndex}`,
              src: toPublicPath(folderName, fileName),
              webSrc: toWebPublicPath(folderName, fileName),
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
  const featuredCollectionNames = new Set(["Sookwyd", "Sxint", "Glo Rich"]);

  const featuredCollections = collections.filter((collection) =>
    featuredCollectionNames.has(collection.name),
  );
  const standardCollections = collections.filter(
    (collection) => !featuredCollectionNames.has(collection.name),
  );

  // Build interleaved featured photos: Sxint-01, GloRich-01, Sxint-02, GloRich-02, ...
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
