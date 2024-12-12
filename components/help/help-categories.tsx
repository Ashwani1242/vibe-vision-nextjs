"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { helpCategories } from "@/lib/data/help";

export function HelpCategories() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <category.icon className="w-8 h-8 mb-4 text-primary" />
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}