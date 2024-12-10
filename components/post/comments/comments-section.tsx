"use client";

import { useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";
import { Card } from "@/components/ui/card";
import type { Comment } from "@/lib/types";

interface CommentsSectionProps {
  comments: Comment[];
}

export function CommentsSection({ comments: initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments);

  const handleNewComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        id: "current-user",
        username: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    setComments([newComment, ...comments]);
  };

  const handleReply = (commentId: string, content: string) => {
    const reply: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        id: "current-user",
        username: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      })
    );
  };

  const handleReport = (commentId: string) => {
    // Implement report logic here
    console.log("Reported comment:", commentId);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Comments</h2>
      <div className="space-y-6">
        <CommentForm onSubmit={handleNewComment} />
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onReport={handleReport}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}