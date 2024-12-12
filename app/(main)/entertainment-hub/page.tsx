"use client"
import { useState } from "react";
import Feed from "@/components/feed/feed";
import { Sidebar } from "@/components/layout/sidebar-feed";
import { RecentPosts } from "@/components/layout/recent-posts";
import { SearchBar } from "@/components/search/search-bar";
import { useContent } from "@/hooks/use-posts";
import { useFeedSearch } from "@/hooks/use-search";
import { Providers } from '@/components/providers';
import { Layout } from "@/components/layout/layout";

export default function EntertainmentHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { contents, isLoadingMore, hasMore, size, setSize } = useContent();
  const { searchTerm, setSearchTerm, filteredPosts } = useFeedSearch(contents);

  const handleLoadMore = () => {
    setSize(size + 1);
  };

  return (
    <Providers>
      <Layout>
        <div className="min-h-screen bg-background">
          <header className="relative top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="flex flex-1 items-center space-x-4">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  onClear={() => setSearchTerm("")}
                />
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

              <div className="space-y-6">
                <Feed
                  category={selectedCategory}
                  posts={filteredPosts}
                  isLoading={isLoadingMore}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                />
              </div>

              <aside className="hidden md:block space-y-6">
                <RecentPosts posts={contents.slice(0, 5)} />
              </aside>
            </div>
          </main>
        </div>
      </Layout>
    </Providers>
  );
}