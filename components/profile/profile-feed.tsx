"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserPosts } from "@/hooks/use-user-posts";
import Feed from "@/components/feed/feed";

interface ProfileFeedProps {
  username: string;
}

export function ProfileFeed({ username }: ProfileFeedProps) {
  const [sort, setSort] = useState("new");
  const { posts, isLoadingMore, hasMore, size, setSize } = useUserPosts(username, sort);

  const handleLoadMore = () => {
    setSize(size + 1);
  };

  return (
    <div className="space-y-6 ">
      <Card className="p-4 bg-background/65 backdrop-blur-sm rounded-lg shadow-lg">
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="top">Top</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {posts.length > 0 ? (
        <Feed
          posts={posts}
          isLoading={isLoadingMore}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      ) : (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">
            u/{username} hasn't posted yet
          </h3>
          <p className="text-muted-foreground">
            Be the first to start the journey!
          </p>
        </Card>
      )}
    </div>
  );
}