import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, ArrowRight } from "lucide-react";
import { Competition, formatCompetitionDate } from "@/types/competitions";

interface CompetitionCardProps {
  competition: Competition;
  index?: number;
  onJoinClick?: () => void;
  onDetailsClick?: () => void;
}

export function CompetitionCard({ 
  competition, 
  index = 0, 
  onJoinClick, 
  onDetailsClick 
}: CompetitionCardProps) {
  // Determine badge color based on status
  const getStatusBadgeVariant = (status: Competition['status']) => {
    switch (status) {
      case 'Open': return 'default';
      case 'Upcoming': return 'outline';
      case 'Closed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <Badge>{competition.category}</Badge>
            <Badge variant={getStatusBadgeVariant(competition.status)}>
              {competition.status}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold line-clamp-2">{competition.title}</h3>
          <p className="text-muted-foreground line-clamp-3">{competition.description}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{competition.prize}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{formatCompetitionDate(competition.deadline)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-green-500" />
              <span>{competition.participants} participants</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              className="w-full" 
              variant={competition.status === 'Open' ? 'default' : 'outline'}
              disabled={competition.status !== 'Open'}
              onClick={onJoinClick}
            >
              {competition.status === 'Open' ? 'Join Competition' : 'Not Available'}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={onDetailsClick}
              className="w-12"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}