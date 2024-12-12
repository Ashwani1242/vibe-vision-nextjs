'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Song, UserPlaylist } from '@/types/music';
import { cn } from '@/lib/utils';
import CompactPlayer from './CompactPlayer';
import FullscreenPlayer from './FullscreenPlayer';

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isLiked?: boolean;
  onLike?: () => void;
  playlists?: UserPlaylist[];
  onAddToPlaylist?: (playlistId: string, songId: string) => void;
  onCreatePlaylist?: (playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => void;
}

export default function MusicPlayer({
  song,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrevious,
  onShuffle,
  hasNext,
  hasPrevious,
  isLiked = false,
  onLike,
  playlists = [],
  onAddToPlaylist,
  onCreatePlaylist,
}: MusicPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Reset state when song changes
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  }, [song.id]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = isLooping;
    }
  }, [isPlaying, volume, isMuted, isLooping, setIsPlaying, song.audioUrl]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (isFinite(current) && isFinite(duration)) {
        setCurrentTime(current);
        setProgress((current / duration) * 100);
        setCurrentLyricIndex(Math.floor(current / 5) % song.lyrics.length);
      }
    }
  }, [song.lyrics.length]);

  const handleSeek = useCallback((percent: number) => {
    if (audioRef.current && isFinite(percent)) {
      const newTime = (percent / 100) * audioRef.current.duration;
      if (isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
        setProgress(percent);
      }
    }
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    if (isFinite(value)) {
      setVolume(value);
      setIsMuted(false);
    }
  }, []);

  const handleShuffle = useCallback(() => {
    setIsShuffling(!isShuffling);
    onShuffle();
  }, [isShuffling, onShuffle]);

  // Modify this to keep playing when switching to fullscreen
  const handleFullscreen = useCallback(() => {
    setIsFullscreen(true);
    // Ensure the song continues playing
    if (audioRef.current) {
      setIsPlaying(true);
    }
  }, [setIsPlaying]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isFullscreen ? 'fullscreen' : 'compact'}
        initial={false}
        animate={{
          height: isFullscreen ? '100vh' : 'auto',
          y: 0,
          opacity: 1
        }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed z-50 left-0 right-0',
          isFullscreen 
            ? 'top-0 bottom-0'
            : 'bottom-4 mx-auto w-[95%] max-w-4xl rounded-xl bg-dark-800/95 backdrop-blur-lg border border-white/10'
        )}
      >
        <audio
          ref={audioRef}
          src={song.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            const duration = audioRef.current?.duration;
            if (isFinite(duration)) {
              setDuration(duration);
            }
          }}
        />

        {isFullscreen ? (
          <FullscreenPlayer
            song={song}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            volume={volume}
            isMuted={isMuted}
            isLooping={isLooping}
            isShuffling={isShuffling}
            currentLyricIndex={currentLyricIndex}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={() => setIsMuted(!isMuted)}
            onToggleLoop={() => setIsLooping(!isLooping)}
            onToggleShuffle={handleShuffle}
            onNext={onNext}
            onPrevious={onPrevious}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onClose={() => setIsFullscreen(false)}
            isLiked={isLiked}
            onLike={onLike}
            playlists={playlists}
            onAddToPlaylist={onAddToPlaylist}
            onCreatePlaylist={onCreatePlaylist}
          />
        ) : (
          <CompactPlayer
            song={song}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            progress={progress}
            duration={duration}
            currentTime={currentTime}
            volume={volume}
            isMuted={isMuted}
            isShuffling={isShuffling}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={() => setIsMuted(!isMuted)}
            onToggleShuffle={handleShuffle}
            onNext={onNext}
            onPrevious={onPrevious}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onFullscreen={handleFullscreen}
            isLiked={isLiked}
            onLike={onLike}
            playlists={playlists}
            onAddToPlaylist={onAddToPlaylist}
            onCreatePlaylist={onCreatePlaylist}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}