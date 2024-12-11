"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Star, Award, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import type { Achievement } from "@/lib/types";

const ACHIEVEMENT_ICONS = {
  "First Post": Trophy,
  "Popular Post": Star,
  "Verified Email": Shield,
  "Design Star": Medal,
  "Tech Expert": Award,
};

interface ProfileAchievementsProps {
  achievements: Achievement[];
}

export function ProfileAchievements({ achievements }: ProfileAchievementsProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <Card className="p-6 bg-background/65 backdrop-blur-sm rounded-lg shadow-lg">
      <h2 className="font-semibold mb-4">Achievements</h2>
      <div className="grid grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = ACHIEVEMENT_ICONS[achievement.name as keyof typeof ACHIEVEMENT_ICONS] || Trophy;
          
          return (
            <Dialog key={achievement.id}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-8 w-8 text-yellow-500" />
                  </motion.div>
                  <span className="text-xs text-center">{achievement.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-yellow-500" />
                    <span>{achievement.name}</span>
                  </DialogTitle>
                  <DialogDescription>
                    {achievement.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 bg-muted/50 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">
                    Keep contributing to earn more achievements!
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </Card>
  );
}