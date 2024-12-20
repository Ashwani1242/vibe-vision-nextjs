"use client";

import { motion } from "framer-motion";

export default function CreatorHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}