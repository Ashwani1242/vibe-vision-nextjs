'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Song, UserPlaylist } from '@/types/music';
import { cn } from '@/lib/utils';

interface AddToPlaylistDialogProps {
  song: Song;
  playlists: UserPlaylist[];
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  onCreatePlaylist: (playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => void;
}

export default function AddToPlaylistDialog({
  song,
  playlists,
  onAddToPlaylist,
  onCreatePlaylist
}: AddToPlaylistDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="text-gray-400 hover:text-white"
      >
        <Plus size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-dark-800 rounded-lg p-6 w-full max-w-md z-50"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold mb-4">Add to Playlist</h2>

              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      onAddToPlaylist(playlist.id, song.id);
                      setIsOpen(false);
                    }}
                    className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-white/5"
                  >
                    <img
                      src={playlist.imageUrl}
                      alt={playlist.name}
                      className="w-12 h-12 rounded"
                    />
                    <div className="text-left">
                      <div className="font-medium">{playlist.name}</div>
                      <div className="text-sm text-gray-400">
                        {playlist.songs?.length || 0} songs
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}