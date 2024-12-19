'use client';

import Image from 'next/image';
import { MemeText } from '@/types/types';
import { cn } from '@/lib/utils';

interface PreviewImageProps {
  imageUrl: string;
  text: MemeText;
  className?: string;
}

export function PreviewImage({ imageUrl, text, className }: PreviewImageProps) {
  const textStyle = {
    fontSize: `${text.fontSize}px`,
    color: text.color,
    fontFamily: text.fontFamily,
    textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
  };

  return (
    <div className={cn("relative aspect-square", className)}>
      <Image
        src={imageUrl}
        alt="Meme preview"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
        <p 
          className="text-center uppercase max-w-[90%] break-words leading-tight"
          style={textStyle}
        >
          {text.top}
        </p>
        <p 
          className="text-center uppercase max-w-[90%] break-words leading-tight"
          style={textStyle}
        >
          {text.bottom}
        </p>
      </div>
    </div>
  );
}