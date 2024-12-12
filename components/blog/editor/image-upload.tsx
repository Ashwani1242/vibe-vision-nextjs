"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  }, [onChange]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="cover-image"
        onChange={handleFileSelect}
      />
      
      <AnimatePresence>
        {value ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative aspect-video rounded-lg overflow-hidden"
          >
            <img
              src={URL.createObjectURL(value)}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={() => onChange(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              variant="outline"
              className="w-full h-32 border-dashed"
              onClick={() => document.getElementById("cover-image")?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-8 h-8" />
                <span>Upload Cover Image</span>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}