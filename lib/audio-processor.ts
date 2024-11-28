import { getFFmpeg } from './ffmpeg';

export interface AudioProcessingOptions {
  tempo?: number;
  pitch?: number;
  vinylCrackle?: number;
  tapeWarble?: number;
  ambientSounds?: {
    rain?: boolean;
    coffeeShop?: boolean;
    forest?: boolean;
  };
}

export async function processAudio(audioContext: AudioContext, file: File, options: AudioProcessingOptions = {}) {
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  // Create gain node for volume control
  const gainNode = audioContext.createGain();
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Apply audio processing based on options
  if (options.tempo) {
    source.playbackRate.value = options.tempo / 100;
  }

  return source;
}

export async function createAudioVisualizerSource(audioContext: AudioContext, audioElement: HTMLAudioElement) {
  const source = audioContext.createMediaElementSource(audioElement);
  const analyser = audioContext.createAnalyser();
  
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  
  return analyser;
}