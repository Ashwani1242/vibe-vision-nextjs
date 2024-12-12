"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlogForm } from "./blog-form";
import { BlogPreview } from "./blog-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlogPost } from "@/lib/types/blog";

export function BlogEditor() {
  const [post, setPost] = useState<BlogPost>({
    title: "",
    content: "",
    coverImage: null,
    tags: [],
    excerpt: ""
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Tabs defaultValue="write">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write">
          <BlogForm post={post} onChange={setPost} />
        </TabsContent>
        
        <TabsContent value="preview">
          <BlogPreview post={post} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}