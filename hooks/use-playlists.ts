'use client';

import { useState, useCallback } from 'react';
import { UserPlaylist } from '@/types/music';

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([]);

  const createPlaylist = useCallback((playlist: Omit<UserPlaylist, 'id' | 'createdAt'>) => {
    const newPlaylist: UserPlaylist = {
      ...playlist,
      id: `playlist-${Date.now()}`,
      createdAt: new Date(),
    };

    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const addSongToPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: [...playlist.songs, songId]
        };
      }
      return playlist;
    }));
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter(id => id !== songId)
        };
      }
      return playlist;
    }));
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
  }, []);

  return {
    playlists,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist
  };
}