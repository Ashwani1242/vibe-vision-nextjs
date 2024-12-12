import { z } from 'zod';

export const MAX_TITLE_LENGTH = 100;
export const MAX_CONTENT_LENGTH = 10000;
export const MAX_FILES = 10;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const postSchema = z.object({
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

export type PostFormData = z.infer<typeof postSchema>;