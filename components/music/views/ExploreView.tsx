'use client';

import { motion } from 'framer-motion';
import { Song } from '@/types/music';
import TrendingSongs from '../sections/TrendingSongs';
import GenreSection from '../sections/GenreSection';
import PlaylistSection from '../sections/PlaylistSection';
import NewSongs from '../sections/NewSongs';

interface ExploreViewProps {
  trendingSongs: Song[];
  newSongs: Song[];
  genres: any[];
  playlists: any[];
  onPlaySong: (song: Song, playlist?: Song[]) => void;
  currentSong: Song | null;
}

export default function ExploreView({
  trendingSongs,
  newSongs,
  genres,
  playlists,
  onPlaySong,
  currentSong
}: ExploreViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-12"
    >
      <TrendingSongs
        songs={trendingSongs}
        onPlaySong={(song) => onPlaySong(song, trendingSongs)}
      />
      <GenreSection genres={genres} />
      <PlaylistSection 
        playlists={playlists}
        onPlaySong={onPlaySong}
        currentSong={currentSong}
      />
      <NewSongs
        songs={newSongs}
        onPlaySong={(song) => onPlaySong(song, newSongs)}
      />
    </motion.div>
  );
}