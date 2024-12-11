'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart } from 'lucide-react';
import { Song } from '@/types/music';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/format';

interface SearchResultsProps {
    results: Song[];
    onPlaySong: (song: Song) => void;
    currentSong?: Song | null;
    onClose: () => void;
}

export default function SearchResults({
    results,
    onPlaySong,
    currentSong,
    onClose
}: SearchResultsProps) {
    const [hoveredSong, setHoveredSong] = useState<string | null>(null);
    const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());

    const toggleLike = (songId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        const newLikedSongs = new Set(likedSongs);
        if (likedSongs.has(songId)) {
            newLikedSongs.delete(songId);
        } else {
            newLikedSongs.add(songId);
        }
        setLikedSongs(newLikedSongs);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 top-full mt-2 w-full bg-dark-800/95 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl"
        >
            <div className="max-h-[60vh] overflow-y-auto p-4">
                {results.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-lg text-white/60">No results found</p>
                        <p className="text-sm text-white/40 mt-2">Try searching for something else</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {results.map((song, index) => (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                    onPlaySong(song);
                                    onClose();
                                }}
                                onMouseEnter={() => setHoveredSong(song.id)}
                                onMouseLeave={() => setHoveredSong(null)}
                                className={cn(
                                    "grid grid-cols-[auto_1fr_auto] gap-4 p-4 rounded-lg",
                                    "hover:bg-white/5 cursor-pointer group",
                                    currentSong?.id === song.id && "bg-white/10"
                                )}
                            >
                                <div className="relative w-12 h-12">
                                    <img
                                        src={song.imageUrl}
                                        alt={song.title}
                                        className="w-full h-full object-cover rounded"
                                    />
                                    {hoveredSong === song.id && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
                                            <Play size={20} className="text-white" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center min-w-0">
                                    <h3 className={cn(
                                        "font-medium truncate",
                                        currentSong?.id === song.id ? "text-cyan-500" : "text-white"
                                    )}>
                                        {song.title}
                                    </h3>
                                    <p className="text-sm text-white/60 truncate">{song.artist}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => toggleLike(song.id, e)}
                                        className={cn(
                                            "opacity-0 group-hover:opacity-100 transition-opacity",
                                            likedSongs.has(song.id) ? "text-red-500" : "text-white/60 hover:text-white"
                                        )}
                                    >
                                        <Heart
                                            size={18}
                                            fill={likedSongs.has(song.id) ? 'currentColor' : 'none'}
                                        />
                                    </motion.button>
                                    <span className="text-sm text-white/40">{formatTime(song.duration)}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}