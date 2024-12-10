"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import Link from "next/link";
import type { Post } from "@/lib/types";
import MediaPlayer from "@/components/media/media-player-feed";
import { PostHeader } from "@/components/post/post-header";
import { PostActions } from "@/components/post/post-actions";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-4">
          <PostHeader post={post} />

          <Link href={`/post/${post.id}`}>
            <h2 className="text-xl font-semibold mt-3 hover:text-primary transition-colors">
              {post.title}
            </h2>
          </Link>

          {post.media.length > 0 && (
            <div className="mt-4">
              {post.media.length === 1 ? (
                <MediaPlayer media={post.media[0]} />
              ) : (
                <Carousel>
                  {post.media.map((media, index) => (
                    <MediaPlayer key={index} media={media} />
                  ))}
                </Carousel>
              )}
            </div>
          )}

          <p className="mt-3 text-muted-foreground line-clamp-3">{post.content}</p>

          <div className="mt-4">
            <PostActions post={post} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}