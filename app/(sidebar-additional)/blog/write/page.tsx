"use client";

import { BlogEditor } from "@/components/blog/editor/blog-editor";
import { PageHeader } from "@/components/common/page-header";

export default function WriteBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Write a Blog Post"
        description="Share your thoughts, experiences, and insights with the community"
      />
      <BlogEditor />
    </div>
  );
}