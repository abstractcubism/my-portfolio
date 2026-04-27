'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type InterestItem = {
  id: string;
  title: string;
  detail: string;
  description: string;
  color: string;
  pos: { x: number; y: number }; // % of sticker container (right column)
  rotation: number;
  emoji: string;
};

type ConcertPhoto = {
  src: string;
  artist: string;
  venue: string;
  rotation: number;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const INTERESTS: InterestItem[] = [
  {
    id: 'creative',
    title: 'creative',
    detail: 'default setting — ideas first',
    description:
      'Default mode. Whether designing a UI, architecting a system, or sketching on a whiteboard — creativity is always where it starts.',
    color: '#c4b5fd',
    pos: { x: 18, y: 10 },
    rotation: -8,
    emoji: '✦',
  },
  {
    id: 'concerts',
    title: 'concert attendee',
    detail: 'live volume — worth the ringing ears',
    description:
      "Front row whenever possible. There's nothing like the physical energy of live music — the kind you feel in your chest before you even hear it.",
    color: '#fb7185',
    pos: { x: 60, y: 6 },
    rotation: 6,
    emoji: '♪',
  },
  {
    id: 'matcha',
    title: 'matcha enjoyer',
    detail: 'daily ritual — whisked > shaken',
    description:
      'Ceremonial grade, daily ritual. Homemade beats any café version. The ten minutes it takes to make is a feature, not a bug.',
    color: '#6ee7b7',
    pos: { x: 12, y: 52 },
    rotation: 4,
    emoji: '◈',
  },
  {
    id: 'overwatch',
    title: 'diamond in OW2',
    detail: 'competitive mode — queueing support',
    description:
      'Hit Diamond as a support main. Coordinating randoms under pressure turns out to be great practice for real-world teamwork.',
    color: '#93c5fd',
    pos: { x: 54, y: 50 },
    rotation: -5,
    emoji: '◆',
  },
  {
    id: 'restaurants',
    title: 'restaurant connoisseur',
    detail: 'city notes — always taking recs',
    description:
      'New spot every week. NYC has too many great restaurants to eat at the same place twice — the list is always growing.',
    color: '#fcd34d',
    pos: { x: 32, y: 80 },
    rotation: 7,
    emoji: '✿',
  },
];

// Replace src paths and fill in artist/venue once you have concert photos
const CONCERT_PHOTOS: ConcertPhoto[] = [
  { src: '/hero1.jpg', artist: 'Artist Name', venue: 'Venue · City', rotation: -5 },
  { src: '/hero2.jpg', artist: 'Artist Name', venue: 'Venue · City', rotation: 3 },
  { src: '/hero3.jpg', artist: 'Artist Name', venue: 'Venue · City', rotation: -2 },
  { src: '/hero4.jpg', artist: 'Artist Name', venue: 'Venue · City', rotation: 4 },
  { src: '/hero5.jpg', artist: 'Artist Name', venue: 'Venue · City', rotation: -3 },
  { src: '/hero6.jpg', artist: 'Artist Name', venue: 'Venue · City', rotation: 5 },
];

// ─── Concert polaroids ────────────────────────────────────────────────────────

function ConcertPolaroids() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {CONCERT_PHOTOS.map((photo, i) => (
        <motion.div
          key={photo.src}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.06 + i * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 hover:scale-105 transition-transform duration-200"
          style={{ rotate: photo.rotation }}
        >
          {/* Polaroid frame */}
          <div className="bg-white p-1.5 pb-7 shadow-[0_6px_22px_rgba(0,0,0,0.38)]">
            <div className="relative overflow-hidden" style={{ width: '92px', height: '92px' }}>
              <Image
                src={photo.src}
                alt={photo.artist}
                fill
                className="object-cover"
                sizes="92px"
              />
            </div>
            <div className="mt-1.5 px-0.5 text-center">
              <p className="truncate font-mono text-[7.5px] leading-tight text-gray-700">
                {photo.artist}
              </p>
              <p className="truncate font-mono text-[6.5px] text-gray-400">{photo.venue}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Sticker ─────────────────────────────────────────────────────────────────
//
// The drag fix: separate the entrance animation (inner motion.div, opacity+scale only)
// from the positioning+drag (outer plain div, raw CSS transform). framer-motion's
// whileInView "owns" whichever motion values it animates — if y is in whileInView,
// our style.y gets overridden. By keeping drag in raw CSS we avoid that entirely.

function Sticker({
  item,
  index,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
  shouldReduceMotion,
}: {
  item: InterestItem;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  shouldReduceMotion: boolean | null;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const movedPx = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const isActive = isSelected || isHovered;

  return (
    // Outer plain div — owns absolute position + drag via raw CSS transform (no framer conflict)
    <div
      className="cursor-grab active:cursor-grabbing"
      style={{
        position: 'absolute',
        left: `${item.pos.x}%`,
        top: `${item.pos.y}%`,
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${item.rotation}deg)`,
        zIndex: isActive ? 30 : index + 5,
        touchAction: 'none',
        willChange: 'transform',
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        movedPx.current = 0;
        lastPos.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        movedPx.current += Math.abs(dx) + Math.abs(dy);
        lastPos.current = { x: e.clientX, y: e.clientY };
        setOffset((p) => ({ x: p.x + dx, y: p.y + dy }));
      }}
      onPointerUp={() => {
        dragging.current = false;
        if (movedPx.current < 6) onSelect();
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Inner motion.div — entrance animation only (opacity + scale, no x/y/rotate) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Active-state scale */}
        <motion.div
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.18 }}
          className="relative select-none"
        >
          {/* Placeholder sticker — swap for <Image src={item.stickerSrc} fill /> once PNGs are ready */}
          <div
            className="flex flex-col items-center justify-between gap-1 rounded-2xl border p-3"
            style={{
              width: '88px',
              height: '88px',
              backgroundColor: `${item.color}14`,
              borderColor: `${item.color}50`,
              backdropFilter: 'blur(10px)',
              boxShadow: isActive
                ? `0 8px 28px ${item.color}45, 0 2px 10px rgba(0,0,0,0.35)`
                : '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
              style={{ background: `${item.color}22`, color: item.color }}
            >
              {item.emoji}
            </div>
            <p
              className="line-clamp-2 text-center font-mono text-[7px] leading-tight"
              style={{ color: item.color }}
            >
              {item.title}
            </p>
          </div>

          {/* Selection ring — only on click-pinned, not hover */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                key="ring"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute -inset-2 rounded-[22px] border-2"
                style={{ borderColor: item.color }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Info panel ───────────────────────────────────────────────────────────────

function InfoPanel({
  interest,
  shouldReduceMotion,
}: {
  interest: InterestItem | null;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <div className="relative min-h-[260px]">
      <AnimatePresence mode="wait">
        {interest ? (
          <motion.div
            key={interest.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 h-px origin-left"
              style={{ background: interest.color, width: '3rem' }}
            />
            <h2
              className="mb-3 leading-[1.05]"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                color: 'var(--foreground)',
              }}
            >
              {interest.title}
            </h2>
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em]"
              style={{ color: interest.color }}
            >
              {interest.detail}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
              {interest.description}
            </p>

            {interest.id === 'concerts' && <ConcertPolaroids />}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
                lineHeight: 1.05,
                color: 'var(--foreground)',
              }}
            >
              decorate<br />my laptop!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section fade helper ──────────────────────────────────────────────────────

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AboutInterests() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Hover preview overrides the pinned selection in the panel; on mouse-leave the
  // pinned selection (if any) snaps back into view.
  const activeId = hoveredId ?? selectedId;
  const activeInterest = INTERESTS.find((i) => i.id === activeId) ?? null;

  return (
    // z-20 so the laptop overflows above the TechStack section (which is z-10).
    // overflow-hidden removed so the laptop PNG is not clipped; body handles x-scroll.
    <section className="relative z-20 border-b border-[var(--border)] px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">

        {/* ── Left: info panel ── */}
        <motion.div {...fade()} className="relative z-20 lg:h-[560px] lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
            interests
          </p>
          <InfoPanel interest={activeInterest} shouldReduceMotion={shouldReduceMotion} />
        </motion.div>

        {/* ── Right: laptop + stickers ── */}
        <motion.div
          {...fade(0.1)}
          className="relative min-h-[380px] lg:min-h-[560px]"
        >
          {/* Glow blob */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-subtle)] blur-3xl lg:left-auto lg:right-[-4rem] lg:h-[30rem] lg:w-[30rem] lg:translate-x-0"
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }
            }
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />

          {/* Laptop — purely decorative, pointer-events-none */}
          <motion.div
            data-no-glow="true"
            className="pointer-events-none absolute top-1/2 w-[160vw] max-w-[92rem] -translate-y-1/2 lg:w-[92vw]"
            style={{ right: '-28vw' }}
            initial={
              shouldReduceMotion
                ? { opacity: 1, rotate: 23, scale: 1, scaleX: -1, scaleY: -1 }
                : { opacity: 0, x: 220, rotate: 48, scale: 0.94, scaleX: -1, scaleY: -1 }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, x: 0, rotate: 23, scale: 1, scaleX: -1, scaleY: -1 }
            }
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-square w-full">
              <Image
                src="/laptop.png"
                alt="Laptop"
                fill
                sizes="(min-width: 1024px) 92vw, 160vw"
                className="object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.28)]"
                draggable={false}
                priority={false}
              />
            </div>
          </motion.div>

          {/* Sticker layer — pointer-events-none on container, restored per-sticker */}
          <div className="pointer-events-none absolute inset-0">
            {INTERESTS.map((item, i) => (
              <div key={item.id} style={{ pointerEvents: 'auto' }}>
                <Sticker
                  item={item}
                  index={i}
                  isSelected={selectedId === item.id}
                  isHovered={hoveredId === item.id}
                  onSelect={() =>
                    setSelectedId((prev) => (prev === item.id ? null : item.id))
                  }
                  onHoverStart={() => setHoveredId(item.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
