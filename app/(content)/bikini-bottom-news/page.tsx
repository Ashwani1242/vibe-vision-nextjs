'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { cn } from "../../../lib/utils";

// shadcn/ui components
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../../components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { Slider } from "../../../components/ui/slider";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Progress } from "../../../components/ui/progress";
import { Label } from "../../../components/ui/label";

// Lucide Icons
import {
    Trash2,
    Upload,
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
    RefreshCw,
    HelpCircle,
} from 'lucide-react';
import { BASE_URL } from '@/config';

import { Layout } from '@/components/layout/layout';
import MessageToast from '@/components/ui/MessageToast';
import { getToken } from '@/lib/token-manager';
import { getCurrentUser } from '@/lib/auth-service';
import { getTokenPayload } from '@/lib/token-manager';
import { getCurrentUserContent } from '@/lib/content-service';
import MyGenerations from '@/components/ui/bikini-bottom-news/my-generations';

// Bubble Animation Component
const BubbleBackground = () => {
    const bubbleCount = 50;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
            {[...Array(bubbleCount)].map((_, index) => {
                const size = Math.random() * 40 + 10;
                const delay = Math.random() * 10;
                const duration = Math.random() * 10 + 10;
                const left = Math.random() * 100;

                return (
                    <div
                        key={index}
                        className="absolute bg-white/20 rounded-full animate-bubble-up"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${left}%`,
                            bottom: '-50px', // Start from bottom
                            animationDelay: `${delay}s`,
                            animationDuration: `${duration}s`,
                        }}
                    />
                );
            })}
        </div>
    );
};

const AnimatedOceanBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden animate-gradient-ocean">
            <div className="absolute inset-0 bg-gradient-to-br 
                from-[#4F42B4] 
                via-[#4E5BAD] 
                to-[#4C74A6] 
                animate-gradient-shift 
                opacity-70">
            </div>
            <div className="absolute inset-0 bg-gradient-to-bl 
                from-[#4B8DA0] 
                via-[#49A39A] 
                to-[#4F42B4] 
                animate-gradient-shift-reverse 
                opacity-50 mix-blend-overlay">
            </div>
        </div>
    );
};

interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
}

const DEFAULT_NEWS_DURATION = 30;

export default function BikiniBottomNewsPage() {
    // State Management
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [newsScript, setNewsScript] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [isVideoGenerated, setIsVideoGenerated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [pdfName, setPdfName] = useState<string | null>(null);
    const [alert, setAlert] = useState({ show: false, message: '', variant: 'default' });
    const [settings, setSettings] = useState({
        duration: DEFAULT_NEWS_DURATION,
        subtitleColor: '#ffffff',
        subtitleSize: 24,
        roastStyle: 'funny'
    });

    const [toastVisible, setToastVisible] = useState(false);
    const [data, setData] = useState<ContentItem[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const filteredData = data
        .filter((dataItem) => dataItem.contentType === "roast-my-pic")
        .reverse();

    const showToast = () => {
        setToastVisible(true);
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;

        try {
            const resizedImage = await resizeImage(file, 800, 800);
            const resizedImageUrl = URL.createObjectURL(resizedImage);
            setImageName(resizedImage.name);
            setSelectedImage(resizedImageUrl);
            setImageFile(resizedImage);

            setError(null);
            showAlert(`Added ${resizedImage.name}!`, 'default');
        } catch (error) {
            console.error("Error resizing image:", error);
            setError("Failed to process image. Please try again.");
        }
    };

    const handlePdfUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedPdf(file.name);
            setPdfFile(file);
            setPdfName(file.name);
            showAlert(`Added ${file.name}!`, 'default');
        }
    };

    const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    if (!ctx) return reject("Failed to get canvas context");

                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        const aspectRatio = width / height;
                        if (width > height) {
                            width = maxWidth;
                            height = maxWidth / aspectRatio;
                        } else {
                            height = maxHeight;
                            width = maxHeight * aspectRatio;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            if (!blob) return reject("Failed to convert canvas to blob");
                            const resizedFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                            });
                            resolve(resizedFile);
                        },
                        file.type,
                        0.8
                    );
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleGenerate = async () => {
        let currentTime = Date.now();
        const token = getToken() || null;
        const tokenPayload = getTokenPayload(token)
        const currentUserInfo = await getCurrentUser(tokenPayload?._id || '', token || '')
        const loggedInUser = currentUserInfo?.name || 'SpongeBob Reporter';

        if (!imageFile && !pdfFile) {
            showAlert('Please upload an image or PDF before submitting.')
            return;
        }

        setIsLoading(true);
        const formData = new FormData();

        // Append either image or PDF
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (pdfFile) {
            formData.append('pdf', pdfFile);
        }

        formData.append('time', String(currentTime));
        formData.append('style', settings.roastStyle);
        formData.append('duration', String(settings.duration));
        formData.append('userName', String(loggedInUser));

        try {

            fetchData()
            showToast()

            setIsVideoGenerated(true);
        } catch (error) {
            console.error('Error generating summary:', error);
            setError('An error occurred while generating the summary, audio, or video');
        } finally {
            setIsLoading(false);
        }
    };

    const showAlert = (message: string, variant = 'default') => {
        setAlert({ show: true, message, variant });
        setTimeout(() => setAlert({ show: false, message: '', variant: 'default' }), 3000);
    };

    const handleDeleteMedia = () => {
        setImageFile(null);
        setPdfFile(null);
        setSelectedImage(null);
        setSelectedPdf(null);
        setNewsScript('');
        setAudioBlob(null);
        setVideoUrl('');
        showAlert('Content cleared', 'default');
        setIsVideoGenerated(false)
    };

    const handleDownloadVideo = async () => {
        if (videoUrl) {
            try {
                const response = await axios.get(videoUrl, {
                    responseType: 'blob',
                });

                const blob = new Blob([response.data], { type: 'video/mp4' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'bikini-bottom-news-report.mp4';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error downloading video:", error);
            }
        }
    };

    const fetchData = async () => {
        setData([])

        const token = getToken() || null;
        const tokenPayload = getTokenPayload(token)

        const currentUserInfo = await getCurrentUser(tokenPayload?._id || '', token || '')
        const userContent = await getCurrentUserContent();

        setData(userContent || [])
        setCurrentUser(currentUserInfo)
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="fixed inset-0 bg-gradient-to-br animate-gradient-ocean z-0 opacity-70">
                {/* Optional additional layer for subtle texture/movement */}
                <div className="absolute inset-0 bg-gradient-to-br animate-gradient-ocean-overlay opacity-20"></div>
            </div>
            <BubbleBackground />
            <div className="min-h-screen bg-transparent p-6 md:p-16 pb-40 relative">
                {/* Simulated Bikini Bottom Skyline */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-[url('/image.png')] bg-cover bg-bottom opacity-50 z-0"></div>

                <div className="max-w-7xl mx-auto space-y-8 relative ">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                            🌊 Bikini Bottom News 🍍
                        </h1>
                        <p className="text-xl text-yellow-100 drop-shadow-md">
                            Your underwater source for breaking news and epic roasts!
                        </p>
                    </div>

                    {/* Main Content */}
                    <Card className="bg-white/20 backdrop-blur-lg border-yellow-500 border-2 shadow-2xl">
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left Side - Upload Form */}
                                <div className="relative">
                                    {isLoading && (
                                        <Progress value={progress} className="absolute top-0 z-10" />
                                    )}

                                    {selectedImage || selectedPdf ? (
                                        <div className="relative">
                                            {selectedImage && (
                                                <img
                                                    src={selectedImage || 'not found'}
                                                    alt="Uploaded content"
                                                    className="w-full h-64 border-2 border-yellow-500 object-contain rounded-lg"
                                                />
                                            )}
                                            {selectedPdf && (
                                                <div className="w-full h-64 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
                                                    <p className="text-white">📄 {pdfName}</p>
                                                </div>
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={handleDeleteMedia}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div
                                            className={cn(
                                                "h-full border-2 min-h-64 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer",
                                                "transition-colors hover:border-yellow-500",
                                                "border-yellow-500 bg-yellow-500/10"
                                            )}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*,application/pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        file.type.startsWith('image/')
                                                            ? handleImageUpload(e)
                                                            : handlePdfUpload(e);
                                                    }
                                                }}
                                                className="h-full w-full opacity-0 cursor-pointer absolute"
                                            />
                                            <Upload className="h-12 w-12 text-yellow-500 mb-4" />
                                            <p className="text-yellow-100">
                                                Upload Image or PDF for News Report
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-6 py-4">
                                        <div className="space-y-2">
                                            <Label className="text-white">Video Duration (seconds)</Label>
                                            <Slider
                                                value={[settings.duration]}
                                                onValueChange={([value]) =>
                                                    setSettings(prev => ({ ...prev, duration: value }))
                                                }
                                                max={60}
                                                min={10}
                                                step={5}
                                            />
                                            <p className="text-white text-sm">{settings.duration} seconds</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-white">News Style</Label>
                                            <Select
                                                value={settings.newsStyle}
                                                onValueChange={(value) =>
                                                    setSettings(prev => ({ ...prev, newsStyle: value }))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select News Style" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="spongebob">Funny</SelectItem>
                                                    <SelectItem value="patrick">Roast</SelectItem>
                                                    <SelectItem value="squidward">Sarcastic</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Button
                                            onClick={handleGenerate}
                                            disabled={isLoading || (!imageFile && !pdfFile)}
                                            className="w-full"
                                        >
                                            {isLoading ? (
                                                <><RefreshCw className="mr-2 animate-spin" /> Generating...</>
                                            ) : (
                                                "Generate Roast Video"
                                            )}
                                        </Button>

                                        {isVideoGenerated && (
                                            <div className="space-y-2">
                                                <Button
                                                    onClick={() => setShareDialogOpen(true)}
                                                    variant="secondary"
                                                    className="w-full"
                                                >
                                                    Share Video
                                                </Button>
                                                <Button
                                                    onClick={handleDownloadVideo}
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    Download Video
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Generations Section */}
                    <div className="mt-8">
                        <MyGenerations data={filteredData} />
                    </div>

                    {/* Alert */}
                    {alert.show && (
                        <Alert variant={alert.variant as any} className="fixed bottom-4 right-4 z-50">
                            <AlertDescription>{alert.message}</AlertDescription>
                        </Alert>
                    )}

                    {/* Share Dialog */}
                    <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Share Your Roast Video</DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-between space-x-4 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {/* Facebook share logic */ }}
                                >
                                    <Facebook className="mr-2" /> Facebook
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {/* Twitter share logic */ }}
                                >
                                    <Twitter className="mr-2" /> Twitter
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {/* LinkedIn share logic */ }}
                                >
                                    <Linkedin className="mr-2" /> LinkedIn
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {/* YouTube share logic */ }}
                                >
                                    <Youtube className="mr-2" /> YouTube
                                </Button>
                            </div>
                            <DialogFooter>
                                <Button variant="secondary" onClick={() => setShareDialogOpen(false)}>
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Toast Notification */}
                <MessageToast
                    visible={toastVisible}
                    message="Video roast generated successfully!"
                    onClose={() => setToastVisible(false)}
                />
            </div>
        </Layout>
    );
}