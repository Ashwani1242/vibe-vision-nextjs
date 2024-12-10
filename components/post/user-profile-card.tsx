"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, MapPin, Link2, Twitter, Github } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import type { User } from "@/lib/types";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-20 w-20">
          <Image
            src={user.avatar}
            alt={user.username}
            width={80}
            height={80}
            className="rounded-full"
          />
        </Avatar>
        <h2 className="mt-4 text-xl font-semibold">{user.username}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Member since {formatDistanceToNow(new Date(user.createdAt))} ago</p>
        
        <div className="mt-4 w-full">
          <Button className="w-full" variant="outline">
            Follow
          </Button>
        </div>

        <div className="mt-6 w-full">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-semibold">{user.stats.posts}</div>
              <div className="text-xs text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{user.stats.followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{user.stats.following}</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
          </div>
        </div>

        {user.bio && (
          <p className="mt-6 text-sm text-center">{user.bio}</p>
        )}

        <div className="mt-6 w-full space-y-2">
          {user.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {user.location}
            </div>
          )}
          {user.website && (
            <div className="flex items-center text-sm">
              <Link2 className="mr-2 h-4 w-4" />
              <a href={user.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {new URL(user.website).hostname}
              </a>
            </div>
          )}
          <div className="flex justify-center space-x-2 mt-4">
            {user.social?.twitter && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
            )}
            {user.social?.github && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Github className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}