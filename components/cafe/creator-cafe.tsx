"use client";

import { motion } from "framer-motion";
import { CafeEvents } from "./features/cafe-events";
import { CafeDiscussions } from "./features/cafe-discussions";
import { CafeResources } from "./features/cafe-resources";

export function CreatorCafe() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Creator Café</h2>
          <p className="text-muted-foreground">
            Your daily dose of inspiration and connection
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CafeDiscussions />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
            <CafeEvents />
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Resource Library</h3>
          <CafeResources />
        </div>
      </div>
    </section>
  );
}