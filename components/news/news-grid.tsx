"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { newsUpdates } from "@/lib/data/news";

export function NewsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsUpdates.map((news, index) => (
        <motion.div
          key={news.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
            <CardHeader className="relative">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary">{news.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {news.date}
                </div>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                {news.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{news.content}</p>
              {news.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {news.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}