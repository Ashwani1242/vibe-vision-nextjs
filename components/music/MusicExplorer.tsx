'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  ListMusic,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

import MusicPlayer from './player/MusicPlayer';
import SearchBar from './SearchBar';
import TrendingSongs from './sections/TrendingSongs';
import GenreSection from './sections/GenreSection';
import PlaylistSection from './sections/PlaylistSection';
import NewSongs from './sections/NewSongs';

import {
  trendingSongs,
  newSongs,
  genres,
  trendingPlaylists
} from '@/lib/sample-data';
import { Song } from '@/types/music';

export default function MusicExplorer() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentView, setCurrentView] = useState<'explore' | 'library' | 'radio'>('explore');
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

  const renderContent = () => {
    switch (currentView) {
      case 'explore':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            <TrendingSongs
              songs={trendingSongs}
              onPlaySong={(song) => handlePlaySong(song, trendingSongs)}
            />
            <GenreSection genres={genres} />
            <PlaylistSection playlists={trendingPlaylists} />
            <NewSongs
              songs={newSongs}
              onPlaySong={(song) => handlePlaySong(song, newSongs)}
            />
          </motion.div>
        );
      case 'library':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Your Library</h2>
            <p className="text-gray-400">Coming soon...</p>
          </motion.div>
        );
      case 'radio':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Radio Stations</h2>
            <p className="text-gray-400">Coming soon...</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-bold text-white"
          >
            Music Explorer
          </motion.h1>
          <SearchBar 
            onPlaySong={handlePlaySong}
            currentSong={currentSong}
          />
        </div>

        <div className="flex mb-6 space-x-4">
          {[
            { view: 'explore', icon: Layout, label: 'Explore' },
            { view: 'library', icon: ListMusic, label: 'Library' },
            { view: 'radio', icon: Radio, label: 'Radio' }
          ].map(({ view, icon: Icon, label }) => (
            <motion.button
              key={view}
              onClick={() => setCurrentView(view as any)}
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

        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
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