"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Newspaper } from "lucide-react";
import { NewsItem } from "@/types/news";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface FeaturedNewsProps {
  news: NewsItem[];
}

export function FeaturedNews({ news }: FeaturedNewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the current news items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2">
        <Newspaper className="h-8 w-8 text-primary" />
        Latest News
      </h1>
      
      {currentNews.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No news articles found.
        </div>
      ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
          {currentNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <Badge variant="secondary" className="absolute top-4 left-4">
                    {item.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {item.date}
                    </span>
                    <Link href={`/article/${item.id}`}>
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  isActive={currentPage > 1}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  isActive={currentPage < totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}