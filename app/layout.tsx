import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import GrainOverlay from '@/components/GrainOverlay';
import LoadAnimation from '@/components/LoadAnimation';
import PageTransition from '@/components/PageTransition';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

function getBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.startsWith('http')
      ? configuredUrl
      : `https://${configuredUrl}`;
  }

  if (vercelHost) {
    return vercelHost.startsWith('http')
      ? vercelHost
      : `https://${vercelHost}`;
  }

  return 'https://leahhami.dev';
}

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Leah Hamilton — Portfolio',
  description: 'wow a cool portfolio website, probably the one for your next AI engineer hire :)',
  metadataBase: new URL(baseUrl),
  icons: {
    icon: '/LH.png',
    shortcut: '/LH.png',
    apple: '/LH.png',
  },
  openGraph: {
    title: 'Leah Hamilton — Portfolio',
    description: 'a cool portfolio website for your next AI engineer',
    url: baseUrl,
    siteName: 'Leah Hamilton',
    images: ['/LH.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leah Hamilton — Portfolio',
    description: 'a cool portfolio website for your next AI engineer',
    images: ['/LH.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable} light`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
        <div className="flex min-h-screen flex-col">
          <LoadAnimation>
            <GrainOverlay />
            <Navbar />
            <div className="relative flex-1"><PageTransition>{children}</PageTransition></div>
          </LoadAnimation>
        </div>
      </body>
    </html>
  );
}
