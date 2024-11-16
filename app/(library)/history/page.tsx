"use client"

import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    Trash2,
    Calendar,
    Brain,
    Filter,
    MoreVertical,
    Clock,
    TrendingUp,
    Tag,
    ThumbsUp,
    Zap,
    Activity,
    Eye,
    ArrowUpRight,
    ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Layout } from "@/components/layout/layout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Enhanced interfaces with more AI-driven metrics
interface Video {
    id: number;
    title: string;
    channel?: string;
    views: string;
    duration: string;
    timestamp: string;
    thumbnail: string;
    category?: string;
    description?: string;
    watchProgress?: number;
    aiTags?: string[];
    sentiment?: number;
    engagementScore?: number;
    aiInsights?: {
        contentQuality: number;
        relevance: number;
        learningValue: number;
        recommendationStrength: number;
    };
    predictedWatchTime?: string;
    similarVideos?: number[];
    topicCluster?: string;
}

interface WatchSession {
    date: string;
    videos: Video[];
    aiMetrics: {
        focusScore: number;
        learningEfficiency: number;
        topicDiversity: number;
        watchTimeOptimization: number;
    };
}

interface UserPreferences {
    favoriteCategories: string[];
    watchPatterns: {
        timeOfDay: { [key: string]: number };
        duration: { [key: string]: number };
        topics: { [key: string]: number };
    };
    learningGoals: string[];
}

const WatchHistory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('today');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [watchHistory, setWatchHistory] = useState<WatchSession[]>([]);
    const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
    const [aiInsights, setAiInsights] = useState<{
        topCategories: string[];
        watchTimeDistribution: { [key: string]: number };
        engagementTrends: { category: string; score: number }[];
        learningProgress: { topic: string; progress: number }[];
        predictedInterests: string[];
        focusMetrics: { time: string; score: number }[];
    }>({
        topCategories: [],
        watchTimeDistribution: {},
        engagementTrends: [],
        learningProgress: [],
        predictedInterests: [],
        focusMetrics: []
    });

    // Load user preferences from localStorage
    useEffect(() => {
        const loadUserPreferences = () => {
            const savedPreferences = localStorage.getItem('userPreferences');
            if (savedPreferences) {
                setUserPreferences(JSON.parse(savedPreferences));
            } else {
                const defaultPreferences: UserPreferences = {
                    favoriteCategories: ['Technology', 'Science', 'Education'],
                    watchPatterns: {
                        timeOfDay: {
                            morning: 25,
                            afternoon: 30,
                            evening: 35,
                            night: 10
                        },
                        duration: {
                            short: 40,
                            medium: 45,
                            long: 15
                        },
                        topics: {
                            technology: 35,
                            science: 25,
                            education: 20,
                            entertainment: 20
                        }
                    },
                    learningGoals: ['AI/ML', 'Web Development', 'Data Science']
                };
                localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
                setUserPreferences(defaultPreferences);
            }
        };

        loadUserPreferences();
    }, []);

    // Add clearWatchHistory function
    const clearWatchHistory = () => {
        try {
            // Clear from localStorage
            localStorage.removeItem('watchHistory');

            // Reset state
            setWatchHistory([]);

            // Reset AI insights
            setAiInsights({
                topCategories: [],
                watchTimeDistribution: {},
                engagementTrends: [],
                learningProgress: [],
                predictedInterests: [],
                focusMetrics: []
            });

            // Close the dialog
            setShowDeleteDialog(false);

        } catch (error) {
            console.error('Error clearing watch history:', error);
            // You might want to add error handling UI here
        }
    };

    // Add filteredVideos computation
    const filteredVideos = useMemo(() => {
        const videos = watchHistory.flatMap(session => session.videos);
        return videos.filter(video => {
            const matchesSearch = searchQuery.toLowerCase() === '' ||
                video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.channel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.category?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter = filterType === 'all' ||
                video.category?.toLowerCase() === filterType.toLowerCase();

            return matchesSearch && matchesFilter;
        });
    }, [watchHistory, searchQuery, filterType]);

    // Load watch history with enhanced error handling and data validation
    useEffect(() => {
        const loadWatchHistory = async () => {
            try {
                const savedHistory = localStorage.getItem('watchHistory');
                if (savedHistory) {
                    const parsedHistory = JSON.parse(savedHistory);
                    if (validateWatchHistory(parsedHistory)) {
                        setWatchHistory(parsedHistory);
                    } else {
                        throw new Error('Invalid watch history format');
                    }
                } else {
                    const mockHistory = await generateMockWatchHistory();
                    localStorage.setItem('watchHistory', JSON.stringify(mockHistory));
                    setWatchHistory(mockHistory);
                }
            } catch (error) {
                console.error('Error loading watch history:', error);
                const mockHistory = await generateMockWatchHistory();
                localStorage.setItem('watchHistory', JSON.stringify(mockHistory));
                setWatchHistory(mockHistory);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(loadWatchHistory, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Validate watch history data structure
    const validateWatchHistory = (history: any): boolean => {
        if (!Array.isArray(history)) return false;
        return history.every(session => {
            return (
                typeof session.date === 'string' &&
                Array.isArray(session.videos) &&
                session.videos.every((video: any) =>
                    typeof video.id === 'number' &&
                    typeof video.title === 'string' &&
                    typeof video.views === 'string' &&
                    typeof video.duration === 'string'
                )
            );
        });
    };

    // Enhanced mock data generation with AI metrics
    const generateMockWatchHistory = async (): Promise<WatchSession[]> => {
        const categories = ['Technology', 'Entertainment', 'Education', 'Gaming', 'Science'];
        const topicClusters = ['Web Development', 'Machine Learning', 'Data Science', 'UI/UX', 'Cloud Computing'];

        const mockVideos: Video[] = Array(10).fill(null).map((_, index) => ({
            id: index + 1,
            title: `Next-Gen Tech Tutorial ${index + 1}`,
            channel: `FutureChannel${index}`,
            views: `${Math.floor(Math.random() * 100)}K views`,
            duration: `${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
            timestamp: `${Math.floor(Math.random() * 24)} hours ago`,
            thumbnail: `/api/placeholder/320/180`,
            category: categories[Math.floor(Math.random() * categories.length)],
            description: `AI-optimized learning content for ${topicClusters[Math.floor(Math.random() * topicClusters.length)]}`,
            watchProgress: Math.floor(Math.random() * 100),
            aiTags: ['AI', 'Future', 'Technology'].sort(() => Math.random() - 0.5).slice(0, 2),
            sentiment: Math.random(),
            engagementScore: Math.random() * 100,
            aiInsights: {
                contentQuality: Math.random() * 100,
                relevance: Math.random() * 100,
                learningValue: Math.random() * 100,
                recommendationStrength: Math.random() * 100
            },
            predictedWatchTime: `${Math.floor(Math.random() * 30)} mins`,
            similarVideos: Array(3).fill(null).map(() => Math.floor(Math.random() * 100)),
            topicCluster: topicClusters[Math.floor(Math.random() * topicClusters.length)]
        }));

        return [{
            date: new Date().toISOString(),
            videos: mockVideos,
            aiMetrics: {
                focusScore: Math.random() * 100,
                learningEfficiency: Math.random() * 100,
                topicDiversity: Math.random() * 100,
                watchTimeOptimization: Math.random() * 100
            }
        }];
    };

    // Enhanced AI insights generation
    const generateAiInsights = () => {
        const allVideos = watchHistory.flatMap(session => session.videos);

        // Advanced category analysis
        const categoryAnalysis = new Map<string, {
            count: number;
            engagementTotal: number;
            watchTime: number;
            learningValue: number;
        }>();

        allVideos.forEach(video => {
            if (video.category) {
                const current = categoryAnalysis.get(video.category) || {
                    count: 0,
                    engagementTotal: 0,
                    watchTime: 0,
                    learningValue: 0
                };

                categoryAnalysis.set(video.category, {
                    count: current.count + 1,
                    engagementTotal: current.engagementTotal + (video.engagementScore || 0),
                    watchTime: current.watchTime + (video.watchProgress || 0),
                    learningValue: current.learningValue + (video.aiInsights?.learningValue || 0)
                });
            }
        });

        // Generate comprehensive insights
        const topCategories = Array.from(categoryAnalysis.entries())
            .sort(([, a], [, b]) => b.count - a.count)
            .slice(0, 3)
            .map(([category]) => category);

        const watchTimeDistribution = {
            morning: Math.random() * 100,
            afternoon: Math.random() * 100,
            evening: Math.random() * 100,
            night: Math.random() * 100,
        };

        const engagementTrends = Array.from(categoryAnalysis.entries())
            .map(([category, data]) => ({
                category,
                score: data.engagementTotal / data.count
            }))
            .sort((a, b) => b.score - a.score);

        const learningProgress = Array.from(categoryAnalysis.entries())
            .map(([category, data]) => ({
                topic: category,
                progress: (data.learningValue / data.count)
            }))
            .sort((a, b) => b.progress - a.progress);

        setAiInsights({
            topCategories,
            watchTimeDistribution,
            engagementTrends,
            learningProgress,
            predictedInterests: generatePredictedInterests(categoryAnalysis),
            focusMetrics: generateFocusMetrics()
        });
    };

    // Generate predicted interests based on watch patterns
    const generatePredictedInterests = (categoryAnalysis: Map<string, any>): string[] => {
        const relatedTopics = new Map<string, number>();

        categoryAnalysis.forEach((data, category) => {
            const relatedToCategory = [
                'Advanced ' + category,
                category + ' Projects',
                category + ' Research',
                'Applied ' + category
            ];

            relatedToCategory.forEach(topic => {
                relatedTopics.set(topic, (relatedTopics.get(topic) || 0) + data.engagementTotal);
            });
        });

        return Array.from(relatedTopics.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([topic]) => topic);
    };

    // Generate focus metrics throughout the day
    const generateFocusMetrics = (): { time: string; score: number }[] => {
        const times = ['Morning', 'Afternoon', 'Evening', 'Night'];
        return times.map(time => ({
            time,
            score: Math.random() * 100
        }));
    };

    // Enhanced video card component with AI insights
    const VideoCard = ({ video }: { video: Video }) => (
        <Card className="p-4 bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 backdrop-blur-lg group">
            <div className="flex gap-4">
                <div className="relative group">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-64 h-36 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${video.watchProgress}%` }}
                        />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-sm backdrop-blur-sm">
                        {video.duration}
                    </div>
                    <div className="absolute top-2 right-2 bg-purple-600/80 px-2 py-1 rounded-full text-sm backdrop-blur-sm flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        {video.aiInsights?.contentQuality.toFixed(0)}% Quality
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
                            {video.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="px-2 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full text-sm backdrop-blur-sm">
                                            {video.engagementScore?.toFixed(1)}% engagement
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>AI-calculated engagement score</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-800/90 border-gray-700 backdrop-blur-lg">
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Activity className="w-4 h-4" />
                                        View Learning Impact
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Brain className="w-4 h-4" />
                                        Similar Content
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{video.channel}</p>
                    <p className="text-gray-400 text-sm">{video.views} • {video.timestamp}</p>

                    {/* AI Insights Bar */}
                    <div className="mt-2 grid grid-cols-4 gap-2 bg-gray-900/30 p-2 rounded-lg backdrop-blur-sm">
                        <div className="text-xs">
                            <div className="text-purple-400">Quality</div>
                            <div className="font-medium">{video.aiInsights?.contentQuality.toFixed(0)}%</div>
                        </div>
                        <div className="text-xs">
                            <div className="text-purple-400">Relevance</div>
                            <div className="font-medium">{video.aiInsights?.relevance.toFixed(0)}%</div>
                        </div>
                        <div className="text-xs">
                            <div className="text-purple-400">Learning Value</div>
                            <div className="font-medium">{video.aiInsights?.learningValue.toFixed(0)}%</div>
                        </div>
                        <div className="text-xs">
                            <div className="text-purple-400">Match</div>
                            <div className="font-medium">{video.aiInsights?.recommendationStrength.toFixed(0)}%</div>
                        </div>
                    </div>

                    <div className="mt-2 flex gap-2">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                            <Tag className="w-3 h-3" />
                            {video.category}
                        </span>
                        {video.aiTags?.map((tag, index) => (
                            <span key={index} className="inline-flex items-center gap-1 bg-blue-600/30 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                                <Brain className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                        <span className="inline-flex items-center gap-1 bg-green-600/30 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                            <Clock className="w-3 h-3" />
                            {video.predictedWatchTime}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );

    // Enhanced insights panel with more AI metrics
    const InsightsPanel = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-gray-800/30 border-gray-700 backdrop-blur-lg hover:bg-gray-800/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold">Learning Analytics</h3>
                </div>
                <div className="space-y-2">
                    {aiInsights.learningProgress.slice(0, 3).map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">{item.topic}</span>
                                <span className="text-purple-400">{item.progress.toFixed(0)}%</span>
                            </div>
                            <Progress value={item.progress} className="h-2 bg-gray-700">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                            </Progress>
                        </div>
                    ))}
                </div>
            </Card>
            
            <Card className="p-4 bg-gray-800/30 border-gray-700 backdrop-blur-lg hover:bg-gray-800/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold">Focus Metrics</h3>
                </div>
                <div className="space-y-2">
                    {aiInsights.focusMetrics.map((metric, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">{metric.time}</span>
                                <span className="text-purple-400">{metric.score.toFixed(0)}%</span>
                            </div>
                            <Progress value={metric.score} className="h-2 bg-gray-700">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                            </Progress>
                        </div>
                    ))}
                </div>
            </Card>
            
            <Card className="p-4 bg-gray-800/30 border-gray-700 backdrop-blur-lg hover:bg-gray-800/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold">Predicted Interests</h3>
                </div>
                <div className="space-y-2">
                    {aiInsights.predictedInterests.map((interest, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200">
                            <span className="text-sm text-gray-300">{interest}</span>
                            <ArrowUpRight className="w-4 h-4 text-purple-400" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );

    // Enhanced search with AI suggestions
    const SearchBar = () => (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
                placeholder="Search with AI assistance..."
                className="pl-10 w-64 bg-gray-800/50 border-gray-700 focus:border-purple-500 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <div className="absolute top-full mt-2 w-full bg-gray-800/90 border border-gray-700 rounded-lg backdrop-blur-lg p-2 space-y-1">
                    <div className="text-xs text-purple-400 mb-2">AI Suggestions</div>
                    {['Related Videos', 'Similar Topics', 'Learning Paths'].map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700/50 cursor-pointer"
                        >
                            <Brain className="w-3 h-3 text-purple-400" />
                            <span className="text-sm">{suggestion}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-black text-white">
                <div className="max-w-7xl mx-auto pt-32 px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full" />
                                </div>
                                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                    AI Watch History
                                </h1>
                            </div>
                            <div className="flex gap-4">
                                <SearchBar />
                            </div>
                        </div>

                        {/* AI Insights Panel */}
                        <InsightsPanel />

                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <Select value={selectedDate} onValueChange={setSelectedDate}>
                                    <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700">
                                        <SelectValue placeholder="Select date" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="yesterday">Yesterday</SelectItem>
                                        <SelectItem value="week">This week</SelectItem>
                                        <SelectItem value="month">This month</SelectItem>
                                    </SelectContent>
                                </Select>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="bg-gray-800/50 border-gray-700">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filters
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-gray-800 border-gray-700">
                                        <DropdownMenuItem onClick={() => setFilterType('all')}>
                                            All types
                                        </DropdownMenuItem>
                                        {aiInsights.topCategories.map((category, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                onClick={() => setFilterType(category.toLowerCase())}
                                            >
                                                {category}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex gap-4 items-center">
                                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive" className="bg-red-500/20 hover:bg-red-500/30">
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Clear history
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-800/90 border-gray-700 backdrop-blur-lg">
                                        <DialogHeader>
                                            <DialogTitle>Clear watch history?</DialogTitle>
                                            <DialogDescription>
                                                This will remove all videos and AI insights from your watch history. This action cannot be undone.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end gap-4">
                                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                                Cancel
                                            </Button>
                                            <Button variant="destructive" onClick={clearWatchHistory}>
                                                Clear
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-12">
                        {/* Videos Section */}
                        {(filterType === 'all' || filteredVideos.length > 0) && (
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                    <h2 className="text-2xl font-semibold">
                                        {selectedDate.charAt(0).toUpperCase() + selectedDate.slice(1)}
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    {isLoading ? (
                                        Array(3).fill(0).map((_, i) => (
                                            <Card key={i} className="p-4 bg-gray-800/50 border-gray-700">
                                                <div className="flex gap-4">
                                                    <Skeleton className="w-64 h-36 rounded-lg bg-gray-700/50" />
                                                    <div className="flex-1">
                                                        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700/50" />
                                                        <Skeleton className="h-4 w-1/2 mb-2 bg-gray-700/50" />
                                                        <Skeleton className="h-4 w-1/3 bg-gray-700/50" />
                                                        <div className="flex gap-2 mt-2">
                                                            <Skeleton className="h-6 w-20 rounded-full bg-gray-700/50" />
                                                            <Skeleton className="h-6 w-20 rounded-full bg-gray-700/50" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        filteredVideos.map(video => (
                                            <VideoCard key={video.id} video={video} />
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* No Results Message */}
                        {!isLoading && searchQuery && filteredVideos.length === 0 && (
                            <div className="text-center py-12">
                                <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
                                <h3 className="text-xl font-semibold mb-2">No matching content found</h3>
                                <p className="text-gray-400">
                                    Try adjusting your search terms or filters
                                </p>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && !searchQuery && watchHistory.length === 0 && (
                            <div className="text-center py-12">
                                <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                                <h3 className="text-xl font-semibold mb-2">Your AI-enhanced watch history is empty</h3>
                                <p className="text-gray-400">
                                    Watch videos to start generating personalized insights and recommendations
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Floating AI Assistant Button */}
                    <div className="fixed bottom-8 right-8">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                                        onClick={() => {
                                            // TODO: Implement AI assistant functionality
                                        }}
                                    >
                                        <Brain className="w-6 h-6" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ask AI Assistant</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WatchHistory;