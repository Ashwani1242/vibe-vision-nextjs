"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DraftPost {
  id: string;
  title: string;
  content: string;
  mediaFiles: {
    id: string;
    file: File;
    previewUrl: string;
  }[];
  lastSaved: Date;
}

interface PostStore {
  drafts: DraftPost[];
  activeDraft: DraftPost | null;
  saveDraft: (draft: Omit<DraftPost, 'id' | 'lastSaved'>) => void;
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  clearActiveDraft: () => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      drafts: [],
      activeDraft: null,
      saveDraft: (draft) => {
        const id = crypto.randomUUID();
        const newDraft = { ...draft, id, lastSaved: new Date() };
        set((state) => ({
          drafts: [...state.drafts, newDraft],
          activeDraft: newDraft,
        }));
      },
      loadDraft: (id) => {
        const draft = get().drafts.find((d) => d.id === id);
        if (draft) {
          set({ activeDraft: draft });
        }
      },
      deleteDraft: (id) => {
        set((state) => ({
          drafts: state.drafts.filter((d) => d.id !== id),
          activeDraft: state.activeDraft?.id === id ? null : state.activeDraft,
        }));
      },
      clearActiveDraft: () => {
        set({ activeDraft: null });
      },
    }),
    {
      name: 'post-drafts',
    }
  )
);