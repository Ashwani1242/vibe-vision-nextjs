"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageGridProps {
  images: string[];
  onImageClick: (image: string) => void;
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  return (
    <div className={cn(
      "grid gap-6",
      images.length === 1 && "grid-cols-1",
      images.length === 2 && "grid-cols-2",
      images.length > 2 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    )}>
      {images.map((image, index) => (
        <div
          key={index}
          className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
          onClick={() => onImageClick(image)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
          <Image
            src={image}
            alt={`Generated image ${index + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <p className="text-sm font-medium">Image {index + 1}</p>
          </div>
        </div>
      ))}
    </div>
  );
}