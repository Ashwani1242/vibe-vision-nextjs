'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

export default function SearchInput({
  searchQuery,
  onSearchChange,
  onClear,
  onFocus,
  isFocused
}: SearchInputProps) {
  return (
    <motion.div 
      className={cn(
        "flex items-center bg-white/5 border rounded-full px-4 py-2 transition-all duration-300",
        isFocused 
          ? "border-cyan-500 ring-2 ring-cyan-500/20" 
          : "border-white/10 hover:border-white/20"
      )}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Search size={20} className="text-white/40" />
      
      <input 
        type="text"
        placeholder="Search songs, artists..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={onFocus}
        className="
          bg-transparent 
          w-80
          px-3
          text-white 
          placeholder-white/40
          focus:outline-none
        "
      />
      
      {searchQuery && (
        <motion.button
          type="button"
          onClick={onClear}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-white/40 hover:text-white"
        >
          <X size={20} />
        </motion.button>
      )}
    </motion.div>
  );
}