'use client';

import { useState, useCallback } from 'react';
import { Playlist, Song } from '@/types/music';
import { trendingPlaylists } from '@/lib/sample-data';

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>(trendingPlaylists);

  const createPlaylist = useCallback((playlist: Playlist) => {
    setPlaylists(prev => [...prev, { ...playlist, songs: [] }]);
  }, []);

  const addSongToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        const songs = playlist.songs || [];
        if (!songs.some(s => s.id === song.id)) {
          return { ...playlist, songs: [...songs, song] };
        }
      }
      return playlist;
    }));
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId && playlist.songs) {
        return {
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId)
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