"use client";

import { motion } from "framer-motion";
import { CompetitionFilters } from "./competition-filters";
import { CompetitionGrid } from "./competition-grid";
import { PageHeader } from "@/components/common/page-header";

export function CompetitionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Competitions"
        description="Showcase your talent and win amazing prizes"
      />
      <CompetitionFilters />
      <CompetitionGrid />
    </div>
  );
}