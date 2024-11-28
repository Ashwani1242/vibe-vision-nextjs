"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { processAudio, AudioProcessingOptions, AudioProcessingResult } from './audio-processor';

interface AudioState {
  audioUrl: string | undefined;
  audioMetadata: Record<string, any> | undefined;
  isProcessing: boolean;
  currentPreset: string | undefined;
  options: AudioProcessingOptions;
  error: string | null;
  setAudioUrl: (url: string | undefined) => void;
  setIsProcessing: (processing: boolean) => void;
  updateOptions: (newOptions: Partial<AudioProcessingOptions>) => void;
  applyPreset: (presetId: string) => void;
  processAudioWithOptions: (file: File) => Promise<void>;
  clearError: () => void;
}

const AudioContext = createContext<AudioState | undefined>(undefined);

export const presets: Record<string, AudioProcessingOptions & { name: string }> = {
  'rainy-afternoon': {
    name: 'Rainy Afternoon',
    tempo: 95,
    pitch: -2,
    vinylCrackle: 30,
    tapeWarble: 20,
    ambientSounds: { rain: true, coffeeShop: false, forest: false },
  },
  'night-chill': {
    name: 'Night Chill',
    tempo: 85,
    pitch: -3,
    vinylCrackle: 40,
    tapeWarble: 30,
    ambientSounds: { rain: false, coffeeShop: false, forest: true },
  },
  'study-beats': {
    name: 'Study Beats',
    tempo: 90,
    pitch: -1,
    vinylCrackle: 20,
    tapeWarble: 10,
    ambientSounds: { rain: false, coffeeShop: true, forest: false },
  },
  'retro-tape': {
    name: 'Retro Tape',
    tempo: 92,
    pitch: -2,
    vinylCrackle: 50,
    tapeWarble: 40,
    ambientSounds: { rain: false, coffeeShop: false, forest: false },
  },
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [audioUrl, setAudioUrl] = useState<string>();
  const [audioMetadata, setAudioMetadata] = useState<Record<string, any>>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPreset, setCurrentPreset] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<AudioProcessingOptions>({
    tempo: 100,
    pitch: 0,
    vinylCrackle: 0,
    tapeWarble: 0,
    ambientSounds: {
      rain: false,
      coffeeShop: false,
      forest: false,
    },
  });

  const updateOptions = useCallback((newOptions: Partial<AudioProcessingOptions>) => {
    setOptions((prev) => {
      // Ensure tempo and pitch stay within reasonable bounds
      const updatedOptions = { 
        ...prev, 
        ...newOptions,
        ambientSounds: {
          ...prev.ambientSounds,
          ...(newOptions.ambientSounds || {})
        }
      };
      updatedOptions.tempo = Math.max(50, Math.min(200, updatedOptions.tempo || 100));
      updatedOptions.pitch = Math.max(-12, Math.min(12, updatedOptions.pitch || 0));
      return updatedOptions;
    });
    setCurrentPreset(undefined); // Reset preset when manually adjusting
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = presets[presetId];
    if (preset) {
      const { name, ...presetOptions } = preset;
      setOptions(presetOptions);
      setCurrentPreset(presetId);
    }
  }, []);

  const processAudioWithOptions = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result: AudioProcessingResult = await processAudio(file, options);
      setAudioUrl(result.audioUrl);
      setAudioMetadata(result.metadata);
    } catch (processingError) {
      const errorMessage = processingError instanceof Error 
        ? processingError.message 
        : 'Unknown error occurred during audio processing';
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [options]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioUrl,
        audioMetadata,
        isProcessing,
        currentPreset,
        options,
        error,
        setAudioUrl,
        setIsProcessing,
        updateOptions,
        applyPreset,
        processAudioWithOptions,
        clearError,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}