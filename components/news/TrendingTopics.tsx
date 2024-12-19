"use client";

import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const topics = [
  "#AIEthics",
  "#MachineLearning",
  "#DeepLearning",
  "#NeuralNetworks",
  "#ComputerVision",
];

export function TrendingTopics() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="h-6 w-6" />
        Trending Topics
      </h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge
              variant="secondary"
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
            >
              {topic}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}