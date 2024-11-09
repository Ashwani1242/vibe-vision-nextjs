'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Progress } from "../ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  ChevronUp,
  Share2,
  Download,
  Heart,
  MoreHorizontal,
  Shuffle,
  ListMusic,
  Clock,
  Radio,
  Music2,
  MusicIcon,
  Info,
  Minimize2,
  Maximize2
} from 'lucide-react';

// Define an interface for playlist items
interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
}

// Format time function with type annotation
const formatTime = (time: number | null): string => {
  if (time === null || isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Default playlist with type annotation
const defaultPlaylist: PlaylistItem[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "The Cosmic Band",
    album: "Stellar Journeys",
    duration: 245,
    coverArt: "/api/placeholder/300/300"
  },
  {
    id: 2,
    title: "Neon Lights",
    artist: "Electronic Minds",
    album: "Digital Era",
    duration: 198,
    coverArt: "/api/placeholder/300/300"
  },
  {
    id: 3,
    title: "Ocean Waves",
    artist: "Nature Sounds",
    album: "Peaceful Moments",
    duration: 324,
    coverArt: "/api/placeholder/300/300"
  }
];

interface Song {
  id: string;
  title: string;
  genres: string[];
  coverArt: string;
  audioUrl: string;
  duration: number;
  timestamp: string;
}

interface CurrentSong {
  currentSong: Song | null
}

export default function EnhancedMusicPlayer({ currentSong }: CurrentSong) {
  // State management with types
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [playlist] = useState<PlaylistItem[]>(defaultPlaylist);
  const [isRadioMode, setIsRadioMode] = useState<boolean>(false);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);



  // -------------------------------------------------------------------------------


  const [generatedSongs, setGeneratedSongs] = useState<Song[]>([]);
  // const currentSong: Song | null = currentSongIndex !== null ? generatedSongs[currentSongIndex] : null;
  const playerScreenRef = useRef<HTMLDivElement>(null)
  const [isMusicPlayerFullScreen, setIsMusicPlayerFullScreen] = useState<boolean>(false)

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [musicUrl, setMusicUrl] = useState<string | null>(null)

  useEffect(() => {
    setImageUrl(currentSong?.coverArt || null)
    setMusicUrl(currentSong?.audioUrl || null)
  }, [])



  const audioRef = useRef<HTMLAudioElement | null>(null);

  const maximizeScreen = () => {
    if (playerScreenRef.current) {
      if (playerScreenRef.current.requestFullscreen) {
        playerScreenRef.current.requestFullscreen();
        setIsMusicPlayerFullScreen(true)
      } else if ((playerScreenRef.current as any).mozRequestFullScreen) {
        (playerScreenRef.current as any).mozRequestFullScreen();
        setIsMusicPlayerFullScreen(true)
      } else if ((playerScreenRef.current as any).webkitRequestFullscreen) {
        (playerScreenRef.current as any).webkitRequestFullscreen();
        setIsMusicPlayerFullScreen(true)
      } else if ((playerScreenRef.current as any).msRequestFullscreen) {
        (playerScreenRef.current as any).msRequestFullscreen();
        setIsMusicPlayerFullScreen(true)
      }
    }
  };

  const minimizeScreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsMusicPlayerFullScreen(false)
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
        setIsMusicPlayerFullScreen(false)
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsMusicPlayerFullScreen(false)
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
        setIsMusicPlayerFullScreen(false)
      }
    }
  };

  //-----------------------------------------------------------------------------

  // const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current ? audioRef.current.duration : 0);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current ? audioRef.current.currentTime : 0);
      });
      audioRef.current.addEventListener('ended', handleSongEnd);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [currentSongIndex, isRepeat, isShuffle]);

  const handleSongEnd = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (isShuffle) {
      const nextIndex = Math.floor(Math.random() * playlist.length);
      setCurrentSongIndex(nextIndex);
    } else {
      handleNext();
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev < playlist.length - 1 ? prev + 1 : 0));
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
    } else if (currentSongIndex > 0) {
      setCurrentSongIndex(prev => prev - 1);
    } else {
      setCurrentSongIndex(playlist.length - 1);
    }
    setIsPlaying(true);
  };

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {
        currentSong && (
          <div
            ref={playerScreenRef}
            className={`fixed bottom-0 left-0 right-0 flex flex-col-reverse bg-background/95 backdrop-blur border-t`}>
            {isMusicPlayerFullScreen && <div
              style={{ backgroundImage: `url(${currentSong.coverArt || imageUrl})` }}
              className='w-full h-full absolute pointer-events-none bg-cover blur-md opacity-40' />}
            <div
              style={{ backgroundImage: isMusicPlayerFullScreen ? `url(${currentSong.coverArt})` : '', }}
              className='absolute w-full h-full bg-no-repeat bg-cover opacity-30 blur-md pointer-events-none'>
            </div>
            <Progress
              value={(currentTime / duration) * 100}
              className="h-1"
            />
            {isMusicPlayerFullScreen ?
              // <div className="p-4 w-full">
              <div className="flex items-center h-full/ w-full justify-center flex-col gap-4 p-16 relative">
                {/* Song Info */}
                <div className="flex items-center gap-4 w-full min-w-[240px] m-20">
                  <img
                    src={currentSong.coverArt}
                    alt={currentSong.title}
                    className="size-48 rounded"
                  />
                  <div className='flex flex-col justify-end h-full px-8 gap-4'>
                    <h3 className="font-bold text-5xl">{currentSong.title}</h3>
                    <h3 className="font-bold text-xl opacity-50">VibeVision Music.</h3>
                    {/* <p className="text-sm text-gray-400">
                                            {currentSong.genres.join(', ')}
                                        </p> */}
                  </div>
                </div>

                {/* Player Controls */}
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      {formatTime(currentTime)}
                    </span>
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      onValueChange={handleTimeChange}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400">
                      {formatTime(duration)}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-4 mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsShuffle(!isShuffle)}
                      className={`hover:text-white ${isShuffle ? 'text-primary' : 'text-gray-400'}`}
                    >
                      <Shuffle className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevious}
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNext}
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsRepeat(!isRepeat)}
                      className={`hover:text-white ${isRepeat ? 'text-primary' : 'text-gray-400'}`}
                    >
                      <Repeat className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Additional Controls */}
                <div className="flex items-center gap-2 w-full min-w-[240px] justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`hover:text-white ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-24"
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Song Information</DialogTitle>
                        <DialogDescription>
                          <div className="space-y-2">
                            <p><strong>Title:</strong> {currentSong.title}</p>
                            <p><strong>Genres:</strong> {currentSong.genres.join(', ')}</p>
                            <p><strong>Generated:</strong> {new Date(currentSong.timestamp).toLocaleString()}</p>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="icon"
                    // onClick={() => setIsMusicPlayerFullScreen(val => !val)}
                    onClick={minimizeScreen}
                    className={`hover:text-white 'text-gray-400'`}
                  >
                    {!isMusicPlayerFullScreen ? <Maximize2 className="h-5 w-5" />
                      : <Minimize2 className="h-5 w-5" />}
                  </Button>

                </div>
              </div>

              :

              <div className="p-4 w-full">
                <div className="flex items-center justify-between gap-4">
                  {/* Song Info */}
                  <div className="flex items-center gap-4 min-w-[240px]">
                    <img
                      src={currentSong.coverArt}
                      alt={currentSong.title}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <h3 className="font-medium">{currentSong.title}</h3>
                      <p className="text-sm text-gray-400">
                        {currentSong.genres.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="md:flex-1">
                    <div className="flex justify-center items-center gap-4 mb-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsShuffle(!isShuffle)}
                        className={`hover:text-white hidden md:flex ${isShuffle ? 'text-primary' : 'text-gray-400'}`}
                      >
                        <Shuffle className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                      >
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                      >
                        <SkipForward className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsRepeat(!isRepeat)}
                        className={`hover:text-white hidden md:flex ${isRepeat ? 'text-primary' : 'text-gray-400'}`}
                      >
                        <Repeat className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        // onClick={() => setIsMusicPlayerFullScreen(val => !val)}
                        onClick={maximizeScreen}
                        className={`hover:text-white /text-gray-400 flex md:hidden`}
                      >
                        {!isMusicPlayerFullScreen ? <ChevronUp className="h-5 w-5" />
                          : <Minimize2 className="h-5 w-5" />}
                      </Button>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {formatTime(currentTime)}
                      </span>
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={handleTimeChange}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-400">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Additional Controls */}
                  <div className="hidden md:flex items-center gap-2 min-w-[240px] justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                      className={`hover:text-white ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="w-24"
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Song Information</DialogTitle>
                          <DialogDescription>
                            <div className="space-y-2">
                              <p><strong>Title:</strong> {currentSong.title}</p>
                              <p><strong>Genres:</strong> {currentSong.genres.join(', ')}</p>
                              <p><strong>Generated:</strong> {new Date(currentSong.timestamp).toLocaleString()}</p>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="icon"
                      // onClick={() => setIsMusicPlayerFullScreen(val => !val)}
                      onClick={maximizeScreen}
                      className={`hover:text-white 'text-gray-400'`}
                    >
                      {!isMusicPlayerFullScreen ? <Maximize2 className="h-5 w-5" />
                        : <Minimize2 className="h-5 w-5" />}
                    </Button>

                  </div>
                </div>
              </div>
            }

            {/* Hidden audio element */}
            <audio
              autoPlay={true}
              ref={audioRef}
              src={currentSong.audioUrl || ''}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={() => {
                setCurrentTime(audioRef.current?.currentTime || 0);
              }}
              onLoadedMetadata={() => {
                setDuration(audioRef.current?.duration || 0);
              }}
            />
          </div>
        )
      }
    </div>
  )
}
