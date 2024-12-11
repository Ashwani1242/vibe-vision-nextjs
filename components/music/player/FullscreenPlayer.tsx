'use client';

import { motion } from 'framer-motion';
import { Heart, Share2, Minimize2 } from 'lucide-react';
import { Song } from '@/types/music';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import PlaybackControls from './PlaybackControls';
import VolumeControl from './VolumeControl';

interface FullscreenPlayerProps {
  song: Song;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  progress: number;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  currentLyricIndex: number;
  onSeek: (percent: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleLoop: () => void;
  onToggleShuffle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  onClose: () => void;
}

export default function FullscreenPlayer({
  song,
  isPlaying,
  setIsPlaying,
  progress,
  duration,
  currentTime,
  volume,
  isMuted,
  isLooping,
  isShuffling,
  currentLyricIndex,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleLoop,
  onToggleShuffle,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  onClose,
}: FullscreenPlayerProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dark-900/95 to-dark-800/95 backdrop-blur-xl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${song.imageUrl})` }}
      />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8">
        <div className="text-white/60">Now Playing</div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-white/60 hover:text-white z-50 bg-white/10 rounded-full p-2"
        >
          <Minimize2 size={24} />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 pt-16 pb-32 px-8 flex">
        {/* Left Side - Album Art */}
        <div className="w-[45%] flex items-center justify-center p-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-[85%] max-w-2xl aspect-square"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Right Side - Info & Controls */}
        <div className="w-[55%] flex flex-col justify-center p-8 space-y-8">
          {/* Song Info */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">{song.title}</h1>
            <p className="text-2xl text-white/60">{song.artist}</p>
          </div>

          {/* Lyrics */}
          <div className="pl-4 h-48 overflow-hidden scrollbar-hide">
            {song.lyrics.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: index === currentLyricIndex ? 1 : 0.4,
                  scale: index === currentLyricIndex ? 1.02 : 1,
                }}
                className={cn(
                  "text-lg transition-all duration-300",
                  index === currentLyricIndex ? "text-white" : "text-white/40"
                )}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Progress Bar */}
          <ProgressBar
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            onSeek={onSeek}
            size="lg"
          />

          {/* Controls */}
          <div className="flex items-center justify-between">
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={onVolumeChange}
              onToggleMute={onToggleMute}
              size="lg"
            />

            <PlaybackControls
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onNext={onNext}
              onPrevious={onPrevious}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
              isShuffling={isShuffling}
              isLooping={isLooping}
              onToggleShuffle={onToggleShuffle}
              onToggleLoop={onToggleLoop}
              size="lg"
            />

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={cn("hover:text-red-500", {
                  "text-red-500": isLiked,
                  "text-white/60": !isLiked
                })}
              >
                <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/60 hover:text-white"
              >
                <Share2 size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}