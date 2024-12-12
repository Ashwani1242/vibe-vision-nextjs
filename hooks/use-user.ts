"use client";

import useSWR from "swr";
import { MOCK_USERS } from "@/lib/data/mock-users";
import type { User } from "@/lib/types";

export function useUser(username: string) {
  const { data, error, isLoading } = useSWR(
    `/api/users/${username}`,
    () => new Promise<User>((resolve) => {
      setTimeout(() => {
        const user = MOCK_USERS[username];
        if (!user) throw new Error(`User ${username} not found`);
        resolve(user);
      }, 1000);
    })
  );

  return {
    user: data,
    error,
    isLoading,
  };
}