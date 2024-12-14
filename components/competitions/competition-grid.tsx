import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { CompetitionCard } from "./competition-card";
import { allCompetitions, Competition } from '@/lib/data/competition';

interface CompetitionGridProps {
  filters: {
    searchTerm: string,
    category: Competition['category']
  };
}

export function CompetitionGrid({ filters }: CompetitionGridProps) {
  const filteredCompetitions = useMemo(() => {
    return allCompetitions.filter(competition => {
      const matchesSearch = competition.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        competition.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesCategory = filters.category === 'All' || competition.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [filters]);

  return (
    <>
      {filteredCompetitions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          <p className="text-xl">No competitions found</p>
          <p className="mt-2">Try adjusting your search or filter</p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CompetitionCard competition={competition} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}