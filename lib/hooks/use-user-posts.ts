"use client";

import useSWRInfinite from "swr/infinite";
import { MEDIA_TYPES, MEDIA_RESOURCES } from "@/lib/constants";
import type { Post } from "@/lib/types";
import { MOCK_USERS } from "@/lib/data/mock-users";

const generateUserPosts = (username: string, page: number, sort: string): Post[] => {
  const user = MOCK_USERS[username];
  if (!user) return [];

  return Array.from({ length: 10 }, (_, i) => {
    const postType = MEDIA_TYPES[Math.floor(Math.random() * MEDIA_TYPES.length)];
    const mediaResources = MEDIA_RESOURCES[postType];
    const mediaUrl = mediaResources[Math.floor(Math.random() * mediaResources.length)];

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    return {
      id: `${username}-${page}-${i}`,
      title: `Post ${page}-${i} by ${username}`,
      content: MEDIA_RESOURCES.text[Math.floor(Math.random() * MEDIA_RESOURCES.text.length)],
      author: user,
      createdAt: date.toISOString(),
      category: "personal",
      tags: ["personal", username],
      media: [{
        type: postType,
        url: mediaUrl,
        thumbnail: postType === "image" ? mediaUrl : undefined,
      }],
      type: postType,
      stats: {
        likes: Math.floor(Math.random() * 1000),
        dislikes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 20),
      },
    };
  });
};

export function useUserPosts(username: string, sort: string = "new") {
  const getKey = (pageIndex: number) => {
    return [`/api/users/${username}/posts?page=${pageIndex}&sort=${sort}`, pageIndex, sort];
  };

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    ([_, page, sort]) => new Promise<Post[]>((resolve) => {
      setTimeout(() => {
        resolve(generateUserPosts(username, page, sort));
      }, 1000);
    }),
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
    hasMore: posts.length > 0 && posts.length % 10 === 0,
  };
}