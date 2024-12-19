"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { Update } from "@/types/news";
import { motion } from "framer-motion";

interface LatestUpdatesProps {
  updates: Update[];
}

export function LatestUpdates({ updates }: LatestUpdatesProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Zap className="h-6 w-6" />
        Latest Updates
      </h2>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:bg-accent cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">{update.category}</Badge>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {update.title}
                  </h3>
                </div>
                <span className="text-sm text-muted-foreground">{update.time}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}