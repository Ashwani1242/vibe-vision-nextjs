import React, { useState } from 'react';
import { motion } from "framer-motion";
import { CompetitionCard } from "./competition-card";
import { CompetitionDetailModal } from "./features/competition-detail-modal";
import { Competition } from "@/types/competitions";

interface CompetitionsListProps {
  competitions: Competition[];
}

export function CompetitionsList({ competitions }: CompetitionsListProps) {
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const handleDetailsClick = (competition: Competition) => {
    setSelectedCompetition(competition);
  };

  const handleJoinCompetition = () => {
    // Implement join logic - could open a registration modal or form
    console.log('Joining competition:', selectedCompetition?.title);
    // Reset selected competition after joining
    setSelectedCompetition(null);
  };

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
          {competitions.map((competition, index) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              index={index}
              onDetailsClick={() => handleDetailsClick(competition)}
            />
          ))}
        </div>

        {selectedCompetition && (
          <CompetitionDetailModal
            competition={selectedCompetition}
            isOpen={!!selectedCompetition}
            onOpenChange={() => setSelectedCompetition(null)}
            onJoin={handleJoinCompetition}
          />
        )}
      </div>
    </section>
  );
}