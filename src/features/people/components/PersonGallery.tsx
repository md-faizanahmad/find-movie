"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

interface PersonImage {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
}

interface Props {
  images: PersonImage[];
}
export function PersonGallery({ images }: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!images.length) return null;

  return (
    <>
      <section>
        <h2 className="mb-6 text-2xl font-bold">Gallery</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {images.slice(0, 8).map((image, index) => {
            const imageUrl = `${IMAGE_BASE_URL}/w500${image.file_path}`;
            const fullImageUrl = `${IMAGE_BASE_URL}/original${image.file_path}`;

            return (
              <div
                key={index}
                onDoubleClick={() => setPreviewImage(fullImageUrl)}
                className="relative aspect-2/3 cursor-zoom-in overflow-hidden rounded-2xl"
              >
                <Image
                  src={imageUrl}
                  alt="Profile"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      </section>

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <div className="relative h-full w-full">
            <Image
              src={previewImage}
              alt="Preview"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
