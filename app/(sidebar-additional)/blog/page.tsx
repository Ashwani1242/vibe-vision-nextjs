"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { PageHeader } from "@/components/common/page-header";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/layout";

export default function BlogPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <PageHeader
          title="Blog"
          description="Insights, updates, and stories from our creative community"
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button asChild>
            <Link href="/blog/write">
              <Plus className="w-4 h-4 mr-2" />
              Write Post
            </Link>
          </Button>
        </motion.div>
      </div>

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
    </Layout>
  );
}