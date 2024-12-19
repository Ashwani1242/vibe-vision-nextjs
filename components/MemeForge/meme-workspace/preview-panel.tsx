import { MemePreview } from '../meme-preview/meme-preview';
import { HistoryPanel } from '../meme-history/history-panel';
import { MemeText } from '@/types/types';
import { MemeHistory } from '@/types/meme';

interface PreviewPanelProps {
  imageUrl: string;
  text: MemeText;
  history: MemeHistory[];
  onHistorySelect: (meme: MemeHistory) => void;
  onClearHistory: () => void;
}

export function PreviewPanel({
  imageUrl,
  text,
  history,
  onHistorySelect,
  onClearHistory
}: PreviewPanelProps) {
  return (
    <div className="space-y-6">
      <MemePreview
        imageUrl={imageUrl}
        text={text}
      />
      <HistoryPanel
        history={history}
        onSelect={onHistorySelect}
        onClear={onClearHistory}
      />
    </div>
  );
}