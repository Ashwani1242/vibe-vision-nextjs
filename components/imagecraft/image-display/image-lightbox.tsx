"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";

interface ImageLightboxProps {
  image: string;
  onClose: () => void;
}

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black/90 backdrop-blur-xl border-white/10">
        <div className="relative aspect-square w-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <Image
            src={image}
            alt="Generated image"
            fill
            className="object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Your Creation ✨</h3>
                <p className="text-sm text-gray-300">Click outside to close</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-white/5 hover:bg-white/10">
                  <Download className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="bg-white/5 hover:bg-white/10">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}