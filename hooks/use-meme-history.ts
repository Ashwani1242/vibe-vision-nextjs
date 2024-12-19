'use client';

import { useState, useEffect } from 'react';
import { MemeHistory } from '@/lib/types';
import { storage } from '@/lib/utils/storage';

const HISTORY_KEY = 'history';
const MAX_HISTORY_ITEMS = 10;

export function useMemeHistory() {
  const [history, setHistory] = useState<MemeHistory[]>([]);

  useEffect(() => {
    const stored = storage.get<MemeHistory[]>(HISTORY_KEY);
    if (stored) {
      setHistory(stored);
    }
  }, []);

  const addToHistory = (meme: MemeHistory) => {
    const newHistory = [meme, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(newHistory);
    storage.set(HISTORY_KEY, newHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    storage.remove(HISTORY_KEY);
  };

  return { history, addToHistory, clearHistory };
}