import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Leah Hamilton — Portfolio',
  description: 'Software engineer and data/AI practitioner. Projects, timeline, and contact.',
  metadataBase: new URL('https://example.com'),
  icons: {
    icon: '/LH.png',
    shortcut: '/LH.png',
    apple: '/LH.png',
  },
  openGraph: {
    title: 'Leah Hamilton — Portfolio',
    description: 'Projects, experience, and contact.',
    url: 'https://example.com',
    siteName: 'Leah Hamilton',
    images: ['/hero1.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leah Hamilton — Portfolio',
    description: 'Projects, experience, and contact.',
    images: ['/hero1.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}



