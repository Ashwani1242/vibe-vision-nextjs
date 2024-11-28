"use client";

import { useState } from "react";
import { AudioProcessingOptions, processAudio } from "@/lib/audio-processor";
import { useAudioContext } from "./use-audio-context";
import { PRESETS } from "@/lib/constants/presets";

export function useAudioProcessor() {
  const { audioContext } = useAudioContext();
  const [currentPreset, setCurrentPreset] = useState<string>("");
  const [settings, setSettings] = useState<AudioProcessingOptions>({
    tempo: 100,
    pitch: 0,
    vinylCrackle: 0,
    tapeWarble: 0,
    ambientSounds: {
      rain: false,
      coffeeShop: false,
      forest: false
    }
  });

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setCurrentPreset(presetId);
      setSettings(preset.settings);
    }
  };

  const updateSettings = (newSettings: Partial<AudioProcessingOptions>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const processTrack = async (file: File) => {
    if (!audioContext) return null;
    
    try {
      const source = await processAudio(audioContext, file, settings);
      return source;
    } catch (error) {
      console.error('Error processing audio:', error);
      return null;
    }
  };

  return {
    settings,
    currentPreset,
    updateSettings,
    applyPreset,
    processTrack
  };
}