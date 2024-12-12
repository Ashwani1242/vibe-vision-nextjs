import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: z.string()
    .min(1, "Content is required"),
  coverImage: z.instanceof(File).nullable(),
  tags: z.array(z.string())
    .min(1, "At least one tag is required")
    .max(5, "Maximum 5 tags allowed"),
  excerpt: z.string()
    .min(1, "Excerpt is required")
    .max(200, "Excerpt must be less than 200 characters")
});