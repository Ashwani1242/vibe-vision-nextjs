'use client';

import { Playlist } from '@/types/music';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface PlaylistSectionProps {
  playlists: Playlist[];
}

export default function PlaylistSection({ playlists }: PlaylistSectionProps) {
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
        <h2 className="text-2xl font-bold text-white">Trending Playlists</h2>
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
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex-shrink-0 w-72 group cursor-pointer"
          >
            <div className="relative">
              <img
                src={playlist.imageUrl}
                alt={playlist.name}
                className="w-full aspect-[2/1] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-white">{playlist.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}