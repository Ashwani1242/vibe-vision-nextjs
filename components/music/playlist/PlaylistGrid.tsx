'use client';

import { motion } from 'framer-motion';
import { Playlist, Song } from '@/types/music';
import PlaylistCard from './PlaylistCard';

interface PlaylistGridProps {
  playlists: Playlist[];
  onPlayPlaylist: (playlist: Playlist) => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  currentSong: Song | null;
}

export default function PlaylistGrid({
  playlists,
  onPlayPlaylist,
  onSelectPlaylist,
  currentSong
}: PlaylistGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {playlists.map((playlist, index) => (
        <motion.div
          key={playlist.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PlaylistCard
            playlist={playlist}
            onPlay={onPlayPlaylist}
            onOpenDetails={onSelectPlaylist}
            isActive={playlist.songs?.some(song => song.id === currentSong?.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}