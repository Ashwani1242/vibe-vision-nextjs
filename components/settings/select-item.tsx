"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsItem } from "./item";

interface SettingsSelectItemProps {
  label: string;
  description?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function SettingsSelectItem({
  label,
  description,
  value,
  onValueChange,
  options,
}: SettingsSelectItemProps) {
  return (
    <SettingsItem label={label} description={description}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsItem>
  );
}