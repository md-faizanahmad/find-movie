import { notFound } from "next/navigation";
import { getMediaDetails } from "@/features/movies/api/getMediaDetails";
import { GalleryGrid } from "@/components/GalleryGrid";

interface Props {
  params: Promise<{
    mediaType: "movie" | "tv";
    id: string;
  }>;
}

export default async function GalleryPage({ params }: Props) {
  const { mediaType, id } = await params;

  if ((mediaType !== "movie" && mediaType !== "tv") || !/^\d+$/.test(id)) {
    notFound();
  }

  const media = await getMediaDetails(id, mediaType);
  if (!media) {
    notFound();
  }

  const backdrops = media.images?.backdrops || [];
  const title = media.title || "Gallery";

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-14 py-8 md:py-16 mt-4">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight uppercase italic text-white leading-tight">
            {title}{" "}
            <span className="text-red-500 font-light not-italic">Gallery</span>
          </h1>
          <p className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest mt-1">
            {backdrops.length} Total Backdrops
          </p>
        </div>

        {/* Hand off client interactive state to separate grid element */}
        <GalleryGrid
          filePaths={backdrops.map((img) => img.file_path)}
          title={title}
        />
      </div>
    </main>
  );
}
