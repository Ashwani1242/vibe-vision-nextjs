"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume,
  VolumeX,
  Volume1,
  Volume2,
  MoreVertical,
  Dice3,
  UnfoldHorizontal,
  ListMusic,
  MessageCircleWarning,
  Music,
  Repeat,
  Shuffle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTime } from "@/lib/utils";
import { AudioDisc } from "./audio-disc-feed";
import { motion, AnimatePresence } from "framer-motion";
import { useMedia } from "@/lib/contexts/media-context";
import type { Media } from "@/lib/types";

interface AudioPlayerProps {
  media: Media;
}

export function AudioPlayer({ media }: AudioPlayerProps) {
  const { currentMedia, isPlaying: contextIsPlaying, play, pause } = useMedia();
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);
  let hideVolumeTimeout: NodeJS.Timeout;

  const isCurrentlyPlaying = contextIsPlaying && currentMedia?.url === media.url;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        pause();
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLooping, pause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isCurrentlyPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isCurrentlyPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleVolumeControlMouseEnter = () => {
    clearTimeout(hideVolumeTimeout);
    setShowVolumeSlider(true);
  };

  const handleVolumeControlMouseLeave = () => {
    hideVolumeTimeout = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 300);
  };

  const togglePlay = () => {
    if (isCurrentlyPlaying) {
      pause();
    } else {
      play(media);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const time = value[0];
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleLooping = () => {
    if (!audioRef.current) return;
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    if (audioRef.current) {
      audioRef.current.loop = newLoopState;
    }
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const getVolumeIcon = () => {
    if (isMuted) return <VolumeX className="h-5 w-5" />;
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div className="bg-card rounded-lg p-6 space-y-4">
      <audio
        ref={audioRef}
        src={media.url}
        onTimeUpdate={handleTimeUpdate}
      />
      
      <AudioDisc isPlaying={isCurrentlyPlaying} thumbnail={media.thumbnail} />
      
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleShuffle}
            className={isShuffling ? "text-primary" : ""}
          >
            <Shuffle className="h-5 w-5" />
          </Button>
          
          <Button
            size="icon"
            onClick={togglePlay}
            className="h-12 w-12 rounded-full"
            aria-label={isCurrentlyPlaying ? "Pause" : "Play"}
          >
            {isCurrentlyPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLooping}
            className={isLooping ? "text-primary" : ""}
          >
            <Repeat className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={handleSeek}
            aria-label="Seek time"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div 
            className="relative"
            ref={volumeControlRef}
            onMouseEnter={handleVolumeControlMouseEnter}
            onMouseLeave={handleVolumeControlMouseLeave}
          >
            <div className="flex items-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {getVolumeIcon()}
              </Button>

              <AnimatePresence>
                {showVolumeSlider && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 py-1">
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="w-24"
                        aria-label="Volume"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="More options">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Music className="h-4 w-4 mr-2" />
                  Create
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Dice3 className="h-4 w-4 mr-2" />
                      Clone Audio
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UnfoldHorizontal className="h-4 w-4 mr-2" />
                      Extend Audio
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <ListMusic className="h-4 w-4 mr-2" />
                Add to Playlist
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircleWarning className="h-4 w-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}