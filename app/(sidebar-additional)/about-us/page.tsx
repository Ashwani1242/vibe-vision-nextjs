"use client";

import { AboutHero } from "@/components/about/about-hero";
import { AboutMission } from "@/components/about/about-mission";
import { AboutTeam } from "@/components/about/about-team";
import { Layout } from "@/components/layout/layout";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Layout>
        <AboutHero />
        <AboutMission />
        <AboutTeam />
      </Layout>
    </div>
  );
}