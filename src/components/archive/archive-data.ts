export type ArchiveProjectLink = { href: string; label: string };

export type ArchiveProject = {
  index: string;
  slug: string;
  name: string;
  href: string;
  description: string;
  coverImage: string;
  images: string[];
  videoEmbedSrc?: string;
  links?: ArchiveProjectLink[];
};

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    index: "001",
    slug: "nyc",
    name: "NYC",
    href: "/the-archive/nyc",
    description:
      "The city in motion. Subway light, street corners, strangers mid-step. New York as it always is — loud, layered, relentless.",
    coverImage: "/Archive/NYC/DSC01390.JPG",
    images: [
      "/Archive/NYC/DSC01390.JPG",
      "/Archive/NYC/DSC01395.JPG",
      "/Archive/NYC/DSC01432.JPG",
      "/Archive/NYC/DSC01436.JPG",
      "/Archive/NYC/DSC01513.JPG",
      "/Archive/NYC/DSC01533.JPG",
      "/Archive/NYC/DSC01691.JPG",
      "/Archive/NYC/DSC01778.JPG",
      "/Archive/NYC/DSC01822.JPG",
      "/Archive/NYC/DSC01912.JPG",
      "/Archive/NYC/DSC01971.JPG",
      "/Archive/NYC/DSC02022.JPG",
      "/Archive/NYC/DSC02114.JPG",
      "/Archive/NYC/DSC02246.JPG",
      "/Archive/NYC/DSC02287.JPG",
      "/Archive/NYC/DSC02312.JPG",
      "/Archive/NYC/DSC02328.JPG",
      "/Archive/NYC/DSC02356.JPG",
      "/Archive/NYC/DSC02361.JPG",
      "/Archive/NYC/DSC02367.JPG",
      "/Archive/NYC/DSC02371.JPG",
      "/Archive/NYC/DSC02613.JPG",
    ],
  },
  {
    index: "002",
    slug: "late-night-munchies",
    name: "LATE NIGHT MUNCHIES",
    href: "/the-archive/late-night-munchies",
    description:
      "After hours, still hungry. Neon menus, bright counters, and the particular warmth of a place that stays open past midnight.",
    coverImage: "/Archive/Late Night Munchies/DSC01092.JPG",
    images: [
      "/Archive/Late Night Munchies/DSC01092.JPG",
      "/Archive/Late Night Munchies/DSC01113.JPG",
      "/Archive/Late Night Munchies/DSC01133.JPG",
      "/Archive/Late Night Munchies/DSC01139.JPG",
      "/Archive/Late Night Munchies/DSC01187.JPG",
      "/Archive/Late Night Munchies/DSC01208.JPG",
      "/Archive/Late Night Munchies/DSC01253.JPG",
      "/Archive/Late Night Munchies/DSC01267.JPG",
      "/Archive/Late Night Munchies/DSC01270.JPG",
      "/Archive/Late Night Munchies/DSC01288.JPG",
      "/Archive/Late Night Munchies/DSC01298.JPG",
      "/Archive/Late Night Munchies/DSC01318.JPG",
    ],
  },
  {
    index: "003",
    slug: "beach",
    name: "BEACH",
    href: "/the-archive/beach",
    description:
      "Shore, open sky, and the rhythm of water against everything else. Frames where the world slows down long enough to notice.",
    coverImage: "/Archive/Beach/DSC03098.JPG",
    images: [
      "/Archive/Beach/DSC03098.JPG",
      "/Archive/Beach/DSC03105.JPG",
      "/Archive/Beach/DSC03136.JPG",
      "/Archive/Beach/DSC03167.JPG",
      "/Archive/Beach/DSC03174.JPG",
      "/Archive/Beach/DSC03182.JPG",
      "/Archive/Beach/DSC03201.JPG",
      "/Archive/Beach/DSC03237.JPG",
      "/Archive/Beach/DSC03251.JPG",
    ],
  },
  {
    index: "004",
    slug: "gym",
    name: "GYM",
    href: "/the-archive/gym",
    description:
      "Iron and effort. The particular silence between sets and the discipline that fills the space between them.",
    coverImage: "/Archive/Gym/DSC00804.JPG",
    images: [
      "/Archive/Gym/DSC00804.JPG",
      "/Archive/Gym/DSC00901.JPG",
      "/Archive/Gym/DSC00912.JPG",
      "/Archive/Gym/DSC00920.JPG",
      "/Archive/Gym/DSC00929.JPG",
      "/Archive/Gym/DSC00943.JPG",
      "/Archive/Gym/DSC00951.JPG",
      "/Archive/Gym/DSC00957.JPG",
    ],
  },
  {
    index: "005",
    slug: "super-sandwhich",
    name: "SUPER SANDWHICH",
    href: "/the-archive/super-sandwhich",
    description:
      "A sandwich shop with its own gravity. Small observations from a very specific kind of afternoon.",
    coverImage: "/Archive/SuperSandwhich/DSC00063.jpeg",
    images: [
      "/Archive/SuperSandwhich/DSC00063.jpeg",
      "/Archive/SuperSandwhich/DSC00069.jpeg",
      "/Archive/SuperSandwhich/DSC00072.jpeg",
      "/Archive/SuperSandwhich/DSC00076.jpeg",
      "/Archive/SuperSandwhich/DSC00078.jpeg",
      "/Archive/SuperSandwhich/DSC00090.jpeg",
    ],
  },
  {
    index: "006",
    slug: "larp",
    name: "LARP",
    href: "/the-archive/larp",
    description:
      "Characters, costumes, and full commitment. The earnest energy of people who stopped pretending to pretend.",
    coverImage: "/Archive/Larp/DSC02860.JPG",
    images: [
      "/Archive/Larp/DSC02860.JPG",
      "/Archive/Larp/DSC02873.JPG",
      "/Archive/Larp/DSC02891.JPG",
    ],
  },
  {
    index: "007",
    slug: "studio",
    name: "STUDIO",
    href: "/the-archive/studio",
    description:
      "Three frames from a controlled space. Setup, subject, resolve.",
    coverImage: "/Archive/Studio/DSC03283.JPG",
    images: [
      "/Archive/Studio/DSC03283.JPG",
      "/Archive/Studio/DSC03301.JPG",
      "/Archive/Studio/IMG_2320.JPG",
    ],
  },
  {
    index: "008",
    slug: "glo-rich",
    name: "GLO RICH",
    href: "/the-archive/glo-rich",
    description:
      "Glo Rich live at CT Shutdown. Fresh frames from the underground set, kept close to the performer and the heat of the room.",
    coverImage: "/Archive/Glo Rich/Glo Rich-01.jpeg",
    images: [
      "/Archive/Glo Rich/Glo Rich-01.jpeg",
      "/Archive/Glo Rich/Glo Rich-02.jpeg",
      "/Archive/Glo Rich/Glo Rich-03.jpeg",
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
  {
    index: "009",
    slug: "sxint",
    name: "SXINT",
    href: "/the-archive/sxint",
    description:
      "Sxint live at CT Shutdown. Everything in this set stays close to the stage and the way the room felt while the music was actually hitting.",
    coverImage: "/Archive/Sxint/Sxint-01.jpg",
    images: [
      "/Archive/Sxint/Sxint-01.jpg",
      "/Archive/Sxint/Sxint-02.jpg",
      "/Archive/Sxint/Sxint-03.jpg",
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
  {
    index: "010",
    slug: "sookwyd",
    name: "SOOKWYD",
    href: "/the-archive/sookwyd",
    description:
      "Sookwyd live at CT Shutdown. Two close frames from the set, held on the performer and the pressure of the room while everything was still in motion.",
    coverImage: "/Archive/Sookwyd/Sookwyd-01.jpg",
    images: [
      "/Archive/Sookwyd/Sookwyd-01.jpg",
      "/Archive/Sookwyd/Sookwyd-02.jpg",
    ],
    videoEmbedSrc: "https://www.youtube.com/embed/OJOIs6nvPS8",
    links: [
      {
        href: "https://linktr.ee/soooooook?utm_source=linktree_profile_share&ltsid=5fdf166e-490d-4f14-9c2f-7153092e4533",
        label: "LINKTREE",
      },
    ],
  },
];

export const ARCHIVE_MANIFESTO =
  "What appears here is not a highlight reel but a record of presence. Different places, different light, the same commitment to seeing, feeling, and";

export const ARCHIVE_SCRAMBLE_WORDS = [
  "SEEING",
  "FEELING",
  "BEING",
  "LIGHT",
] as const;

export const ARCHIVE_TAGS = {
  process: "THIS ARCHIVE DOES NOT\nCHASE MOMENTS.\nIT HOLDS THEM.",
  systems: "THIS SPACE HOLDS\nPLACES_\nPEOPLE_\nPULSE_",
};
