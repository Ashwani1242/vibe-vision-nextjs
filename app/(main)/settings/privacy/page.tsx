"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";

export default function PrivacySettingsPage() {
  const [allowFollow, setAllowFollow] = useState(true);
  const [messagePermission, setMessagePermission] = useState("everyone");
  const [chatPermission, setChatPermission] = useState("everyone");
  const [showInSearch, setShowInSearch] = useState(true);
  const [showInUsers, setShowInUsers] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Social interactions</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Allow people to follow you</Label>
                <div className="text-sm text-muted-foreground">
                  Let people follow you to see your profile posts in their home feed
                </div>
              </div>
              <Switch
                checked={allowFollow}
                onCheckedChange={setAllowFollow}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Who can send you inbox messages</Label>
                <div className="text-sm text-muted-foreground">
                  Control who can send you private messages
                </div>
              </div>
              <Select value={messagePermission} onValueChange={setMessagePermission}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="followers">Followers only</SelectItem>
                  <SelectItem value="none">No one</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Allow chat requests from</Label>
                <div className="text-sm text-muted-foreground">
                  Choose who can send you chat requests
                </div>
              </div>
              <Select value={chatPermission} onValueChange={setChatPermission}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="followers">Followers only</SelectItem>
                  <SelectItem value="none">No one</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Blocked accounts</Label>
                <div className="text-sm text-muted-foreground">
                  Manage your list of blocked users
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Discoverability</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">List your profile on old.reddit.com/users</Label>
                <div className="text-sm text-muted-foreground">
                  List your profile on old.reddit.com/users and allow posts to your profile to appear in r/all
                </div>
              </div>
              <Switch
                checked={showInUsers}
                onCheckedChange={setShowInUsers}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Show up in search results</Label>
                <div className="text-sm text-muted-foreground">
                  Allow search engines like Google to link to your profile in their search results
                </div>
              </div>
              <Switch
                checked={showInSearch}
                onCheckedChange={setShowInSearch}
              />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ads personalization</h2>
        <Card className="bg-zinc-500/50 border border-zinc-500/50"  >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Personalize ads on Reddit based on information and activity from our partners</Label>
                <div className="text-sm text-muted-foreground">
                  Allow us to use information from our partners to show you better ads on Reddit
                </div>
              </div>
              <Switch
                checked={personalization}
                onCheckedChange={setPersonalization}
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}