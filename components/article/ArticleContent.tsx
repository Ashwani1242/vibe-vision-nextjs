"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, Share2 } from "lucide-react";
import { NewsItem } from "@/types/news";
import { formatDate } from "@/lib/utils";

interface ArticleContentProps {
  article: NewsItem;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-lg shadow-lg overflow-hidden"
    >
      <div className="aspect-video relative">
        <img
          src={article.image}
          alt={article.title}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-4 left-4">{article.category}</Badge>
      </div>
      
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Avatar>
            <AvatarImage src={article.author.avatar} />
            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{article.author.name}</p>
            <p className="text-sm text-muted-foreground">{article.author.role}</p>
          </div>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {article.readTime}
          </div>
          <span>•</span>
          <time>{formatDate(article.date)}</time>
          <span>•</span>
          <button className="flex items-center gap-1 hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>

        <Separator className="mb-6" />

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}