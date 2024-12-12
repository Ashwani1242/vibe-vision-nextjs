"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MediaPreview } from "./media-preview";
import { MediaUploader } from "./media-uploader";

interface MediaSectionProps {
  mediaFiles: File[];
  onMediaSelect: (files: FileList) => void;
  onRemoveMedia: (index: number) => void;
}

export function MediaSection({
  mediaFiles,
  onMediaSelect,
  onRemoveMedia,
}: MediaSectionProps) {
  return (
    <>
      <MediaUploader onMediaSelect={onMediaSelect} />

      <AnimatePresence>
        {mediaFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
          >
            {mediaFiles.map((file, index) => (
              <MediaPreview
                key={index}
                file={file}
                onRemove={() => onRemoveMedia(index)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}