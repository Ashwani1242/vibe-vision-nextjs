"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe,
  Twitter,
  Github,
  Link as LinkIcon
} from "lucide-react";
import type { User } from "@/lib/types";

interface ProfileSidebarProps {
  user: User;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  return (
    <Card className="p-6 bg-background/65 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold mb-2">About u/{user.username}</h2>
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        </div>

        {(user.website || user.social) && (
          <div className="space-y-2">
            {user.website && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <a 
                  href={user.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Website
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
                  Twitter
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
                  GitHub
                </a>
              </Button>
            )}
          </div>
        )}

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            <LinkIcon className="mr-2 h-4 w-4" />
            Share Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}