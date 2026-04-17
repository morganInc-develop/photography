import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";

import type { ArchiveCollection, ArchivePhoto } from "@/lib/archive/types";

const ARCHIVE_ROOT = path.join(process.cwd(), "public", "Archive");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const COLLECTION_ORDER = [
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
};

const COLLECTION_SEEDS: Record<string, CollectionSeed> = {
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
        } satisfies ArchiveCollection;
      }),
    );

    return collections.filter((collection) => collection.photos.length > 0);
  },
);

export const getArtboardPhotos = cache(async (): Promise<ArchivePhoto[]> => {
  const collections = await getArchiveCollections();
  const maxCount = Math.max(
    0,
    ...collections.map((collection) => collection.photos.length),
  );
  const photos: ArchivePhoto[] = [];

  for (let index = 0; index < maxCount; index += 1) {
    collections.forEach((collection) => {
      const photo = collection.photos[index];
      if (photo) {
        photos.push(photo);
      }
    });
  }

  return photos;
});
