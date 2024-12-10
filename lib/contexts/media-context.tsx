"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Media } from "@/lib/types";

interface MediaContextType {
  currentMedia: Media | null;
  isPlaying: boolean;
  play: (media: Media) => void;
  pause: () => void;
  stop: () => void;
}

const MediaContext = createContext<MediaContextType>({
  currentMedia: null,
  isPlaying: false,
  play: () => {},
  pause: () => {},
  stop: () => {},
});

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((media: Media) => {
    if (currentMedia?.url === media.url) {
      setIsPlaying(true);
    } else {
      setCurrentMedia(media);
      setIsPlaying(true);
    }
  }, [currentMedia]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    setCurrentMedia(null);
    setIsPlaying(false);
  }, []);

  return (
    <MediaContext.Provider value={{ currentMedia, isPlaying, play, pause, stop }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
}