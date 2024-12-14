"use client";

import { CreatorHero } from "@/components/creator-hub/creator-hero";
import { CreatorFeatures } from "@/components/creator-hub/creator-features";
import { Layout } from "@/components/layout/layout";

export default function CreatorHubPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <CreatorHero />
        <CreatorFeatures />
      </div>
    </Layout>
  );
}
