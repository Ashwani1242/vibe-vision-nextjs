"use client";

import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { usePostStore } from '@/lib/store/post-store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Edit } from 'lucide-react';

export function DraftList() {
  const { drafts, loadDraft, deleteDraft } = usePostStore();

  if (drafts.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Saved Drafts</h2>
      <ScrollArea className="h-[200px]">
        <AnimatePresence>
          {drafts.map((draft) => (
            <motion.div
              key={draft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between p-3 border rounded-lg mb-2 hover:bg-secondary/50"
            >
              <div className="flex-1">
                <h3 className="font-medium truncate">{draft.title || 'Untitled'}</h3>
                <p className="text-sm text-muted-foreground">
                  Last saved: {format(new Date(draft.lastSaved), 'PPp')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => loadDraft(draft.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteDraft(draft.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}