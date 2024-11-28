import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FaPlay, 
  FaPause, 
  FaRedo, 
  FaSync, 
  FaDownload, 
  FaVolumeUp, 
  FaVolumeMute 
} from "react-icons/fa";
import { MdLoop } from "react-icons/md";

interface WaveformDisplayProps {
  audioUrl?: string;
  peakData?: number[]; 
}

export function WaveformDisplay({ 
  audioUrl, 
  peakData 
}: WaveformDisplayProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const [peakValues, setPeakValues] = useState<number[]>(peakData || []);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    const initWaveSurfer = async () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      const ws = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: '#4a90e2', // Cool blue color
        progressColor: '#2c3e50', // Dark blue-gray
        cursorColor: '#e74c3c', // Vibrant red
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 128,
        barGap: 3,
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

      try {
        await ws.load(audioUrl);
        wavesurfer.current = ws;
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    initWaveSurfer();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioUrl, isLooping]);

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

  const toggleVolume = () => {
    if (wavesurfer.current) {
      const newVolume = volume === 0 ? 1 : 0;
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume);
    }
  };

  const handleDownload = () => {
    if (wavesurfer.current && audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'audio.mp3';
      link.click();
    }
  };

  if (!audioUrl) return null;

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Audio Waveform Player</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={waveformRef} className="mb-4" />
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRestart}
            title="Restart"
          >
            <FaRedo className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <FaPause className="h-5 w-5" />
            ) : (
              <FaPlay className="h-5 w-5" />
            )}
          </Button>
          <Button 
            variant={isLooping ? "default" : "outline"} 
            size="icon" 
            onClick={toggleLoop}
            title="Loop"
          >
            <MdLoop className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleVolume}
            title={volume === 0 ? "Unmute" : "Mute"}
          >
            {volume === 0 ? (
              <FaVolumeMute className="h-5 w-5" />
            ) : (
              <FaVolumeUp className="h-5 w-5" />
            )}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleDownload}
            title="Download"
          >
            <FaDownload className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}