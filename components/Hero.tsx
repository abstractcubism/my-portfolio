'use client';

import React, { useEffect, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';
import AsciiCube from './AsciiCube';

const SCRAMBLE = '0123456789!@#$%^&*<>[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const TARGET = 'Leah';

export default function Hero() {
  const NAVBAR_HEIGHT = 64;
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    // Wait for load animation to complete before starting scramble
    const wasLoaded = sessionStorage.getItem('portfolio-loaded');
    
    if (wasLoaded) {
      // Already visited - animate immediately
      setCanAnimate(true);
    } else {
      // First visit - wait for load animation to finish
      const checkLoaded = setInterval(() => {
        if (sessionStorage.getItem('portfolio-loaded')) {
          setCanAnimate(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      
      return () => clearInterval(checkLoaded);
    }
  }, []);

  useEffect(() => {
    if (!canAnimate) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    TARGET.split('').forEach((finalChar, i) => {
      const delay = 180 + i * 130;
      const duration = 560;
      const tickRate = 38;

      const t = setTimeout(() => {
        const el = letterRefs.current[i];
        if (!el) return;

        const interval = setInterval(() => {
          el.textContent = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        }, tickRate);
        intervals.push(interval);

        const stop = setTimeout(() => {
          clearInterval(interval);
          if (el) el.textContent = finalChar;
        }, duration);
        timers.push(stop);
      }, delay);

      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [canAnimate]);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        marginTop: `${NAVBAR_HEIGHT}px`,
      }}
    >
      {/* ── ASCII Cube (right side, replaces carousel) ── */}
      <div className="absolute right-0 top-0 h-full w-[65%] flex items-center justify-center overflow-hidden">
        <AsciiCube />
        {/* Fade edge blending with text */}
        <div
          className="absolute left-0 top-0 h-full w-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--background) 10%, transparent)',
          }}
        />
      </div>

      {/* ── Text Content ── */}
      <div className="max-w-6xl mx-auto h-full px-6">
        <div
          className="relative z-10 flex flex-col justify-center h-full"
          style={{ maxWidth: '42vw' }}
        >
          {/* "Hi, I'm" label */}
          <p className="text-base md:text-lg text-[var(--muted-foreground)] font-medium mb-2 tracking-wide">
            Hi, I&apos;m
          </p>

          {/* Big scrambled name */}
          <h1
            className="font-extrabold leading-none mb-6"
            style={{ fontSize: 'clamp(5rem, 9vw, 10rem)' }}
          >
            {TARGET.split('').map((char, i) => (
              <span
                key={i}
                ref={el => { letterRefs.current[i] = el; }}
                className="text-[var(--color-accent)] inline-block"
                style={{ minWidth: '0.54em', textAlign: 'center' }}
              >
                {char}
              </span>
            ))}
          </h1>

          <h2 className="text-xl md:text-2xl text-[var(--muted-foreground)] flex flex-wrap items-center gap-x-2">
            <span>your next</span>
            <Typewriter
              options={{
                strings: [
                  'software engineer.',
                  'data scientist.',
                  'AI engineer.',
                  'intern.',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                wrapperClassName: 'inline-block',
                cursorClassName: 'inline-block',
              }}
            />
          </h2>
        </div>
      </div>
    </section>
  );
}
