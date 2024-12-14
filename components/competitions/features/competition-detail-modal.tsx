import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Info } from "lucide-react";
import { Competition, formatCompetitionDate } from "@/types/competitions";

interface CompetitionDetailModalProps {
  competition: Competition;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onJoin?: () => void;
}

export function CompetitionDetailModal({ 
  competition, 
  isOpen, 
  onOpenChange,
  onJoin
}: CompetitionDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{competition.title}</DialogTitle>
          <div className="flex gap-2 mt-2">
            <Badge>{competition.category}</Badge>
            <Badge variant={competition.status === 'Open' ? 'default' : 'destructive'}>
              {competition.status}
            </Badge>
          </div>
          <DialogDescription className="mt-4">
            {competition.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-medium">Prize: {competition.prize}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="font-medium">
                Deadline: {formatCompetitionDate(competition.deadline)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Users className="w-5 h-5 text-green-500" />
              <span className="font-medium">
                {competition.participants} Participants
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="flex items-center gap-2 font-semibold mb-2">
              <Info className="w-5 h-5 text-purple-500" />
              Requirements
            </h4>
            {competition.requirements ? (
              <ul className="list-disc list-inside text-muted-foreground">
                {competition.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No specific requirements listed.</p>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button 
            disabled={competition.status !== 'Open'}
            onClick={onJoin}
          >
            {competition.status === 'Open' ? 'Join Competition' : 'Competition Closed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}