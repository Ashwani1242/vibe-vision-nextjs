"use client";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function CompetitionsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="flex justify-center mb-4">
        <Trophy className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-4">AI Competitions</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Join cutting-edge AI challenges, showcase your skills, and compete for prestigious prizes
        in our global competitions.
      </p>
    </motion.div>
  );
}