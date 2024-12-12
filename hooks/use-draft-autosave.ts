"use client";

import { useEffect, useRef } from "react";
import { usePostStore } from "@/lib/store/post-store";

interface AutosaveData {
  title: string;
  content: string;
  mediaFiles: File[];
}

export function useDraftAutosave(data: AutosaveData) {
  const { saveDraft } = usePostStore();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (data.title || data.content || data.mediaFiles.length > 0) {
      timeoutRef.current = setTimeout(() => {
        saveDraft({
          title: data.title,
          content: data.content,
          mediaFiles: data.mediaFiles.map(file => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file)
          }))
        });
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveDraft]);
}