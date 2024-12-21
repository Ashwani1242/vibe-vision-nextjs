import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormValues } from "@/types/types";
import { IMAGE_STYLES, ASPECT_RATIOS, COLOR_SCHEMES } from "@/lib/constants";
import { Palette, ImageIcon, Square, Layout } from "lucide-react";
import { motion } from "framer-motion";

interface ImageStyleSectionProps {
  control: Control<FormValues>;
}

const purposeOptions = [
  {
    value: "social",
    label: "Social Media",
    description: "Perfect for Instagram, TikTok & Twitter",
  },
  {
    value: "tshirt",
    label: "Apparel Design",
    description: "Stunning designs for clothing & merchandise",
  },
  {
    value: "website",
    label: "Web Design",
    description: "Engaging visuals for websites & apps",
  },
  {
    value: "marketing",
    label: "Marketing",
    description: "Eye-catching promotional materials",
  },
  {
    value: "art",
    label: "Digital Art",
    description: "Creative & artistic compositions",
  },
  {
    value: "content",
    label: "Content Creation",
    description: "Visuals for blogs & articles",
  },
  {
    value: "custom",
    label: "Custom Project",
    description: "Tailored to your specific needs",
  }
];

export function ImageStyleSection({ control }: ImageStyleSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 backdrop-blur-lg bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name="imageStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                <ImageIcon className="h-5 w-5 text-purple-400" />
                Style Selection
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                    <SelectValue placeholder="Choose your image style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-purple-500/30 max-h-[300px]">
                  {Object.entries(IMAGE_STYLES).map(([value, { label, description }]) => (
                    <SelectItem key={value} value={value} className="hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 py-1">
                        <div className="font-bold text-purple-400">{label}</div>
                        <div className="text-xs text-gray-400">{description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="colorScheme"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                <Palette className="h-5 w-5 text-pink-400" />
                Color Scheme
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-black/50 border-pink-500/30 hover:border-pink-500/60 transition-colors">
                    <SelectValue placeholder="Select color palette" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-pink-500/30">
                  {Object.entries(COLOR_SCHEMES).map(([value, label]) => (
                    <SelectItem key={value} value={value} className="hover:bg-white/10 transition-colors">
                      <div className="font-bold text-pink-400">{label}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name="aspectRatio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <Square className="h-5 w-5 text-blue-400" />
                Dimensions
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-black/50 border-blue-500/30 hover:border-blue-500/60 transition-colors">
                    <SelectValue placeholder="Select image dimensions" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-blue-500/30">
                  {Object.entries(ASPECT_RATIOS).map(([value, { label, dimensions }]) => (
                    <SelectItem key={value} value={value} className="hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-blue-400">{label}</div>
                        <div className="text-xs text-gray-400">{dimensions}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                <Layout className="h-5 w-5 text-purple-400" />
                Purpose
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                    <SelectValue placeholder="Select image purpose" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-purple-500/30">
                  {purposeOptions.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="group hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-purple-700">
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {option.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
    </div>
    </motion.div >
  );
}