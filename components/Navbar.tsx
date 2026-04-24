'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// Cottage core ASCII art decorations
const DECORATIONS = {
  mushroom: `
    .
   / \\
  ( _ )
   \\_/`,
  flower: `
  .*.
   | 
  /|\\`,
  leaf: `
  _
 / \\
\\_/`,
  cottage: `
  /\\
 /  \\
/____\\
 |  |
 |__|`,
};

const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Work',    href: '/#projects' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b border-[var(--border)]"
      style={{ 
        background: 'color-mix(in oklch, var(--background) 85%, transparent)', 
        backdropFilter: 'blur(12px)' 
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* ASCII Cottage Logo */}
        <Link
          href="/"
          className="font-mono text-sm hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <pre className="text-[var(--color-accent)] leading-none text-[10px]">
{DECORATIONS.cottage}
          </pre>
          <span className="font-bold text-lg tracking-tight text-[var(--foreground)]">
            leah
          </span>
        </Link>

        {/* Nav links with cottage core feel */}
        <ul className="flex items-center gap-1 font-mono text-xs">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = href === '/about' ? pathname === '/about' : pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative px-3 py-1.5 transition-all duration-200 group ${
                    isActive
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/30'
                  }`}
                >
                  <span className="relative z-10">{label}</span>
                  {/* Cottage core underline */}
                  <span
                    className={`absolute left-1 right-1 -bottom-0.5 h-px bg-[var(--color-accent)] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            );
          })}

          {/* Social icons */}
          <li className="flex items-center gap-2 ml-2 pl-3 border-l border-[var(--border)]">
            <a
              href="https://www.linkedin.com/in/leahhami"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--muted-foreground)] hover:text-[#0A66C2] transition-colors p-1"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/abstractcubism"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
          </li>
        </ul>
      </div>

      {/* Cottage core decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </nav>
  );
}
