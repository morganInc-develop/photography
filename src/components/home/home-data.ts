export const PRELOADER_IMAGES = [
  "https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69452788e703150440dd4180_nr__made.avif",
  "https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69450a8530b7cb5397f735b1_imgi_2_694029f4e8c0a6ddee00bdb3_made.avif",
  "https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/6945261f9b350c9f511e4300_nr__works.avif",
  "https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69450a858ed0e64cbb06769b_imgi_2_693721763652e191864f3eb4_creative__cover.avif",
  "https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69450a859b114fff691426d7_imgi_4_693addb991bb467302498f12_NR__STUDIO%20(1)-min.avif",
] as const;

export type ArtboardPhoto = {
  id: string;
  src: string;
  title: string;
  year: string;
  location: string;
  description: string;
};

export const ARTBOARD_PHOTOS: ArtboardPhoto[] = [
  {
    id: "01",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80",
    title: "Celestial Ridge",
    year: "2021",
    location: "Bernese Alps, Switzerland",
    description: "The Milky Way arches over a jagged alpine ridge at 3,800m. A 25-second exposure captured the star field without trailing — the summit air was perfectly still.",
  },
  {
    id: "02",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80",
    title: "Above the Veil",
    year: "2022",
    location: "Zugspitze, Germany",
    description: "A sea of cloud fills the valley below while the summit pushes through into clear air. Shot at golden hour, the transition between fog and sky defines the entire frame.",
  },
  {
    id: "03",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    title: "Silicon Lattice",
    year: "2023",
    location: "Studio, Milan",
    description: "A macro study of a processor die — its copper pathways and logic gates rendered in high contrast. The image treats industrial infrastructure as landscape.",
  },
  {
    id: "04",
    src: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1200&auto=format&fit=crop&q=80",
    title: "Penumbral Grove",
    year: "2022",
    location: "Black Forest, Germany",
    description: "Light fractures through a dense canopy in late afternoon, casting hard-edged shadows across the forest floor. The fog held just long enough for a single frame.",
  },
  {
    id: "05",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    title: "Orbital Survey",
    year: "2020",
    location: "Low Earth Orbit",
    description: "The terminator line — where night meets day — cuts across a continent. City clusters glow amber in the darkness, tracing the invisible geometry of human settlement.",
  },
  {
    id: "06",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
    title: "High Traverse",
    year: "2021",
    location: "Valsavarenche, Aosta Valley",
    description: "A long-distance alpine route captured mid-crossing. The scale of the terrain diminishes the figure to a point — the mountain asserts its indifference.",
  },
  {
    id: "07",
    src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&auto=format&fit=crop&q=80",
    title: "Nocturne",
    year: "2023",
    location: "Tokyo, Japan",
    description: "Street light dissolves into bokeh at f/1.4. The city becomes abstract — a study in coloured circles and soft gradients rather than architecture or signage.",
  },
  {
    id: "08",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80",
    title: "Last Hour",
    year: "2022",
    location: "Adriatic Coast, Croatia",
    description: "The sky shifts through five shades of orange in the final minutes before dark. The horizon holds a thin band of pale green — a rare atmospheric refraction.",
  },
  {
    id: "09",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    title: "Signal Path",
    year: "2023",
    location: "Studio, Turin",
    description: "Fibre optic strands caught mid-transmission, each filament carrying light at a different wavelength. The image maps invisible infrastructure into colour.",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80",
    title: "Convergence",
    year: "2021",
    location: "Barcelona, Spain",
    description: "A crowd photographed from directly above — bodies become vectors, movement becomes pattern. The image questions the individual within collective motion.",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=1200&auto=format&fit=crop&q=80",
    title: "Study in Light",
    year: "2022",
    location: "Studio, Rome",
    description: "A single softbox at 45 degrees. The entire philosophy of portrait lighting reduced to one decision — where the shadow falls determines everything about the face.",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=1200&auto=format&fit=crop&q=80",
    title: "Resonance",
    year: "2020",
    location: "Arena di Verona, Italy",
    description: "The moment before a note lands — the performer suspended between preparation and release. The crowd is invisible; the light isolates the figure completely.",
  },
  {
    id: "13",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80",
    title: "Gaze",
    year: "2023",
    location: "Studio, Florence",
    description: "A direct address to the lens. The subject neither poses nor performs — she simply looks. The frame holds the weight of that contact without resolution.",
  },
  {
    id: "14",
    src: "https://images.pexels.com/photos/2387532/pexels-photo-2387532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Grey Horizon",
    year: "2021",
    location: "North Sea Coast, Norway",
    description: "Sky and water become a single tone of grey — the horizon line barely perceptible. The image is about what cannot be distinguished, not what can.",
  },
  {
    id: "15",
    src: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Structural",
    year: "2022",
    location: "Copenhagen, Denmark",
    description: "A modernist facade photographed at noon — the sun eliminates all shadows. The building reads as pure geometry, its materiality reduced to line and proportion.",
  },
  {
    id: "16",
    src: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Burning Meridian",
    year: "2020",
    location: "Sahara Desert, Morocco",
    description: "The sun sets directly behind a sand dune, sending a perfect gradient from white to deep ochre across the sky. No filters — the desert does this on its own.",
  },
  {
    id: "17",
    src: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Micro System",
    year: "2023",
    location: "Laboratory, Geneva",
    description: "A micro-organism culture photographed through a phase-contrast microscope. The forms are alien and familiar simultaneously — life at a scale the eye cannot reach.",
  },
  {
    id: "18",
    src: "https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Canopy",
    year: "2021",
    location: "Białowieża Forest, Poland",
    description: "Looking up through the oldest forest in Europe — a tangle of branches filters pale winter light. The image records something that has not changed in centuries.",
  },
  {
    id: "19",
    src: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Editorial",
    year: "2022",
    location: "Studio, Paris",
    description: "A fashion editorial reduced to its essential gesture — the garment, the silhouette, the single deliberate pose. Everything else has been removed.",
  },
  {
    id: "20",
    src: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Profile",
    year: "2023",
    location: "Studio, Amsterdam",
    description: "A three-quarter profile against a mid-tone grey ground. The classical portrait arrangement — but the expression resists the conventions the framing implies.",
  },
  {
    id: "21",
    src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Urban Fragment",
    year: "2022",
    location: "Seoul, South Korea",
    description: "A section of city photographed through a long lens — compression collapses the layers of street, facade, and signage into a single dense plane of information.",
  },
  {
    id: "22",
    src: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Reduction",
    year: "2021",
    location: "Iceland",
    description: "A black sand beach at low tide — a line of foam, a line of sand, a line of sky. The image asks what remains when everything non-essential is removed.",
  },
  {
    id: "23",
    src: "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Flat Earth",
    year: "2020",
    location: "Pampas, Argentina",
    description: "The flattest place on earth — a horizon that runs uninterrupted for 360 degrees. The vastness is only readable through the single vertical of a fence post.",
  },
  {
    id: "24",
    src: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Assembly",
    year: "2023",
    location: "Berlin, Germany",
    description: "A working group photographed through glass — the partition softens the image, turns a scene of ordinary collaboration into something observed from a distance.",
  },
  {
    id: "25",
    src: "https://images.pexels.com/photos/1064162/pexels-photo-1064162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Grid",
    year: "2022",
    location: "Manhattan, New York",
    description: "Photographed from the 80th floor looking straight down — the street plan becomes pure abstraction. The city as diagram, the city as intention made visible.",
  },
];

export const HOME_MANIFESTO =
  "Digital Experience Designer and Awwwards Judge. I create immersive websites defined by strong visual direction, refined motion, and a distinct design signature.";

export const LOADER_MANIFESTO =
  "WHAT APPEARS HERE IS NOT A SHOWCASE, BUT THE TRACE OF A PRACTICE";

export const DEMO_VIDEO_SRC =
  "https://vz-015fe5e8-a53.b-cdn.net/559d3626-9339-4d4d-be69-06e5d4e0f4ea/playlist.m3u8";

export const DEMO_VIDEO_PLACEHOLDER =
  "https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69450a856a28f12fd88f17ac_imgi_5_693ada0d9f879dafcd0bab03_iphone-min.avif";
