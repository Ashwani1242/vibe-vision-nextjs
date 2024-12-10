"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Flag, MoreVertical, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { CommentForm } from "./comment-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import type { Comment } from "@/lib/types";

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
  onReport: (commentId: string) => void;
}

export function CommentItem({ comment, onReply, onReport }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
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

  const handleReply = (content: string) => {
    onReply(comment.id, content);
    setIsReplying(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <Image
            src={comment.author.avatar}
            alt={comment.author.username}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{comment.author.username}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onReport(comment.id)}>
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="space-x-1"
              onClick={handleLike}
            >
              <ThumbsUp className={`h-4 w-4 ${liked ? "fill-current text-primary" : ""}`} />
              <span>{comment.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="space-x-1"
              onClick={handleDislike}
            >
              <ThumbsDown className={`h-4 w-4 ${disliked ? "fill-current text-destructive" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="space-x-1"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Reply</span>
            </Button>
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="ml-14">
          <CommentForm
            onSubmit={handleReply}
            placeholder="Write a reply..."
            buttonText="Reply"
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-14 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onReport={onReport}
            />
          ))}
        </div>
      )}
    </div>
  );
}