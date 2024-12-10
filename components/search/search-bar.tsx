"use client";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search posts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 md:w-[300px] lg:w-[400px] pr-8"
      />
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onClear}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}