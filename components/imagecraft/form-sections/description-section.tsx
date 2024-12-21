import React, { useState } from "react";
import { Control, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles, Flame, Camera } from "lucide-react";
import { FormValues } from "@/types/types";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface DescriptionSectionProps {
  control: Control<FormValues>;
}

export function DescriptionSection({ control }: DescriptionSectionProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { setValue, watch } = useFormContext<FormValues>();

  const enhancePrompt = async () => {
    try {
      const currentDescription = watch('description');
      
      if (!currentDescription) {
        toast({
          title: "Empty Description",
          description: "Please enter a description first before enhancing",
          variant: "destructive"
        });
        return;
      }

      setIsEnhancing(true);

      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: currentDescription,
          imageStyle: watch('imageStyle'),
          purpose: watch('purpose'),
          colorScheme: watch('colorScheme')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance prompt');
      }

      const { enhancedPrompt } = await response.json();
      
      setValue('description', `Original: ${currentDescription}\n\nEnhanced: ${enhancedPrompt}`, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      toast({
        title: "Prompt Enhanced!",
        description: "Your description has been magically enhanced ✨",
        variant: "default"
      });

    } catch (error) {
      console.error('Prompt enhancement failed:', error);
      toast({
        title: "Enhancement Failed",
        description: "Failed to enhance your prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="backdrop-blur-lg bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
            <FormLabel className="flex items-center gap-2 text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Describe your image<span className="text-purple-400">✨</span>
            </FormLabel>
            <div className="space-y-4">
              <FormControl>
                <div className="relative group">
                  <Textarea
                    placeholder="Describe your dream image in detail... (e.g., A majestic dragon soaring through a vibrant sunset sky, casting dramatic shadows on the misty clouds below)"
                    className="min-h-[100px] pr-12 bg-black/40 border-purple-500/30 rounded-xl hover:border-purple-500/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all font-normal placeholder:text-gray-500 resize-y"
                    {...field}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.90 }}
                    type="button"
                    className="absolute right-2 top-2 p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                    onClick={enhancePrompt}
                    disabled={isEnhancing}
                    title="Enhance your prompt with AI"
                  >
                    {isEnhancing ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
                    ) : (
                      <Wand2 className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>
              </FormControl>
              <FormDescription className="bg-black/30 rounded-xl p-4 border border-white/10">
                <div className="text-base font-medium text-purple-400 mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Pro Tips No Cap
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors">
                    <Flame className="h-4 w-4" />
                    <span>Go crazy with them colors and vibes bestie</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors">
                    <Sparkles className="h-4 w-4" />
                    <span>Drop that mood and aesthetic fr fr</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors">
                    <Camera className="h-4 w-4" />
                    <span>Tell us how you want it shot tho</span>
                  </li>
                </ul>
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}