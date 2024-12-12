'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { trendingSongs, newSongs } from '@/lib/sample-data';
import SearchResults from './search/SearchResults';
import { Song } from '@/types/music';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onPlaySong?: (song: Song) => void;
  currentSong?: Song | null;
}

export default function SearchBar({ onPlaySong, currentSong }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const allSongs = [...trendingSongs, ...newSongs];

  const searchResults = allSongs.filter(song => 
    song.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    song.artist.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  const handlePlaySong = useCallback((song: Song) => {
    onPlaySong?.(song);
    setShowResults(false);
  }, [onPlaySong]);

  return (
    <div className="relative">
      <form 
        onSubmit={handleSearch} 
        className="relative z-20"
      >
        <motion.div 
          className={cn(
            "flex items-center bg-white/5 border rounded-full px-4 py-2 transition-all duration-300",
            isFocused 
              ? "border-cyan-500 ring-2 ring-cyan-500/20" 
              : "border-white/10 hover:border-white/20"
          )}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Search 
            size={20} 
            className="text-white/40" 
          />
          
          <input 
            type="text"
            placeholder="Search songs, artists..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (searchQuery) setShowResults(true);
            }}
            onBlur={() => setIsFocused(false)}
            className="
              bg-transparent 
              w-80
              px-3
              text-white 
              placeholder-white/40
              focus:outline-none
            "
          />
          
          {searchQuery && (
            <motion.button
              type="button"
              onClick={clearSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/40 hover:text-white"
            >
              <X size={20} />
            </motion.button>
          )}
        </motion.div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && searchQuery && (
          <SearchResults
            results={searchResults}
            onPlaySong={handlePlaySong}
            currentSong={currentSong}
            onClose={() => setShowResults(false)}
          />
        )}
      </AnimatePresence>

      {/* Backdrop for closing search results */}
      {showResults && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}