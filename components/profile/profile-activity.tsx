"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Activity, Calendar, ChevronDown } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";

const activityData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  posts: Math.floor(Math.random() * 10),
  comments: Math.floor(Math.random() * 20),
}));

const dateRangeOptions = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 },
  { label: "All time", value: 365 }
];

export function ProfileActivity() {
  const [selectedRange, setSelectedRange] = useState(dateRangeOptions[1]);

  return (
    <Card className="p-6 bg-background/65 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Activity
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {selectedRange.label}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dateRangeOptions.map((option) => (
              <DropdownMenuItem 
                key={option.value}
                onSelect={() => setSelectedRange(option)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.split('-')[2]}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area
              type="monotone"
              dataKey="posts"
              stackId="1"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.2}
              name="Posts"
            />
            <Area
              type="monotone"
              dataKey="comments"
              stackId="1"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.2}
              name="Comments"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Total Posts</div>
          <div className="text-2xl font-semibold">
            {activityData.reduce((acc, curr) => acc + curr.posts, 0)}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Total Comments</div>
          <div className="text-2xl font-semibold">
            {activityData.reduce((acc, curr) => acc + curr.comments, 0)}
          </div>
        </div>
      </div>
    </Card>
  );
}