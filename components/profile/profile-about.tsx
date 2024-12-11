"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Twitter, Github, Link as LinkIcon } from "lucide-react";
import type { User } from "@/lib/types";

interface ProfileAboutProps {
  user: User;
  isOwnProfile?: boolean;
}

export function ProfileAbout({ user, isOwnProfile = false }: ProfileAboutProps) {
  return (
    <Card className="p-6 bg-background/65 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">About</h2>
        {isOwnProfile && (
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {user.bio && (
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        )}

        {user.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {user.location}
          </div>
        )}

        <div className="space-y-2">
          {user.website && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                {new URL(user.website).hostname}
              </a>
            </Button>
          )}

          {user.social?.twitter && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a 
                href={`https://twitter.com/${user.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="mr-2 h-4 w-4" />
                @{user.social.twitter}
              </a>
            </Button>
          )}

          {user.social?.github && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a
                href={`https://github.com/${user.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                {user.social.github}
              </a>
            </Button>
          )}
        </div>

        {!isOwnProfile && (
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <LinkIcon className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}