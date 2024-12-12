'use client';

import { useState, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Song } from '@/types/music';
import { Post } from '@/lib/types';

export function useSearch(allSongs: Song[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const searchResults = allSongs.filter(song => 
    song.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    song.artist.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setShowResults(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    showResults,
    setShowResults,
    searchResults,
    handleSearch,
    clearSearch
  };
}


export function useFeedSearch(posts: Post[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredPosts = useCallback(() => {
    if (!debouncedSearchTerm) return posts;

    const searchLower = debouncedSearchTerm.toLowerCase();
    return posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchLower);
      const contentMatch = post.content.toLowerCase().includes(searchLower);
      const authorMatch = post.author.username.toLowerCase().includes(searchLower);
      return titleMatch || contentMatch || authorMatch;
    });
  }, [posts, debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredPosts: filteredPosts(),
  };
}