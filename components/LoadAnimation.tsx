'use client';

import { useRef, useEffect, useState } from 'react';
import React from 'react';

const VERB_POOL = [
  { text: '* pontificating...',          charDelay: 38 },
  { text: '* sussing things out...',     charDelay: 32 },
  { text: '* ruminating...',             charDelay: 40 },
  { text: '* crafting...',               charDelay: 46 },
  { text: '* contemplating...',          charDelay: 36 },
  { text: '* cogitating...',             charDelay: 42 },
  { text: '* philosophizing...',         charDelay: 34 },
  { text: '* synthesizing...',           charDelay: 38 },
  { text: '* extrapolating...',          charDelay: 36 },
  { text: '* triangulating...',          charDelay: 36 },
  { text: '* disambiguating...',         charDelay: 33 },
  { text: '* hypothesizing...',          charDelay: 35 },
  { text: '* connecting the dots...',    charDelay: 30 },
  { text: '* consulting the void...',    charDelay: 30 },
  { text: '* contextualizing...',        charDelay: 34 },
  { text: '* drawing inferences...',     charDelay: 30 },
  { text: '* assigning probabilities...',charDelay: 26 },
  { text: '* vibing...',                 charDelay: 52 },
  { text: '* hallucinating (tastefully)...',charDelay: 22 },
  { text: '* mulling it over...',        charDelay: 34 },
  { text: '* doing the math...',         charDelay: 34 },
  { text: '* reasoning through it...',   charDelay: 30 },
  { text: '* seeking enlightenment...', charDelay: 30 },
  { text: '* consulting my training data...', charDelay: 22 },
  { text: '* navel-gazing...',           charDelay: 38 },
  { text: '* flibbertigibbeting...',     charDelay: 20 },
  { text: '* noodling...',               charDelay: 46 },
];

const DONE_LINE = { text: '* done.', charDelay: 80 };

function pickLines(n = 4) {
  const shuffled = [...VERB_POOL].sort(() => Math.random() - 0.5);
  return [...shuffled.slice(0, n), DONE_LINE];
}

// Spinner frames — pure ASCII, cycles on the leading * of the active line
const SPINNER = ['*', '+', 'x', '+'];

type LoadState = 'pending' | 'loading' | 'done';

export default function LoadAnimation({ children }: { children: React.ReactNode }) {
  const [loadState, setLoadState] = useState<LoadState>('pending');
  const [lines]                   = useState(() => pickLines(4));

  useEffect(() => {
    setLoadState(sessionStorage.getItem('portfolio-loaded') ? 'done' : 'loading');
  }, []);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [typingText, setTypingText]         = useState('');
  const [spinFrame, setSpinFrame]           = useState(0);
  const [allDone, setAllDone]               = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Spinner tick
  useEffect(() => {
    if (allDone) return;
    const id = setInterval(() => setSpinFrame(f => (f + 1) % SPINNER.length), 120);
    return () => clearInterval(id);
  }, [allDone]);

  // Typing sequence
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    (async () => {
      await sleep(220);
      for (const { text, charDelay } of lines) {
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
      if (!cancelled) { await sleep(500); setAllDone(true); }
    })();

    return () => { cancelled = true; };
  }, [lines]);

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
      else { sessionStorage.setItem('portfolio-loaded', '1'); setLoadState('done'); }
    };
    requestAnimationFrame(tick);
  }, [allDone]);

  // Replace the leading * on the active typing line with the spinner frame
  const displayTyping = typingText.startsWith('*')
    ? SPINNER[spinFrame] + typingText.slice(1)
    : typingText;

  return (
    <>
      {loadState !== 'pending' && children}
      {loadState === 'loading' && <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)]"
    >
      <style>{`
        @keyframes spot1 {
          0%   {transform:translate(0,0) scale(1);opacity:.55}
          20%  {transform:translate(120px,-80px) scale(1.3);opacity:.85}
          45%  {transform:translate(180px,60px) scale(0.75);opacity:.60}
          65%  {transform:translate(60px,140px) scale(1.2);opacity:.80}
          82%  {transform:translate(-60px,80px) scale(0.85);opacity:.65}
          100% {transform:translate(0,0) scale(1);opacity:.55}
        }
        @keyframes spot2 {
          0%   {transform:translate(0,0) scale(1);opacity:.50}
          18%  {transform:translate(-140px,90px) scale(1.25);opacity:.75}
          40%  {transform:translate(-100px,-120px) scale(0.70);opacity:.55}
          62%  {transform:translate(80px,-100px) scale(1.35);opacity:.80}
          80%  {transform:translate(-50px,130px) scale(0.80);opacity:.60}
          100% {transform:translate(0,0) scale(1);opacity:.50}
        }
        @keyframes spot3 {
          0%   {transform:translate(0,0) scale(1.1);opacity:.60}
          25%  {transform:translate(100px,120px) scale(0.65);opacity:.80}
          50%  {transform:translate(-120px,80px) scale(1.4);opacity:.55}
          72%  {transform:translate(-80px,-100px) scale(0.80);opacity:.78}
          100% {transform:translate(0,0) scale(1.1);opacity:.60}
        }
        @keyframes spot4 {
          0%   {transform:translate(0,0) scale(1);opacity:.52}
          22%  {transform:translate(-160px,-100px) scale(1.30);opacity:.72}
          48%  {transform:translate(120px,-130px) scale(0.68);opacity:.58}
          70%  {transform:translate(160px,60px) scale(1.25);opacity:.76}
          88%  {transform:translate(-40px,110px) scale(0.85);opacity:.62}
          100% {transform:translate(0,0) scale(1);opacity:.52}
        }
        @keyframes spot5 {
          0%   {transform:translate(0,0) scale(0.9);opacity:.50}
          30%  {transform:translate(140px,-100px) scale(1.35);opacity:.78}
          55%  {transform:translate(80px,130px) scale(0.72);opacity:.60}
          78%  {transform:translate(-110px,60px) scale(1.20);opacity:.75}
          100% {transform:translate(0,0) scale(0.9);opacity:.50}
        }
        @keyframes spot6 {
          0%   {transform:translate(0,0) scale(1.05);opacity:.45}
          28%  {transform:translate(-120px,110px) scale(0.70);opacity:.68}
          52%  {transform:translate(-160px,-80px) scale(1.30);opacity:.50}
          75%  {transform:translate(90px,-120px) scale(0.78);opacity:.72}
          90%  {transform:translate(50px,80px) scale(1.15);opacity:.58}
          100% {transform:translate(0,0) scale(1.05);opacity:.45}
        }
      `}</style>

      {/* Spotlights — hard rectangular mask punched out where the terminal sits */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        maskImage:'linear-gradient(black,black),linear-gradient(black,black)',
        maskSize:'512px 255px,100% 100%',
        maskPosition:'50% 50%,0 0',
        maskRepeat:'no-repeat',
        maskComposite:'subtract',
        WebkitMaskImage:'linear-gradient(black,black),linear-gradient(black,black)',
        WebkitMaskSize:'512px 255px,100% 100%',
        WebkitMaskPosition:'50% 50%,0 0',
        WebkitMaskRepeat:'no-repeat',
        WebkitMaskComposite:'destination-out',
      }}>
        {([
          { top:'45%', left:'5%',  size:420, color:'oklch(0.74 0.19 155)', dur:9   },
          { top:'55%', left:'95%', size:160, color:'oklch(0.68 0.22 162)', dur:12  },
          { top:'8%',  left:'50%', size:360, color:'oklch(0.80 0.15 148)', dur:7.5 },
          { top:'90%', left:'20%', size:180, color:'oklch(0.72 0.20 158)', dur:10.5},
          { top:'88%', left:'80%', size:340, color:'oklch(0.76 0.17 152)', dur:8   },
          { top:'14%', left:'78%', size:140, color:'oklch(0.70 0.21 160)', dur:11  },
        ] as const).map((s, i) => (
          <div key={i} style={{ position:'absolute', top:s.top, left:s.left, width:s.size, height:s.size, transform:'translate(-50%,-50%)' }}>
            <div style={{
              width:'100%', height:'100%', borderRadius:'50%',
              background:`radial-gradient(circle,${s.color} 0%,transparent 70%)`,
              filter:'blur(18px)',
              animation:`spot${i+1} ${s.dur}s ease-in-out infinite`,
            }} />
          </div>
        ))}
      </div>

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
            <div key={i} style={{ color: 'var(--muted-foreground)' }}>
              {line}
            </div>
          ))}

          {!allDone && (
            <div className="flex items-center" style={{ color: 'var(--foreground)' }}>
              <span style={{ whiteSpace: 'pre' }}>{displayTyping}</span>
              <span
                className="inline-block ml-px animate-pulse"
                style={{ width: 7, height: 14, background: 'var(--color-accent)' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>}
    </>
  );
}
