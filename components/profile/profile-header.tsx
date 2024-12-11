"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Pencil, MapPin } from "lucide-react";
import { ProfileStats } from "@/components/profile/profile-stats";
import { motion } from "framer-motion";
import type { User } from "@/lib/types";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  const router = useRouter();

  const navigateToProfileSettings = () => {
    router.push("/settings/profile");
  };

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-64 bg-gradient-to-r from-primary/10 to-primary/5 relative group">
        {user.banner && (
          <Image
            src={user.banner}
            alt="Profile banner"
            fill
            className="object-cover"
            priority
          />
        )}
        {isOwnProfile && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={navigateToProfileSettings}
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Profile Info Container */}
      <div className="container relative">
        <div className="absolute -top-24 left-10 right-9">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            {/* Avatar */}
            <motion.div 
              className="relative group"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-40 w-40 rounded-full border-4 border-background overflow-hidden bg-muted shadow-xl">
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    fill
                    className="object-cover rounded-full"
                    priority
                  />
                )}
              </div>
              {isOwnProfile && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  onClick={navigateToProfileSettings}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </motion.div>

            {/* User Info */}
            <div className="mt-4 md:mt-0 flex-1">
              <div className="bg-background/65 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold flex items-center space-x-2">
                      <span>{user.displayName}</span>
                      {isOwnProfile && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={navigateToProfileSettings}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </h1>
                    <p className="text-muted-foreground text-lg">u/{user.username}</p>
                    {user.location && (
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {user.location}
                      </p>
                    )}
                  </div>
                  
                  {/* Stats for larger screens */}
                  <div className="hidden md:flex items-center space-x-6 text-center">
                    <div>
                      <div className="text-2xl font-bold">{user.stats.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{user.stats.following}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {user.stats.postKarma + user.stats.commentKarma}
                      </div>
                      <div className="text-sm text-muted-foreground">Karma</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats for mobile */}
      <div className="md:hidden container mt-20">
        <ProfileStats user={user} />
      </div>

      {/* Spacer for content below */}
      <div className="h-24 md:h-16" />
    </div>
  );
}