"use client";

import { useState } from 'react';
import { z } from 'zod';

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;
const MAX_FILES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const postSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(MAX_TITLE_LENGTH, `Title must be less than ${MAX_TITLE_LENGTH} characters`),
  content: z.string()
    .min(1, "Content is required")
    .max(MAX_CONTENT_LENGTH, `Content must be less than ${MAX_CONTENT_LENGTH} characters`),
  mediaFiles: z.array(z.instanceof(File))
    .max(MAX_FILES, `Maximum ${MAX_FILES} files allowed`)
    .refine((files) => 
      files.every((file) => file.size <= MAX_FILE_SIZE),
      `Each file must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    )
});

export function usePostValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePost = (data: { title: string; content: string; mediaFiles: File[] }) => {
    try {
      postSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  return { errors, validatePost };
}