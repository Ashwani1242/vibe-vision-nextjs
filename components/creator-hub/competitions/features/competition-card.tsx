"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users } from "lucide-react";
import type { Competition } from "@/types/competitions";

interface CompetitionCardProps {
  competition: Competition;
  index: number;
}

export function CompetitionCard({ competition, index }: CompetitionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <Badge>{competition.category}</Badge>
            <Badge variant="outline">{competition.status}</Badge>
          </div>
          <h3 className="text-xl font-semibold mt-2">{competition.title}</h3>
          <p className="text-muted-foreground">{competition.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>{competition.prize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{competition.deadline}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{competition.participants} joined</span>
            </div>
          </div>
          <Button className="w-full">Join Competition</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}