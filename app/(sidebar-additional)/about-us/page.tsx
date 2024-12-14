"use client";

import { AboutHero } from "@/components/about/about-hero";
import { AboutMission } from "@/components/about/about-mission";
import { AboutTimeline } from "@/components/about/about-timeline";
import { AboutTeam } from "@/components/about/about-team";
import { Layout } from "@/components/layout/layout";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/20">
      <Layout>
        <AboutHero />
        <AboutMission />
        <AboutTimeline />
        <AboutTeam />
      </Layout>
    </div>
  );
}