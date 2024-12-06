"use client";

import useSWRInfinite from 'swr/infinite';
import type { Post } from '@/types/types';

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d',
  'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
];

const fetchPosts = async (page: number, category: string): Promise<Post[]> => {
  // Simulate API call - replace with actual API endpoint
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const types = ['text', 'image', 'video', 'audio'] as const;
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${page}-${i}`,
    title: `Post ${page}-${i}`,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: {
      id: "1",
      username: "johndoe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
    },
    createdAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Random date within last 7 days
    category: "technology",
    tags: ["tech", "news"],
    media: [
      {
        type: types[Math.floor(Math.random() * types.length)],
        url: PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)],
        thumbnail: PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)]
      }
    ],
    stats: {
      likes: Math.floor(Math.random() * 1000),
      dislikes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 200)
    },
    type: types[Math.floor(Math.random() * types.length)]
  }));
};

export function usePosts(category: string = 'all') {
  const getKey = (pageIndex: number) => {
    return [`/api/posts?page=${pageIndex}&category=${category}`, pageIndex, category];
  };

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    ([_, page, category]) => fetchPosts(page, category),
    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
    }
  );

  const posts = data ? data.flat() : [];
  const isLoadingMore = isLoading || isValidating;

  return {
    posts,
    error,
    isLoadingMore,
    size,
    setSize,
  };
}