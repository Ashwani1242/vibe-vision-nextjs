import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormValues } from "@/types/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Sparkles, Layers, Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface AdvancedSettingsProps {
  control: Control<FormValues>;
}

export function AdvancedSettings({ control }: AdvancedSettingsProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-xl bg-white/5 p-4 text-lg font-bold transition-all hover:bg-white/10">
        <ChevronDown className="h-5 w-5 text-purple-400 transition-transform group-data-[state=open]:rotate-180" />
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Level Up Settings ⚡
        </span>
        <Badge className="bg-purple-400/10 text-purple-400">
          <span className="text-xs">Pro</span>
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-6 rounded-xl bg-white/5 p-6 mt-4 backdrop-blur-lg border border-white/10">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-purple-400">
                    <Monitor className="h-4 w-4" />
                    Resolution Quality
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/50 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                        <SelectValue placeholder="Pick your quality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-purple-500/30">
                      <SelectItem value="low" className="group hover:bg-white/10">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-pink-400">Basic Mode 🌱</span>
                          <span className="text-xs text-gray-400">512×512 • Quick Gen</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium" className="group hover:bg-white/10">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-purple-400">Pro Mode 🚀</span>
                          <span className="text-xs text-gray-400">1024×1024 • Balanced</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="high" className="group hover:bg-white/10">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-400">God Mode ⚡</span>
                          <span className="text-xs text-gray-400">2048×2048 • Ultra HD</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="aiModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-pink-400">
                    <Sparkles className="h-4 w-4" />
                    AI Engine
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/50 border-pink-500/30 hover:border-pink-500/60 transition-colors">
                        <SelectValue placeholder="Choose your engine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-pink-500/30">
                      <SelectItem value="standard" className="hover:bg-white/10">
                        <span className="font-bold text-blue-400">Chill Mode 😌</span>
                      </SelectItem>
                      <SelectItem value="creative" className="hover:bg-white/10">
                        <span className="font-bold text-purple-400">Vibe Mode 🎨</span>
                      </SelectItem>
                      <SelectItem value="photorealistic" className="hover:bg-white/10">
                        <span className="font-bold text-pink-400">Reality Mode 📸</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="transparency"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4 hover:bg-black/40 transition-colors">
                <div className="space-y-1">
                  <FormLabel className="flex items-center gap-2 text-purple-400">
                    <Layers className="h-4 w-4" />
                    <span className="font-bold">Transparent Background</span>
                  </FormLabel>
                  <FormDescription className="text-gray-400">
                    No cap, make that background invisible! 🔥
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}