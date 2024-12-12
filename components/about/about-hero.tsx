"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold">About Vibe Vision</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We&apos;re building the future of creative expression and digital storytelling
        </p>
      </motion.div>
    </section>
  );
}