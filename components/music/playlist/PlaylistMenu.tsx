'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { Song } from '@/types/music';
import AddToPlaylistModal from './AddToPlaylistModal';

interface PlaylistMenuProps {
  song: Song;
  onAddToPlaylist: (playlistId: string, song: Song) => void;
  playlists: any[];
}

export default function PlaylistMenu({
  song,
  onAddToPlaylist,
  playlists
}: PlaylistMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  return (
    <>
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <MoreHorizontal size={20} />
        </motion.button>

        <AnimatePresence>
          {showMenu && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-xl z-50 py-1"
              >
                <button
                  onClick={() => {
                    setShowAddToPlaylist(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add to Playlist
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setShowMenu(false)}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showAddToPlaylist && (
          <AddToPlaylistModal
            song={song}
            playlists={playlists}
            onAddToPlaylist={onAddToPlaylist}
            onClose={() => setShowAddToPlaylist(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}