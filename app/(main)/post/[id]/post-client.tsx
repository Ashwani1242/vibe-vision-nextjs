"use client";

import { Card } from "@/components/ui/card";
import MediaPlayer from "@/components/media/media-player-feed";
import { PostHeader } from "@/components/post/post-header";
import { PostActions } from "@/components/post/post-actions";
import { CommentsSection } from "@/components/post/comments/comments-section";
import { UserProfileCard } from "@/components/post/user-profile-card";
import { usePosts } from "@/hooks/use-posts";
import { Layout } from "@/components/layout/layout";

interface PostClientProps {
  params: {
    id: string;
  };
}

export default function PostClient({ params }: PostClientProps) {
  const { posts } = usePosts();
  const post = posts.find(p => p.id === params.id);

  if (!post) {
    return (
      <div className="container py-8">
        <Card className="p-8">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="text-muted-foreground mt-2">The post you're looking for doesn't exist.</p>
        </Card>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="mb-6">
                  <PostHeader post={post} isDetailView />
                </div>

                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                {post.media.length > 0 && (
                  <div className="mb-6">
                    <MediaPlayer media={post.media[0]} />
                  </div>
                )}

                <p className="text-lg mb-6">{post.content}</p>

                <div className="border-t pt-4">
                  <PostActions post={post} isDetailView />
                </div>
              </div>
            </Card>

            <CommentsSection comments={[]} />
          </div>

          <div className="space-y-6">
            <UserProfileCard user={post.author} />
          </div>
        </div>
      </div>
    </Layout>
  );
}