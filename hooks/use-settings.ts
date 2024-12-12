"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  // Language
  displayLanguage: string;
  contentLanguages: string[];
  setDisplayLanguage: (lang: string) => void;
  setContentLanguages: (langs: string[]) => void;

  // Content
  showMatureContent: boolean;
  blurMature: boolean;
  showRecommendations: boolean;
  mutedCommunities: string[];
  setShowMatureContent: (show: boolean) => void;
  setBlurMature: (blur: boolean) => void;
  setShowRecommendations: (show: boolean) => void;
  setMutedCommunities: (communities: string[]) => void;

  // Accessibility
  autoplayMedia: boolean;
  reduceMotion: boolean;
  setAutoplayMedia: (autoplay: boolean) => void;
  setReduceMotion: (reduce: boolean) => void;

  // Experience
  communityThemes: boolean;
  openNewTab: boolean;
  defaultSort: string;
  defaultView: string;
  markdownEditor: boolean;
  oldReddit: boolean;
  setCommunityThemes: (enabled: boolean) => void;
  setOpenNewTab: (enabled: boolean) => void;
  setDefaultSort: (sort: string) => void;
  setDefaultView: (view: string) => void;
  setMarkdownEditor: (enabled: boolean) => void;
  setOldReddit: (enabled: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      // Language
      displayLanguage: "en",
      contentLanguages: ["en"],
      setDisplayLanguage: (lang) => set({ displayLanguage: lang }),
      setContentLanguages: (langs) => set({ contentLanguages: langs }),

      // Content
      showMatureContent: false,
      blurMature: true,
      showRecommendations: true,
      mutedCommunities: [],
      setShowMatureContent: (show) => set({ showMatureContent: show }),
      setBlurMature: (blur) => set({ blurMature: blur }),
      setShowRecommendations: (show) => set({ showRecommendations: show }),
      setMutedCommunities: (communities) => set({ mutedCommunities: communities }),

      // Accessibility
      autoplayMedia: true,
      reduceMotion: false,
      setAutoplayMedia: (autoplay) => set({ autoplayMedia: autoplay }),
      setReduceMotion: (reduce) => set({ reduceMotion: reduce }),

      // Experience
      communityThemes: true,
      openNewTab: false,
      defaultSort: "hot",
      defaultView: "card",
      markdownEditor: false,
      oldReddit: false,
      setCommunityThemes: (enabled) => set({ communityThemes: enabled }),
      setOpenNewTab: (enabled) => set({ openNewTab: enabled }),
      setDefaultSort: (sort) => set({ defaultSort: sort }),
      setDefaultView: (view) => set({ defaultView: view }),
      setMarkdownEditor: (enabled) => set({ markdownEditor: enabled }),
      setOldReddit: (enabled) => set({ oldReddit: enabled }),
    }),
    {
      name: "reddit-settings",
    }
  )
);