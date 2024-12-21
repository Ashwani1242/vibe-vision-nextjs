"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ImageStyleSection } from "./form-sections/image-style-section";
import { DescriptionSection } from "./form-sections/description-section";
import { AdvancedSettings } from "./form-sections/advanced-settings";
import { Button } from "@/components/ui/button";
import { ImageDisplay } from "./image-display/image-display";
import { Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingState } from "./loadingstate";
import { ImageGrid } from "./image-display/image-grid";

export function ImageCraftForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{url: string; timestamp: Date; prompt: string}>>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageStyle: "realistic",
      aspectRatio: "1:1",
      artStyle: "paint",
      numberOfImages: 1,
      purpose: "custom",
      description: "",
      resolution: "medium",
      transparency: false,
      colorScheme: "vibrant",
      aiModel: "dall-e-3"
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (!values.description) {
      toast({
        title: "Description Required",
        description: "Please provide a description of the image you want to generate",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImages([]);
    
    try {
      const requestBody = {
        ...values,
        resolution: getResolutionDimensions(values.resolution)
      };

      console.log('Sending request with:', requestBody);

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Raw response:', response);

      if (!response.ok) {
        const textResponse = await response.text();
        console.error('Error response:', textResponse);
        
        let errorMessage;
        try {
          const errorData = JSON.parse(textResponse);
          errorMessage = errorData.error;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        
        throw new Error(errorMessage || 'Failed to generate images');
      }

      const data = await response.json();
      const imageUrls = data.images.map((item: any) => item.url || "");
      setGeneratedImages(imageUrls);

      const newHistoryItems = imageUrls.map((url: any) => ({
        url,
        timestamp: new Date(),
        prompt: values.description
      }));
      setHistory(prev => [...newHistoryItems, ...prev]);

      toast({
        title: "Success!",
        description: "Your images have been generated successfully",
        variant: "default"
      });

    } catch (error: any) {
      console.error('Image generation failed:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Sorry, something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getResolutionDimensions = (resolution: string): string => {
    const dimensions = {
      low: "1024x1024",
      medium: "1792x1024",
      high: "1024x1792"
    };
    return dimensions[resolution as keyof typeof dimensions] || dimensions.medium;
  };

  const handleHistoryImageSelect = (historyImage: { url: string; timestamp: Date; prompt: string }) => {
    setGeneratedImages([historyImage.url]);
    form.setValue('description', historyImage.prompt);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="backdrop-blur-xl bg-black/20 border-white/20 shadow-2xl rounded-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <CardHeader className="border-b border-white/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Create Your Vibe <span className="text-pink-400">✨</span>
              </CardTitle>
            </div>
            <CardDescription className="text-gray-300 font-medium">
              Drop your ideas and watch the magic happen 🪄
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <DescriptionSection control={form.control} />
                  <ImageStyleSection control={form.control} />
                </div>
                <AdvancedSettings control={form.control} />
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  disabled={isGenerating}
                ><Sparkles className="h-4 w-4 animate-spin animate-[spin_5s_linear_infinite]" />
                  <span className="font-bold">
                    {isGenerating ? 'Creating Magic...' : 'Generate Image'}
                  </span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="backdrop-blur-xl bg-black/20 border-white/20 shadow-2xl rounded-2xl hover:shadow-pink-500/20 transition-all duration-300">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Your Masterpiece <span className="text-pink-400">🎨</span>
            </CardTitle>
            <CardDescription className="text-gray-300 font-medium">
              Tap any image to see it in full glory <span className="text-pink-400">✨</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="min-h-[400px] flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-4">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingState />
                  </motion.div>
                ) : generatedImages.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-3"
                  >
                    <span className="block animate-bounce">🎨</span>
                    <span className="block text-gray-400 font-medium">No images yet</span>
                    <span className="block text-sm text-gray-500">Hit that Generate button to start!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="images"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ImageDisplay
                      images={generatedImages}
                      purpose={form.getValues("purpose")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Add a divider and title for the history section */}
            {history.length > 0 && (
              <>
                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">Previous Generations</h3>
                  <div className="flex flex-col gap-4">
                    <ImageGrid 
                      images={history.map(item => item.url)} 
                      onImageClick={(image) => {
                        const historyItem = history.find(item => item.url === image);
                        if (historyItem) {
                          handleHistoryImageSelect(historyItem);
                        }
                      }} 
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}