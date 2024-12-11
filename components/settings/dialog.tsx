"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface SettingsDialogProps {
  title: string;
  description?: string;
  triggerLabel: string;
  children: React.ReactNode;
}

export function SettingsDialog({
  title,
  description,
  triggerLabel,
  children,
}: SettingsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
          <div className="space-y-0.5">
            <div className="text-base font-medium">{triggerLabel}</div>
            {description && (
              <div className="text-sm text-muted-foreground">{description}</div>
            )}
          </div>
          <ChevronRight className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}