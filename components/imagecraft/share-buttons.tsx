"use client";

import { Button } from "./ui/button";
import { Twitter, Instagram, Facebook, Link2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  imageUrl: string;
}

export function ShareButtons({ imageUrl }: ShareButtonsProps) {
  const shareUrl = encodeURIComponent(imageUrl);
  const shareText = encodeURIComponent("Check out this amazing image I created with ImageCraft Studio!");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`, '_blank')}
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(`https://www.instagram.com/create/story?url=${shareUrl}`, '_blank')}
      >
        <Instagram className="h-4 w-4 mr-2" />
        Instagram
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
      >
        <Link2 className="h-4 w-4 mr-2" />
        Copy Link
      </Button>
    </div>
  );
}