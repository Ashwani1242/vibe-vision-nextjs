"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileOverview } from "@/components/profile/profile-overview";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { ProfileFeed } from "@/components/profile/profile-feed";
import { ProfileAchievements } from "@/components/profile/profile-achievements";
import { ProfileActivity } from "@/components/profile/profile-activity";
import { useUser } from "@/lib/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePage({ 
  params 
}: { 
  params: { username: string } 
}) {
  const { user, isLoading } = useUser(params.username);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Skeleton className="w-full h-48" />
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_300px] gap-6">
            <div className="space-y-6 hidden md:block">
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[300px]" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[400px]" />
            </div>
            <div className="space-y-6 hidden md:block">
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[300px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
          <p className="text-muted-foreground">
            The user u/{params.username} doesn't exist
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader user={user} />
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_300px] gap-6">
          <aside className="hidden md:block space-y-6">
            <ProfileOverview user={user} />
            <ProfileAchievements achievements={user.achievements} />
          </aside>
          <div className="space-y-6">
            <ProfileActivity />
            <ProfileFeed username={user.username} />
          </div>
          <aside className="hidden md:block space-y-6">
            <ProfileSidebar user={user} />
          </aside>
        </div>
      </div>
    </div>
  );
}