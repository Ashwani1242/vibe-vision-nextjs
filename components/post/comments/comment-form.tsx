"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
  userAvatar?: string;
}

export function CommentForm({
  onSubmit,
  placeholder = "Write a comment...",
  buttonText = "Comment",
  userAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
}: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <Avatar className="h-10 w-10 flex-shrink-0">
        <Image
          src={userAvatar}
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </Avatar>
      <div className="flex-1 space-y-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!content.trim()}>
            {buttonText}
          </Button>
        </div>
      </div>
    </form>
  );
}