"use client";

import { useUser } from "@/hooks/use-user";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileOverview } from "@/components/profile/profile-overview";
import { ProfileAbout } from "@/components/profile/profile-about";
import { ProfileFeed } from "@/components/profile/profile-feed";
import { ProfileAchievements } from "@/components/profile/profile-achievements";
import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "@/components/layout/layout";
// For demo purposes, we'll use a hardcoded username
const CURRENT_USER = "johndoe";

export default function ProfilePage() {
  const { user, isLoading } = useUser(CURRENT_USER);

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
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground">
            Unable to load your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-violet-950 via-fuchsia-900 to-violet-950">
        <ProfileHeader user={user} isOwnProfile />
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_300px] gap-6">
            <aside className="hidden md:block space-y-6">
              <ProfileOverview user={user} isOwnProfile />
              <ProfileAchievements achievements={user.achievements} />
            </aside>
            <div className="space-y-6">
              <ProfileFeed username={user.username} />
            </div>
            <aside className="hidden md:block space-y-6">
              <ProfileAbout user={user} isOwnProfile />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}