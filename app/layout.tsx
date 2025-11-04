'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <body className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
          <Navbar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
