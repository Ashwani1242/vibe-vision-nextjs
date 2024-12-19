"use client";

import { Competition } from "@/types/competition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface CompetitionsListProps {
  competitions: Competition[];
}

export function CompetitionsList({ competitions }: CompetitionsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {competitions.map((competition, index) => (
        <motion.div
          key={competition.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-video relative">
              <img
                src={competition.image}
                alt={competition.title}
                className="object-cover w-full h-full"
              />
              <Badge
                className="absolute top-4 left-4"
                variant={competition.status === 'active' ? 'default' : 
                        competition.status === 'upcoming' ? 'secondary' : 'outline'}
              >
                {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
              </Badge>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{competition.title}</h3>
              <p className="text-muted-foreground mb-4">{competition.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4" />
                  <span>Prize: {competition.prize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{competition.participants} Participants</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Ends: {formatDate(competition.endDate)}</span>
                </div>
              </div>

              <Link href={`/competitions/${competition.id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}