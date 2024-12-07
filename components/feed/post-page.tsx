"use client";

import React from 'react';
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2, ThumbsDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import MediaPlayer from "./media-player";
import CommentSection from "./comment-section";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import type { Post } from "@/types/types";

// Placeholder images for media
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d',
];

interface PostPageProps {
  postId: string;
}

const PostPage: React.FC<PostPageProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Simulate fetching a specific post
        const fetchedPost: Post = {
          id: postId,
          title: `Detailed Post ${postId}`,
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          author: {
            id: "1",
            username: "johndoe",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
          },
          createdAt: new Date().toISOString(),
          category: "technology",
          tags: ["tech", "news"],
          media: [
            {
              type: 'image',
              url: PLACEHOLDER_IMAGES[0],
              thumbnail: PLACEHOLDER_IMAGES[1]
            }
          ],
          stats: {
            likes: 456,
            dislikes: 23,
            comments: 78,
            shares: 34
          },
          type: 'image'
        };

        setPost(fetchedPost);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive">Error loading post</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10">
        <p>No post found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="overflow-hidden">
        <div className="p-6">
          {/* Post Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-12 w-12">
              <img src={post.author?.avatar} alt={post.author?.username} />
            </Avatar>
            <div>
              <Link href={`/u/${post.author?.username}`} className="font-semibold hover:underline text-lg">
                {post.author?.username}
              </Link>
              <p className="text-sm text-muted-foreground">
                Posted {formatDistanceToNow(new Date(post.createdAt))} ago in{" "}
                <Link href={`/r/${post.category}`} className="hover:underline">
                  r/{post.category}
                </Link>
              </p>
            </div>
          </div>

          {/* Post Title */}
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          {/* Media Content */}
          {post.media && post.media.length > 0 && (
            <div className="mb-6">
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

          {/* Post Content */}
          <div className="prose max-w-full mb-6">
            <p className="text-lg">{post.content}</p>
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center space-x-4 mb-6">
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

            <Button variant="ghost" size="sm" className="space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>{post.stats.comments}</span>
            </Button>

            <Button variant="ghost" size="sm" className="space-x-2">
              <Share2 className="h-5 w-5" />
              <span>{post.stats.shares}</span>
            </Button>
          </div>

          {/* Comment Section */}
          <CommentSection postId={post.id} />
        </div>
      </Card>
    </div>
  );
};

export default PostPage;