'use client';

import { Song } from '@/types/music';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useRef } from 'react';

interface TrendingSongsProps {
  songs: Song[];
  onPlaySong: (song: Song) => void;
}

export default function TrendingSongs({ songs, onPlaySong }: TrendingSongsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Trending Songs</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex-shrink-0 w-48 group relative"
            onClick={() => onPlaySong(song)}
          >
            <div className="relative">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button className="absolute right-2 bottom-2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="text-white" size={20} />
              </button>
            </div>
            <div className="mt-2">
              <h3 className="text-white font-medium truncate">{song.title}</h3>
              <p className="text-gray-300 text-sm truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}