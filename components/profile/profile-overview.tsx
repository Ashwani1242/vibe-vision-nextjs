"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  MessageCircle, 
  ArrowUp, 
  Cake,
  UserCircle,
  Palette,
  Users
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import type { User } from "@/lib/types";

interface ProfileOverviewProps {
  user: User;
  isOwnProfile?: boolean;
}

export function ProfileOverview({ user, isOwnProfile = false }: ProfileOverviewProps) {
  return (
    <Card className="p-6 bg-background/65 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold mb-4">Achievements</h2>
          <div className="flex space-x-2">
            <TooltipProvider>
              {user.achievements.map((achievement) => (
                <Tooltip key={achievement.id}>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{achievement.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ArrowUp className="h-4 w-4" />
              <span>Post Karma</span>
            </div>
            <span className="font-medium">{user.stats.postKarma}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Comment Karma</span>
            </div>
            <span className="font-medium">{user.stats.commentKarma}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Followers</span>
            </div>
            <span className="font-medium">{user.stats.followers}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cake className="h-4 w-4" />
              <span>Cake Day</span>
            </div>
            <span className="font-medium">
              {formatDistanceToNow(new Date(user.createdAt))} ago
            </span>
          </div>
        </div>

        {isOwnProfile && (
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <UserCircle className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button className="w-full" variant="outline">
              <Palette className="mr-2 h-4 w-4" />
              Style Avatar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}