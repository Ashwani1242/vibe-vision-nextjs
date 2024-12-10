"use client";

import { Avatar } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";

interface PostHeaderProps {
  post: Post;
  isDetailView?: boolean;
}

export function PostHeader({ post, isDetailView }: PostHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-10 w-10 relative">
        {post.author.avatar && (
          <Image
            src={post.author.avatar}
            alt={post.author.username}
            fill
            className="object-cover rounded-full"
            sizes="40px"
          />
        )}
      </Avatar>
      <div>
        <Link
          href={`/u/${post.author.username}`}
          className="font-medium hover:underline"
        >
          {post.author.username}
        </Link>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.createdAt))} ago in{" "}
          <Link href={`/r/${post.category}`} className="hover:underline">
            r/{post.category}
          </Link>
        </p>
      </div>
    </div>
  );
}