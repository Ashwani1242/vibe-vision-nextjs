"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Music } from "lucide-react";

interface AudioDiscProps {
  isPlaying: boolean;
  thumbnail?: string;
}

export function AudioDisc({ isPlaying, thumbnail }: AudioDiscProps) {
  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      <motion.div
        className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20"
        animate={{
          rotate: isPlaying ? 360 : 0
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          paused: !isPlaying
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-primary/5">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="Album art"
              fill
              className="object-cover rounded-full"
              sizes="128px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="h-12 w-12 text-primary/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-background border-2 border-primary" />
          </div>
        </div>
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-lg" />
    </div>
  );
}