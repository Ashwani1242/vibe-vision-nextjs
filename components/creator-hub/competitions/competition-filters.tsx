"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function CompetitionFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-4 mb-8"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search competitions..." />
      </div>
      <div className="flex gap-2">
        <Button variant="outline">All</Button>
        <Button variant="outline">Photography</Button>
        <Button variant="outline">Video</Button>
        <Button variant="outline">Design</Button>
      </div>
    </motion.div>
  );
}