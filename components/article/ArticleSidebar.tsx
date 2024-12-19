"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NewsItem } from "@/types/news";
import { getRelatedArticles } from "@/lib/data/article";
import Link from "next/link";

interface ArticleSidebarProps {
  article: NewsItem;
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
  const relatedArticles = getRelatedArticles(article.id);
  const displayedArticles = relatedArticles.slice(0, 5); // Show only the first 5 articles

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Related Topics</h2>
        <div className="flex flex-wrap gap-2">
          {article.relatedTopics.map((topic, index) => (
            <Badge key={index} variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">More Articles</h2>
        <div className="space-y-4">
          {displayedArticles.map((related, index) => (
            <div key={index}>
              {index > 0 && <Separator className="my-4" />}
              <Link href={`/article/${related.id}`}>
                <article className="group">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {related.excerpt}
                  </p>
                </article>
              </Link>
            </div>
          ))}
          {relatedArticles.length > 5 && (
            <Link href={`/articles`} className="text-primary">
              Show More
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}