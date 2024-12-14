import type { Metadata } from 'next';
import { Roboto_Condensed, Rubik_Glitch } from 'next/font/google';
import { ThemeProvider } from '../components/providers/theme-provider';
import { Toaster } from '../components/ui/toaster';
import { AuthProvider } from "@/components/auth/sessionprovider";

import './globals.css';

const rubikGlitch = Rubik_Glitch({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-rubik-glitch',
});

const roboto = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const siteMetadata: Metadata = {
  title: 'VibeVision - Create, Perform, Entertain',
  description: 'AI-powered platform for music and comedy content creation',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'music creation', 
    'comedy platform', 
    'content creation', 
    'AI-powered entertainment', 
    'creator tools'
  ],
  openGraph: {
    title: 'VibeVision - Create, Perform, Entertain',
    description: 'AI-powered platform for music and comedy content creation',
    type: 'website',
    url: 'https://vibevision.ai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeVision - Create, Perform, Entertain',
    description: 'AI-powered platform for music and comedy content creation',
    images: ['/twitter-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} ${rubikGlitch.variable}`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div
              className="relative min-h-screen bg-background"
              suppressHydrationWarning
            >
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
