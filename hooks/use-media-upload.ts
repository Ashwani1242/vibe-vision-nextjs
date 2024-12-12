"use client";

import { useState } from "react";
import { optimizeImage } from "@/lib/utils/media-utils";

export function useMediaUpload() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processMediaFiles = async (files: File[]): Promise<File[]> => {
    setIsProcessing(true);
    try {
      const processedFiles = await Promise.all(
        files.map(async (file) => {
          if (file.type.startsWith("image/")) {
            return optimizeImage(file);
          }
          return file;
        })
      );
      return processedFiles;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processMediaFiles,
    isProcessing
  };
}