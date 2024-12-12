"use client";

import { CreatorHero } from "@/components/creator-hub/creator-hero";
import { CreatorFeatures } from "@/components/creator-hub/creator-features";
import { CompetitionsList } from "@/components/creator-hub/competitions/competitions-list";
import { CreatorCafe } from "@/components/creator-hub/cafe/creator-cafe";
import { NewsUpdates } from "@/components/creator-hub/news-updates";
import { Layout } from "@/components/layout/layout";

export default function CreatorHubPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <CreatorHero />
        <CreatorFeatures />
        <CompetitionsList />
        <CreatorCafe />
        <NewsUpdates />
      </div>
    </Layout>
  );
}
