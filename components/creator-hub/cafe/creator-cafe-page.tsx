"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/page-header";
import { UpcomingEvents } from "./upcoming-events";
import { LiveDiscussions } from "./live-discussions";
import { ResourceLibrary } from "./resource-library";

export function CreatorCafePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Creator Café"
        description="Connect, learn, and grow with fellow creators"
      />
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <LiveDiscussions />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <UpcomingEvents />
        </motion.div>
      </div>
      <ResourceLibrary />
    </div>
  );
}