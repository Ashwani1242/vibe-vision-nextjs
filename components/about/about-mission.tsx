"use client";

import { motion } from "framer-motion";
import { Target, Heart, Globe } from "lucide-react";

export function AboutMission() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower creators to share their unique perspectives with the world"
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Creativity, authenticity, and community drive everything we do"
    },
    {
      icon: Globe,
      title: "Our Impact",
      description: "Connecting millions of creators and fostering meaningful conversations"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-12 h-12">
                <item.icon className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}