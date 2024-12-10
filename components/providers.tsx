"use client";

import { SWRConfig } from 'swr';
import { MediaProvider } from '@/lib/contexts/media-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig 
      value={{
        fetcher: (url) => fetch(url).then(res => res.json())
      }}
    >
      <MediaProvider>
        {children}
      </MediaProvider>
    </SWRConfig>
  );
}