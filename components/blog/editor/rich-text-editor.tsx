"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Code,
  Undo,
  Redo,
  Link,
} from 'lucide-react';
import { EditorToolbar } from './editor-toolbar';
import { LinkDialog } from './link-dialog';
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border rounded-lg overflow-hidden"
    >
      <EditorToolbar editor={editor} onLinkClick={() => setShowLinkDialog(true)} />
      
      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none"
      />

      <LinkDialog
        open={showLinkDialog}
        onOpenChange={setShowLinkDialog}
        onSubmit={(url) => {
          editor.chain().focus().setLink({ href: url }).run();
        }}
      />
    </motion.div>
  );
}