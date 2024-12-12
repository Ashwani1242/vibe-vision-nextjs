'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Check } from 'lucide-react';
import { Playlist, Song } from '@/types/music';
import { cn } from '@/lib/utils';

interface AddToPlaylistModalProps {
  song: Song;
  playlists: Playlist[];
  onAddToPlaylist: (playlistId: string, song: Song) => void;
  onClose: () => void;
}

export default function AddToPlaylistModal({
  song,
  playlists,
  onAddToPlaylist,
  onClose
}: AddToPlaylistModalProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const handleAdd = () => {
    if (selectedPlaylist) {
      onAddToPlaylist(selectedPlaylist, song);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark-800 rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add to Playlist</h2>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {playlists.map(playlist => (
            <motion.div
              key={playlist.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPlaylist(playlist.id)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg cursor-pointer",
                "transition-colors duration-200",
                selectedPlaylist === playlist.id
                  ? "bg-cyan-500/20 border border-cyan-500"
                  : "bg-dark-700 hover:bg-dark-600 border border-transparent"
              )}
            >
              <img
                src={playlist.imageUrl}
                alt={playlist.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-white">{playlist.name}</h3>
                <p className="text-sm text-gray-400">
                  {playlist.songs?.length || 0} songs
                </p>
              </div>
              {selectedPlaylist === playlist.id && (
                <Check className="text-cyan-500" size={24} />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedPlaylist}
            className={cn(
              "px-6 py-2 rounded-full",
              "transition-colors duration-200",
              selectedPlaylist
                ? "bg-cyan-500 text-white hover:bg-cyan-600"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            )}
          >
            Add to Playlist
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}