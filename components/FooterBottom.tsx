'use client';

import { motion, useReducedMotion } from 'motion/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function FooterBottom() {
  const shouldReduceMotion = useReducedMotion();
  const iconHoverAnimation = shouldReduceMotion
    ? undefined
    : {
        rotate: [0, -12, 12, -8, 8, -4, 4, 0],
        transition: { duration: 0.55, ease: 'easeInOut' as const },
      };

  return (
    <div className="flex flex-col items-start justify-between gap-5 border-t border-[var(--border)] pt-7 sm:flex-row sm:items-center">
      <div className="flex items-center gap-6">
        <motion.a
          href="https://www.linkedin.com/in/leahhami"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-[var(--color-accent)] transition-opacity duration-200 hover:opacity-70"
          whileHover={iconHoverAnimation}
        >
          <FaLinkedin style={{ width: '0.85rem', height: '0.85rem' }} />
          LinkedIn
        </motion.a>
        <motion.a
          href="https://github.com/abstractcubism"
          target="_blank"
          rel="noopener noreferrer"
          data-no-glow="true"
          className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-[var(--color-accent)] transition-opacity duration-200 hover:opacity-70"
          whileHover={iconHoverAnimation}
        >
          <FaGithub style={{ width: '0.85rem', height: '0.85rem' }} />
          GitHub
        </motion.a>
      </div>

      <div className="flex items-center gap-4">
        <span
          className="text-[var(--color-accent)]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1rem',
          }}
        >
          leah hamilton
        </span>
        <span className="font-mono text-[10px] text-[var(--color-accent)] opacity-60">
          (c) {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
