"use client";

import { motion } from "motion/react";
import React from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  return (
    <div className="max-w-4xl mx-auto">

      {/* Section label */}
      <p className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--color-accent)] mb-12">
        experience &amp; education
      </p>

      {/* Entries */}
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
          className="group grid grid-cols-[2.5rem_1fr] gap-x-6 py-8 border-t border-[var(--border)]"
        >
          {/* Row number */}
          <span
            className="font-mono text-sm pt-0.5 text-[var(--color-accent)] tabular-nums"
            aria-hidden
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Content block */}
          <div>
            {/* Date pill */}
            <span className="inline-block font-mono text-xs text-[var(--muted-foreground)] tracking-wide mb-2">
              {item.title}
            </span>
            {item.content}
          </div>
        </motion.div>
      ))}

      {/* Closing rule */}
      <div className="border-t border-[var(--border)]" />
    </div>
  );
};
