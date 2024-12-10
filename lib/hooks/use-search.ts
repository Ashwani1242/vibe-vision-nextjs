"use client";

import { useState, useCallback } from 'react';
import { useDebounce } from './use-debounce';
import type { Post } from '@/lib/types';

export function useSearch(posts: Post[]) {
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