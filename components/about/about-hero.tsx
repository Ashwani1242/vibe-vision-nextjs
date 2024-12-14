"use client";

import { motion } from "framer-motion";
import { Mic, Laugh, Sparkles, ArrowDown } from "lucide-react";
import { useState } from "react";

export function AboutHero() {
  const [isHovered, setIsHovered] = useState(false);

  const creativityWords = [
    "Imagination", 
    "Innovation", 
    "Expression", 
    "Inspiration", 
    "Creativity"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-100/10 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div 
          className="animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <Mic className="absolute top-10 left-20 text-primary/20 w-32 h-32" />
          <Laugh className="absolute bottom-10 right-20 text-primary/20 w-32 h-32" />
          <Sparkles className="absolute top-1/3 left-1/2 text-primary/20 w-32 h-32" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 px-4 relative z-10"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.span
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="inline-block"
          >
            {isHovered ? (
              <motion.span 
                key="creative-words"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                {creativityWords[Math.floor(Math.random() * creativityWords.length)]}
              </motion.span>
            ) : (
              "Reimagine Creativity"
            )}
          </motion.span>
        </motion.h1>
        <motion.p 
          className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Where artificial intelligence meets boundless human imagination, transforming how we create, perform, and experience art
        </motion.p>
        <div className="flex justify-center space-x-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all"
          >
            Explore Our Vision
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-all flex items-center gap-2"
          >
            Our Journey <ArrowDown className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}