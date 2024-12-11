'use client';

import { Genre } from '@/types/music';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GenreSectionProps {
  genres: Genre[];
  onGenreSelect?: (genre: Genre) => void;
}

export default function GenreSection({ genres, onGenreSelect }: GenreSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre.id);
    onGenreSelect?.(genre);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
        >
          Music Genres
        </motion.h2>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
          >
            <ArrowRight size={24} />
          </motion.button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {genres.map((genre) => (
          <motion.div
            key={genre.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleGenreSelect(genre)}
            className={cn(
              "flex-shrink-0 w-72 h-44 relative group cursor-pointer overflow-hidden rounded-2xl",
              "transform transition-all duration-300 ease-in-out",
              selectedGenre === genre.id 
                ? "ring-4 ring-purple-500/70 shadow-2xl" 
                : "hover:shadow-xl"
            )}
          >
            <img
              src={genre.imageUrl}
              alt={genre.name}
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-5 left-5 text-2xl font-bold text-white drop-shadow-lg"
            >
              {genre.name}
            </motion.h3>
            <div 
              className={cn(
                "absolute top-4 right-4 w-8 h-8 rounded-full transition-all duration-300",
                selectedGenre === genre.id 
                  ? "bg-purple-500/80 text-white" 
                  : "bg-white/20 backdrop-blur-sm"
              )}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}