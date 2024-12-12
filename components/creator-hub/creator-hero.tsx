"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreatorHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary/10 via-secondary/20 to-primary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold">Creator Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your creative journey starts here. Join our community of creators and bring your vision to life.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button size="lg">Start Creating</Button>
          <Button size="lg" variant="outline">Explore Features</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}