"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowUp, MessageCircle } from "lucide-react";
import type { User } from "@/lib/types";

interface ProfileStatsProps {
  user: User;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  return (
    <Card className="p-6 bg-background/65 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-semibold">{user.stats.followers}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">{user.stats.following}</div>
          <div className="text-xs text-muted-foreground">Following</div>
        </div>
        <div>
          <div className="text-2xl font-semibold">{user.stats.postKarma + user.stats.commentKarma}</div>
          <div className="text-xs text-muted-foreground">Karma</div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Button className="w-full" variant="default">
          <Users className="mr-2 h-4 w-4" />
          Follow
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">
            <ArrowUp className="mr-2 h-4 w-4" />
            Posts
          </Button>
          <Button variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Comments
          </Button>
        </div>
      </div>
    </Card>
  );
}