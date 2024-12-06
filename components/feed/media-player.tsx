"use client";

import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { Media } from "@/types/types";

interface MediaPlayerProps {
  media: Media;
}

export default function MediaPlayer({ media }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (mediaRef.current) {
      if (inView && !isPlaying && (media.type === "video" || media.type === "audio")) {
        mediaRef.current.play().catch(() => {
          // Handle autoplay failure silently
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else if (!inView && isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [inView, isPlaying, media.type]);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      const progress = (mediaRef.current.currentTime / mediaRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (value: number[]) => {
    if (mediaRef.current) {
      const time = (value[0] / 100) * mediaRef.current.duration;
      mediaRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  if (media.type === "image") {
    if (imageError) {
      return (
        <div className="relative aspect-video bg-muted flex items-center justify-center rounded-md">
          <p className="text-muted-foreground">Image unavailable</p>
        </div>
      );
    }

    return (
      <div className="relative aspect-video">
        <Image
          src={media.url}
          alt=""
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageError(true)}
          priority
        />
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div ref={ref} className="relative aspect-video">
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={media.url}
          className="w-full rounded-md"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          loop
          playsInline
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="ghost" onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button size="icon" variant="ghost" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <div className="flex-1">
              <Slider
                value={[progress]}
                onValueChange={handleSeek}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (media.type === "audio") {
    return (
      <div ref={ref} className="bg-muted p-4 rounded-md">
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost" onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <div className="flex-1">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={1}
            />
          </div>
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={media.url}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
      </div>
    );
  }

  return null;
}