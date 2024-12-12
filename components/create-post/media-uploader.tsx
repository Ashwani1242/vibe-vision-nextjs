"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, FileVideo, FileAudio } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaUploaderProps {
  onMediaSelect: (files: FileList) => void;
}

export function MediaUploader({ onMediaSelect }: MediaUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onMediaSelect(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*,audio/*"
          multiple
          className="hidden bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% transition-all duration-300 ease-in-out hover:animate-[gradient_3s_ease-in-out_infinite] hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] hover:shadow-violet-500 hover:brightness-125 active:scale-95 hover:[background-size:200%] [background-size:100%]"
        />
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button
            type="button"
            variant="outline"
            className="w-full h-32 border-dashed"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8" />
              <span className="text-sm">Upload Media</span>
              <span className="text-xs text-muted-foreground">
                Images, Videos, or Audio
              </span>
            </div>
          </Button>
        </motion.div>
      </div>

      <div className="flex gap-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <ImageIcon className="h-4 w-4 mr-1" />
          Images
        </div>
        <div className="flex items-center">
          <FileVideo className="h-4 w-4 mr-1" />
          Videos
        </div>
        <div className="flex items-center">
          <FileAudio className="h-4 w-4 mr-1" />
          Audio
        </div>
      </div>
    </div>
  );
}