'use client';

import { motion } from 'framer-motion';

export default function RadioView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Radio Stations</h2>
      <p className="text-gray-400">Coming soon...</p>
    </motion.div>
  );
}