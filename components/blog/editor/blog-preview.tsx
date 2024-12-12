"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/types/blog";

interface BlogPreviewProps {
  post: BlogPost;
}

export function BlogPreview({ post }: BlogPreviewProps) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose prose-gray max-w-none"
    >
      {post.coverImage && (
        <div className="aspect-video rounded-lg overflow-hidden mb-8">
          <img
            src={URL.createObjectURL(post.coverImage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="mb-4">{post.title || "Untitled Post"}</h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
        <time dateTime={new Date().toISOString()}>
          {format(new Date(), "MMMM d, yyyy")}
        </time>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {post.excerpt && (
        <p className="text-xl text-muted-foreground mb-8">
          {post.excerpt}
        </p>
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </motion.article>
  );
}