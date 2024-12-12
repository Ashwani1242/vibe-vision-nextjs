"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "./image-upload";
import { TagInput } from "./tag-input";
import { RichTextEditor } from "./rich-text-editor";
import { blogPostSchema } from "@/lib/schemas/blog";
import type { BlogPost } from "@/lib/types/blog";

interface BlogFormProps {
  post: BlogPost;
  onChange: (post: BlogPost) => void;
}

export function BlogForm({ post, onChange }: BlogFormProps) {
  const form = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post
  });

  const onSubmit = (data: BlogPost) => {
    // Handle blog post submission
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your blog post title" 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange({ ...post, title: e.target.value });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write a brief summary of your post"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange({ ...post, excerpt: e.target.value });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(file) => {
                    field.onChange(file);
                    onChange({ ...post, coverImage: file });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={(tags) => {
                    field.onChange(tags);
                    onChange({ ...post, tags });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={(content) => {
                    field.onChange(content);
                    onChange({ ...post, content });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Save Draft</Button>
          <Button type="submit">Publish Post</Button>
        </div>
      </form>
    </Form>
  );
}