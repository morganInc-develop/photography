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
    slug: "codename-noir",
    name: "CODENAME NOIR",
    href: "/the-archive/codename-noir",
    description:
      "A streetwear editorial moving through brick, murals, campus paths, and concrete shadow with two subjects and the clothes kept at the center.",
    coverImage: "/Archive/Codename Noir/DSC06257-2.webp",
    images: [
      "/Archive/Codename Noir/DSC06257-2.webp",
      "/Archive/Codename Noir/DSC06265.webp",
      "/Archive/Codename Noir/DSC06267.webp",
      "/Archive/Codename Noir/DSC06279-2.webp",
      "/Archive/Codename Noir/DSC06283.webp",
      "/Archive/Codename Noir/DSC06291.webp",
      "/Archive/Codename Noir/DSC06318.webp",
      "/Archive/Codename Noir/DSC06321.webp",
      "/Archive/Codename Noir/DSC06325.webp",
      "/Archive/Codename Noir/DSC06334.webp",
      "/Archive/Codename Noir/DSC06337.webp",
      "/Archive/Codename Noir/DSC06342.webp",
      "/Archive/Codename Noir/DSC06343.webp",
      "/Archive/Codename Noir/DSC06350-Edit-Edit-Edit.webp",
      "/Archive/Codename Noir/DSC06350.webp",
      "/Archive/Codename Noir/DSC06356-Edit.webp",
      "/Archive/Codename Noir/DSC06359.webp",
      "/Archive/Codename Noir/DSC06366.webp",
      "/Archive/Codename Noir/DSC06367.webp",
      "/Archive/Codename Noir/DSC06369.webp",
      "/Archive/Codename Noir/DSC06403-Edit.webp",
      "/Archive/Codename Noir/DSC06404-Edit.webp",
      "/Archive/Codename Noir/DSC06405.webp",
      "/Archive/Codename Noir/DSC06410.webp",
      "/Archive/Codename Noir/DSC06414-2-Edit.webp",
      "/Archive/Codename Noir/DSC06415-Edit.webp",
      "/Archive/Codename Noir/DSC06424.webp",
      "/Archive/Codename Noir/DSC06429.webp",
      "/Archive/Codename Noir/DSC06433.webp",
      "/Archive/Codename Noir/DSC06434.webp",
      "/Archive/Codename Noir/DSC06437.webp",
      "/Archive/Codename Noir/DSC06439.webp",
      "/Archive/Codename Noir/DSC06442.webp",
      "/Archive/Codename Noir/DSC06456.webp",
      "/Archive/Codename Noir/DSC06458.webp",
      "/Archive/Codename Noir/DSC06479.webp",
      "/Archive/Codename Noir/DSC06483.webp",
      "/Archive/Codename Noir/DSC06485.webp",
      "/Archive/Codename Noir/DSC06489.webp",
      "/Archive/Codename Noir/DSC06495.webp",
      "/Archive/Codename Noir/DSC06497.webp",
      "/Archive/Codename Noir/DSC06498.webp",
      "/Archive/Codename Noir/DSC06500.webp",
      "/Archive/Codename Noir/DSC06505.webp",
      "/Archive/Codename Noir/DSC06508.webp",
      "/Archive/Codename Noir/DSC06509.webp",
      "/Archive/Codename Noir/DSC06513.webp",
      "/Archive/Codename Noir/inspo.webp",
    ],
  },
  {
    index: "002",
    slug: "checksean",
    name: "CHECKSEAN",
    href: "/the-archive/checksean",
    description:
      "A motion-first entry built around movement, timing, and presence, held in the archive with a still frame from the cut.",
    coverImage: "/Archive/CheckSean/CheckSean-poster.webp",
    images: ["/Archive/CheckSean/CheckSean-poster.webp"],
  },
  {
    index: "003",
    slug: "amari",
    name: "AMARI",
    href: "/the-archive/amari",
    description:
      "Portrait frames with clean light, close detail, and a soft but deliberate charge.",
    coverImage: "/Archive/Amari/DSC05316-Edit.webp",
    images: [
      "/Archive/Amari/DSC05316-Edit.webp",
      "/Archive/Amari/DSC05364.webp",
      "/Archive/Amari/DSC05387.webp",
      "/Archive/Amari/DSC05414.webp",
      "/Archive/Amari/DSC05471.webp",
      "/Archive/Amari/DSC05490.webp",
      "/Archive/Amari/DSC05503.webp",
      "/Archive/Amari/DSC05513-Edit.webp",
      "/Archive/Amari/DSC05590-Edit.webp",
      "/Archive/Amari/DSC05603-Edit.webp",
      "/Archive/Amari/DSC05614-Edit.webp",
      "/Archive/Amari/DSC05654-Edit.webp",
      "/Archive/Amari/DSC05696.webp",
      "/Archive/Amari/DSC05704.webp",
      "/Archive/Amari/DSC05762-Edit-Edit.webp",
      "/Archive/Amari/DSC05774.webp",
      "/Archive/Amari/DSC05779.webp",
      "/Archive/Amari/DSC05827.webp",
      "/Archive/Amari/DSC05866.webp",
      "/Archive/Amari/DSC05945.webp",
      "/Archive/Amari/hair.webp",
    ],
  },
  {
    index: "004",
    slug: "black-love",
    name: "BLACK LOVE",
    href: "/the-archive/black-love",
    description:
      "A short, intimate set focused on closeness, ease, and the small body language between frames.",
    coverImage: "/Archive/Black Love/DSC04985.webp",
    images: [
      "/Archive/Black Love/DSC04985.webp",
      "/Archive/Black Love/DSC04988-2.webp",
      "/Archive/Black Love/DSC04992.webp",
    ],
  },
  {
    index: "005",
    slug: "headspace",
    name: "HEADSPACE",
    href: "/the-archive/headspace",
    description:
      "A controlled room, reflective mood, portrait rhythm, and graphic details held together as one visual state.",
    coverImage: "/Archive/Headspace/DSC04997-2.webp",
    images: [
      "/Archive/Headspace/DSC04997-2.webp",
      "/Archive/Headspace/DSC04997.webp",
      "/Archive/Headspace/DSC05004.webp",
      "/Archive/Headspace/DSC05012.webp",
      "/Archive/Headspace/DSC05014.webp",
      "/Archive/Headspace/DSC05016.webp",
      "/Archive/Headspace/DSC05017.webp",
      "/Archive/Headspace/DSC05023-2.webp",
      "/Archive/Headspace/DSC05023.webp",
      "/Archive/Headspace/DSC05027-2.webp",
      "/Archive/Headspace/DSC05027.webp",
      "/Archive/Headspace/DSC05030-2.webp",
      "/Archive/Headspace/DSC05030.webp",
      "/Archive/Headspace/DSC05037-2.webp",
      "/Archive/Headspace/DSC05037.webp",
      "/Archive/Headspace/headspace.webp",
    ],
  },
  {
    index: "006",
    slug: "imperfect",
    name: "IMPERFECT",
    href: "/the-archive/imperfect",
    description:
      "Close portraits with natural tension, texture, and the rough edges left in place.",
    coverImage: "/Archive/Imperfect/DSC04928.webp",
    images: [
      "/Archive/Imperfect/DSC04928.webp",
      "/Archive/Imperfect/DSC04931.webp",
      "/Archive/Imperfect/DSC04941.webp",
      "/Archive/Imperfect/DSC04951.webp",
      "/Archive/Imperfect/DSC04962.webp",
      "/Archive/Imperfect/DSC04969.webp",
      "/Archive/Imperfect/DSC04970.webp",
      "/Archive/Imperfect/DSC04974.webp",
      "/Archive/Imperfect/DSC04976.webp",
      "/Archive/Imperfect/DSC04982-2.webp",
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
  {
    index: "011",
    slug: "ct-shutdown",
    name: "CT SHUTDOWN",
    href: "/the-archive/ct-shutdown",
    description:
      "The room around the sets. CT Shutdown documented wider: stage light, crowd pressure, and the raw environment that held the whole night together.",
    coverImage: "/Archive/CT Shutdown/CT Shutdown-00.JPG",
    images: [
      "/Archive/CT Shutdown/CT Shutdown-00.JPG",
      "/Archive/CT Shutdown/CT Shutdown-01.JPG",
      "/Archive/CT Shutdown/CT Shutdown-02.JPG",
      "/Archive/CT Shutdown/CT Shutdown-03.JPG",
      "/Archive/CT Shutdown/CT Shutdown-04.JPG",
      "/Archive/CT Shutdown/CT Shutdown-05.jpg",
      "/Archive/CT Shutdown/CT Shutdown-06.jpg",
      "/Archive/CT Shutdown/CT Shutdown-07.jpg",
    ],
  },
  {
    index: "012",
    slug: "night",
    name: "NIGHT",
    href: "/the-archive/night",
    description:
      "Night live at CT Shutdown. Two dark, direct frames kept close to the performer and the light coming off the room.",
    coverImage: "/Archive/Night/Night-01.jpg",
    images: ["/Archive/Night/Night-01.jpg", "/Archive/Night/Night-02.jpeg"],
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
