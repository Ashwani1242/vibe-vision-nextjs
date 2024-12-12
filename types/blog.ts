export interface BlogPost {
  title: string;
  content: string;
  coverImage: File | null;
  tags: string[];
  excerpt: string;
}

export interface PublishedBlogPost extends BlogPost {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: Date;
  readingTime: number;
}