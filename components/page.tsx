'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout"
import {
    AudioLines,
    Edit,
    AudioLinesIcon,
    CheckCircle2,
    ChevronDown,
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
    TriangleAlert,
    User2Icon,
    UserCircleIcon,
    Video,
    Volume2,
    VolumeX,
    X
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
    userName: string;
    contentType: string;
    status: string;
    videoUrl?: string;
    audioUrl?: string;
    imageUrl?: string | null;
    thumbnail_alt?: string | null;
    musicTitle?: string | null;
    displayName?: string | null;
    createdAt: string;
    enhancedPrompt: string;
    userPrompt: string;
    songLyrics: string;
};

interface Song {
    id: string;
    title: string;
    genres: string[];
    coverArt: string;
    audioUrl: string;
    duration: number;
    timestamp: string;
    lyrics: string;
}

interface ChannelLink {
    label: string;
    url: string;
  }
  
  type ChannelLinks = { [key: string]: ChannelLink };

const ProfilePage = () => {
    const [activeCategory, setActiveCategory] = useState('');
    const [videoModal, setVideoModal] = useState<boolean>(false)
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
    const [currentVideoContent, setCurrentVideoContent] = useState<ContentItem | null>(null)
    const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [showProfileOptions, setShowProfileOptions] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [channelName, setChannelName] = useState<string | null>(null);
    const [channelHandle, setChannelHandle] = useState<string | null>(null);
    const [channelDescription, setChannelDescription] = useState<string | null>(null);
    const [channelLinks, setChannelLinks] = useState<ChannelLinks>({});
    const [channelContactInfo, setChannelContactInfo] = useState<string | null>(null);
    const [videoWatermark, setVideoWatermark] = useState<string | null>(null);
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


    const [localStorageInstance, setLocalStorageInstance] = useState<Storage | null>(null)

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

    const playGeneratedSong = (content: ContentItem) => {
        if (!isPlaying) {
            const newSong: Song = {
                id: content._id,
                title: content.musicTitle || 'No Title Found',
                genres: ['test', 'test'],
                audioUrl: content.audioUrl || '',
                coverArt: content.imageUrl || content.thumbnail_alt || '',
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
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short"
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

                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading audio:", error);
            }
        }
    };

    const handleDownloadVideo = async (videoUrl: string | null, displayName: string) => {
        if (videoUrl) {
            try {
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

                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading video:", error);
            }
        }
    };

    const handleDownloadImage = async (imageUrl: string | null, displayName: string) => {
        if (imageUrl) {
            try {
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

                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading image:", error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (typeof window !== 'undefined') {
                setLocalStorageInstance(window.localStorage);
                const token = window.localStorage.getItem('token');

                try {
                    const response = await axios.get(
                        `${BASE_URL}/api/content/get-user-content`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                        }
                    );
                    console.log(response.data);
                    setData(response.data);
                } catch (error) {
                    console.error("Error fetching content data:", error);
                }
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

    useEffect(() => {
        setShowMessageDialog(true)
    }, [])

    const formatTime = (time: number | null): string => {
        if (time === null || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleBannerImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setBannerImage(URL.createObjectURL(file));
        }
    };

    const handleChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelName(event.target.value);
    };

    const handleChannelHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelHandle(event.target.value);
    };

    const handleChannelDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChannelDescription(event.target.value);
    };

    const handleChannelLinkAdd = () => {
        const newLink = { label: '', url: '' };
        setChannelLinks(prev => ({ ...prev, [Object.keys(prev).length + 1]: newLink }));
    };

    const handleChannelLinkLabelChange = (index: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelLinks(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                label: event.target.value
            }
        }));
    };

    const handleChannelLinkUrlChange = (index: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelLinks(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                url: event.target.value
            }
        }));
    };

    const handleChannelLinkRemove = (index: string) => {
        const newLinks = { ...channelLinks };
        delete newLinks[index];
        setChannelLinks(newLinks);
    };

    const handleChannelContactInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelContactInfo(event.target.value);
    };

    const handleVideoWatermarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoWatermark(event.target.value);
    };

    const handleSaveProfile = () => {
        // Save the profile changes to the server
        console.log({
            profileImage,
            bannerImage,
            channelName,
            channelHandle,
            channelDescription,
            channelLinks,
            channelContactInfo,
            videoWatermark
        });
    };

    return (
        <Layout>
            <div className="w-full bg-background pt-24/ /pl-20 pb-36">
                <div className='h-80 flex items-center text-white p-20 gap-8'>
                    <div className='size-24 md:size-40 border-4 border-white rounded-full p-6 relative'>
                        <User2Icon className='size-full' />
                        <button
                            className='absolute bottom-0 right-0 size-8 bg-neutral-900 rounded-full p-2 hover:scale-105 duration-300 cursor-pointer'
                            onClick={() => setShowProfileOptions(true)}
                        >
                            <Edit className="size-full" />
                        </button>
                    </div>
                    <div className='flex flex-col gap-2 md:gap-4'>
                        <span className='text-2xl md:text-3xl font-semibold'> {localStorageInstance?.getItem('loggedInUser')} </span>
                        <span className='text-xl text-gray-300/60'> {localStorageInstance?.getItem('loggedInUserEmail')} </span>
                    </div>
                </div>

                <ScrollArea className="w-full p-4 border-y">
                    <span className='text-xl'>Generated Content</span>
                    <div className="flex gap-4 py-4 overflow-x-auto">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        activeCategory === category.contentType
                                            ? 'bg-primary-500 text-primary-50'
                                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                    }`}
                                    onClick={() => setActiveCategory(category.contentType)}
                                >
                                    {category.content}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Videos Grid */}
                <div className={`grid grid-cols-1 ${filteredData.length !== 0 && 'sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'} gap-4 p-4`}>
                    {filteredData.length !== 0 ?
                        filteredData.map((dataItem) => (
                            <Card key={dataItem._id} className="border-0 shadow-none ">
                                {
                                    dataItem.status === 'success' ?
                                        (
                                            !(dataItem.contentType === 'jukebox' || dataItem.contentType === 'kids-music') ?
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
                                                                {dataItem.userName || 'AI Generated Video'}
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
                                                                {dataItem.userName || 'AI Generated Video'}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                        )
                                        :
                                        dataItem.status === 'waiting' ?
                                            (
                                                <CardContent
                                                    className="bg-[#0f0f0f]/ bg-blue-900/30 border-2 border-blue-600 w-fit/ h-fit min-h-80 w-full p-0 flex flex-col justify-center pb-4 rounded-xl relative">
                                                    <Badge className='absolute top-2 left-2 z-10'> {dataItem.contentType} </Badge>
                                                    <div className="text-center">
                                                        <div
                                                            className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto"
                                                        ></div>
                                                        <h2 className="text-zinc-900 dark:text-white mt-4">Processing...</h2>
                                                        <p className="text-zinc-600 dark:text-zinc-400">
                                                            Your {dataItem.contentType} is being generated...
                                                        </p>
                                                        <div className='pt-1 text-xs opacity-40'>{dataItem.userPrompt}</div>
                                                    </div>
                                                    {
                                                        dataItem.contentType === 'roast-my-pic' &&
                                                        (
                                                            <img
                                                                src={(dataItem.imageUrl || dataItem.thumbnail_alt) ? `${BASE_URL}/${dataItem.imageUrl || dataItem.thumbnail_alt}` : 'https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg'}
                                                                alt={dataItem.displayName || dataItem.musicTitle || ''}
                                                                className={`size-24 aspect-square rounded-xl object-cover absolute bottom-4 right-4 hidden`}
                                                            />
                                                        )
                                                    }
                                                </CardContent>
                                            )
                                            :
                                            (
                                                <CardContent
                                                    className="bg-[#0f0f0f]/ bg-red-900/30 border-2 border-red-600 w-fit/ h-fit min-h-80 w-full p-0 flex flex-col justify-center pb-4 rounded-xl relative">
                                                    <Badge className='absolute top-2 left-2 z-10'> {dataItem.contentType} </Badge>
                                                    <div className="text-center">
                                                        <TriangleAlert className='size-16 text-red-500 mx-auto' />
                                                        <h2 className="text-zinc-900 dark:text-white mt-4">Error Generating Content!</h2>
                                                        <p className="text-zinc-600 dark:text-zinc-400">
                                                            The server wasn't able to generate your {dataItem.contentType}!
                                                        </p>
                                                        <div className='pt-1 text-sm opacity-60'>Please Try Again!</div>
                                                        <div className='pt-1 text-xs opacity-40'>{dataItem.userPrompt}</div>
                                                    </div>
                                                    {
                                                        dataItem.contentType === 'roast-my-pic' &&
                                                        (
                                                            <img
                                                                src={(dataItem.imageUrl || dataItem.thumbnail_alt) ? `${BASE_URL}/${dataItem.imageUrl || dataItem.thumbnail_alt}` : 'https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg'}
                                                                alt={dataItem.displayName || dataItem.musicTitle || ''}
                                                                className={`size-24 aspect-square rounded-xl object-cover absolute bottom-4 right-4 hidden`}
                                                            />
                                                        )
                                                    }
                                                </CardContent>
                                            )
                                }
                                {
                                }
                            </Card>
                        ))
                        :
                        (
                            <div className='flex flex-col w-full items-center justify-start pt-16 gap-4 text-gray-300 h-96'>
                                <img className='size-20 opacity-60' src="https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/external-mount-fuji-wonder-of-the-world-vitaliy-gorbachev-blue-vitaly-gorbachev.png" alt="external-mount-fuji-wonder-of-the-world-vitaliy-gorbachev-blue-vitaly-gorbachev" />
                                Nothing to see here
                            </div>
                        )
                    }
                </div>

                {videoModal &&
                    (
                        <div className="fixed z-50 h-screen w-screen p-0 xl:px-44 xl:py-20 top-0 left-0 bg-black/20 backdrop-blur flex justify-center items-center">
                            <div ref={videoModalRef} className="relative bg-neutral-900 p-4 pt-12 xl:p-8 gap-4 xl:gap-8 w-full h-full xl:rounded-xl flex flex-col xl:flex-row justify-center items-center object-contain">
                                <Button className="absolute bg-neutral-900 xl:bg-transparent xl:w-8 xl:h-8 z-10 top-2 right-2" onClick={closeVideoModal}>
                                    <ChevronDown className='flex xl:hidden' />
                                    <X className='xl:flex hidden' />
                                </Button>
                                <video src={currentVideoUrl || ''} controls className="xl:h-full xl:max-w-96 max-h-96 xl:max-h-full rounded-xl object-contain"></video>
                                <ScrollArea className='flex-1 h-full rounded-xl'>
                                    <div className='flex flex-col gap-4 bg-neutral-950 rounded-xl h-full p-4 xl:p-8'>
                                        <h1 className='text-2xl'>Video Description</h1>
                                        <div className='flex flex-col 2xl:flex-row py-4 items-start justify-between'>
                                            <div className='text-xl'>{(currentVideoContent?.contentType === 'story-time' ? currentVideoContent?.userPrompt : currentVideoContent?.displayName) || 'Video Name'}</div>
                                            <div className='text-lg opacity-60'>{formatDateTime(currentVideoContent?.createdAt || '00:00:00')}</div>
                                        </div>
                                        <div className='text-lg bg-neutral-900 p-4 rounded-xl'>User Prompt <br /> {currentVideoContent?.userPrompt || 'no prompt'}</div>
                                        <div className='text-lg bg-neutral-900 p-4 rounded-xl'>Generated Text<br /> {currentVideoContent?.enhancedPrompt || 'no prompt'}</div>
                                        <div className="gap-4 flex flex-auto flex-col xl:flex-row w-full">
                                            {currentVideoContent?.contentType === 'roast-my-pic' && <div className='p-8 rounded-xl flex flex-col items-center gap-6 bg-neutral-900 w-full'>
                                                Image Used
                                                <img src={`${BASE_URL}/${currentVideoContent?.imageUrl}`} className='size-44 rounded-xl object-cover duration-200 hover:scale-105 cursor-pointer' onClick={() => { openLink(`${BASE_URL}/${currentVideoContent?.imageUrl}`) }} alt="No Image Found" />
                                            </div>}
                                            <div className='flex gap-4 flex-col w-full h-full'>
                                                <Button
                                                    className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-xl'
                                                    onClick={() => handleDownloadVideo(`${BASE_URL}/${currentVideoContent?.videoUrl || null}`, currentVideoContent?.displayName || 'Roast Video')} >
                                                    <Video className="size-4" />
                                                    Download Video
                                                </Button>
                                                {currentVideoContent?.contentType === 'roast-my-pic' &&
                                                    <>
                                                        <Button
                                                            className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-xl'
                                                            onClick={() => handleDownloadAudio(`${BASE_URL}/${currentVideoContent?.audioUrl || null}`, currentVideoContent?.displayName || 'Roast Audio')} >
                                                            <AudioLinesIcon className="size-4" />
                                                            Download Audio
                                                        </Button>
                                                        <Button
                                                            className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-xl'
                                                            onClick={() => handleDownloadImage(`${BASE_URL}/${currentVideoContent?.imageUrl || null}`, currentVideoContent?.displayName || 'Roast Image')} >
                                                            <Image className="size-4" />
                                                            Download Image
                                                        </Button>
                                                    </>
                                                }
                                            </div>
                                            <Button
                                                className='w-full xl:h-full p-4 bg-neutral-900 flex xl:flex-col justify-center items-center gap-4 rounded-xl'
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
                    )
                }
                    {showShareDialog && (
                        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                            <DialogTrigger>
                                <div className="fixed inset-0 bg-neutral-900/80 flex justify-center items-center z-50">
                                    <Card className="bg-neutral-800 p-6 w-full max-w-md">
                                        <div className="flex justify-end mb-4">
                                            <button
                                                className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-600 transition-colors"
                                                onClick={() => setShowShareDialog(false)}
                                            >
                                                <X className="size-6" />
                                            </button>
                                        </div>
                                        <DialogHeader>
                                            <DialogTitle>Share Content</DialogTitle>
                                            <DialogDescription>
                                                Copy the link to share this content.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogContent>
                                            <div className="flex items-center bg-neutral-700 rounded-md p-2">
                                                <input
                                                    type="text"
                                                    className="bg-transparent flex-1 outline-none text-neutral-300"
                                                    value={window.location.href}
                                                    readOnly
                                                />
                                                <button
                                                    className="bg-neutral-600 text-neutral-300 px-4 py-2 rounded-md hover:bg-neutral-500 transition-colors"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(window.location.href);
                                                        setShowShareDialog(false);
                                                    }}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </DialogContent>
                                    </Card>
                                </div>
                            </DialogTrigger>
                        </Dialog>
                    )}

                    {showMessageDialog && (
                        <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
                            <DialogTrigger>
                                <div className="fixed inset-0 bg-neutral-900/80 flex justify-center items-center z-50">
                                    <Card className="bg-neutral-800 p-6 w-full max-w-md">
                                        <div className="flex justify-end mb-4">
                                            <button
                                                className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-600 transition-colors"
                                                onClick={() => setShowMessageDialog(false)}
                                            >
                                                <X className="size-6" />
                                            </button>
                                        </div>
                                        <DialogHeader>
                                            <DialogTitle>Welcome to the Profile Page!</DialogTitle>
                                            <DialogDescription>
                                                This is where you can manage your channel settings and view your generated content.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogContent>
                                            <Button
                                                className="w-full"
                                                onClick={() => {
                                                    setShowMessageDialog(false);
                                                    setShowProfileOptions(true);
                                                }}
                                            >
                                                Customize Profile
                                            </Button>
                                        </DialogContent>
                                    </Card>
                                </div>
                            </DialogTrigger>
                        </Dialog>
                    )}

                    {showProfileOptions && (
                        <div className="fixed inset-0 bg-neutral-900/80 flex justify-center items-center z-50">
                            <Card className="bg-neutral-800 p-6 w-full max-w-md">
                                <div className="flex justify-end mb-4">
                                    <button
                                        className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-600 transition-colors"
                                        onClick={() => setShowProfileOptions(false)}
                                    >
                                        <X className="size-6" />
                                    </button>
                                </div>
                                <h2 className="text-xl font-medium mb-4">Profile Settings</h2>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label htmlFor="profile-image" className="text-sm font-medium">
                                            Profile Image
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="size-24 md:size-32 border-4 border-white rounded-full p-6 relative">
                                                {profileImage ? (
                                                    <img
                                                        src={profileImage}
                                                        alt="Profile"
                                                        className="size-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <User2Icon className="size-full" />
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                id="profile-image"
                                                className="hidden"
                                                onChange={handleProfileImageUpload}
                                            />
                                            <label
                                                htmlFor="profile-image"
                                                className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md hover:bg-neutral-600 transition-colors cursor-pointer"
                                            >
                                                Upload
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="banner-image" className="text-sm font-medium">
                                            Banner Image
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {bannerImage ? (
                                                <img
                                                    src={bannerImage}
                                                    alt="Banner"
                                                    className="w-full h-32 object-cover rounded-md"
                                                />
                                            ) : (
                                                <div className="w-full h-32 bg-neutral-700 rounded-md flex items-center justify-center text-neutral-400">
                                                    No banner image
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                id="banner-image"
                                                className="hidden"
                                                onChange={handleBannerImageUpload}
                                            />
                                            <label
                                                htmlFor="banner-image"
                                                className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md hover:bg-neutral-600 transition-colors cursor-pointer"
                                            >
                                                Upload
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="channel-name" className="text-sm font-medium">
                                            Channel Name
                                        </label>
                                        <input
                                            type="text"
                                            id="channel-name"
                                            className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md w-full"
                                            value={channelName || ''}
                                            onChange={handleChannelNameChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="channel-handle" className="text-sm font-medium">
                                            Channel Handle
                                        </label>
                                        <input
                                            type="text"
                                            id="channel-handle"
                                            className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md w-full"
                                            value={channelHandle || ''}
                                            onChange={handleChannelHandleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="channel-description" className="text-sm font-medium">
                                            Channel Description
                                        </label>
                                        <textarea
                                            id="channel-description"
                                            className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md w-full resize-none"
                                            rows={3}
                                            value={channelDescription || ''}
                                            onChange={handleChannelDescriptionChange}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">
                                            Channel Links
                                        </label>
                                        <div className="flex flex-col gap-2">
                                            {Object.keys(channelLinks).map((key) => (
                                                <div key={key} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md flex-1"
                                                        placeholder="Link Label"
                                                        value={channelLinks[key].label}
                                                        onChange={(event) =>
                                                            handleChannelLinkLabelChange(key, event)
                                                        }
                                                    />
                                                    <input
                                                        type="text"
                                                        className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md flex-1"
                                                        placeholder="Link URL"
                                                        value={channelLinks[key].url}
                                                        onChange={(event) =>
                                                            handleChannelLinkUrlChange(key, event)
                                                        }
                                                    />
                                                    <button
                                                        className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-600 transition-colors"
                                                        onClick={() => handleChannelLinkRemove(key)}
                                                    >
                                                        <X className="size-6" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md hover:bg-neutral-600 transition-colors"
                                                onClick={handleChannelLinkAdd}
                                            >
                                                Add Link
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="channel-contact-info" className="text-sm font-medium">
                                            Contact Info
                                        </label>
                                        <input
                                            type="text"
                                            id="channel-contact-info"
                                            className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md w-full"
                                            value={channelContactInfo || ''}
                                            onChange={handleChannelContactInfoChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="video-watermark" className="text-sm font-medium">
                                            Video Watermark
                                        </label>
                                        <input
                                            type="text"
                                            id="video-watermark"
                                            className="bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md w-full"
                                            value={videoWatermark || ''}
                                            onChange={handleVideoWatermarkChange}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            className="bg-primary-500 hover:bg-primary-600 text-primary-50"
                                            onClick={handleSaveProfile}
                                        >
                                            Save Profile
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

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

<Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
    <DialogContent className="bg-black/90 border-purple-500/20">
        <DialogHeader>
            <DialogTitle className="text-white text-xl">Attention!</DialogTitle>
            <DialogDescription className="text-purple-200 text-base">
                Since the website is in development as of now, your generated content will be deleted from the server when the server gets updated next time.
            </DialogDescription>
        </DialogHeader>
    </DialogContent>
</Dialog>
</div>
</Layout>
);
};

export default ProfilePage;
