'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaybackControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isShuffling?: boolean;
  isLooping?: boolean;
  onToggleShuffle?: () => void;
  onToggleLoop?: () => void;
  size?: 'sm' | 'lg';
}

export default function PlaybackControls({
  isPlaying,
  setIsPlaying,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  isShuffling,
  isLooping,
  onToggleShuffle,
  onToggleLoop,
  size = 'sm'
}: PlaybackControlsProps) {
  const buttonSize = size === 'lg' ? 25 : 20;
  const playButtonSize = size === 'lg' ? 30 : 20;
  
  return (
    <div className="flex items-center justify-center space-x-4">
      {onToggleShuffle && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleShuffle}
          className={cn("text-gray-400 hover:text-white", {
            "text-cyan-500": isShuffling
          })}
        >
          <Shuffle size={buttonSize} />
        </motion.button>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={cn("text-gray-400 hover:text-white", {
          "opacity-50 cursor-not-allowed": !hasPrevious
        })}
      >
        <SkipBack size={buttonSize} />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className={cn(
          "bg-purple-500 rounded-full flex items-center justify-center text-black",
          size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
        )}
      >
        {isPlaying ? (
          <Pause size={playButtonSize} />
        ) : (
          <Play size={playButtonSize} />
        )}
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        disabled={!hasNext}
        className={cn("text-gray-400 hover:text-white", {
          "opacity-50 cursor-not-allowed": !hasNext
        })}
      >
        <SkipForward size={buttonSize} />
      </motion.button>

      {onToggleLoop && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleLoop}
          className={cn("text-gray-400 hover:text-white", {
            "text-cyan-500": isLooping
          })}
        >
          <Repeat size={buttonSize} />
        </motion.button>
      )}
    </div>
  );
}