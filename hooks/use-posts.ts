'use client';
import useSWRInfinite from 'swr/infinite';

export type MediaType = 'video' | 'audio' | 'image' | 'text';

export interface ContentItem {
  _id: string;
  isPublic: boolean;
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  thumbnail_alt?: string | null;
  musicTitle?: string | null;
  displayName: string;
  songLyrics?: string | null;
  userPrompt: string;
  enhancedPrompt: string;
  statusMessage?: string | null;
  userId?: string | null;
  userName: string;
  fileName: string;
  contentType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentStats {
  likes?: number;
  dislikes?: number;
  comments?: number;
  shares?: number;
}

export interface EnhancedContentItem extends ContentItem {
  id: string;
  title: string;
  media: MediaItem[];
  type: MediaType;
  stats: ContentStats;
}

export interface MediaItem {
  type: MediaType;
  url?: string;
  thumbnail?: string;
  alt?: string;
  content?: string;
  duration?: number;
}

const POSTS_PER_PAGE = 10;

const mapContentToMediaItem = (content: ContentItem): EnhancedContentItem => {
  let mediaType: MediaType = 'text';
  let mediaItems: MediaItem[] = [];

  if (content.videoUrl) {
    mediaType = 'video';
    mediaItems.push({
      type: 'video',
      url: content.videoUrl,
      thumbnail: content.imageUrl || undefined,
      alt: content.displayName || 'Content video'
    });
  }

  return {
    ...content,
    id: content._id,
    title: content.displayName || content.userPrompt,
    media: mediaItems,
    type: mediaType,
    stats: {
      likes: Math.floor(Math.random() * 100),
      dislikes: Math.floor(Math.random() * 10),
      comments: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 20)
    }
  };
};

const fetchContent = async (page: number, contentType?: string): Promise<EnhancedContentItem[]> => {
  const response = await fetch(`https://vibevision.ai/api/content/get-all-content?page=${page + 1}&limit=${POSTS_PER_PAGE}&type=${contentType || ''}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }

  const data = await response.json();
  
  // Sort posts in descending order by creation time
  const sortedData = data.sort((a: ContentItem, b: ContentItem) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sortedData.map(mapContentToMediaItem);
};

export function useContent(contentType?: string) {
  const getKey = (pageIndex: number) => {
    // Return null to stop fetching when no more data
    if (pageIndex > 0 && !hasMore) return null;
    return [`/api/content?page=${pageIndex}&type=${contentType || ''}`, pageIndex, contentType];
  };

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<EnhancedContentItem[]>(
    getKey,
    ([_, page, type]) => fetchContent(Number(page), type?.toString()),
    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
      errorRetryInterval: 1000,
      initialSize: 1 // Start with first page
    }
  );

  const contents = data ? data.flat() : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const hasMore = !isEmpty && data?.[data.length - 1]?.length === POSTS_PER_PAGE;

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      setSize(size + 1);
    }
  };

  return {
    contents,
    error,
    isLoadingMore,
    size,
    setSize,
    loadMore,
    hasMore,
    isEmpty
  };
}
