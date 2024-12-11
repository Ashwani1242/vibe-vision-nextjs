'use client';

import { Song } from '@/types/music';
import { Play } from 'lucide-react';

interface SongGridProps {
  songs: Song[];
  onPlaySong: (song: Song) => void;
}

export default function SongGrid({ songs, onPlaySong }: SongGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className="group relative bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer"
          onClick={() => onPlaySong(song)}
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-full aspect-square object-cover rounded-lg mb-4"
          />
          <button className="absolute right-6 top-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <Play className="text-white" size={24} />
          </button>
          <h3 className="text-white font-medium truncate">{song.title}</h3>
          <p className="text-gray-300 text-sm truncate">{song.artist}</p>
        </div>
      ))}
    </div>
  );
}