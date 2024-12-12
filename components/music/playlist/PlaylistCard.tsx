'use client';

import { motion } from 'framer-motion';
import { Play, MoreHorizontal } from 'lucide-react';
import { Playlist } from '@/types/music';
import { cn } from '@/lib/utils';

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay: (playlist: Playlist) => void;
  onOpenDetails: (playlist: Playlist) => void;
  isActive?: boolean;
}

export default function PlaylistCard({
  playlist,
  onPlay,
  onOpenDetails,
  isActive
}: PlaylistCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative rounded-xl overflow-hidden cursor-pointer",
        "transition-all duration-300",
        isActive && "ring-2 ring-cyan-500"
      )}
    >
      <div className="relative aspect-[2/1]">
        <img
          src={playlist.imageUrl}
          alt={playlist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{playlist.name}</h3>
          {playlist.description && (
            <p className="text-sm text-gray-300">{playlist.description}</p>
          )}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(playlist);
            }}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"
          >
            <MoreHorizontal size={20} />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onPlay(playlist);
          }}
          className={cn(
            "absolute bottom-4 right-4 w-12 h-12",
            "bg-cyan-500 rounded-full flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            "text-white shadow-lg"
          )}
        >
          <Play size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
}