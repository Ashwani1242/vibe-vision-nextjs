'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Heart, Clock, MoreHorizontal } from 'lucide-react';
import { Playlist, Song } from '@/types/music';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/format';

interface PlaylistDetailsProps {
  playlist: Playlist;
  onClose: () => void;
  onPlaySong: (song: Song) => void;
  currentSong?: Song | null;
}

export default function PlaylistDetails({
  playlist,
  onClose,
  onPlaySong,
  currentSong
}: PlaylistDetailsProps) {
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());

  const toggleLike = (songId: string) => {
    const newLikedSongs = new Set(likedSongs);
    if (likedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={24} />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Playlist Info */}
          <div className="col-span-1">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
              <img
                src={playlist.imageUrl}
                alt={playlist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mt-6 mb-2">
              {playlist.name}
            </h1>
            {playlist.description && (
              <p className="text-gray-400 mb-4">{playlist.description}</p>
            )}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-cyan-500 text-white rounded-full font-semibold flex items-center gap-2"
              >
                <Play size={20} />
                Play All
              </motion.button>
            </div>
          </div>

          {/* Songs List */}
          <div className="col-span-2 space-y-2">
            {playlist.songs?.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onPlaySong(song)}
                className={cn(
                  "group grid grid-cols-[auto_1fr_auto_auto] gap-4 p-3 rounded-lg",
                  "hover:bg-white/5 cursor-pointer items-center",
                  currentSong?.id === song.id && "bg-white/10"
                )}
              >
                <div className="w-12 text-center text-gray-400 group-hover:text-white">
                  {index + 1}
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded"
                  />
                  <div className="truncate">
                    <div className={cn(
                      "font-medium truncate",
                      currentSong?.id === song.id ? "text-cyan-500" : "text-white"
                    )}>
                      {song.title}
                    </div>
                    <div className="text-sm text-gray-400 truncate">
                      {song.artist}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song.id);
                    }}
                    className={cn(
                      "opacity-0 group-hover:opacity-100 transition-opacity",
                      likedSongs.has(song.id) ? "text-red-500" : "text-white/60 hover:text-white"
                    )}
                  >
                    <Heart
                      size={18}
                      fill={likedSongs.has(song.id) ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                  <span className="text-sm text-gray-400">
                    {formatTime(song.duration)}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
                  >
                    <MoreHorizontal size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}