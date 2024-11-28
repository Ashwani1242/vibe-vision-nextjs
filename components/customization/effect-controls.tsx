"use client";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAudioProcessor } from "@/hooks/use-audio-processor";
import { motion } from "framer-motion";

export function EffectControls() {
  const { settings, updateSettings } = useAudioProcessor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="backdrop-blur-lg bg-opacity-50 border-primary/20">
        <CardHeader>
          <CardTitle>Effect Layers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Vinyl Crackle</Label>
              <Slider
                value={[settings.vinylCrackle || 0]}
                max={100}
                step={1}
                onValueChange={([value]) =>
                  updateSettings({ vinylCrackle: value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Tape Warble</Label>
              <Slider
                value={[settings.tapeWarble || 0]}
                max={100}
                step={1}
                onValueChange={([value]) =>
                  updateSettings({ tapeWarble: value })
                }
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Rain Ambience</Label>
              <Switch
                checked={settings.ambientSounds?.rain}
                onCheckedChange={(checked) =>
                  updateSettings({
                    ambientSounds: { ...settings.ambientSounds, rain: checked }
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Coffee Shop</Label>
              <Switch
                checked={settings.ambientSounds?.coffeeShop}
                onCheckedChange={(checked) =>
                  updateSettings({
                    ambientSounds: { ...settings.ambientSounds, coffeeShop: checked }
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Forest Sounds</Label>
              <Switch
                checked={settings.ambientSounds?.forest}
                onCheckedChange={(checked) =>
                  updateSettings({
                    ambientSounds: { ...settings.ambientSounds, forest: checked }
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}