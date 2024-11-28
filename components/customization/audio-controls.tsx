"use client";

import { useAudio } from "@/lib/audio-context";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AudioControls() {
  const { options, updateOptions } = useAudio();

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Audio Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tempo</Label>
            <Slider
              value={[options.tempo || 100]}
              onValueChange={([value]) =>
                updateOptions({ tempo: value })
              }
              max={200}
              min={50}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Pitch</Label>
            <Slider
              value={[options.pitch || 0]}
              onValueChange={([value]) =>
                updateOptions({ pitch: value })
              }
              max={12}
              min={-12}
              step={1}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}