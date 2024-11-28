"use client";

import { useAudio, presets } from "@/lib/audio-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function PresetSelector() {
  const { currentPreset, applyPreset } = useAudio();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Presets</CardTitle>
      </CardHeader>
      <CardContent className="h-auto">
        <Select value={currentPreset} onValueChange={applyPreset}>
          <SelectTrigger>
            <SelectValue placeholder="Select a preset">
              {currentPreset ? presets[currentPreset].name : "Select a preset"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(presets).map(([id, preset]) => (
              <SelectItem key={id} value={id}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}