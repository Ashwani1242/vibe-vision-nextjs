"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "@/lib/types";

interface RecentPostsProps {
  posts: Post[];
}

export function RecentPosts({ posts: initialPosts }: RecentPostsProps) {
  const [posts, setPosts] = useState(initialPosts);

  const handleClearAll = () => {
    setPosts([]);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Recent Posts</h2>
        {posts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>
      <AnimatePresence mode="popLayout">
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/post/${post.id}`}
                  className="flex items-start space-x-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    {post.type === "audio" ? (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <Music className="h-8 w-8 text-primary" />
                      </div>
                    ) : post.media[0]?.url ? (
                      <Image
                        src={post.media[0].thumbnail || post.media[0].url}
                        alt={post.media[0].alt || "Post thumbnail"}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium group-hover:text-primary truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            No recent posts
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}