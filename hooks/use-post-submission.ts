"use client";

import { useState } from "react";

interface PostData {
  title: string;
  content: string;
  mediaFiles: File[];
}

export function usePostSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitPost = async (data: PostData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      data.mediaFiles.forEach((file) => {
        formData.append("media", file);
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitPost, isSubmitting };
}