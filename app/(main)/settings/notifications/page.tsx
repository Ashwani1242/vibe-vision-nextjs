"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SettingsSection } from "@/components/settings/section";
import { SettingsSwitchItem } from "@/components/settings/switch-item";

export default function NotificationsPage() {
  // General
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Messages
  const [privateMessages, setPrivateMessages] = useState(true);
  const [chatMessages, setChatMessages] = useState(true);
  const [chatRequests, setChatRequests] = useState(true);

  // Activity
  const [mentions, setMentions] = useState(true);
  const [postComments, setPostComments] = useState(true);
  const [commentReplies, setCommentReplies] = useState(true);
  const [postUpvotes, setPostUpvotes] = useState(true);
  const [commentUpvotes, setCommentUpvotes] = useState(true);
  const [commentActivity, setCommentActivity] = useState(true);
  const [chatActivity, setChatActivity] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [awards, setAwards] = useState(true);
  const [followedPosts, setFollowedPosts] = useState(true);
  const [followedComments, setFollowedComments] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [postInsights, setPostInsights] = useState(true);

  // Recommendations
  const [trendingPosts, setTrendingPosts] = useState(true);
  const [communityRecommendations, setCommunityRecommendations] = useState(true);
  const [redditRecap, setRedditRecap] = useState(true);
  const [featuredContent, setFeaturedContent] = useState(true);

  // Updates
  const [announcements, setAnnouncements] = useState(true);
  const [cakeDay, setCakeDay] = useState(true);

  // Moderation
  const [modNotifications, setModNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <SettingsSection title="General">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Push Notifications"
              description="Receive notifications even when you're not using Reddit"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Messages">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Private messages"
              checked={privateMessages}
              onCheckedChange={setPrivateMessages}
            />
            <SettingsSwitchItem
              label="Chat messages"
              checked={chatMessages}
              onCheckedChange={setChatMessages}
            />
            <SettingsSwitchItem
              label="Chat requests"
              checked={chatRequests}
              onCheckedChange={setChatRequests}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Activity">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Mentions of u/username"
              checked={mentions}
              onCheckedChange={setMentions}
            />
            <SettingsSwitchItem
              label="Comments on your posts"
              checked={postComments}
              onCheckedChange={setPostComments}
            />
            <SettingsSwitchItem
              label="Replies to your comments"
              checked={commentReplies}
              onCheckedChange={setCommentReplies}
            />
            <SettingsSwitchItem
              label="Upvotes on your posts"
              checked={postUpvotes}
              onCheckedChange={setPostUpvotes}
            />
            <SettingsSwitchItem
              label="Upvotes on your comments"
              checked={commentUpvotes}
              onCheckedChange={setCommentUpvotes}
            />
            <SettingsSwitchItem
              label="Activity on your comments"
              checked={commentActivity}
              onCheckedChange={setCommentActivity}
            />
            <SettingsSwitchItem
              label="Activity on chat posts you're in"
              checked={chatActivity}
              onCheckedChange={setChatActivity}
            />
            <SettingsSwitchItem
              label="New followers"
              checked={newFollowers}
              onCheckedChange={setNewFollowers}
            />
            <SettingsSwitchItem
              label="Awards you receive"
              checked={awards}
              onCheckedChange={setAwards}
            />
            <SettingsSwitchItem
              label="Posts you follow"
              checked={followedPosts}
              onCheckedChange={setFollowedPosts}
            />
            <SettingsSwitchItem
              label="Comments you follow"
              checked={followedComments}
              onCheckedChange={setFollowedComments}
            />
            <SettingsSwitchItem
              label="Achievement updates"
              checked={achievements}
              onCheckedChange={setAchievements}
            />
            <SettingsSwitchItem
              label="Streak reminders"
              checked={streakReminders}
              onCheckedChange={setStreakReminders}
            />
            <SettingsSwitchItem
              label="Insights on your posts"
              checked={postInsights}
              onCheckedChange={setPostInsights}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Recommendations">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Trending posts"
              checked={trendingPosts}
              onCheckedChange={setTrendingPosts}
            />
            <SettingsSwitchItem
              label="Community recommendations"
              checked={communityRecommendations}
              onCheckedChange={setCommunityRecommendations}
            />
            <SettingsSwitchItem
              label="Reddit Recap"
              checked={redditRecap}
              onCheckedChange={setRedditRecap}
            />
            <SettingsSwitchItem
              label="Featured content"
              checked={featuredContent}
              onCheckedChange={setFeaturedContent}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Updates">
        <Card className="bg-zinc-500/50 border border-zinc-500/50"  >
          <div className="divide-y">
            <SettingsSwitchItem
              label="Reddit announcements"
              checked={announcements}
              onCheckedChange={setAnnouncements}
            />
            <SettingsSwitchItem
              label="Cake day"
              checked={cakeDay}
              onCheckedChange={setCakeDay}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Moderation">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Mod notifications"
              checked={modNotifications}
              onCheckedChange={setModNotifications}
            />
          </div>
        </Card>
      </SettingsSection>
    </div>
  );
}