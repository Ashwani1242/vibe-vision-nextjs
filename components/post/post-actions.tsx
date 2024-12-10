"use client";

import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, ThumbsDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostActionsProps {
  post: Post;
  isDetailView?: boolean;
}

export function PostActions({ post, isDetailView }: PostActionsProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  const CommentButton = () => (
    <Button variant="ghost" size="sm" className="space-x-2">
      <MessageCircle className="h-5 w-5" />
      <span>{post.stats.comments}</span>
    </Button>
  );

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        className={cn("space-x-2", liked && "text-primary")}
        onClick={handleLike}
      >
        <Heart className={cn("h-5 w-5", liked && "fill-current")} />
        <span>{post.stats.likes}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={cn("space-x-2", disliked && "text-destructive")}
        onClick={handleDislike}
      >
        <ThumbsDown className="h-5 w-5" />
        <span>{post.stats.dislikes}</span>
      </Button>

      {isDetailView ? (
        <CommentButton />
      ) : (
        <Link href={`/post/${post.id}#comments`}>
          <CommentButton />
        </Link>
      )}

      <Button variant="ghost" size="sm" className="space-x-2">
        <Share2 className="h-5 w-5" />
        <span>{post.stats.shares}</span>
      </Button>
    </div>
  );
}