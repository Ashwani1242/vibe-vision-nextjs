"use client";

import { FeaturedNews } from "@/components/news/FeaturedNews";
import { LatestUpdates } from "@/components/news/LatestUpdates";
import { TrendingTopics } from "@/components/news/TrendingTopics";
import { AINewsAnalytics } from "@/components/ai/AINewsAnalytics";
import { featuredNews, latestUpdates } from "@/lib/data/news-data";
import { Layout } from "@/components/layout/layout";

export default function Home() {
  return (
    <Layout>
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedNews news={featuredNews} />
          </div>

          <div className="space-y-8">
            <AINewsAnalytics />
            <LatestUpdates updates={latestUpdates} />
            <TrendingTopics />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
