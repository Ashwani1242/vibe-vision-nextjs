"use client";

import { ImagePlayer } from "./image-player-feed";
import { VideoPlayer } from "./video-player-feed";
import { AudioPlayer } from "./audio-player-feed";
import type { Media } from "@/lib/types";

interface MediaPlayerProps {
  media: Media;
}

export default function MediaPlayer({ media }: MediaPlayerProps) {
  if (!media) return null;

  if (media.type === "image") {
    return <ImagePlayer src={media.url} alt={media.alt} />;
  }

  if (media.type === "video") {
    return <VideoPlayer media={media} />;
  }

  if (media.type === "audio") {
    return <AudioPlayer media={media} />;
  }

  return null;
}