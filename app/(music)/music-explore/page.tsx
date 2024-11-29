"use client"
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Icon } from '@iconify/react';
import '@/style/explore.css';

const CIRCLE_RADIUS = 400;
const RADIUS_FRACTION_INSIDE_CONTAINER = 0.2;
const d = CIRCLE_RADIUS * (1 - RADIUS_FRACTION_INSIDE_CONTAINER);

function MusicExplore() {
    const containerRef = useRef<HTMLDivElement>(null);
    const tweetRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
    const animationRef = useRef<number>();
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const [rotation, setRotation] = useState(0);
    const [tracks, setTracks] = useState<any[]>([]);
    const [currentTrack, setCurrentTrack] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Fetch tracks from NCS API
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                // Using a GitHub-hosted free NCS API
                const response = await fetch('https://raw.githubusercontent.com/SunoBB/ncs/main/tracks.json');
                const data = await response.json();
                
                // Randomly select up to 6 unique tracks
                const randomTracks = data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 6)
                    .map((track: any) => ({
                        title: track.title,
                        artist: track.artist,
                        url: track.download
                    }));
                
                setTracks(randomTracks);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };

        fetchTracks();
    }, []);

    const getXDelta = useCallback(
        (tweetY: number) => {
            if (containerRect) {
                const containerCenterY = containerRect.y + containerRect.height / 2;
                const delta =
                    Math.sqrt(
                        CIRCLE_RADIUS * CIRCLE_RADIUS -
                        (containerCenterY - tweetY) * (containerCenterY - tweetY)
                    ) +
                    d -
                    CIRCLE_RADIUS;
                return delta;
            }
            return 0;
        },
        [containerRect]
    );

    const updateTweetPositions = useCallback(() => {
        if (containerRect) {
            tweetRefs.current.forEach((tweetRef) => {
                if (tweetRef) {
                    const tweetRect = tweetRef.getBoundingClientRect();
                    const tweetY = tweetRect.y + tweetRect.height / 2;
                    const xDelta = getXDelta(tweetY);
                    tweetRef.style.transform = `translateX(${xDelta}px)`;
                }
            });
        }
        
        // Slower rotation
        setRotation(prevRotation => (prevRotation + 0.02) % 360);
        
        animationRef.current = requestAnimationFrame(updateTweetPositions);
    }, [containerRect, getXDelta]);

    useEffect(() => {
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setContainerRect(entry.target.getBoundingClientRect());
                }
            });

            resizeObserver.observe(containerRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(updateTweetPositions);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [updateTweetPositions]);

    // Play/Pause functionality
    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Select and play a track
    const selectTrack = (track: any) => {
        if (audioRef.current) {
            audioRef.current.src = track.url;
            audioRef.current.play();
            setCurrentTrack(track);
            setIsPlaying(true);
        }
    };

    return (
        <div className="flex items-center -ml-[100px] bg-[#1a0b2c] min-h-screen">
            <div className="diskContainer relative">
                <div
                    className="disk"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: "center center",
                        transition: "transform 0.1s linear"
                    }}
                >
                    {tracks.map((track, index) => {
                        const rotationAngle = (360 / tracks.length) * index;
                        return (
                            <div
                                key={track.title}
                                className={`
                                    absolute w-[250px] h-4 transform -translate-x-1/2 -translate-y-1/2 
                                    rotate-[${rotationAngle}deg] translate-x-[1000px] 
                                    text-center cursor-pointer transition duration-300 
                                    text-sm font-mono
                                    ${index % 2 === 0 
                                        ? 'text-[#8A4FFF] hover:bg-[#8A4FFF] hover:text-white' 
                                        : 'text-[#5D3FD3] hover:bg-[#5D3FD3] hover:text-white'}
                                `}
                                onClick={() => selectTrack(track)}
                            >
                                {track.title} - {track.artist}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="absolute max-w-[400px] z-10 ml-[200px] mb-[100px]">
                <div className="bg-[#2a1b3d] p-4 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-white mb-4 text-center">
                        Explore Vibe Vision Music Center
                    </div>
                    
                    <div className="bg-[#3a2b4d] p-4 rounded-lg">
                        <audio ref={audioRef} src="" preload="auto" />
                        
                        <div className="text-sm text-gray-300 mb-2">
                            {currentTrack ? 'Now Playing' : 'Pick a track...'}
                        </div>
                        
                        <div 
                            className="text-xl font-semibold text-white mb-4 truncate"
                            title={currentTrack?.title}
                        >
                            {currentTrack 
                                ? `${currentTrack.title} - ${currentTrack.artist}` 
                                : ''}
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                            <button 
                                className="text-gray-300 hover:text-white"
                                aria-label="Sound"
                            >
                                <Icon icon="mdi:volume-high" className="w-6 h-6" />
                            </button>
                            
                            <div className="flex items-center space-x-4">
                                <button 
                                    aria-label="Previous song"
                                    className="text-gray-400 cursor-not-allowed"
                                    disabled
                                >
                                    <Icon icon="mdi:skip-previous" className="w-6 h-6" />
                                </button>
                                
                                <button 
                                    aria-label="Play/Pause"
                                    onClick={handlePlayPause}
                                    className="bg-[#6A0DAD] hover:bg-[#8A4FFF] text-white p-2 rounded-full"
                                >
                                    <Icon 
                                        icon={isPlaying ? "mdi:pause" : "mdi:play"} 
                                        className="w-6 h-6" 
                                    />
                                </button>
                                
                                <button 
                                    aria-label="Next song"
                                    className="text-gray-400 cursor-not-allowed"
                                    disabled
                                >
                                    <Icon icon="mdi:skip-next" className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="w-6 h-6"></div>
                        </div>
                        
                        <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
                            <div 
                                className="bg-[#8A4FFF] h-1 rounded-full" 
                                style={{ width: '0%' }} 
                            />
                        </div>
                    </div>
                    
                    <div 
                        className="mt-4 text-center bg-[#6A0DAD] text-white py-2 rounded-lg cursor-pointer hover:bg-[#8A4FFF] transition"
                        role="button"
                        tabIndex={0}
                    >
                        Create with V4
                    </div>
                    
                    <div className="mt-4 text-center text-gray-400 text-sm">
                        <div>© 2024 Suno, Inc.</div>
                        <div className="mt-2 space-x-4">
                            <a href="https://suno.com/terms" className="hover:text-white">
                                Terms of Service
                            </a>
                            <a href="https://suno.com/privacy" className="hover:text-white">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicExplore;