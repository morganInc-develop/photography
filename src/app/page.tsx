import { getArtboardPhotos } from "@/lib/archive/archive-data.server";
import HomePage from "@/components/home/HomePage";

export default async function Home() {
  const photos = await getArtboardPhotos();

  return <HomePage photos={photos} />;
}
