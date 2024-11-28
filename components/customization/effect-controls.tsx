"use client";

import { useAudio } from "@/lib/audio-context";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function EffectControls() {
  const { options, updateOptions } = useAudio();

  return (
    <Card className="p-3">
      <CardHeader>
        <CardTitle>Effect Layers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Vinyl Crackle</Label>
            <Slider
              value={[options.vinylCrackle || 0]}
              onValueChange={([value]) =>
                updateOptions({ vinylCrackle: value })
              }
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Tape Warble</Label>
            <Slider
              value={[options.tapeWarble || 0]}
              onValueChange={([value]) =>
                updateOptions({ tapeWarble: value })
              }
              max={100}
              step={1}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Rain Ambience</Label>
            <Switch
              checked={options.ambientSounds?.rain}
              onCheckedChange={(checked) =>
                updateOptions({
                  ambientSounds: { ...options.ambientSounds, rain: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Coffee Shop</Label>
            <Switch
              checked={options.ambientSounds?.coffeeShop}
              onCheckedChange={(checked) =>
                updateOptions({
                  ambientSounds: { ...options.ambientSounds, coffeeShop: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Forest Sounds</Label>
            <Switch
              checked={options.ambientSounds?.forest}
              onCheckedChange={(checked) =>
                updateOptions({
                  ambientSounds: { ...options.ambientSounds, forest: checked },
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}