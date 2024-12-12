"use client";

import { motion } from "framer-motion";
import { allCompetitions } from "@/lib/data/competitions";
import { CompetitionCard } from "./features/competition-card";

export function CompetitionsList() {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Active Competitions</h2>
          <p className="text-muted-foreground">
            Showcase your talent and win amazing prizes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCompetitions.map((competition, index) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}