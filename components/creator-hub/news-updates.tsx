"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { newsUpdates } from "@/lib/data/news";

export function NewsUpdates() {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">News & Updates</h2>
          <p className="text-muted-foreground">
            Stay informed with the latest from our community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{update.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {update.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{update.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{update.content}</p>
                  {update.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {update.tags.map((tag) => (
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
      </div>
    </section>
  );
}