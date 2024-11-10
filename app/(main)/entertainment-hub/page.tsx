'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Layout } from "../../../components/layout/layout"
import {
  AudioLines,
  AudioLinesIcon,
  CheckCircle2,
  Download,
  Heart,
  Image,
  Info,
  Maximize2,
  Minimize2,
  MoreVertical,
  Pause,
  PauseCircleIcon,
  Play,
  Repeat,
  Share,
  Shuffle,
  SkipBack,
  SkipForward,
  UserCircleIcon,
  Video,
  Volume2,
  VolumeX
} from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EnhancedMusicPlayer from '@/components/media/music-player';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import ScrollingText from '@/components/ui/scroll-text';

type ContentItem = {
  _id: string;
  contentType: string;
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string | null;
  thumbnail_alt?: string | null;
  musicTitle?: string | null;
  displayName?: string | null;
  createdAt: string;
  enhancedPrompt: string;
  userPrompt: string;
  songLyrics: string
};

interface Song {
  id: string;
  title: string;
  genres: string[];
  coverArt: string;
  audioUrl: string;
  duration: number;
  timestamp: string;
  lyrics: string
}

const VideoPlatform = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [videoModal, setVideoModal] = useState<boolean>(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [currentVideoContent, setCurrentVideoContent] = useState<ContentItem | null>(null)
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const videoModalRef = useRef<HTMLDivElement>(null)


  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [generatedSongs, setGeneratedSongs] = useState<Song[]>([]);
  const currentSong: Song | null = currentSongIndex !== null ? generatedSongs[currentSongIndex] : null;
  const playerScreenRef = useRef<HTMLDivElement>(null)
  const [isMusicPlayerFullScreen, setIsMusicPlayerFullScreen] = useState<boolean>(false)

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [musicUrl, setMusicUrl] = useState<string | null>(null)

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  // const categories = [
  //   'All', 'Roast My Pic', 'Jukebox', 'Kids Music', 'Story Time' 
  // ];

  const categories = [
    { id: 1, contentType: '', content: 'All' },
    { id: 2, contentType: 'roast-my-pic', content: 'Roast My Pic' },
    { id: 3, contentType: 'jukebox', content: 'Jukebox' },
    { id: 4, contentType: 'kids-music', content: 'Kids Music' },
    { id: 5, contentType: 'story-time', content: 'Story Time' },
  ];

  const [data, setData] = useState<ContentItem[]>([]);

  const filteredData = activeCategory
    ? data.filter((dataItem) => dataItem.contentType === activeCategory)
    : data;

  // const sortedData: number = filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // const filteredData = data.filter((dataItem) => dataItem.contentType === currentCategory);

  const handleTimeChange = (value: number[]): void => {
    if (audioRef.current) {
      // audioRef.current.currentTime = value[0];
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleNext = (): void => {
    if (currentSongIndex !== null) {
      if (currentSongIndex < generatedSongs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        setCurrentSongIndex(0);
      }
      setIsPlaying(true);
    }
  };

  const handlePrevious = (): void => {
    if (!audioRef.current) return;

    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else if (currentSongIndex !== null) {
      if (currentSongIndex > 0) {
        setCurrentSongIndex(currentSongIndex - 1);
      } else {
        setCurrentSongIndex(generatedSongs.length - 1);
      }
    }
    setIsPlaying(true);
  };

  const handlePlayPause = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]): void => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = (): void => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.volume = newMutedState ? 0 : volume;
    }
  };

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

  const playGeneratedSong = (content: ContentItem) => {

    // setGeneratedSongs([])
    console.log(content)

    if (!isPlaying) {
      const newSong: Song = {
        id: content._id,
        title: content.musicTitle || 'No Title Found',
        genres: ['test', 'test'],
        audioUrl: `${BASE_URL}/${content.audioUrl}` || '',
        coverArt: `${BASE_URL}/${content.imageUrl}` || content.thumbnail_alt || '',
        duration: audioRef.current?.duration || 180,
        timestamp: new Date().toISOString(),
        lyrics: content.songLyrics || 'No Lyrics Found'
      };

      setGeneratedSongs(prev => [newSong, ...prev]);
      setCurrentSongIndex(0)

      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }

    // setIsPlaying(val => !val);
  }

  const openVideoModal = (videourl: string, videoContent: ContentItem) => {
    setGeneratedSongs([])
    setCurrentVideoUrl(videourl);
    setCurrentVideoContent(videoContent)
    setVideoModal(true);
  }

  const closeVideoModal = () => {
    setCurrentVideoUrl(null);
    setCurrentVideoContent(null)
    setVideoModal(false);
  }

  function formatDateTime(isoDate: string): string {
    const date = new Date(isoDate);

    // Format the date to a readable string
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // Full name of the day (e.g., "Monday")
      year: "numeric",
      month: "long",   // Full name of the month (e.g., "January")
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short" // Includes the time zone abbreviation (e.g., "GMT")
    };

    return date.toLocaleString("en-US", options);
  }

  function openLink(url: string): void {
    if (!url) {
      console.error("URL is required to open a link in a new tab.");
      return;
    }

    const newTab = window.open(url, "_blank");

    if (!newTab) {
      console.error("Failed to open the link in a new tab. It may have been blocked by the browser.");
    }
  }

  const handleDownloadAudio = async (audioUrl: string | null, displayName: string) => {
    if (audioUrl) {
      try {
        // Fetch the video file as a blob using Axios
        const response = await axios.get(audioUrl, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${displayName}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url); // Clean up the URL object
      } catch (error) {
        console.error("Error downloading audio:", error);
      }
    }
  };

  const handleDownloadVideo = async (videoUrl: string | null, displayName: string) => {
    if (videoUrl) {
      try {
        // Fetch the video file as a blob using Axios
        const response = await axios.get(videoUrl, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${displayName}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url); // Clean up the URL object
      } catch (error) {
        console.error("Error downloading video:", error);
      }
    }
  };

  const handleDownloadImage = async (imageUrl: string | null, displayName: string) => {
    if (imageUrl) {
      try {
        // Fetch the video file as a blob using Axios
        const response = await axios.get(imageUrl, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${displayName}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url); // Clean up the URL object
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/content/get-all-content`);
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching content data:", error);
      }
    };
    fetchData();


  }, [BASE_URL]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (videoModalRef.current && !videoModalRef.current.contains(event.target as Node)) {
        closeVideoModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeVideoModal])


  const formatTime = (time: number | null): string => {
    if (time === null || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <Layout>
      <div className="w-full bg-background pt-24/ /pl-20 pb-36">
        {/* Categories ScrollArea */}
        <ScrollArea className="w-full border-b">
          <div className="flex p-4 gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.contentType ? "default" : "secondary"}
                className="whitespace-nowrap"
                onClick={() => setActiveCategory(category.contentType)}
              >
                {category.content}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Videos Grid */}
        <div className={`grid grid-cols-1 ${filteredData.length !== 0 && 'sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'} gap-4 p-4`}>
          {filteredData.length !== 0 ?
            filteredData.map((dataItem) => (
              <Card key={dataItem._id} className="border-0 shadow-none h-80 ">
                {!(dataItem.contentType === 'jukebox' || dataItem.contentType === 'kids-music') ?
                  <CardContent
                    onClick={() => { openVideoModal(`${BASE_URL}/${dataItem.videoUrl}`, dataItem) }}
                    className="bg-[#0f0f0f] w-fit/ h-fit min-h-80 w-full p-0 flex flex-col justify-between pb-4 rounded-xl relative">
                    <Badge className='absolute top-2 left-2 z-10'> {dataItem.contentType} </Badge>
                    {/* Thumbnail Container */}
                    <div className="relative">
                      <img
                        src={(dataItem.imageUrl || dataItem.thumbnail_alt) ? `${BASE_URL}/${dataItem.imageUrl || dataItem.thumbnail_alt}` : 'https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg'}
                        alt={dataItem.displayName || dataItem.musicTitle || ''}
                        className={`w-full h-60 rounded-xl /aspect-video ${dataItem.contentType === 'roast-my-pic' ? 'object-contain bg-black' : 'object-cover'}`}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-sm rounded">
                        {/* {video.duration} */}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="mt-3 flex items-center gap-3 mx-4 overflow-y-visible overflow-x-hidden">
                      <div className='size-8'>
                        <UserCircleIcon className=" size-full" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold line-clamp-2 text-nowrap">
                          {dataItem.contentType === 'story-time' ? dataItem.userPrompt || dataItem.displayName : dataItem.displayName || 'AI Generated Video'}
                        </h3>
                        <h3 className="font-semibold text-sm text-neutral-400 line-clamp-2 text-nowrap">
                          {dataItem.userPrompt || 'AI Generated Video'}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                  :
                  <CardContent
                    className="bg-[#0f0f0f] w-fit/ h-fit min-h-80 w-full p-0 flex flex-col justify-between pb-4 rounded-xl relative">
                    {/* <div className='h-full w-full p-0'> */}
                    <Badge className='absolute top-2 left-2 z-10'> {dataItem.contentType} </Badge>
                    <div className='w-full bg-neutral-900 max-h-60 relative flex flex-row justify-around items-center px-8 py-12 rounded-xl'>
                      <div className={`relative h-full/ size-36 /w-full flex justify-center items-center group cursor-pointer`}>
                        <div
                          style={{
                            backgroundImage: (dataItem.imageUrl || dataItem.thumbnail_alt) ? `url('${BASE_URL}/${dataItem.imageUrl || dataItem.thumbnail_alt}')` : 'https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg',
                            filter: "blur(14px)",
                            opacity: 0.5,
                          }}
                          className='top-2 left-1 z-10 group-hover:scale-105 duration-300 absolute size-36 bg-cover rounded-full' >
                        </div>
                        <div
                          style={{
                            backgroundImage: (dataItem.imageUrl || dataItem.thumbnail_alt) ? `url('${BASE_URL}/${dataItem.imageUrl || dataItem.thumbnail_alt}')` : 'https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg',
                            animation: currentSong?.id === dataItem._id ? 'slowRotate 15s linear infinite' : '',
                          }}
                          className='group-hover:scale-105 relative z-20 opacity-90 duration-300 group-hover:opacity-100 size-36 flex flex-col bg-cover justify-center items-center rounded-full'>
                          <style>
                            {`
                    @keyframes slowRotate {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
                          </style>
                          <div className='size-8 bg-neutral-900/60 flex justify-center items-center rounded-full backdrop-blur' >
                            {currentSong?.id === dataItem._id && <AudioLines />}
                          </div>
                        </div>
                      </div>
                      <div className="w-full items-center justify-center text-center text-nowrap bg-neutral-/800 rounded-xl p-4 max-w-48 overflow-hidden whitespace-nowrap flex flex-col gap-2">
                        {/* <h3 className="text-white animate-marquee inline-block text-md">{`${dataItem.musicTitle}`}</h3> */}
                        <ScrollingText text={dataItem.musicTitle || "Jukebox Music"} />
                        <p className="text-gray-200 text-xs">Vibe Vision Music.</p>
                        <div onClick={() => playGeneratedSong(dataItem)} className='p-2 cursor-pointer hover:scale-105 duration-300'>
                          {currentSong?.id !== dataItem._id ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            </svg>
                            :
                            // <PauseCircleIcon className='size-10' />
                            <div className='flex flex-col justify-center items-center'>
                              {/* /* From Uiverse.io by ClawHack1  */}
                              <div className="now-playing">
                                <div className="now-playing-inner">
                                  <div className="now-playing-block"></div>
                                  <div className="now-playing-block"></div>
                                  <div className="now-playing-block"></div>
                                  <div className="now-playing-block"></div>
                                  <div className="now-playing-block"></div>
                                  <div className="now-playing-block"></div>
                                  <div className="now-playing-block"></div>
                                  <div className="now-playing-block"></div>
                                </div>
                              </div>

                              Now Playing
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 mx-4 overflow-y-visible overflow-x-hidden">
                      <div className='size-8'>
                        <UserCircleIcon className=" size-full" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold line-clamp-2 text-nowrap">
                          {dataItem.displayName || dataItem.musicTitle || ((dataItem.contentType === 'kids-music' || dataItem.contentType === 'jukebox') ? 'AI Generated Music' : 'AI Generated Video')}
                        </h3>
                        <h3 className="font-semibold text-sm text-neutral-400 line-clamp-2 text-nowrap">
                          {dataItem.userPrompt || 'AI Generated Video'}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                }
              </Card>
            ))
            :
            (
              <div className='flex flex-col w-full items-center justify-end gap-4 text-gray-300 h-96'>
                <img className='size-20 opacity-60' src="https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/external-mount-fuji-wonder-of-the-world-vitaliy-gorbachev-blue-vitaly-gorbachev.png" alt="external-mount-fuji-wonder-of-the-world-vitaliy-gorbachev-blue-vitaly-gorbachev"/>
                Nothing to see here
              </div>
            )
          }
        </div>

        {videoModal && (
          <div className="fixed z-50 h-screen w-screen p-4 xl:px-44 xl:py-20 top-0 left-0 bg-black/20 backdrop-blur flex justify-center items-center">
            <div ref={videoModalRef} className="relative bg-neutral-900 p-8 gap-8 w-full h-full rounded-3xl flex flex-col xl:flex-row justify-center items-center object-contain">
              <button className="absolute z-10 top-2 right-2 text-white hover:scale-110 duration-300 hover:bg-black/50 px-2 py-1 rounded-full mb-10" onClick={closeVideoModal}>✖</button>
              <video src={currentVideoUrl || ''} controls className="w-full/ h-full max-w-96 rounded-3xl object-contain"></video>
              <ScrollArea className='flex-1 h-full rounded-3xl'>
                <div className='flex flex-col gap-4 bg-neutral-950 rounded-3xl h-full p-8'>
                  <h1 className='text-2xl'>Video Description</h1>
                  <div className='flex py-4 items-center justify-between'>
                    <div className='text-xl'>{currentVideoContent?.displayName || 'Video Name'}</div>
                    <div className='text-xl'>{formatDateTime(currentVideoContent?.createdAt || '00:00:00')}</div>
                  </div>
                  <div className='text-lg bg-neutral-900 p-4 rounded-xl'>User Prompt <br /> {currentVideoContent?.userPrompt || 'no prompt'}</div>
                  <div className='text-lg bg-neutral-900 p-4 rounded-xl'>{currentVideoContent?.contentType === 'roast-my-pic' ? 'Generated Text' : 'Enhanced Prompt'}<br /> {currentVideoContent?.enhancedPrompt || 'no prompt'}</div>
                  <div className="gap-4 flex flex-auto flex-row w-full">
                    {currentVideoContent?.contentType === 'roast-my-pic' && <div className='p-8 rounded-3xl flex flex-col items-center gap-6 bg-neutral-900 w-full'>
                      Image Used
                      <img src={`${BASE_URL}/${currentVideoContent?.imageUrl}`} className='size-44 rounded-3xl object-cover duration-200 hover:scale-105 cursor-pointer' onClick={() => { openLink(`${BASE_URL}/${currentVideoContent?.imageUrl}`) }} alt="No Image Found" />
                    </div>}
                    <div className='flex gap-4 flex-col w-full h-full'>
                      <Button
                        className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-3xl'
                        onClick={() => handleDownloadVideo(`${BASE_URL}/${currentVideoContent?.videoUrl || null}`, currentVideoContent?.displayName || 'Roast Video')}
                      >
                        <Video className="size-4" />
                        Download Video
                      </Button>
                      <Button
                        className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-3xl'
                        onClick={() => handleDownloadAudio(`${BASE_URL}/${currentVideoContent?.audioUrl || null}`, currentVideoContent?.displayName || 'Roast Audio')}
                      >
                        <AudioLinesIcon className="size-4" />
                        Download Audio
                      </Button>
                      {currentVideoContent?.contentType === 'roast-my-pic' && <Button
                        className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-3xl'
                        onClick={() => handleDownloadImage(`${BASE_URL}/${currentVideoContent?.imageUrl || null}`, currentVideoContent?.displayName || 'Roast Image')}
                      >
                        <Image className="size-4" />
                        Download Image
                      </Button>}
                    </div>
                    <Button
                      className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-3xl'
                      onClick={() => setShowShareDialog(true)}
                    >
                      <Share className="size-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
        {/* <EnhancedMusicPlayer /> */}

        {/* Music Player */}
        <EnhancedMusicPlayer currentSong={currentSong || null} />


        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="bg-black/90 border-purple-500/20">
            <DialogHeader>
              <DialogTitle className="text-white">Share Your Story</DialogTitle>
              <DialogDescription className="text-purple-200">
                Share your creation across platforms
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Twitter', icon: '🐦' },
                { name: 'Facebook', icon: '👤' },
                { name: 'Reddit', icon: '🤖' },
                { name: 'Email', icon: '📧' }
              ].map(platform => (
                <Button
                  key={platform.name}
                  variant="outline"
                  className="w-full bg-black/30"
                  onClick={() => setShowShareDialog(false)}
                >
                  <span className="mr-2">{platform.icon}</span>
                  {platform.name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default VideoPlatform;
