"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SettingsSection } from "@/components/settings/section";
import { SettingsSwitchItem } from "@/components/settings/switch-item";

export default function EmailSettingsPage() {
  // Messages
  const [privateMessages, setPrivateMessages] = useState(true);
  const [chatRequests, setChatRequests] = useState(true);

  // Activity
  const [newUserWelcome, setNewUserWelcome] = useState(true);
  const [postComments, setPostComments] = useState(true);
  const [commentReplies, setCommentReplies] = useState(true);
  const [postUpvotes, setPostUpvotes] = useState(true);
  const [commentUpvotes, setCommentUpvotes] = useState(true);
  const [usernameMentions, setUsernameMentions] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);

  // Newsletters
  const [dailyDigest, setDailyDigest] = useState(true);

  // Advanced
  const [unsubscribeAll, setUnsubscribeAll] = useState(false);

  return (
    <div className="space-y-6">
      <SettingsSection title="Messages">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Private messages"
              checked={privateMessages}
              onCheckedChange={setPrivateMessages}
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
              label="New user welcome"
              checked={newUserWelcome}
              onCheckedChange={setNewUserWelcome}
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
              label="Username mentions"
              checked={usernameMentions}
              onCheckedChange={setUsernameMentions}
            />
            <SettingsSwitchItem
              label="New followers"
              checked={newFollowers}
              onCheckedChange={setNewFollowers}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Newsletters">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Daily Digest"
              description="Get a daily summary of the best content from your favorite communities"
              checked={dailyDigest}
              onCheckedChange={setDailyDigest}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Advanced">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Unsubscribe from all emails"
              description="Stop receiving all email notifications from Reddit"
              checked={unsubscribeAll}
              onCheckedChange={setUnsubscribeAll}
            />
          </div>
        </Card>
      </SettingsSection>
    </div>
  );
}