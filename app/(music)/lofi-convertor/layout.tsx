import { Playfair_Display, Roboto } from 'next/font/google';
import { AudioProvider } from '@/lib/audio-context';

// Hero section font: Stylish and elegant
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-hero' });

// Body font: Modern and easy-to-read
const roboto = Roboto({
  subsets: ['latin'], variable: '--font-body',
  weight: '100'
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <AudioProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </AudioProvider>
  );
}
