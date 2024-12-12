"use client";

import { Trophy, Calendar, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Competition } from "@/types/competitions";

interface CompetitionCardProps {
  competition: Competition;
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge>{competition.category}</Badge>
          <Badge variant="outline">{competition.status}</Badge>
        </div>
        <CardTitle className="mt-2">{competition.title}</CardTitle>
        <CardDescription>{competition.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
      </CardContent>
      <CardFooter>
        <Button className="w-full">Join Competition</Button>
      </CardFooter>
    </Card>
  );
}