import { MemeCreator } from '../meme-creator/meme-creator';
import { TextCustomizer } from '../text-customizer/text-customizer';
import { MemeText } from '@/types/types';

interface EditorPanelProps {
  onImageGenerated: (url: string) => void;
  text: MemeText;
  onTextChange: (text: Partial<MemeText>) => void;
  onSave: () => void;
  showTextCustomizer: boolean;
}

export function EditorPanel({
  onImageGenerated,
  text,
  onTextChange,
  onSave,
  showTextCustomizer
}: EditorPanelProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <MemeCreator onImageGenerated={onImageGenerated} />
      {showTextCustomizer && (
        <TextCustomizer
          text={text}
          onTextChange={onTextChange}
          onSave={onSave}
        />
      )}
    </div>
  );
}