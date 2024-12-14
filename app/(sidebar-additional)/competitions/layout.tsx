"use client";

import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompetitionsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function CompetitionsLayout({ 
  children, 
  className 
}: CompetitionsLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
      className={cn(
        "min-h-screen bg-background", 
        "flex flex-col",
        className
      )}
    >
      {children}
    </motion.div>
  );
}