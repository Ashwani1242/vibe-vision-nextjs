"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { popularArticles } from "@/lib/data/help";

export function PopularArticles() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Popular Articles</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {popularArticles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-secondary/50 cursor-pointer"
          >
            <FileText className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">{article.title}</h3>
              <p className="text-sm text-muted-foreground">{article.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}