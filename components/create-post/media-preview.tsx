"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Image as ImageIcon, FileVideo, FileAudio } from "lucide-react";
import Image from "next/image";

interface MediaPreviewProps {
  file: File;
  onRemove: () => void;
}

export function MediaPreview({ file, onRemove }: MediaPreviewProps) {
  const [previewUrl] = useState(() => URL.createObjectURL(file));

  const getMediaType = () => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "unknown";
  };

  const mediaType = getMediaType();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative group aspect-square bg-secondary rounded-lg overflow-hidden"
    >
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>

      {mediaType === "image" && (
        <Image
          src={previewUrl}
          alt="Preview"
          fill
          className="object-cover"
        />
      )}

      {mediaType === "video" && (
        <video
          src={previewUrl}
          className="w-full h-full object-cover"
          controls
        />
      )}

      {mediaType === "audio" && (
        <div className="w-full h-full flex items-center justify-center bg-secondary">
          <FileAudio className="h-12 w-12" />
          <audio src={previewUrl} controls className="absolute bottom-0 w-full" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs truncate">{file.name}</p>
      </div>
    </motion.div>
  );
}