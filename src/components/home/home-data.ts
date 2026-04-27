export const PRELOADER_IMAGES = [
  "/Archive-web/NYC/DSC01390.jpg",
  "/Archive-web/Beach/DSC03098.jpg",
  "/Archive-web/Gym/DSC00804.jpg",
  "/Archive-web/Studio/DSC03283.jpg",
  "/Archive-web/Larp/DSC02860.jpg",
] as const;

export type FeaturedArtistLink = {
  href: string;
  label: string;
};

export type FeaturedArtist = {
  collectionSlug: string;
  description: string;
  gallery: string[];
  heroImageAlt: string;
  heroImageSrc: string;
  links: FeaturedArtistLink[];
  name: string;
  videoEmbedSrc: string;
  videoTitle: string;
};

export const FEATURED_ARTISTS = [
  {
    collectionSlug: "glo-rich",
    description:
      "Glo Rich live at CT Shutdown. These are fresh frames from the underground set, pushed to the front as part of the most recent work on the board.",
    gallery: [
      "/Archive/Glo Rich/Glo Rich-01.jpeg",
      "/Archive/Glo Rich/Glo Rich-02.jpeg",
      "/Archive/Glo Rich/Glo Rich-03.jpeg",
    ],
    heroImageAlt: "Glo Rich performing at CT Shutdown",
    heroImageSrc: "/Archive/Glo Rich/Glo Rich-03.jpeg",
    links: [
      {
        href: "https://linktr.ee/Glorich100?utm_source=linktree_profile_share&ltsid=aaadd2e8-0692-44c0-b5f3-6b8bd3a9bd98",
        label: "LINKTREE",
      },
    ],
    name: "Glo Rich",
    videoEmbedSrc: "https://www.youtube.com/embed/BniimZibwEU?si=4ZWfaaU1UuC72MDg",
    videoTitle: "Glo Rich at CT Shutdown",
  },
  {
    collectionSlug: "sxint",
    description:
      "Sxint live at CT Shutdown. Proud of my brother. These photographs stay close to the room, the pressure, and the energy coming straight off the stage.",
    gallery: [
      "/Archive/Sxint/Sxint-01.jpg",
      "/Archive/Sxint/Sxint-02.jpg",
      "/Archive/Sxint/Sxint-03.jpg",
    ],
    heroImageAlt: "Sxint performing at CT Shutdown",
    heroImageSrc: "/Archive/Sxint/Sxint-03.jpg",
    links: [
      {
        href: "https://www.youtube.com/@UCm0QFpsEycfF3FEQ6eZWd3w",
        label: "YOUTUBE",
      },
      {
        href: "https://soundcloud.com/user-495163601",
        label: "SOUNDCLOUD",
      },
      {
        href: "https://open.spotify.com/artist/0Il5MAzLKVR47Q7nHSlfz5",
        label: "SPOTIFY",
      },
      {
        href: "https://www.instagram.com/hatesxint/",
        label: "INSTAGRAM",
      },
    ],
    name: "Sxint",
    videoEmbedSrc: "https://www.youtube.com/embed/YehcLLPVav8?si=I47XRdYln3u6WHx8",
    videoTitle: "Sxint at CT Shutdown",
  },
] satisfies readonly FeaturedArtist[];

export const HOME_MANIFESTO =
  "Made Invincible is a photography and videography practice focused on cinematic portraiture, documentary motion, and image-making with a tactile, atmospheric edge.";

export const LOADER_MANIFESTO =
  "WHAT APPEARS HERE IS NOT A SHOWCASE, BUT THE TRACE OF A PRACTICE";

export const DEMO_VIDEO_SRC = "/intro.MP4";

export const DEMO_VIDEO_PLACEHOLDER = "/intro-poster.jpg";
