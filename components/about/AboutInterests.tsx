'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type InterestItem = {
  id: string;
  title: string;
  description: string;
  color: string;
  pos: { x: number; y: number }; // % of sticker container (right column)
  rotation: number;
  stickerSrc: string;
  size?: number;
  credit?: { label: string; url: string };
};

type ConcertPhoto = {
  src: string;
  artist: string;
  rotation: number;
  objectPosition?: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const INTERESTS: InterestItem[] = [
  {
    id: 'creative',
    title: 'creative',
    description:
      'I always try to include creativity in anything I work on. From this website to design work for previous roles, my experience with the Adobe Creative Cloud Suite helps me across all of my projects. The stickers in this section were made by me!',
    color: '#c4b5fd',
    pos: { x: 26, y: 12 },
    rotation: -8,
    stickerSrc: '/stickers/adobesticker.png',
    size: 80,
  },
  {
    id: 'concerts',
    title: 'concert attendee',
    description:
      "There's almost never a moment when I'm not listening to music, and getting to see artists live is one of my favorite things. Below you can find some pictures I took at concerts I've been to recently!",
    color: '#fb7185',
    pos: { x: 58, y: 10 },
    rotation: 6,
    stickerSrc: '/stickers/TAMEIMPALASTICKER.png',
    size: 240,
  },
  {
    id: 'matcha',
    title: 'matcha enjoyer',
    description:
      "I'm always looking for new matcha spots, when I'm not at home whisking my own. Some of my favorite matcha pairings are a mango matcha latte or matcha beignets!",
    color: '#6ee7b7',
    pos: { x: 24, y: 52 },
    rotation: 4,
    stickerSrc: '/stickers/matchasticker.png',
  },
  {
    id: 'overwatch',
    title: 'overwatch',
    description:
      "I love video games, especially Overwatch! This sticker is of Juno, my main as a support player who recently hit diamond. I'm also a big fan of Valorant, Destiny 2, Hades, and Balatro!",
    color: '#93c5fd',
    pos: { x: 56, y: 48 },
    rotation: -5,
    stickerSrc: '/stickers/profilesticker.png',
    size: 140,
    credit: { label: '@Tsugumi_uwu', url: 'https://x.com/Tsugumi_uwu/status/1928739220765683767?s=20' },
  },
  {
    id: 'restaurants',
    title: 'restaurant connoisseur',
    description:
      "I'm always on the hunt for a new restaurant, cafe, or dessert spot to try so I can add them to my Beli account. On the reciept, you can see some of my favorite haunts, as well as a total of how many spots I tried in 2025. Here's to many more this year!",
    color: '#fcd34d',
    pos: { x: 36, y: 60 },
    rotation: 7,
    stickerSrc: '/stickers/recieptsticker.png',
    size: 240,
  },
];

const CONCERT_PHOTOS: ConcertPhoto[] = [
  { src: '/concertPhotos/twice.JPEG', artist: 'twice', rotation: -9, objectPosition: 'center' },
  { src: '/concertPhotos/tame.JPEG', artist: 'tame impala', rotation: 6, objectPosition: 'center' },
  { src: '/concertPhotos/pink.JPEG', artist: 'pinkpantheress', rotation: -3, objectPosition: 'center 60%' },
  { src: '/concertPhotos/jane.JPEG', artist: 'baby jane', rotation: 11, objectPosition: 'center' },
  { src: '/concertPhotos/tyler.JPEG', artist: 'tyler, the creator', rotation: -7, objectPosition: 'center' },
  { src: '/concertPhotos/ian.JPEG', artist: 'dpr ian', rotation: 4, objectPosition: 'center 70%' },
];

// ─── Design work ─────────────────────────────────────────────────────────────

type DesignPiece = {
  src: string;
  title: string;
  kind: string;
};

const DESIGN_PIECES: DesignPiece[] = [
  { src: '/graphicDesignSamples/kt-menu.webp', title: 'KT Menu', kind: 'Menu' },
  { src: '/graphicDesignSamples/oit-picnic.webp', title: 'OIT Picnic', kind: 'Poster' },
  { src: '/graphicDesignSamples/game-night.webp', title: 'Game Night', kind: 'Poster' },
];

function DesignGallery() {
  const [lightbox, setLightbox] = useState<DesignPiece | null>(null);

  const lightboxEl = (
    <AnimatePresence>
      {lightbox && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ y: -80, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-sm shadow-2xl" style={{ width: 'min(520px, 85vw)', height: 'min(75vh, 693px)' }}>
              <Image
                src={lightbox.src}
                alt={lightbox.title}
                fill
                className="object-contain"
                sizes="520px"
              />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c4b5fd]">{lightbox.kind}</p>
              <p className="font-mono text-[10px] text-[var(--muted-foreground)]">{lightbox.title}</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-mono text-xs text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="mt-5 flex gap-3">
        {DESIGN_PIECES.map((piece, i) => (
          <motion.button
            key={piece.src}
            initial={{ opacity: 0, y: -60, rotate: (i - 1) * 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.05 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setLightbox(piece)}
            className="group shrink-0 text-left focus:outline-none"
          >
            <div className="relative overflow-hidden rounded-sm bg-white/5 border border-white/10 transition-all duration-200 group-hover:border-[#c4b5fd]/40 group-hover:scale-[1.03]" style={{ width: '130px', height: '174px' }}>
              <Image
                src={piece.src}
                alt={piece.title}
                fill
                className="object-cover"
                sizes="130px"
              />
            </div>
            <p className="mt-1.5 font-mono text-[7.5px] text-[var(--muted-foreground)] truncate w-[130px]">
              {piece.kind}
            </p>
          </motion.button>
        ))}
      </div>

      {typeof window !== 'undefined' && createPortal(lightboxEl, document.body)}
    </>
  );
}

// ─── Concert polaroids ────────────────────────────────────────────────────────

const POLAROID_OFFSETS = [0, -16, 12, -20, 10, -8];

function ConcertPolaroids() {
  return (
    <div className="mt-5 flex flex-wrap gap-3 overflow-visible px-4 pb-8">
      {CONCERT_PHOTOS.map((photo, i) => (
        <motion.div
          key={photo.src}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.06 + i * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 hover:scale-105 transition-transform duration-200"
          style={{
            rotate: photo.rotation,
            translateY: POLAROID_OFFSETS[i] ?? 0,
          }}
        >
          <div className="bg-white/90 p-[3px] pb-4 shadow-[0_4px_14px_rgba(0,0,0,0.28)]">
            <div className="relative overflow-hidden" style={{ width: '108px', height: '108px' }}>
              <Image
                src={photo.src}
                alt={photo.artist}
                fill
                className="object-cover"
                style={{ objectPosition: photo.objectPosition ?? 'center' }}
                sizes="108px"
              />
            </div>
            <p className="mt-1 truncate text-center font-mono text-[6.5px] leading-tight text-gray-600 px-0.5">
              {photo.artist}
            </p>
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
}: {
  item: InterestItem;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const movedPx = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const isActive = isSelected || isHovered;
  const size = item.size ?? 128;

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
      <div className="relative select-none">
        <div
          className="relative overflow-visible"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            filter: isSelected
              ? `drop-shadow(0 0 12px ${item.color}) drop-shadow(0 8px 20px ${item.color}88) drop-shadow(0 2px 8px rgba(0,0,0,0.4))`
              : isHovered
              ? `drop-shadow(0 8px 18px ${item.color}55) drop-shadow(0 2px 8px rgba(0,0,0,0.4))`
              : 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))',
          }}
        >
          <Image
            src={item.stickerSrc}
            alt={item.title}
            fill
            className="object-contain select-none"
            sizes={`${size}px`}
            draggable={false}
          />
        </div>
      </div>
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
            <p className="max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
              {interest.description}
            </p>

            {interest.credit && (
              <p className="mt-3 font-mono text-[9px] text-[var(--muted-foreground)] opacity-60">
                sticker art by{' '}
                <a
                  href={interest.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:opacity-100 transition-opacity"
                >
                  {interest.credit.label}
                </a>
              </p>
            )}

            {interest.id === 'creative' && <DesignGallery />}
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
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
              drag to move the stickers around,<br />(or click on them to find out more :)
            </p>
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
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
