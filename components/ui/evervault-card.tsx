"use client";

// Evervault Card Component used and modified from Aceternity UI
// Link: ui.aceternity.com/components/evervault-card

import Link from "next/link";
import React from "react";

type EvervaultCardProps = {
  title: string;
  description: string;
  href?: string;
  githubHref?: string;
  className?: string;
};

export default function EvervaultCard({ title, description, href, githubHref, className }: EvervaultCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const max = 8;
    setTilt({ rx: -(dy * max), ry: dx * max });
  };
  const onMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={
        [
          "relative w-full h-56 sm:h-64 rounded-2xl border border-gray-200 dark:border-gray-800",
          "bg-[var(--background)] text-[var(--foreground)] shadow-md overflow-hidden",
          "transition-colors will-change-transform",
          className || "",
        ].join(" ")
      }
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 120ms ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Grid pattern background */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(120,120,120,0.15) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(120,120,120,0.15) 1px, transparent 1px)",
          backgroundSize: "16px 16px, 16px 16px",
          maskImage: `radial-gradient(180px 180px at ${pos.x && pos.y ? `${pos.x}px ${pos.y}px` : "50% 50%"}, rgba(0,0,0,0.9), rgba(0,0,0,0.25) 40%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(180px 180px at ${pos.x && pos.y ? `${pos.x}px ${pos.y}px` : "50% 50%"}, rgba(0,0,0,0.9), rgba(0,0,0,0.25) 40%, transparent 70%)`,
        }}
      />

      {/* Glow that follows the cursor */}

      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-70 transition-opacity duration-200"
        style={{
          left: pos.x || 0,
          top: pos.y || 0,
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle at center, oklch(0.52 0.13 140 / 0.30), oklch(0.52 0.13 140 / 0.12) 40%, transparent 70%)",
        }}
      />

      {/* Content */}

      <div className="relative z-10 flex h-full flex-col p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-[var(--muted-foreground)] leading-relaxed">{description}</p>

        {(href || githubHref) && (
          <div className="mt-auto flex flex-wrap gap-3">
            {href && (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - open live project`}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-accent-muted)] px-3 py-1.5 text-sm text-[var(--color-accent)] transition-colors transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[var(--color-accent-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-muted)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Live
                <span aria-hidden="true" className="ml-1" aria-label="opens in new tab">↗</span>
              </Link>
            )}
            {githubHref && (
              <Link
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - open GitHub repository`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300/60 dark:border-gray-700/60 px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors transform hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                GitHub
                <span aria-hidden="true" className="ml-1" aria-label="opens in new tab">↗</span>
              </Link>
            )}
          </div>
        )}
        {false && (
          <span className="hidden mt-auto inline-flex items-center gap-2 text-[var(--color-accent)]">
            View Project <span aria-hidden="true" className="ml-1" aria-label="opens in new tab">↗</span>
          </span>
        )}
      </div>

    </div>
  );
}
