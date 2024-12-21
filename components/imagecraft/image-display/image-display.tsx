"use client";

import { useState } from "react";
import { ImageGrid } from "./image-grid";
import { ImageLightbox } from "./image-lightbox";
import { ImageDownload } from "./image-download";
import { PurposeMockup } from "./purpose-mockup";

interface ImageDisplayProps {
  images: string[];
  purpose: string;
}

export function ImageDisplay({ images, purpose }: ImageDisplayProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Generated Images</h2>
      <ImageGrid 
        images={images} 
        onImageClick={setSelectedImage}
      />
      <ImageDownload images={images} />
      <PurposeMockup image={images[0]} purpose={purpose} />
      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}