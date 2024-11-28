import { getFFmpeg } from './ffmpeg';
import { v4 as uuidv4 } from 'uuid';

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

export interface AudioProcessingResult {
  audioUrl: string;
  metadata?: {
    originalFileName: string;
    processingOptions: AudioProcessingOptions;
  };
}

export async function processAudio(file: File, options: AudioProcessingOptions = {}): Promise<AudioProcessingResult> {
  const ffmpeg = await getFFmpeg();
  const inputFileName = `input_${uuidv4()}${file.name.substring(file.name.lastIndexOf('.'))}`;
  const outputFileName = `output_${uuidv4()}.mp3`;

  try {
    // Enhanced input validation
    if (!file || file.size === 0) {
      throw new Error('Invalid input file');
    }

    const data = await file.arrayBuffer();
    const inputData = new Uint8Array(data);
    await ffmpeg.writeFile(inputFileName, inputData);

    const filters: string[] = [];
    
    // Robust tempo adjustment
    const tempoValue = Math.max(0.5, Math.min(2.0, options.tempo ? options.tempo / 100 : 1.0));
    filters.push(`atempo=${tempoValue}`);
    
    // Pitch shifting with more precise calculation
    if (options.pitch && options.pitch !== 0) {
      const pitchValue = Math.max(-1, Math.min(1, options.pitch / 12));
      filters.push(`asetrate=44100*${1 + pitchValue}`);
    }

    // Vinyl crackle simulation (basic noise generation)
    if (options.vinylCrackle && options.vinylCrackle > 0) {
      const crackleIntensity = options.vinylCrackle / 100;
      filters.push(`anoisesrc=colour=white:amplitude=${crackleIntensity.toFixed(2)},atrim=duration=0.05,aloop=-1`);
    }

    // Tape warble simulation
    if (options.tapeWarble && options.tapeWarble > 0) {
      const warbleIntensity = options.tapeWarble / 100;
      filters.push(`vibrato=f=${warbleIntensity * 5}:d=${warbleIntensity * 0.5}`);
    }

    // Ambient sounds (mock implementation, would require actual sound files)
    const ambientFilters: string[] = [];
    if (options.ambientSounds?.rain) {
      ambientFilters.push('rain');  // Would require actual sound file
    }
    if (options.ambientSounds?.coffeeShop) {
      ambientFilters.push('coffee_shop');  // Would require actual sound file
    }
    if (options.ambientSounds?.forest) {
      ambientFilters.push('forest');  // Would require actual sound file
    }

    const command = [
      '-i', inputFileName,
      ...(filters.length > 0 ? ['-af', filters.join(',')] : []),
      '-q:a', '2',
      outputFileName
    ];

    await ffmpeg.exec(command);

    const outputData = await ffmpeg.readFile(outputFileName);
    const blob = new Blob([outputData], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(blob);

    return {
      audioUrl,
      metadata: {
        originalFileName: file.name,
        processingOptions: options
      }
    };
  } catch (error) {
    console.error('Error processing audio:', error);
    throw new Error(`Audio processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    try {
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
    } catch (cleanupError) {
      console.warn('Error during file cleanup:', cleanupError);
    }
  }
}