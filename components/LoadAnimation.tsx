'use client';

import { useRef, useEffect, useState } from 'react';

const LINES = [
  { text: '> boot sequence initiated',          charDelay: 26 },
  { text: '> loading leah.hamilton.exe',         charDelay: 22 },
  { text: '> importing modules ..........  OK',  charDelay: 16 },
  { text: '> connecting to server .......  OK',  charDelay: 16 },
  { text: '> access granted',                    charDelay: 28 },
  { text: '  welcome.',                          charDelay: 70 },
];

export default function LoadAnimation({ onComplete }: { onComplete: () => void }) {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [typingText, setTypingText]         = useState('');
  const [allDone, setAllDone]               = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Typing sequence
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    (async () => {
      await sleep(220);
      for (const { text, charDelay } of LINES) {
        if (cancelled) return;
        for (let i = 0; i <= text.length; i++) {
          if (cancelled) return;
          setTypingText(text.slice(0, i));
          await sleep(charDelay);
        }
        setCompletedLines(prev => [...prev, text]);
        setTypingText('');
        await sleep(110);
      }
      if (!cancelled) { await sleep(620); setAllDone(true); }
    })();

    return () => { cancelled = true; };
  }, []);

  // Fade-out when done
  useEffect(() => {
    if (!allDone || !overlayRef.current) return;
    const el = overlayRef.current;
    let start: number | null = null;
    const duration = 480;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      el.style.opacity = String(1 - p);
      if (p < 1) requestAnimationFrame(tick);
      else onComplete();
    };
    requestAnimationFrame(tick);
  }, [allDone, onComplete]);

  const isPrompt = (t: string) => t.trimStart().startsWith('>');

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)]"
    >
      {/* Terminal window */}
      <div
        className="w-full max-w-lg mx-5 rounded-xl overflow-hidden border border-[var(--border)]"
        style={{ boxShadow: '0 24px 72px oklch(0.1 0 0 / 0.11)' }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 h-9 border-b border-[var(--border)]"
          style={{ background: 'oklch(0.93 0.016 85)' }}
        >
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-auto font-mono text-xs text-[var(--muted-foreground)] tracking-wide">
            leah@portfolio ~
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-5 py-5 font-mono text-[13px] leading-6 min-h-[218px] bg-[var(--background)]">
          {completedLines.map((line, i) => (
            <div
              key={i}
              style={{ color: isPrompt(line) ? 'var(--color-accent)' : 'var(--foreground)' }}
            >
              {line}
            </div>
          ))}

          {!allDone && (
            <div
              className="flex items-center"
              style={{ color: isPrompt(typingText) ? 'var(--color-accent)' : 'var(--foreground)' }}
            >
              <span style={{ whiteSpace: 'pre' }}>{typingText}</span>
              <span
                className="inline-block ml-px animate-pulse"
                style={{ width: 7, height: 14, background: 'var(--color-accent)' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
