'use client';

import { useState, useCallback } from 'react';

export function useLikedSongs() {
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());

  const toggleLike = useCallback((songId: string) => {
    setLikedSongs(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(songId)) {
        newLiked.delete(songId);
      } else {
        newLiked.add(songId);
      }
      return newLiked;
    });
  }, []);

  const isLiked = useCallback((songId: string) => {
    return likedSongs.has(songId);
  }, [likedSongs]);

  return {
    likedSongs,
    toggleLike,
    isLiked
  };
}