'use client';

import { motion } from 'framer-motion';
import { Heart, Maximize2 } from 'lucide-react';
import { Song, UserPlaylist } from '@/types/music';
import ProgressBar from './ProgressBar';
import PlaybackControls from './PlaybackControls';
import VolumeControl from './VolumeControl';
import AddToPlaylistDialog from './AddToPlaylistDialog';
import { cn } from '@/lib/utils';

interface CompactPlayerProps {
  song: Song;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  progress: number;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isShuffling: boolean;
  isLiked: boolean;
  onLike: () => void;
  onSeek: (percent: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  onFullscreen: () => void;
  playlists: UserPlaylist[];
  onAddToPlaylist: (playlistId: string, songId: string) => void;
  onCreatePlaylist: (playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => void;
}

export default function CompactPlayer({
  song,
  isPlaying,
  setIsPlaying,
  progress,
  duration,
  currentTime,
  volume,
  isMuted,
  isShuffling,
  isLiked,
  onLike,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  onFullscreen,
  playlists,
  onAddToPlaylist,
  onCreatePlaylist,
}: CompactPlayerProps) {
  return (
    <div className="p-4 h-[120px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 w-1/3">
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white truncate">{song.title}</h3>
              <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-1/3">
            <PlaybackControls
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onNext={onNext}
              onPrevious={onPrevious}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
              isShuffling={isShuffling}
              onToggleShuffle={onToggleShuffle}
            />
            <div className="flex items-center space-x-2 px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLike}
              className={cn("text-white/60 hover:text-white", {
                "text-red-500 hover:text-red-600": isLiked
              })}
            >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-4 w-1/3">
          <AddToPlaylistDialog
              song={song}
              playlists={playlists}
              onAddToPlaylist={onAddToPlaylist}
              onCreatePlaylist={onCreatePlaylist}
            />
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onVolumeChange={onVolumeChange}
              onToggleMute={onToggleMute}
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onFullscreen}
              className="text-gray-400 hover:text-white"
            >
              <Maximize2 size={20} />
            </motion.button>
          </div>
        </div>

        <div className="w-full mx-auto pt-2">
          <ProgressBar
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            onSeek={onSeek}
          />
        </div>
      </div>
    </div>
  );
}