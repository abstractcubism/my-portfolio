'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

type NavLink = {
  label: string;
  href: string;
  sectionId?: string;
};

const NAV_LINKS: NavLink[] = [
  { label: 'home', href: '/' },
  { label: 'projects', href: '/projects' },
  { label: 'about', href: '/about' },
  { label: 'resume', href: '/resume' },
];

type SecretParticle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  size: number;
  delay: number;
  color: string;
};

const SECRET_COLORS = ['#86efac', '#fcd34d', '#93c5fd', '#f9a8d4', '#c4b5fd', '#fb7185'];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [secretBurstKey, setSecretBurstKey] = useState(0);
  const [secretParticles, setSecretParticles] = useState<SecretParticle[]>([]);
  const hideSecretTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/projects');
    router.prefetch('/about');
    router.prefetch('/resume');
  }, [router]);

  useEffect(() => {
    return () => {
      if (hideSecretTimeoutRef.current !== null) {
        window.clearTimeout(hideSecretTimeoutRef.current);
      }
    };
  }, []);

  const handleSectionNav = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId?: string
  ) => {
    if (pathname !== '/' || !sectionId) return;

    event.preventDefault();

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', href);
  };

  const iconHoverAnimation = shouldReduceMotion
    ? undefined
    : {
        rotate: [0, -12, 12, -8, 8, -4, 4, 0],
        transition: { duration: 0.55, ease: 'easeInOut' as const },
      };

  const handleSecretClick = () => {
    setSecretBurstKey((current) => current + 1);

    if (shouldReduceMotion) return;

    const nextParticles = Array.from({ length: 18 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 18 + (Math.random() * 0.3 - 0.15);
      const radius = 24 + Math.random() * 54;
      return {
        id: Date.now() + index,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotate: Math.random() * 240 - 120,
        size: 5 + Math.random() * 7,
        delay: Math.random() * 0.08,
        color: SECRET_COLORS[index % SECRET_COLORS.length],
      };
    });

    setSecretParticles(nextParticles);

    if (hideSecretTimeoutRef.current !== null) {
      window.clearTimeout(hideSecretTimeoutRef.current);
    }

    hideSecretTimeoutRef.current = window.setTimeout(() => {
      setSecretParticles([]);
    }, 900);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'color-mix(in oklch, var(--background) 55%, transparent)'
          : 'color-mix(in oklch, var(--background) 75%, transparent)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderBottom: '1px solid color-mix(in oklch, var(--border) 40%, transparent)',
        boxShadow: scrolled
          ? '0 1px 32px 0 color-mix(in oklch, var(--background) 30%, transparent)'
          : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="relative">
          <motion.button
            type="button"
            onClick={handleSecretClick}
            className="group flex items-baseline select-none appearance-none border-0 bg-transparent p-0"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            aria-label="Trigger hidden animation"
          >
            <span
              className="text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--color-accent)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.55rem',
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              <motion.span
                key={secretBurstKey}
                animate={
                  shouldReduceMotion || secretBurstKey === 0
                    ? undefined
                    : { rotate: [0, -7, 7, -5, 5, 0], scale: [1, 1.12, 0.98, 1.06, 1] }
                }
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="inline-block origin-center"
              >
                leah
              </motion.span>
            </span>
          </motion.button>

          <AnimatePresence>
            {secretParticles.map((particle) => (
              <motion.span
                key={particle.id}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: [0, particle.x],
                  y: [0, particle.y],
                  scale: [0.4, 1, 0.9],
                  rotate: [0, particle.rotate],
                }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: particle.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 block rounded-sm"
                style={{
                  width: particle.size,
                  height: particle.size * 1.4,
                  background: particle.color,
                  boxShadow: `0 0 18px ${particle.color}55`,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-7">
          <ul className="hidden sm:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href, sectionId }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    prefetch
                    onClick={(event) => handleSectionNav(event, href, sectionId)}
                    className="relative font-mono text-[12px] tracking-[0.2em] transition-colors duration-200 group"
                    style={{ color: isActive ? 'var(--color-accent)' : 'var(--muted-foreground)' }}
                  >
                    <span className="group-hover:text-[var(--color-accent)] transition-colors duration-200">
                      {label}
                    </span>
                    <span
                      className="absolute -bottom-px left-0 h-px bg-[var(--color-accent)] transition-all duration-300 w-0 group-hover:w-full"
                      style={{ width: isActive ? '100%' : undefined }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <span className="hidden sm:block w-px h-3.5 bg-[var(--border)]" />

          <div className="flex items-center gap-3.5">
            <motion.a
              href="https://www.linkedin.com/in/leahhami"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors duration-200"
              whileHover={iconHoverAnimation}
            >
              <FaLinkedin style={{ width: '1rem', height: '1rem' }} />
            </motion.a>
            <motion.a
              href="https://github.com/abstractcubism"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors duration-200"
              whileHover={iconHoverAnimation}
            >
              <FaGithub style={{ width: '1rem', height: '1rem' }} />
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
}
