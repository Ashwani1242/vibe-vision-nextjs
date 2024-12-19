"use client";

import { LeaderboardEntry } from "@/types/competition";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface CompetitionLeaderboardProps {
  entries: LeaderboardEntry[];
}

export function CompetitionLeaderboard({ entries }: CompetitionLeaderboardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 text-center font-bold">
                {entry.rank}
              </div>
              <Avatar>
                <AvatarImage src={entry.avatar} />
                <AvatarFallback>{entry.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{entry.username}</p>
                <p className="text-sm text-muted-foreground">
                  Score: {entry.score}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {entries.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            No entries yet
          </p>
        )}
      </div>
    </Card>
  );
}