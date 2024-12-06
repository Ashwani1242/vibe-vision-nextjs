"use client";

import { useState } from "react";
import Feed from "@/components/feed/feed";
import { Sidebar } from "@/components/feed/sidebar";
import { RecentPosts } from "@/components/feed/recent-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePosts } from "@/hooks/use-posts";
import { Layout } from "@/components/layout/layout";
import router from "next/router";

export default function EntertainmentHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { posts } = usePosts();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <header className="relative top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex flex-1 items-center space-x-4">
              <Input
                type="search"
                placeholder="Search posts..."
                className="h-9 md:w-[300px] lg:w-[400px]"
              />
              <Button size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_300px] gap-6">
            <aside className="hidden md:block">
              <Sidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </aside>

            <div className="space-y-3">
              <Feed category={selectedCategory} />
            </div>

            <aside className="hidden md:block space-y-6">
              <RecentPosts
                posts={posts.slice(0, 2)}
                onPostClick={(post) => {
                  // Navigate to post detail page or open modal
                  router.push(`/post/${post.id}`);
                }}
                onUserClick={(userId) => {
                  // Navigate to user profile
                  router.push(`/profile/${userId}`);
                }}
              />
            </aside>
          </div>
        </main>
      </div>
    </Layout>
  );
}