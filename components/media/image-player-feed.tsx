"use client";

import { useState } from "react";
import Image from "next/image";

interface ImagePlayerProps {
  src: string;
  alt?: string;
}

export function ImagePlayer({ src, alt = "" }: ImagePlayerProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="relative aspect-video bg-muted flex items-center justify-center rounded-md">
        <p className="text-muted-foreground">Image unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}