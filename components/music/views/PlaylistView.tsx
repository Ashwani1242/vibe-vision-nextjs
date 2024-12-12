'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Playlist, Song } from '@/types/music';
import { usePlaylists } from '@/hooks/use-playlists';
import PlaylistGrid from '../playlist/PlaylistGrid';
import CreatePlaylistModal from '../playlist/CreatePlaylistModal';
import PlaylistDetails from '../playlist/PlaylistDetails';

interface PlaylistViewProps {
  onPlaySong: (song: Song, playlist?: Song[]) => void;
  currentSong: Song | null;
}

export default function PlaylistView({ onPlaySong, currentSong }: PlaylistViewProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  
  const {
    playlists,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist
  } = usePlaylists();

  const handleCreatePlaylist = (playlist: Playlist) => {
    createPlaylist(playlist);
    setShowCreateModal(false);
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs?.length) {
      onPlaySong(playlist.songs[0], playlist.songs);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Playlists</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-full"
        >
          <Plus size={20} />
          Create Playlist
        </motion.button>
      </div>

      <PlaylistGrid 
        playlists={playlists}
        onPlayPlaylist={handlePlayPlaylist}
        onSelectPlaylist={setSelectedPlaylist}
        currentSong={currentSong}
      />

      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePlaylist}
        />
      )}

      {selectedPlaylist && (
        <PlaylistDetails
          playlist={selectedPlaylist}
          onClose={() => setSelectedPlaylist(null)}
          onPlaySong={onPlaySong}
          onRemoveSong={(songId) => removeSongFromPlaylist(selectedPlaylist.id, songId)}
          onDeletePlaylist={() => {
            deletePlaylist(selectedPlaylist.id);
            setSelectedPlaylist(null);
          }}
          currentSong={currentSong}
        />
      )}
    </motion.div>
  );
}