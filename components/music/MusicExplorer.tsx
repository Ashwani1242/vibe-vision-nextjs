'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Layout, ListMusic, Radio, Library } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Song } from '@/types/music';

import MusicPlayer from './player/MusicPlayer';
import SearchBar from './SearchBar';
import ExploreView from './views/ExploreView';
import PlaylistView from './views/PlaylistView';

import {
  trendingSongs,
  newSongs,
  genres,
  trendingPlaylists,
  allSongs
} from '@/lib/sample-data';
import Link from 'next/link';

type View = 'explore' | 'library' | 'radio' | 'playlists';

export default function MusicExplorer() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentView, setCurrentView] = useState<View>('explore');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handlePlaySong = useCallback((song: Song, playlist?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);

    const playlistToSet = playlist || [...trendingSongs, ...newSongs];
    setCurrentPlaylist(playlistToSet);
    setCurrentIndex(playlistToSet.findIndex(s => s.id === song.id));
  }, []);

  const handleNext = useCallback(() => {
    if (currentPlaylist.length > 0) {
      const nextIndex = (currentIndex + 1) % currentPlaylist.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(currentPlaylist[nextIndex]);
    }
  }, [currentPlaylist, currentIndex]);

  const handlePrevious = useCallback(() => {
    if (currentPlaylist.length > 0) {
      const prevIndex = currentIndex === 0
        ? currentPlaylist.length - 1
        : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(currentPlaylist[prevIndex]);
    }
  }, [currentPlaylist, currentIndex]);

  const handleShuffle = useCallback(() => {
    if (currentPlaylist.length > 0) {
      const shuffledPlaylist = [...currentPlaylist].sort(() => Math.random() - 0.5);
      setCurrentPlaylist(shuffledPlaylist);
      const newIndex = shuffledPlaylist.findIndex(
        song => song.id === currentSong?.id
      );
      setCurrentIndex(newIndex);
    }
  }, [currentPlaylist, currentSong]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className='flex items-center'>
          <Link href={'/'} className="flex items-center gap-2">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-2xl font-rubik-glitch text-transparent bg-clip-text bg-gradient-to-r from-[#4BC0C8] via-[#C779D0] to-[#FEAC5E]"
            >
              Vibe Vision
            </motion.h1>
          </Link>
        </div>
        <div className="flex items-center justify-between my-8 ">

          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-bold"
          >
            Music Explorer
          </motion.h1>
          <SearchBar 
            onPlaySong={handlePlaySong}
            currentSong={currentSong}
            songs={allSongs}
          />
        </div>

        <div className="flex mb-6 space-x-4">
          {[
            { view: 'explore', icon: Layout, label: 'Explore' },
            { view: 'playlists', icon: Library, label: 'Library' },
          ].map(({ view, icon: Icon, label }) => (
            <motion.button
              key={view}
              onClick={() => setCurrentView(view as View)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                currentView === view
                  ? 'bg-cyan-500 text-black'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        {currentView === 'explore' && (
          <ExploreView
            trendingSongs={trendingSongs}
            newSongs={newSongs}
            genres={genres}
            playlists={trendingPlaylists}
            onPlaySong={handlePlaySong}
            currentSong={currentSong}
          />
        )}
        {currentView === 'playlists' && (
          <PlaylistView
            onPlaySong={handlePlaySong}
            currentSong={currentSong}
          />
        )}
      </div>

      {currentSong && (
        <MusicPlayer
          song={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onShuffle={handleShuffle}
          hasNext={currentIndex < currentPlaylist.length - 1}
          hasPrevious={currentIndex > 0}
        />
      )}
    </div>
  );
}