export type ArchiveProject = {
  index: string;
  slug: string;
  name: string;
  href: string;
  description: string;
  coverImage: string;
};

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    index: "001",
    slug: "retronova",
    name: "RETRONOVA",
    href: "/works/retronova",
    description:
      "A retro-futurist vision shaped through AI imagery, cinematic motion and luminous soundscapes. Metallic silhouettes, fashion influences and synthetic memories merge into an immersive environment where nostalgia bends toward a future that never existed but still feels strangely real.",
    coverImage:
      "https://images.unsplash.com/photo-1518818419601-72c8673f5852?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "002",
    slug: "nicola-romei",
    name: "NICOLA ROMEI",
    href: "/works/nicola-romei",
    description:
      "This portfolio unfolds as an exposed process, gathering AI sketches, drafts, typographic tests and structural studies into a single immersive artboard. A brutalist grid and subtle WebGL depth shape a space where experimentation and identity quietly define each other.",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "003",
    slug: "creative-leap",
    name: "CREATIVE LEAP",
    href: "/works/creative-leap",
    description:
      "A calm digital narrative built from soft gradients, gentle transitions and a restrained visual rhythm. Innovation becomes tactile as AI integrates into each scene with quiet clarity, shaping an elegant experience that turns complexity into a natural and intuitive flow.",
    coverImage:
      "https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    index: "004",
    slug: "made-in-evolve",
    name: "MADE IN EVOLVE",
    href: "/works/made-in-evolve",
    description:
      "A tech-editorial environment defined by bold typography, clean imagery and sharp structural clarity. Each layout balances discipline and momentum, creating a refined digital presence where innovation becomes a precise visual language that moves confidently forward.",
    coverImage:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    index: "005",
    slug: "valsavarenche",
    name: "VALSAVARENCHE",
    href: "/works/valsavarenche",
    description:
      "A landscape of grain, muted tones and cartographic textures evokes the rugged stillness of alpine territory. Vintage-park cues and weathered visuals form an atmosphere of exploration, transforming the valley's geography into a quiet, immersive field of memory and terrain.",
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "006",
    slug: "davide-cattaneo",
    name: "DAVIDE CATTANEO",
    href: "/works/davide-cattaneo",
    description:
      "A data-driven digital environment built around clarity, precision, and controlled intensity. Dark surfaces, neon accents, and immersive scroll interactions translate analytical thinking into a visual system where information feels alive, dynamic, and intentionally structured.",
    coverImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "007",
    slug: "studies-in-form",
    name: "Studies in Form",
    href: "/works/studies-in-form",
    description:
      "An ongoing visual exploration where AI-generated imagery becomes a tool for studying shape, balance and visual tension, transforming raw experimentation into controlled aesthetic research.",
    coverImage:
      "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    index: "008",
    slug: "geotab-signals",
    name: "GEOTAB SIGNALS",
    href: "/works/geotab-signals",
    description:
      "Corporate experience turning data into clarity. Deep tech blues and neon accents create a sophisticated narrative, signaling intelligence before explaining it.",
    coverImage:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export const ARCHIVE_MANIFESTO =
  "What appears here is not a sequence of outcomes, but a record of decisions. Different contexts, different constraints, the same insistence on clarity, structure, and";

export const ARCHIVE_SCRAMBLE_WORDS = [
  "PRACTICE",
  "PROCESS",
  "RESEARCH",
  "SYSTEM",
] as const;

export const ARCHIVE_TAGS = {
  process: "THIS ARCHIVE DOES NOT\nCOLLECT RESULTS.\nIT PRESERVES PROCESS.",
  systems: "THIS SPACE HOLDS\nPROJECTS_\nTESTS_\nVISUAL SYSTEMS_",
};
