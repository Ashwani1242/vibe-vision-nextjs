"use client";

import { Palette, Wand2, Sparkles, Zap, Stars } from "lucide-react";
import { motion } from "framer-motion";

export function ImageCraftHeader() {
  return (
    <div className="relative mb-12 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-3xl" />
      <div className="relative bg-black/40 backdrop-blur-xl border-white/10 border-2 rounded-3xl p-8 shadow-2xl">
        <motion.div 
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Wand2 className="h-8 w-8 text-purple-400 animate-bounce" />
          <Sparkles className="h-7 w-7 text-pink-400 animate-pulse" />
          <Stars className="h-9 w-9 text-blue-400 animate-spin-slow" />
          <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
          <Palette className="h-8 w-8 text-green-400 animate-bounce" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
            ImageCraft Studio
          </h1>
          <p className="text-xl font-medium text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Yo! Ready to level up your pics? 🚀 Drop your ideas and watch our AI magic
            turn them into absolute 🔥. No cap, just pure vibes and endless possibilities!
          </p>
          <div className="flex justify-center gap-2 text-sm text-gray-400">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">✨ AI-Powered</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">🎨 Creative</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">🚀 Fast</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}