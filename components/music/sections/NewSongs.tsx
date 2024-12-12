'use client';

import { Song } from '@/types/music';
import { 
  HeartIcon, 
  Share2, 
  PlayIcon, 
  LoaderIcon, 
  AudioLinesIcon
} from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NewSongsProps {
  songs: Song[];
  onPlaySong: (song: Song) => void;
  onLikeSong?: (song: Song) => void;
}

export default function NewSongs({ 
  songs: initialSongs, 
  onPlaySong, 
  onLikeSong 
}: NewSongsProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const songsPerPage = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSongs(initialSongs.slice(0, songsPerPage));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [initialSongs]);

  const fetchMoreData = () => {
    if (songs.length >= initialSongs.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const nextPage = page + 1;
      const start = nextPage * songsPerPage;
      const end = start + songsPerPage;
      
      setSongs(prevSongs => [
        ...prevSongs,
        ...initialSongs.slice(start, end)
      ]);
      setPage(nextPage);
    }, 1500);
  };

  const handleLikeSong = (song: Song) => {
    const isLiked = likedSongs.includes(song.id);
    const updatedLikedSongs = isLiked 
      ? likedSongs.filter(id => id !== song.id)
      : [...likedSongs, song.id];
    
    setLikedSongs(updatedLikedSongs);
    onLikeSong?.(song);
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 rounded-2xl min-h-[400px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <AudioLinesIcon className="w-16 h-16 text-purple-500 animate-pulse" />
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#1a1a2e65] to-[#16213e50] p-6 rounded-2xl">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6 "
      >
        Latest Releases
      </motion.h2>
      
      <InfiniteScroll
        dataLength={songs.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-4 gap-3"
          >
            <LoaderIcon className="w-6 h-6 text-purple-500 animate-spin" />
            <span className="text-white/60 text-sm">Discovering more tracks...</span>
          </motion.div>
        }
        endMessage={
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 space-y-2"
          >
            <p className="text-white/60">You've explored all available tracks</p>
            <p className="text-sm text-white/40">Stay tuned for more updates</p>
          </motion.div>
        }
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full"
      >
        <AnimatePresence>
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1
              }}
              className={cn(
                "bg-white/5 rounded-xl p-4 flex items-center gap-5 group hover:bg-white/10",
                "transition-all duration-300 ease-in-out border border-transparent hover:border-purple-500/30"
              )}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-20 h-20 rounded-lg object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-lg" />
              </motion.div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-white font-semibold truncate text-lg">{song.title}</h3>
                <p className="text-gray-300 text-sm truncate">{song.artist}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLikeSong(song)}
                  className={cn(
                    "text-gray-300 hover:text-white transition-colors",
                    likedSongs.includes(song.id) && "text-red-500 hover:text-red-400"
                  )}
                >
                  <HeartIcon 
                    size={22} 
                    fill={likedSongs.includes(song.id) ? 'currentColor' : 'none'}
                  />
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Share2 size={22} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onPlaySong(song)}
                  className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <PlayIcon size={24} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </InfiniteScroll>
    </section>
  );
}