"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HelpCategories } from "./help-categories";
import { PopularArticles } from "./popular-articles";

export function HelpCenter() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search help articles..."
            className="pl-10"
          />
        </div>
      </motion.div>
      
      <HelpCategories />
      <PopularArticles />
    </div>
  );
}