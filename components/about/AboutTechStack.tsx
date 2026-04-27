'use client';

import { motion } from 'motion/react';
import {
  SiPython, SiTypescript, SiJavascript, SiCplusplus, SiPostgresql, SiR,
  SiPytorch, SiScikitlearn, SiLangchain,
  SiReact, SiNextdotjs, SiTailwindcss, SiGreensock, SiFramer, SiSupabase,
  SiGit, SiDocker, SiStripe, SiClerk,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';

const ICON_MAP: Record<string, IconType> = {
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: FaJava,
  'C++': SiCplusplus,
  SQL: SiPostgresql,
  R: SiR,
  PyTorch: SiPytorch,
  'scikit-learn': SiScikitlearn,
  LangChain: SiLangchain,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  GSAP: SiGreensock,
  'Framer Motion': SiFramer,
  Supabase: SiSupabase,
  Git: SiGit,
  Docker: SiDocker,
  Stripe: SiStripe,
  Clerk: SiClerk,
};

const STACK = [
  {
    category: 'languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'SQL', 'R'],
  },
  {
    category: 'ai / ml',
    items: ['PyTorch', 'scikit-learn', 'Azure AI Foundry', 'LangChain', 'LLMs', 'MCP'],
  },
  {
    category: 'web',
    items: ['React', 'Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Supabase'],
  },
  {
    category: 'tools',
    items: ['Git', 'Docker', 'ServiceNow', 'Microsoft Fabric', 'Stripe', 'Clerk'],
  },
];

export default function TechStack() {
  return (
    <section className="px-6 pb-8 pt-8 bg-[var(--background)] relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10"
        >
          <h2
            className="text-[var(--foreground)] leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              letterSpacing: '-0.01em',
            }}
          >
            techstack
          </h2>
        </motion.div>

        {/* Stack rows */}
        <div className="space-y-0">
          {STACK.map((row, rowIndex) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: rowIndex * 0.08, ease: 'easeOut' }}
              className="group grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] items-start gap-x-8 py-5 border-t border-[var(--border)] last:border-b"
            >
              {/* Category label */}
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted-foreground)] pt-0.5 opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all duration-300"
              >
                {row.category}
              </span>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {row.items.map((item, i) => {
                  const Icon = ICON_MAP[item];
                  return (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: rowIndex * 0.08 + i * 0.04 }}
                      className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] cursor-default"
                    >
                      {Icon && <Icon className="w-3 h-3 shrink-0" />}
                      {item}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
