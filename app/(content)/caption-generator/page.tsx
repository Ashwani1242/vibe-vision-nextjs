"use client";

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast';
import {
  CloudIcon,
  RefreshCcw,
  Copy,
  HelpCircle,
  Wand2,
  Share2,
  Settings2,
  Aperture,
  ImageIcon,
} from "lucide-react";
import { Layout } from '@/components/layout/layout';
import { SparklesCore } from '@/components/ui/sparkles';
import { Progress } from "@/components/ui/progress";

// Interfaces and Configurations
interface Platform {
  maxLength: number;
  hashtagLimit: number;
}

interface Platforms {
  [key: string]: Platform;
}

interface ToneOption {
  value: string;
  label: string;
  icon: string;
}

const platforms: Platforms = {
  instagram: { maxLength: 2200, hashtagLimit: 30 },
  twitter: { maxLength: 280, hashtagLimit: 5 },
  facebook: { maxLength: 63206, hashtagLimit: 10 },
  linkedin: { maxLength: 3000, hashtagLimit: 15 }
};

const toneOptions: ToneOption[] = [
  { value: 'professional', label: 'Professional', icon: '👔' },
  { value: 'casual', label: 'Casual', icon: '😊' },
  { value: 'humorous', label: 'Humorous', icon: '😄' },
  { value: 'formal', label: 'Formal', icon: '📜' },
  { value: 'creative', label: 'Creative', icon: '🎨' },
  { value: 'inspirational', label: 'Inspirational', icon: '✨' },
  { value: 'technical', label: 'Technical', icon: '💻' },
  { value: 'storytelling', label: 'Storytelling', icon: '📚' }
];

export default function CaptionGenerator() {
  // State variables
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPlatform, setPlatform] = useState<string>('instagram');
  const [tone, setTone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hashtagCount, setHashtagCount] = useState<number>(10);
  const [captionLength, setCaptionLength] = useState<string>('medium');
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [imageAnalysis, setImageAnalysis] = useState<string | null>(null);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

  const { toast } = useToast();

  // File upload handler
  const handleFileUpload = useCallback((file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setImageAnalysis(null);
      setGeneratedCaptions([]);
      setGeneratedHashtags([]);
    };
    reader.readAsDataURL(file);
  }, []);

  // Image analysis and content generation handler
  const generateContent = async () => {
    if (!image || !tone) {
      toast({
        title: "Error",
        description: "Please upload an image and select a tone",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setProgress(20);

    try {
      // Create form data to send to backend
      const formData = new FormData();
      formData.append('image', image);
      formData.append('platform', selectedPlatform);
      formData.append('tone', tone);
      formData.append('description', description);
      formData.append('numberOfHashtags', hashtagCount.toString());
      formData.append('captionLength', captionLength);

      // Send request to backend for image analysis and content generation
      const response = await axios.post('/api/generate-content', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      // Update state with generated content
      if (response.data.imageAnalysis) {
        setImageAnalysis(response.data.imageAnalysis);
      }

      if (response.data.captions) {
        setGeneratedCaptions(response.data.captions);
      }

      if (response.data.hashtags) {
        setGeneratedHashtags(response.data.hashtags);
      }

      setProgress(100);
      toast({
        title: "Success",
        description: "Content generated successfully!",
      });
    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      });
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // Copy content handler
  const handleCopyContent = useCallback((content: string | null, type: 'captions' | 'hashtags' = 'captions') => {
    let textToCopy = content;

    if (!textToCopy && type === 'hashtags') {
      // Copy all hashtags
      textToCopy = generatedHashtags
        .slice(0, hashtagCount)
        .map(tag => `#${tag}`)
        .join(' ');
    }

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        toast({
          title: "Copied",
          description: `${type === 'captions' ? 'Caption' : 'Hashtags'} copied to clipboard`,
        });
      }).catch(err => {
        toast({
          title: "Error",
          description: "Failed to copy",
          variant: "destructive"
        });
      });
    }
  }, [generatedHashtags, hashtagCount, toast]);

  // Main render
  return (
    <Layout>
      {/* SparklesCore background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="caption-generator-sparkles"
          background="purple"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={300}
          particleColor="#FFFFFF"
        />
      </div>

      <div className="min-h-screen py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
            VibeVerse
            <Aperture className="ml-2 text-purple-400" />
            <Badge className='ml-3'>2.1 V</Badge>
          </h1>
          <p className="text-xl font-bold text-center mb-8 flex items-center justify-center">
            AI-Powered Social Media Content Creation
          </p>

          {/* File Upload Section */}
          <div className="mb-8 border-dashed border-2 border-violet-500 rounded-lg">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>

          {/* Image Preview and Analysis */}
          {imagePreview && (
            <div className="mb-8 flex flex-col items-center">
              <img
                src={imagePreview}
                alt="Upload Preview"
                className="max-w-xs max-h-64 rounded-lg shadow-md mb-4"
              />
              <Button
                onClick={generateContent}
                variant="outline"
                className="gap-2"
                disabled={loading}
              >
                <ImageIcon className="h-4 w-4" />
                Generate Content
              </Button>
              {imageAnalysis && (
                <Card className="mt-4 w-full">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">{imageAnalysis}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Progress Indicator */}
          {loading && (
            <div className="mb-4">
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Controls Section */}
          <Card className="mb-8">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select
                  value={selectedPlatform}
                  onValueChange={(value) => setPlatform(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(platforms).map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tone</Label>
                <Select
                  value={tone}
                  onValueChange={(value) => setTone(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="mr-2">{option.icon}</span>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Additional Context (optional)</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any specific details or context you'd like to include..."
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Number of Hashtags</Label>
                <Slider
                  value={[hashtagCount]}
                  onValueChange={(value) => setHashtagCount(value[0])}
                  min={5}
                  max={platforms[selectedPlatform].hashtagLimit}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5</span>
                  <span>{platforms[selectedPlatform].hashtagLimit}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <Dialog open={openSettings} onOpenChange={setOpenSettings}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Settings2 className="h-4 w-4" />
                      Advanced Settings
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Advanced Settings</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Caption Length</Label>
                        <RadioGroup
                          value={captionLength}
                          onValueChange={setCaptionLength}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="short" id="short" />
                            <Label htmlFor="short">Short</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="long" id="long" />
                            <Label htmlFor="long">Long</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={generateContent}
                  disabled={!image || !tone || loading}
                  className="gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCcw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {(generatedCaptions.length > 0 || generatedHashtags.length > 0) && (
            <div className="space-y-6">
              <Tabs defaultValue="captions">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="captions">Captions</TabsTrigger>
                  <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
                </TabsList>

                <TabsContent value="captions" className="space-y-4">
                  {generatedCaptions.map((caption, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <p className="mb-4">{caption}</p>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyContent(caption)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Share functionality
                            }}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="hashtags">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {generatedHashtags.slice(0, hashtagCount).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => handleCopyContent(`#${tag}`, 'hashtags')}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleCopyContent(null, 'hashtags')}
                        className="w-full gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy All Hashtags
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Platform Tips Card */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-400" />
                Platform Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {selectedPlatform === 'instagram' &&
                  'For maximum engagement on Instagram, use a mix of popular and niche hashtags. Consider adding hashtags in the first comment rather than the caption.'}
                {selectedPlatform === 'twitter' &&
                  'Twitter posts with 1-2 relevant hashtags tend to get more engagement than those with more. Place hashtags within the natural flow of your tweet when possible.'}
                {selectedPlatform === 'facebook' &&
                  'Facebook posts perform best with minimal hashtag usage. Focus on 1-2 highly relevant hashtags that align with your content.'}
                {selectedPlatform === 'linkedin' &&
                  'Use 3-5 relevant industry hashtags on LinkedIn. Include both broad industry terms and specific niche hashtags for better reach.'}
              </p>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    const content = generatedCaptions.join('\n\n') + '\n\n' +
                      generatedHashtags.slice(0, hashtagCount).map(tag => `#${tag}`).join(' ');
                    const blob = new Blob([content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'social-media-content.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                    toast({
                      title: "Success",
                      description: "Content saved as text file!",
                    });
                  }}
                >
                  <CloudIcon className="h-4 w-4" />
                  Save as Text File
                </Button>

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={async () => {
                    const content = generatedCaptions[0] + '\n\n' +
                      generatedHashtags.slice(0, hashtagCount).map(tag => `#${tag}`).join(' ');
                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: 'Generated Social Media Content',
                          text: content,
                        });
                        toast({
                          title: "Success",
                          description: "Content shared successfully!",
                        });
                      } else {
                        toast({
                          title: "Warning",
                          description: "Sharing is not supported on this device/browser",
                          variant: "default",
                        });
                      }
                    } catch (error) {
                      toast({
                        title: "Error",
                        description: "Error sharing content",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
