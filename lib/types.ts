export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  banner?: string;
  createdAt: string;
  bio?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    github?: string;
  };
  stats: {
    postKarma: number;
    commentKarma: number;
    followers: number;
    following: number;
  };
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  category: string;
  tags: string[];
  media: Media[];
  stats: PostStats;
  type: 'text' | 'image' | 'video' | 'audio';
}

export interface Media {
  type: 'image' | 'video' | 'audio' | 'text';
  url: string;
  thumbnail?: string;
  alt?: string;
  duration?: number;
  content?: string;
}

export interface PostStats {
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  replies: Comment[];
}