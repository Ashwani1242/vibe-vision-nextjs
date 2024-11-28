"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlayIcon, 
  PauseIcon, 
  RefreshCcwIcon, 
  RepeatIcon, 
  VolumeXIcon, 
  Volume2Icon 
} from "lucide-react";

export function WaveformDisplay({ 
  audioUrl, 
  peakData 
}: { 
  audioUrl?: string, 
  peakData?: number[] 
}) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    const initWaveSurfer = async () => {
      // Destroy existing wavesurfer instance if any
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      // Create wavesurfer instance with enhanced styling
      const ws = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: 'rgba(102, 126, 234, 0.5)', // Softer, more vibrant blue
        progressColor: 'rgba(102, 126, 234, 0.8)', // Deeper blue for progress
        cursorColor: 'rgba(255, 99, 132, 1)', // Accent color for cursor
        barWidth: 3,
        barRadius: 4,
        cursorWidth: 2,
        height: 150, // Slightly taller
        barGap: 2,
        responsive: true,
        normalize: true, // Normalize wave height
        backend: 'WebAudio', // More precise audio processing
      });

      // Handle audio playback events
      ws.on('finish', () => {
        if (isLooping) {
          ws.play();
        } else {
          setIsPlaying(false);
        }
      });

      ws.on('play', () => setIsPlaying(true));
      ws.on('pause', () => setIsPlaying(false));

      // Load peaks if provided for faster rendering
      if (peakData && peakData.length) {
        ws.load(audioUrl, peakData);
      } else {
        try {
          await ws.load(audioUrl);
        } catch (error) {
          console.error('Error loading audio:', error);
        }
      }

      wavesurfer.current = ws;
    };

    initWaveSurfer();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioUrl, isLooping, peakData]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const handleRestart = () => {
    if (wavesurfer.current) {
      wavesurfer.current.stop();
      wavesurfer.current.play();
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const toggleMute = () => {
    if (wavesurfer.current) {
      const isMutedNow = !isMuted;
      wavesurfer.current.setMute(isMutedNow);
      setIsMuted(isMutedNow);
    }
  };

  if (!audioUrl) return null;

  return (
    <Card className="max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Audio Waveform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={waveformRef} 
          className="mb-6 bg-gray-50 rounded-lg p-2 shadow-inner"
        />
        <div className="flex justify-center items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRestart}
            className="hover:bg-blue-50"
            title="Restart"
          >
            <RefreshCcwIcon className="h-5 w-5 text-blue-600" />
          </Button>
          <Button 
            size="icon" 
            onClick={togglePlayPause}
            className="hover:bg-blue-100"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6 text-blue-700" />
            ) : (
              <PlayIcon className="h-6 w-6 text-blue-700" />
            )}
          </Button>
          <Button 
            variant={isLooping ? "default" : "outline"} 
            size="icon" 
            onClick={toggleLoop}
            title="Toggle Loop"
          >
            <RepeatIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMute}
            className="hover:bg-red-50"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeXIcon className="h-5 w-5 text-red-600" />
            ) : (
              <Volume2Icon className="h-5 w-5 text-blue-600" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}