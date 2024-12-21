import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ImageDownloadProps {
  images: string[];
}

export function ImageDownload({ images }: ImageDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = async (url: string) => {
    try {
      setIsDownloading(true);
      const response = await fetch(url, {
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'same-origin'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `generated-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);

      toast({
        title: "Success",
        description: "Image downloaded successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error downloading the image. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAll = async () => {
    setIsDownloading(true);
    try {
      await Promise.all(images.map(downloadImage));
      toast({
        title: "Success",
        description: "All images downloaded successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error('Batch download failed:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error downloading some images. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-end gap-3 mt-6">
      {images.length > 1 && (
        <Button 
          onClick={downloadAll} 
          variant="outline"
          disabled={isDownloading}
          className="bg-white/5 hover:bg-white/10 border-purple-500/50 hover:border-purple-500 transition-colors"
        >
          {isDownloading ? (
            <span className="animate-pulse">Downloading...</span>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4 text-purple-400" />
              Download All
            </>
          )}
        </Button>
      )}
      {images.map((image, index) => (
        <Button
          key={index}
          onClick={() => downloadImage(image)}
          variant="outline"
          disabled={isDownloading}
          className="bg-white/5 hover:bg-white/10 border-pink-500/50 hover:border-pink-500 transition-colors"
        >
          {isDownloading ? (
            <span className="animate-pulse">Downloading...</span>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4 text-pink-400" />
              Save #{index + 1}
            </>
          )}
        </Button>
      ))}
    </div>
  );
}