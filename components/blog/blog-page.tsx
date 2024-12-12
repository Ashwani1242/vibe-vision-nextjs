"use client";

import { motion } from "framer-motion";
import { BlogGrid } from "./blog-grid";
import { BlogSidebar } from "./blog-sidebar";
import { PageHeader } from "@/components/common/page-header";

export function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Blog"
        description="Insights, updates, and stories from our creative community"
      />
      <div className="grid lg:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3"
        >
          <BlogGrid />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BlogSidebar />
        </motion.div>
      </div>
    </div>
  );
}