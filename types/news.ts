export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readTime: string;
  relatedTopics: string[];
}

export interface Update {
  title: string;
  category: string;
  time: string;
}

export interface NewsComment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}