"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const popularArticles = [
  {
    title: "Mastering Music Production with AI",
    description: "Learn how to leverage AI tools to enhance your music creation process",
    category: "Music",
    readTime: "5 min read",
    isNew: true
  },
  {
    title: "Comedy Writing Techniques for Social Media",
    description: "Develop viral-worthy comedy content that resonates with online audiences",
    category: "Comedy",
    readTime: "7 min read",
    isNew: false
  },
  {
    title: "Monetization Strategies for Creators",
    description: "Unlock multiple revenue streams on the VibeVision platform",
    category: "Creator Economy",
    readTime: "6 min read",
    isNew: true
  },
  {
    title: "Collaboration and Networking Guide",
    description: "Connect with other creators and grow your audience effectively",
    category: "Community",
    readTime: "4 min read",
    isNew: false
  }
];

export function PopularArticles() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
        Popular Help Articles
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {popularArticles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-secondary/30 cursor-pointer group bg-background/60 backdrop-blur-sm"
          >
            <FileText className="w-6 h-6 text-primary flex-shrink-0 group-hover:rotate-6 transition-transform" />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="font-medium mr-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                {article.isNew && (
                  <Badge variant="default" className="ml-2">
                    <Sparkles className="mr-1 h-3 w-3" /> New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {article.description}
              </p>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="text-xs text-muted-foreground">
                  {article.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}