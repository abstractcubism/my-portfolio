'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="group p-2 rounded-full hover-theme-bg transition-colors duration-300 text-[var(--foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-muted)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-[var(--foreground)] transition-transform transition-colors duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-[var(--color-accent)] drop-shadow-sm group-hover:drop-shadow" />
      ) : (
        <MoonIcon className="w-6 h-6 text-[var(--foreground)] transition-transform transition-colors duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-[var(--color-accent)] drop-shadow-sm group-hover:drop-shadow" />
      )}
    </button>
  );
};

export default ThemeToggle;
