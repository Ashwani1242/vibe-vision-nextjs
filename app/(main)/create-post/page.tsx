"use client";

import { motion } from "framer-motion";
import { PostForm } from "@/components/create-post/post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/layout";
import { SparklesCore } from "@/components/ui/sparkles";

export default function CreatePost() {
  return (
    <Layout>
      <div className="relative w-full min-h-[90vh] flex items-center justify-center px-4 bg-black overflow-hidden">
      {/* Sparkle Background Effect */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="sparkles"
          background="purple"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={500}
          particleColor="#FFFFFF"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full mx-auto p-6 z-10"
      >
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <PostForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
