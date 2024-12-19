import { featuredNews } from './news-data';
import { NewsItem } from '@/types/news';

export function getArticleById(id: string): NewsItem | undefined {
  return featuredNews.find(news => news.id === id);
}

export function getArticleIds(): string[] {
  return featuredNews.map(news => news.id);
}

export function getRelatedArticles(currentId: string): NewsItem[] {
  return featuredNews.filter(news => news.id !== currentId);
}