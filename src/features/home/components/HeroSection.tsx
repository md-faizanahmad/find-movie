// features/home/components/HeroSection.tsx

import Image from "next/image";
import { SearchBar } from "./SearchBar";

interface Props {
  backdropPath: string | null;
}

export function HeroSection({ backdropPath }: Props) {
  const imageUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "/placeholder.png";

  return (
    <div className="relative h-[80vh] w-full">
      <Image src={imageUrl} alt="hero" fill priority className="object-cover" />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white mb-6">
          Discover Movies & Shows
        </h1>

        <SearchBar />
      </div>
    </div>
  );
}
