"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { ScrollArea } from "../../../components/ui/scroll-area";
import {
  BookOpen,
  Download,
  Share2,
  TriangleAlert,
  Sparkles,
  Wand2,
  RefreshCw,
  Copy,
  Check,
  BrainCircuit,
  Share,
} from 'lucide-react';
import { BASE_URL } from '@/config';
import axios from 'axios';
import { Layout } from '@/components/layout/layout';
import MessageToast from '@/components/ui/MessageToast';

// Genre type definition
type Genre = {
  value: string;
  icon: string;
  theme: string;
  description: string;
};

const genres: Genre[] = [
  {
    value: 'Fantasy',
    icon: '🧙‍♂️',
    theme: 'from-violet-600 to-indigo-600',
    description: 'Magical worlds and epic adventures'
  },
  {
    value: 'Sci-Fi',
    icon: '🚀',
    theme: 'from-cyan-500 to-blue-600',
    description: 'Futuristic technology and space exploration'
  },
  {
    value: 'Mystery',
    icon: '🔍',
    theme: 'from-slate-600 to-slate-900',
    description: 'Suspenseful investigations and puzzling cases'
  },
  {
    value: 'Romance',
    icon: '💝',
    theme: 'from-pink-500 to-rose-600',
    description: 'Love, relationships, and emotional journeys'
  },
  {
    value: 'Horror',
    icon: '👻',
    theme: 'from-gray-900 to-red-900',
    description: 'Spine-chilling tales and supernatural events'
  },
  {
    value: 'Adventure',
    icon: '🗺️',
    theme: 'from-emerald-600 to-yellow-500',
    description: 'Action-packed journeys and thrilling quests'
  },
  {
    value: 'Fairy Tale',
    icon: '🧚',
    theme: 'from-purple-500 to-pink-500',
    description: 'Enchanting stories of magic, wonder, and happy endings'
  },
  {
    value: 'Slice of Life',
    icon: '🍃',
    theme: 'from-green-400 to-blue-400',
    description: 'Everyday experiences, emotions, and personal growth'
  },
  {
    value: 'Drama',
    icon: '🎭',
    theme: 'from-blue-500 to-gray-700',
    description: 'Emotional narratives with realistic conflicts and character depth'
  },
  {
    value: 'Action',
    icon: '💥',
    theme: 'from-red-600 to-orange-600',
    description: 'High-energy sequences, battles, and heroism'
  }
];


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


export default function EnhancedStoryGenerator() {
  // Core state
  const [genre, setGenre] = useState<string>(genres[0].value);
  const [genreDescription, setGenreDescription] = useState<string>(genres[0].description);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // UI state
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('write');

  // Enhanced features state
  const [storyHistory, setStoryHistory] = useState<StoryHistoryItem[]>([]);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [backgroundStyle, setBackgroundStyle] = useState<string>('gradient');
  const [characterLimit, setCharacterLimit] = useState<number>(2000);

  // Advanced settings
  const [settings, setSettings] = useState<StorySettings>({
    tone: 'casual',
    ageGroup: 'Kids ( less than 12 )',
    pacing: '30 seconds',
    duration: 30,
    complexity: 'medium',
  });

  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');

  const [localStorageInstance, setLocalStorageInstance] = useState<Storage | null>(null)

  const [toastVisible, setToastVisible] = useState(false);


  useEffect(() => {
    setLocalStorageInstance(localStorage);
  }, [])



  const [data, setData] = useState<ContentItem[]>([]);

  const filteredData = data.filter((dataItem) => dataItem.contentType === 'story-time')
  const mostRecentData = filteredData.slice().reverse();

  const fetchData = async () => {
    if (typeof window !== 'undefined') {
      // Access localStorage on the client side
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

  useEffect(() => {
    // Fetch data immediately and set an interval to fetch every 15 seconds
    fetchData();
    const interval = setInterval(fetchData, 15000); // 15000 ms = 15 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [BASE_URL]);


  // Dynamic background classes
  const getBackgroundClass = () => {
    const baseClasses = 'transition-all duration-500 ease-in-out';
    switch (backgroundStyle) {
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br ${genres.find(g => g.value === genre)?.theme || 'from-purple-600 to-blue-600'}`;
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
        console.error("Error downloading audio:", error);
      }
    }
  };

  // Utility functions
  const handleCopyToClipboard = async (script: string) => {
    if (!script) return;

    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      if (audioEnabled) {
        new Audio('/sounds/copy.mp3').play();
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Layout>
      <div
        ref={containerRef}
        className={`min-h-screen ${getBackgroundClass()} p-6 overflow-hidden relative`}
      >
        {/* Animated particles background */}
        {backgroundStyle === 'particles' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  opacity: 0.1 + Math.random() * 0.3,
                }}
              >
                <Sparkles
                  className="text-purple-500"
                  size={10 + Math.random() * 20}
                />
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-white flex items-center gap-2">
                <BrainCircuit className="h-8 w-8" />
                Story Forge AI
              </h1>
              <Badge variant="outline" className="text-white">
                v1.0
              </Badge>
            </div>
          </header>

          {/* Main grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left panel - Story controls */}
            <div className="space-y-6">
              {/* Genre selection */}
              <Card className={`${darkMode ? 'bg-black/50' : 'bg-white/90'} backdrop-blur border-purple-500/20`}>
                <CardHeader>
                  <CardTitle className="text-white">Choose Your Genre</CardTitle>
                  <CardDescription className="text-purple-200">
                    Select a genre to shape your story&apos;s world
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {genres.map(({ value, icon, description }) => (
                      <TooltipProvider key={value}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={genre === value ? "default" : "outline"}
                              className={`w-full h-20 flex flex-col items-center justify-center gap-2 ${genre === value
                                ? "bg-purple-600 hover:bg-purple-700"
                                : "hover:bg-purple-500/20"
                                }`}
                              onClick={() => {
                                setGenre(value);
                                setGenreDescription(description)
                                if (audioEnabled) {
                                  new Audio('/sounds/select.mp3').play();
                                }
                              }
                              }>
                              <span className="text-2xl">{icon}</span>
                              <span className="text-sm">{value}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Story Configuration */}
              <Card className={`${darkMode ? 'bg-black/50' : 'bg-white/90'} backdrop-blur border-purple-500/20`}>
                <CardHeader>
                  <CardTitle className="text-white">Story Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tone Selection */}
                  <div className="space-y-4">
                    <Label className="text-purple-200">Tone</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Casual', 'Formal', 'Humorous', 'Dark', 'Sarcastic', 'Hilarious', 'Silly', 'Dark Comedy'].map((tone) => (
                        <Button
                          key={tone}
                          variant="outline"
                          className={`${settings.tone.toLowerCase() === tone.toLowerCase()
                            ? 'bg-purple-600'
                            : 'bg-black/30'
                            }`}
                          onClick={() => setSettings({ ...settings, tone: tone.toLowerCase() })}
                        >
                          {tone}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Age Group Selection */}
                  <div className="space-y-4">
                    <Label className="text-purple-200">Age Group</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Kids ( less than 12 )', 'Teens ( 13 to 18 )', 'Adults ( above 18 )'].map((ageGroup) => (
                        <Button
                          key={ageGroup}
                          variant="outline"
                          className={`${settings.ageGroup.toLowerCase() === ageGroup.toLowerCase()
                            ? 'bg-purple-600'
                            : 'bg-black/30'
                            }`}
                          onClick={() => setSettings({ ...settings, ageGroup: ageGroup.toLowerCase() })}
                        >
                          {ageGroup}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Story Prompt */}
                  <div className="space-y-2">
                    <Label className="text-purple-200">Story Prompt</Label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your story idea..."
                      className="h-32 bg-black/50 resize-none"
                      maxLength={characterLimit}
                    />
                    <div className="flex justify-between text-sm text-purple-300">
                      <span>{prompt.length} / {characterLimit} characters</span>
                      <button
                        className="hover:text-purple-100"
                        onClick={() => setPrompt('')}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Generation Button */}
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={loading || !prompt.trim()}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Crafting Your Story
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Story
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
              </div>

              {/* Right panel - Story Display */}
              <div className="space-y-6">
                <Card className={`${darkMode ? 'bg-black/50' : 'bg-white/90'} backdrop-blur border-purple-500/20`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Your Generated Stories and Videos
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[800px] rounded-md border border-purple-500/20 p-4 gap-4">

                      {mostRecentData.length !== 0 ?
                        mostRecentData.map((dataItem) =>
                          < Card className='p-6 bg-black/30 mb-4'>
                            {
                              dataItem.status === 'success' ?
                                (
                                  <>
                                    <div className="prose prose-invert max-w-none py-4 rounded-xl bg-black/60 p-4 mb-4">
                                      <h2 className="text-2xl font-bold text-purple-100 mb-4 flex justify-between">
                                        {dataItem.userPrompt || 'Story Time Video'}
                                        <div className="flex gap-2">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleCopyToClipboard(dataItem.enhancedPrompt)}
                                            className="text-white hover:bg-white/20"
                                          >
                                            {copied ? (
                                              <Check className="h-4 w-4" />
                                            ) : (
                                              <Copy className="h-4 w-4" />
                                            )}
                                          </Button>
                                        </div>
                                      </h2>
                                      <p className="text-purple-50 whitespace-pre-wrap leading-relaxed pr-4 max-h-40 overflow-y-auto">
                                        {dataItem.enhancedPrompt}
                                      </p>
                                    </div>
                                    <video
                                      src={dataItem.videoUrl}
                                      controls
                                      className="w-full h-64 rounded-lg object-contain bg-black"
                                      preload="auto"
                                      onError={(e) => console.error("Video error:", e)}
                                    />
                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                      <Button
                                        variant="secondary"

                                        onClick={() => handleDownloadVideo(dataItem.videoUrl || '', dataItem.userPrompt || '')}
                                      >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                      </Button>
                                      <Button
                                        variant="secondary"
                                        onClick={() => setShowShareDialog(true)}
                                      >
                                        <Share className="mr-2 h-4 w-4" />
                                        Share
                                      </Button>
                                    </div>
                                  </>
                                ) :
                                dataItem.status === 'waiting' ?
                                  (
                                    <div className="w-full h-96 rounded-lg bg-black/30 flex flex-col items-center justify-center">
                                      <div
                                        className="p-2 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-20 md:h-20 h-16 w-16 aspect-square rounded-full"
                                      >
                                        <div
                                          className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
                                        ></div>
                                      </div>

                                      <div className="loader">
                                        <p>Generating</p>
                                        <div className="words">
                                          <span className="word">Story</span>
                                          <span className="word">Speech</span>
                                          <span className="word">Character</span>
                                          <span className="word">Video</span>
                                          <span className="word">Story</span>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                  :
                                  (
                                    <CardContent
                                      className="bg-[#0f0f0f]/ bg-red-900/30 border-2/ border-red-600 h-fit min-h-96 w-full p-0 flex flex-col justify-center pb-4 rounded-xl relative">
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
                          </ Card>
                        )
                        :
                        (
                          <div className={`text-center text-purple-300 py-20 ${loading && ' animate-pulse '}`}>
                            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Your stories will appear here</p>
                            <p className="text-sm mt-2 text-purple-400">
                              Use the controls on the left to generate your story
                            </p>
                          </div>
                        )
                      }
                    </ScrollArea>

                    {generatedScript && (
                      <div className="mt-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="bg-black/30"
                              onClick={() => setShowShareDialog(true)}
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </div>
                          <div className="flex gap-4 items-center">
                            <Badge variant="outline" className="bg-black/30">
                              {genre}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Dialogs */}
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

            {/* History Dialog */}
            <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
              <DialogContent className="bg-black/90 border-purple-500/20 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Story History</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4">
                    {storyHistory.map((item) => (
                      <Card key={item.id} className="bg-black/50">
                        <CardHeader>
                          <CardTitle className="text-white text-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {genres.find(g => g.value === item.genre)?.icon}
                              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setGeneratedStory(item);
                                setPrompt(item.prompt);
                                setGenre(item.genre);
                                setShowHistoryDialog(false);
                              }}
                            >
                              Load
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <h3 className="text-purple-100 font-semibold mb-2">{item.title}</h3>
                          <p className="text-purple-200 line-clamp-3">{item.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <MessageToast
              message="Your creation is in progress! You can keep track in your profile."
              visible={toastVisible}
              onClose={() => setToastVisible(false)}
            />
          </div>
        </div>

    </Layout >
  );
}