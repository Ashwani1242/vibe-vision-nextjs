"use client"
import { Layout } from "@/components/layout/layout";
import { SparklesCore } from "@/components/ui/sparkles";
import { ShortsPlayer } from "@/components/viveflicks-player";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, TouchEvent, WheelEvent, KeyboardEvent } from "react";

// Updated Short interface to match API response
interface Short {
    _id: string;
    videoUrl: string;
    audioUrl?: string;
    imageUrl?: string;
    displayName: string;
    userPrompt: string;
    enhancedPrompt: string;
    userName: string;
    contentType: string;
    createdAt: string;
    likes?: string;
    comments?: string;
    views?: string;
}

export default function ShortsPage() {
    // State to manage shorts data and current short index
    const [shorts, setShorts] = useState<Short[]>([]);
    const [currentShortIndex, setCurrentShortIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Refs for touch and scroll handling
    const touchStartY = useRef(0);
    const touchThreshold = 50; // Minimum distance for swipe
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch shorts data from API
    useEffect(() => {
        async function fetchShorts() {
            try {
                setIsLoading(true);
                const response = await fetch('https://vibevision.ai/api/content/get-all-content');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch shorts');
                }
                
                const data = await response.json();
                
                // Filter for public and successful content
                const publicShorts = data.filter((short: Short) => 
                    short.isPublic && short.status === 'success'
                );
                
                setShorts(publicShorts);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setIsLoading(false);
            }
        }

        fetchShorts();
    }, []);

    // Add event listeners for keyboard and wheel navigation
    useEffect(() => {
        const handleKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                handleNextShort();
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                handlePreviousShort();
                e.preventDefault();
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                handleNextShort();
            } else if (e.deltaY < 0) {
                handlePreviousShort();
            }
        };

        // Add keyboard event listener
        window.addEventListener('keydown', handleKeyDown);

        // Add wheel event listener to the container
        const currentContainer = containerRef.current;
        if (currentContainer) {
            currentContainer.addEventListener('wheel', handleWheel as EventListener);
        }

        // Cleanup event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (currentContainer) {
                currentContainer.removeEventListener('wheel', handleWheel as EventListener);
            }
        };
    }, [shorts]);

    // Function to navigate to the next short video
    const handleNextShort = () => {
        if (shorts.length > 0) {
            setCurrentShortIndex((prevIndex) => 
                (prevIndex + 1) % shorts.length
            );
        }
    };

    // Function to navigate to the previous short video
    const handlePreviousShort = () => {
        if (shorts.length > 0) {
            setCurrentShortIndex((prevIndex) => 
                (prevIndex - 1 + shorts.length) % shorts.length
            );
        }
    };

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        const touchEndY = e.touches[0].clientY;
        const touchDiff = touchStartY.current - touchEndY;

        if (Math.abs(touchDiff) > touchThreshold) {
            if (touchDiff > 0) {
                handleNextShort();
            } else {
                handlePreviousShort();
            }
            // Reset touch start to prevent multiple triggers
            touchStartY.current = touchEndY;
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <Layout>
                <main className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-white">Loading shorts...</div>
                </main>
            </Layout>
        );
    }

    // Error state
    if (error) {
        return (
            <Layout>
                <main className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-red-500">{error}</div>
                </main>
            </Layout>
        );
    }

    // No shorts available
    if (shorts.length === 0) {
        return (
            <Layout>
                <main className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-white">No shorts available</div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main 
                ref={containerRef}
                className="min-h-screen bg-black flex items-center justify-center p-4 relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                {/* Sparkle background effect */}
                <div className="absolute inset-0 z-0">
                    <SparklesCore
                        id="shorts-page-sparkles"
                        background="purple"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
                    {/* Previous Short Button */}
                    <button 
                        onClick={handlePreviousShort}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300"
                        aria-label="Previous Short"
                    >
                        <ChevronUp size={24} />
                    </button>
                    
                    {/* Next Short Button */}
                    <button 
                        onClick={handleNextShort}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300"
                        aria-label="Next Short"
                    >
                        <ChevronDown size={24} />
                    </button>
                </div>

                {/* Shorts Player Container */}
                <div className="absolute w-full max-w-md">
                    {/* Pass the current short's data to the ShortsPlayer component */}
                    <ShortsPlayer 
                        {...{
                            ...shorts[currentShortIndex],
                            title: shorts[currentShortIndex].displayName,
                            channelName: shorts[currentShortIndex].userName,
                            description: shorts[currentShortIndex].enhancedPrompt,
                            videoUrl: shorts[currentShortIndex].videoUrl,
                            channelAvatar: '', // You might want to add a default avatar
                            likes: '0', // Add default values as needed
                            comments: '0',
                            views: '0',
                            postedDate: new Date(shorts[currentShortIndex].createdAt).toLocaleDateString(),
                            hashtags: [shorts[currentShortIndex].contentType],
                            duration: '', // You might need to calculate or fetch this
                            isVerified: false,
                            category: shorts[currentShortIndex].contentType,
                            shareCount: '0'
                        }}
                        key={shorts[currentShortIndex]._id} // Use unique ID as key
                    />
                </div>
            </main>
        </Layout>
    );
}