"use client";

import { Avatar } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import type { EnhancedContentItem } from "@/hooks/use-posts";

interface PostHeaderProps {
  post: EnhancedContentItem;
  isDetailView?: boolean;
}

export function PostHeader({ post }: PostHeaderProps) {
  // Fallback for author information if not present
  const authorName = post.userName || 'Anonymous';
  const authorAvatar = post.imageUrl || '/default-avatar.png';

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-10 w-10 relative">
        <Image
          src={authorAvatar}
          alt={authorName}
          fill
          className="object-cover rounded-full"
          sizes="40px"
        />
      </Avatar>
      <div>
        <Link
          href={`/u/${authorName}`}
          className="font-medium hover:underline"
        >
          {authorName}
        </Link>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.createdAt))} ago in{" "}
          <Link href={`/r/${post.contentType}`} className="hover:underline">
            {post.contentType}
          </Link>
        </p>
      </div>
    </div>
  );
}