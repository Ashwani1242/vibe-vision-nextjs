"use client";

import { motion } from "framer-motion";
import { CompetitionCard } from "./competition-card";
import { allCompetitions } from "@/lib/data/competitions";

export function CompetitionGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCompetitions.map((competition, index) => (
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
  );
}