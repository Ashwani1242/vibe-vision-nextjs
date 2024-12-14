import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { Competition } from '@/lib/data/competition';

interface CompetitionFiltersProps {
  onFilterChange: (filters: { 
    searchTerm: string,
    category: Competition['category'] 
  }) => void;
}

export function CompetitionFilters({ onFilterChange }: CompetitionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Competition['category']>('All');

  const handleFilterChange = () => {
    onFilterChange({ 
      searchTerm, 
      category: selectedCategory 
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    onFilterChange({ 
      searchTerm: '', 
      category: 'All' 
    });
  };

  const categories: Competition['category'][] = ['All', 'Photography', 'Video', 'Design'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-4 mb-8 items-center"
    >
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          className="pl-10" 
          placeholder="Search competitions..." 
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
        />
        {searchTerm && (
          <X 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer" 
            onClick={clearFilters}
          />
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button 
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => {
              setSelectedCategory(category);
              handleFilterChange();
            }}
          >
            {category}
          </Button>
        ))}
      </div>
      {(searchTerm !== '' || selectedCategory !== 'All') && (
        <Button 
          variant="ghost" 
          onClick={clearFilters}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Clear Filters
        </Button>
      )}
    </motion.div>
  );
}