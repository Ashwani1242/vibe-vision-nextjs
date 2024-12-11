"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SettingsSection } from "@/components/settings/section";
import { SettingsSwitchItem } from "@/components/settings/switch-item";
import { SettingsSelectItem } from "@/components/settings/select-item";

const SORT_OPTIONS = [
  { value: "hot", label: "Hot" },
  { value: "new", label: "New" },
  { value: "top", label: "Top" },
  { value: "controversial", label: "Controversial" },
];

const VIEW_OPTIONS = [
  { value: "card", label: "Card" },
  { value: "classic", label: "Classic" },
  { value: "compact", label: "Compact" },
];

export default function PreferencesPage() {
  // Language
  const [displayLanguage, setDisplayLanguage] = useState("english");
  const [contentLanguages, setContentLanguages] = useState("english");

  // Content
  const [showMatureContent, setShowMatureContent] = useState(false);
  const [blurMature, setBlurMature] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [mutedCommunities, setMutedCommunities] = useState([]);

  // Accessibility
  const [autoplayMedia, setAutoplayMedia] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Experience
  const [communityThemes, setCommunityThemes] = useState(true);
  const [openNewTab, setOpenNewTab] = useState(false);
  const [defaultSort, setDefaultSort] = useState("hot");
  const [rememberPerCommunity, setRememberPerCommunity] = useState(false);
  const [defaultView, setDefaultView] = useState("card");
  const [markdownEditor, setMarkdownEditor] = useState(false);
  const [oldReddit, setOldReddit] = useState(false);

  return (
    <div className="space-y-6">
      <SettingsSection title="Language">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Display language"
              description="Choose your preferred interface language"
              checked={displayLanguage === "english"}
              onCheckedChange={() => {}}
            />
            <SettingsSwitchItem
              label="Content languages"
              description="Select languages for content you want to see"
              checked={contentLanguages === "english"}
              onCheckedChange={() => {}}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Content">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Show mature content (I'm over 18)"
              description="See Not Safe for Work mature and adult content in your feeds and search results"
              checked={showMatureContent}
              onCheckedChange={setShowMatureContent}
            />
            <SettingsSwitchItem
              label="Blur mature (18+) images and media"
              checked={blurMature}
              onCheckedChange={setBlurMature}
            />
            <SettingsSwitchItem
              label="Show recommendations in home feed"
              checked={showRecommendations}
              onCheckedChange={setShowRecommendations}
            />
            <SettingsSwitchItem
              label="Muted communities"
              description="Manage communities you don't want to see"
              checked={mutedCommunities.length > 0}
              onCheckedChange={() => {}}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Accessibility">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Autoplay media"
              checked={autoplayMedia}
              onCheckedChange={setAutoplayMedia}
            />
            <SettingsSwitchItem
              label="Reduce Motion"
              checked={reduceMotion}
              onCheckedChange={setReduceMotion}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Experience">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="divide-y">
            <SettingsSwitchItem
              label="Use community themes"
              checked={communityThemes}
              onCheckedChange={setCommunityThemes}
            />
            <SettingsSwitchItem
              label="Open posts in new tab"
              checked={openNewTab}
              onCheckedChange={setOpenNewTab}
            />
            <SettingsSelectItem
              label="Default community sort"
              value={defaultSort}
              onValueChange={setDefaultSort}
              options={SORT_OPTIONS}
            />
            <SettingsSwitchItem
              label="Remember per community"
              checked={rememberPerCommunity}
              onCheckedChange={setRememberPerCommunity}
            />
            <SettingsSelectItem
              label="Default feed view"
              value={defaultView}
              onValueChange={setDefaultView}
              options={VIEW_OPTIONS}
            />
            <SettingsSwitchItem
              label="Default to markdown editor"
              checked={markdownEditor}
              onCheckedChange={setMarkdownEditor}
            />
            <SettingsSwitchItem
              label="Default to old Reddit"
              checked={oldReddit}
              onCheckedChange={setOldReddit}
            />
          </div>
        </Card>
      </SettingsSection>

      <SettingsSection title="Sensitive advertising categories">
        <Card className="bg-zinc-500/50 border border-zinc-500/50">
          <div className="p-4">
            <SettingsSwitchItem
              label="Limit ads in selected categories"
              description="Choose which types of ads you want to see less of"
              checked={false}
              onCheckedChange={() => {}}
            />
          </div>
        </Card>
      </SettingsSection>
    </div>
  );
}