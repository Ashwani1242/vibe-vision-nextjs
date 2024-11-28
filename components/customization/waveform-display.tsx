"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RepeatIcon, 
  Volume2, 
  VolumeX, 
  Download,
  AlertTriangle,
  WaveformIcon
} from "lucide-react";
import { toast } from "@/components/ui/toast";

interface WaveformDisplayProps {
  audioUrl?: string;
  title?: string;
  waveColor?: string;
  progressColor?: string;
  backgroundColor?: string;
  onPlaybackError?: (error: Error) => void;
  onDownloadError?: (error: Error) => void;
}

export const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ 
  audioUrl, 
  title = 'Audio Player',
  waveColor = 'rgba(100, 149, 237, 0.5)',
  progressColor = 'rgba(65, 105, 225, 0.8)',
  backgroundColor = 'rgba(240, 248, 255, 0.3)',
  onPlaybackError,
  onDownloadError
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [peakData, setPeakData] = useState<number[]>([]);

  const initWaveSurfer = useCallback(async () => {
    if (!waveformRef.current || !audioUrl) return;

    setIsLoading(true);

    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    try {
      const ws = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: waveColor,
        progressColor: progressColor,
        backgroundColor: backgroundColor,
        cursorColor: 'rgba(255,255,255,0.5)',
        barWidth: 3,
        barRadius: 4,
        cursorWidth: 1,
        height: 120,
        barGap: 2,
        responsive: true,
        backend: 'WebAudio',
        normalize: true,
        minPxPerSec: 60,
        fillParent: true,
        partialRender: true,
      });

      ws.on('finish', () => {
        if (isLooping) {
          ws.play();
        } else {
          setIsPlaying(false);
        }
      });

      ws.on('play', () => setIsPlaying(true));
      ws.on('pause', () => setIsPlaying(false));

      ws.on('audioprocess', () => {
        setCurrentTime(ws.getCurrentTime());
      });

      ws.on('ready', () => {
        const duration = ws.getDuration();
        setDuration(duration);
        setIsLoading(false);

        // Fetch waveform peak data
        ws.exportPCM(duration, 100, true).then((peaks) => {
          setPeakData(peaks);
        });
      });

      ws.on('error', (error) => {
        setIsLoading(false);
        onPlaybackError?.(error);
        toast({
          title: "Playback Error",
          description: "Unable to load or play audio",
          variant: "destructive",
          icon: <AlertTriangle />
        });
      });

      await ws.load(audioUrl);
      wavesurfer.current = ws;
    } catch (error) {
      setIsLoading(false);
      onPlaybackError?.(error as Error);
      console.error('Error initializing WaveSurfer:', error);
    }
  }, [audioUrl, isLooping, waveColor, progressColor, backgroundColor, onPlaybackError]);

  useEffect(() => {
    initWaveSurfer();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [initWaveSurfer]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(isMuted ? 0 : volume / 100);
    }
  }, [volume, isMuted]);

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
    toast({
      title: `Looping ${isLooping ? 'Disabled' : 'Enabled'}`,
      description: `Audio will ${isLooping ? 'stop' : 'repeat'} after playback`,
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (value: number[]) => {
    if (wavesurfer.current) {
      const seekTime = (value[0] / 100) * duration;
      wavesurfer.current.seekTo(seekTime / duration);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = async () => {
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `audio_${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "Audio file is downloading",
      });
    } catch (error) {
      onDownloadError?.(error as Error);
      toast({
        title: "Download Failed",
        description: "Unable to download audio file",
        variant: "destructive",
        icon: <AlertTriangle />
      });
      console.error('Download failed:', error);
    }
  };

  if (!audioUrl) return null;

  return (
    <Card className="shadow-2xl border-none max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          {title}
        </CardTitle>
        <WaveformIcon className="text-blue-500 h-6 w-6" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32 animate-pulse">
            <div className="bg-gray-200 w-full h-full rounded-lg"></div>
          </div>
        ) : (
          <>
            <div ref={waveformRef} className="mb-4" />
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-muted-foreground font-mono">
                {formatTime(currentTime)}
              </span>
              <Slider 
                value={[(currentTime / duration) * 100]} 
                onValueChange={handleSeek}
                max={100} 
                step={1} 
                className="flex-grow" 
                trackClassName="bg-gradient-to-r from-blue-200 to-cyan-200"
              />
              <span className="text-sm text-muted-foreground font-mono">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-blue-50 transition-all" 
                onClick={handleRestart}
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4 text-blue-500" />
              </Button>
              <Button 
                size="icon" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all" 
                onClick={togglePlayPause}
                disabled={isLoading}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant={isLooping ? "default" : "outline"} 
                size="icon" 
                className={`${
                  isLooping 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                    : 'hover:bg-blue-50'
                } transition-all`}
                onClick={toggleLoop}
              >
                <RepeatIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-blue-50 transition-all" 
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-500" />
                ) : (
                  <Volume2 className="h-4 w-4 text-blue-500" />
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="hover:bg-blue-50 transition-all" 
                onClick={handleDownload}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 text-blue-500" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Volume2 className="h-4 w-4 text-blue-500" />
              <Slider 
                value={[volume]} 
                onValueChange={(val) => setVolume(val[0])}
                max={100} 
                step={1} 
                trackClassName="bg-gradient-to-r from-blue-200 to-cyan-200"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default WaveformDisplay;