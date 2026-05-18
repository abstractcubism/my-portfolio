'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

import History from './AboutHistory';
import TechStack from './AboutTechStack';
import Interests from './AboutInterests';

type Polaroid = {
  src: string;
  rot: number;
  x: string;
  y: string;
  width: number;
  caption: string;
  drift: [number, number, number];
  delay: number;
};

const POLAROIDS: Polaroid[] = [
  {
    src: '/microsoftRSVP.jpg',
    rot: -13,
    x: '2%',
    y: '24%',
    width: 184,
    caption: 'microsoft 2024',
    drift: [0, -12, 0],
    delay: 0.15,
  },
  {
    src: '/startup2025CloseUp.jpg',
    rot: -9,
    x: '17%',
    y: '8%',
    width: 176,
    caption: 'startup grind 2025',
    drift: [0, -9, 0],
    delay: 0.12,
  },
  {
    src: '/me.jpg',
    rot: -2,
    x: '36%',
    y: '14%',
    width: 214,
    caption: 'leah :)',
    drift: [0, -16, 0],
    delay: 0.05,
  },
  {
    src: '/bloomberg.jpg',
    rot: 9,
    x: '68%',
    y: '14%',
    width: 182,
    caption: 'bloomberg: women in data 2025',
    drift: [0, -10, 0],
    delay: 0.22,
  },
  {
    src: '/microsoftAI.jpg',
    rot: 11,
    x: '57%',
    y: '42%',
    width: 192,
    caption: 'microsoft ai conference 2026',
    drift: [0, -11, 0],
    delay: 0.28,
  },
  {
    src: '/rerootPresentation.JPEG',
    rot: -10,
    x: '18%',
    y: '55%',
    width: 178,
    caption: 'techstart competition 2026',
    drift: [0, -10, 0],
    delay: 0.34,
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const [activePolaroid, setActivePolaroid] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] px-6 pb-20 pt-36">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <motion.div
            {...fade()}
            data-no-glow="true"
            className="relative z-20 flex flex-col items-start gap-6"
          >
            <div className="relative z-20 mx-auto h-[430px] w-full max-w-[38rem] isolate md:h-[500px]">
              <motion.div
                className="pointer-events-none absolute left-[8%] top-[10%] h-28 w-28 rounded-full bg-[var(--color-accent-subtle)] blur-3xl"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.16, 1], opacity: [0.55, 0.8, 0.55] }}
                transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              />
              <motion.div
                className="pointer-events-none absolute bottom-[14%] right-[4%] h-36 w-36 rounded-full bg-[var(--color-accent-subtle)] blur-3xl"
                animate={shouldReduceMotion ? undefined : { scale: [1.08, 0.92, 1.08], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 8.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.8 }}
              />

              {POLAROIDS.map(({ src, rot, x, y, width, caption, delay }, i) => (
                <motion.div
                  key={src}
                  data-no-glow="true"
                  className="absolute isolate bg-white"
                  drag
                  dragElastic={0.04}
                  dragMomentum={false}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 26, rotate: rot - 4, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={
                    shouldReduceMotion
                      ? { zIndex: activePolaroid === i ? 20 : i + 1 }
                      : {
                          y: -12,
                          scale: 1.03,
                          zIndex: 200,
                          transition: { duration: 0.22 },
                        }
                  }
                  whileDrag={{ scale: 1.04, zIndex: 300, cursor: 'grabbing' }}
                  transition={{ opacity: { duration: 0.5, delay }, scale: { duration: 0.5, delay } }}
                  onPointerDown={() => setActivePolaroid(i)}
                  style={{
                    left: x,
                    top: y,
                    width,
                    rotate: `${rot}deg`,
                    zIndex: activePolaroid === i ? 200 : i === 1 ? 3 : i === 5 ? 2 : i + 1,
                    padding: '10px 10px 40px',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.20)',
                    cursor: 'grab',
                    touchAction: 'none',
                    filter: 'none',
                    mixBlendMode: 'normal',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: 168 }}>
                    <Image
                      src={src}
                      alt={caption}
                      fill
                      draggable={false}
                      className="pointer-events-none select-none object-cover"
                    />
                  </div>
                  <p
                    className="pointer-events-none select-none"
                    style={{
                      textAlign: 'center',
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 14,
                      color: '#888',
                      marginTop: 8,
                      lineHeight: 1,
                    }}
                  >
                    {caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fade(0.12)} className="space-y-5">
            <motion.p
              className="text-lg leading-relaxed text-[var(--foreground)]"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            >
              I&apos;m a junior at Rutgers University studying Computer Science and Business Analytics &amp; IT (BAIT). I am a fast learner, and love the ability to solve complex puzzles through programming.
            </motion.p>
            <motion.p
              className="leading-relaxed text-[var(--muted-foreground)]"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: 'easeOut' }}
            >
              I&apos;ve been building since high school, from a Django friend-making app to now working on multiagentic solutions. My work blends creativity and functionality.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 pt-2"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
            >
              <motion.a
                href="mailto:leahhamiltonjobs@gmail.com"
                className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
              >
                <MdOutlineEmail style={{ width: '0.9rem', height: '0.9rem' }} />
                email me
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/leahhami"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
              >
                <FaLinkedin style={{ width: '0.9rem', height: '0.9rem' }} />
                linkedin
              </motion.a>
              <motion.a
                href="https://github.com/abstractcubism"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                whileHover={shouldReduceMotion ? undefined : { x: 4 }}
              >
                <FaGithub style={{ width: '0.9rem', height: '0.9rem' }} />
                github
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <History />
      <TechStack />
      <Interests />
    </div>
  );
}
