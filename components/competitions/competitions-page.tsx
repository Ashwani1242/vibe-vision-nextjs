"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { CompetitionFilters } from "./competition-filters";
import { CompetitionGrid } from "./competition-grid";
import { PageHeader } from "@/components/common/page-header";
import { Competition } from '@/lib/data/competition';
import { CompetitionLeaderboard } from "./leaderboard";

export function CompetitionsPage() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'All' as Competition['category']
  });

  const handleFilterChange = (newFilters: { 
    searchTerm: string, 
    category: Competition['category'] 
  }) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Competitions"
        description="Showcase your talent and win amazing prizes"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CompetitionFilters onFilterChange={handleFilterChange} />
          <CompetitionGrid filters={filters} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <CompetitionLeaderboard />
        </motion.div>
      </div>
    </div>
  );
}