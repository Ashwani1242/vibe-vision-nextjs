"use client";

import { useState } from "react";
import { Upload, Music, Loader2, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { processAudioWithFFmpeg } from "@/lib/ffmpeg";
import { motion } from "framer-motion";
import { WaveVisualizer } from "./customization/waveform-display";
import { Input } from "./ui/input";

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [error, setError] = useState<string>();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      await processAudio(file);
    }
  };


  const processAudio = async (file: File) => {
    setIsUploading(true);
    setError(undefined);
    try {
      const processedAudioUrl = await processAudioWithFFmpeg(file);
      setAudioUrl(processedAudioUrl);
    } catch (error) {
      setError('Error processing audio. Please try again.');
      console.error('Error processing audio:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      await processAudio(file);
    }
  };

  const handleUrlSubmit = async () => {
    setError(undefined);
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const file = new File([blob], 'song.mp3', { type: 'audio/mpeg' });
      await processAudio(file);
    } catch (error) {
      setError('Invalid URL or network error. Please check the link.');
      console.error('URL processing error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Track</CardTitle>
          <CardDescription>
            Drag and drop your audio file or click to browse. We support MP3, WAV,
            and FLAC formats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">
                  Processing your track...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <Music className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div className="space-y-2">
                    <p>Drop your audio file here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      MP3, WAV, or FLAC up to 50MB
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <label>
                      <input
                        type="file"
                        className="hidden"
                        accept="audio/*"
                        onChange={handleFileSelect}
                      />
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </span>
                      </Button>
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Paste audio URL"
                        value={audioUrl}
                        onChange={(e) => setAudioUrl(e.target.value)}
                        className="w-full sm:w-64"
                      />
                      {audioUrl && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleUrlSubmit}
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
            )}
          </div>
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          {audioUrl && <WaveVisualizer audioUrl={audioUrl} />}
        </CardContent>
      </Card>
    </motion.div>
  );
}