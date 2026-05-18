'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub, FaLock, FaChevronDown } from 'react-icons/fa';
import FooterBottom from '@/components/FooterBottom';
import { PROJECTS } from '@/lib/projects';
import HeroCursorGlow from '@/components/homepage/HeroCursorGlow';

gsap.registerPlugin(ScrollTrigger);

function CharReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            paddingTop: '0.18em',
            paddingBottom: '0.22em',
            paddingLeft: '0.08em',
            paddingRight: '0.12em',
            marginLeft: '-0.04em',
            marginRight: '-0.04em',
          }}
        >
          <span className="char-inner" style={{ display: 'inline-block' }}>
            {char === ' ' ? ' ' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function ProjectsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = containerRef.current!;

      // ── Hero ─────────────────────────────────────────────────────────
      gsap.fromTo(
        root.querySelectorAll('.hero-title .char-inner'),
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.025, delay: 0.05 }
      );
      gsap.fromTo(
        root.querySelectorAll('.hero-fade'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.28 }
      );
      gsap.fromTo('.scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.6 });
      gsap.to('.scroll-hint', {
        y: 8, repeat: -1, yoyo: true, duration: 1, ease: 'sine.inOut', delay: 1.2,
      });

      // ── Per-section ───────────────────────────────────────────────────
      root.querySelectorAll<HTMLElement>('.project-section').forEach((section) => {
        const ghostNum  = section.querySelector('.ghost-num');
        const chars     = section.querySelectorAll('.proj-title .char-inner');
        const numLabel  = section.querySelector('.proj-num-label');
        const rule      = section.querySelector('.proj-rule');
        const desc      = section.querySelector('.proj-desc');
        const details   = section.querySelector('.proj-details');
        const tags      = section.querySelectorAll('.proj-tag');
        const links     = section.querySelector('.proj-links');
        const mediaWrap = section.querySelector('.media-wrap');
        const mediaReveal = section.querySelector('.media-reveal');

        // Ghost number parallax — independent, scrubbed
        if (ghostNum) {
          gsap.to(ghostNum, {
            y: -120,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.5,
            },
          });
        }

        // Everything else fires together in one timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });

        tl
          // Media panel slides up and fades in
          .fromTo(mediaWrap,
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            0
          )
          // Wipe overlay peels away from right → reveals media
          .fromTo(mediaReveal,
            { scaleX: 1 },
            { scaleX: 0, duration: 1.2, ease: 'expo.inOut', transformOrigin: 'right center' },
            0.25
          )
          // Number label slides in
          .fromTo(numLabel,
            { opacity: 0, x: -18 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
            0
          )
          // Title — char mask-reveal
          .fromTo(chars,
            { yPercent: 115 },
            { yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.022 },
            0.14
          )
          // Rule draws left → right
          .fromTo(rule,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.75, ease: 'power3.inOut', transformOrigin: 'left center' },
            0.52
          )
          // Description fades up
          .fromTo(desc,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
            0.6
          )
          // Details fades up
          .fromTo(details,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
            0.7
          )
          // Tags pop in with stagger
          .fromTo(tags,
            { y: 12, opacity: 0, scale: 0.82 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)', stagger: 0.055 },
            0.76
          )
          // Links fade
          .fromTo(links ?? [],
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            0.96
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} id="projects-page">
      <HeroCursorGlow />
      <main className="text-[var(--foreground)]">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section id="hero" className="relative flex flex-col justify-center min-h-[65vh] border-b border-[var(--border)] px-8 md:px-20 pt-32 pb-20">
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-40 -left-24 w-[65vw] h-[65vw] rounded-full opacity-25 blur-[130px]"
            style={{
              background:
                'radial-gradient(circle, color-mix(in oklch, var(--color-accent) 22%, transparent) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-[10] mx-auto w-full max-w-7xl space-y-8">
            <p
              className="hero-fade font-mono text-xs tracking-widest uppercase text-[var(--muted-foreground)]"
              style={{ opacity: 0 }}
            >
            </p>

            <h1
              className="hero-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(5rem, 14vw, 11rem)',
                lineHeight: 0.8,
                letterSpacing: '-0.05em',
              }}
            >
              <CharReveal text="Projects" />
            </h1>

            <div className="flex items-end justify-between gap-8 pt-2">
              <p
                className="hero-fade max-w-sm text-[var(--muted-foreground)] text-sm leading-relaxed"
                style={{ opacity: 0 }}
              >
                just some things I&apos;ve built :)
              </p>
              <div className="scroll-hint flex flex-col items-center gap-1.5 text-[var(--muted-foreground)] shrink-0 opacity-0">
                <span className="font-mono text-[9px] tracking-widest uppercase">scroll</span>
                <FaChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Project sections ──────────────────────────────────────────── */}
        {PROJECTS.map((project, i) => (
          <section
            key={project.number}
            id={`project-${project.number}`}
            className="project-section relative z-[7] overflow-hidden border-b border-[var(--border)] bg-[var(--background)] px-8 md:px-20 py-28 md:py-40"
          >
            {/* Massive ghost number — parallaxes upward on scroll */}
            <div
              className="ghost-num pointer-events-none absolute select-none text-[var(--color-accent)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(16rem, 46vw, 54rem)',
                lineHeight: 0.75,
                opacity: 0.07,
                letterSpacing: '-0.06em',
                ...(i % 2 === 0 ? { right: '-5vw' } : { left: '-5vw' }),
                top: '8%',
              }}
            >
              {+project.number}
            </div>

            <div className="relative mx-auto max-w-7xl grid gap-14 lg:gap-24 lg:grid-cols-2 items-center">

              {/* ── Content ── */}
              <div className={`space-y-7 ${i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>

                {/* Number + private badge */}
                <div className="proj-num-label flex items-center gap-3" style={{ opacity: 0 }}>
                  <span
                    className="font-mono text-xs tracking-widest"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {project.number}
                  </span>
                  {project.private && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--muted-foreground)] border border-[var(--border)] rounded-full px-2.5 py-0.5">
                      <FaLock className="w-2.5 h-2.5" /> private
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2
                  className="proj-title"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                  }}
                >
                  <CharReveal text={project.title} />
                </h2>

                {/* Drawn rule */}
                <div
                  className="proj-rule h-px bg-[var(--border)]"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
                />

                {/* Description */}
                <p
                  className="proj-desc leading-relaxed"
                  style={{ opacity: 0, fontWeight: 300, letterSpacing: '0.01em', color: 'var(--color-accent)' }}
                >
                  {project.description}
                </p>

                {/* Details */}
                <p
                  className="proj-details text-sm leading-relaxed"
                  style={{ opacity: 0, fontWeight: 300, letterSpacing: '0.01em' }}
                >
                  {project.details}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="proj-tag font-mono text-[11px] border rounded-full px-3 py-1"
                      style={{
                        color: 'var(--color-accent)',
                        borderColor: 'var(--color-accent-muted)',
                        opacity: 0,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(project.github || project.live) && (
                  <div className="proj-links flex items-center gap-5" style={{ opacity: 0 }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <FaGithub className="w-4 h-4" /> GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <FaExternalLinkAlt className="w-3.5 h-3.5" /> Live site
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* ── Media panel ── */}
              <div
                className={`media-wrap ${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
                style={{ opacity: 0 }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl border border-[var(--border)]"
                  style={{ aspectRatio: '16 / 9' }}
                >
                  {/* Actual media */}
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : project.images?.[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : project.comingSoon ? (
                    /* ── Coming soon: terminal mockup (matches LoadAnimation style) ── */
                    <div className="absolute inset-0 flex flex-col bg-[var(--background)]">
                      {/* Title bar — identical to LoadAnimation */}
                      <div
                        className="flex items-center gap-2 px-4 h-9 border-b border-[var(--border)] shrink-0"
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
                      <div className="flex-1 px-5 py-5 font-mono text-[13px] leading-6 bg-[var(--background)]">
                        {[
                          '* context loaded',
                          '* dependencies resolved',
                          '* vibes immaculate',
                        ].map((line, i) => (
                          <div key={i} style={{ color: 'var(--muted-foreground)' }}>{line}</div>
                        ))}
                        <div className="flex items-center" style={{ color: 'var(--foreground)' }}>
                          <span>* cooking something up...</span>
                          <span
                            className="inline-block ml-px animate-pulse"
                            style={{ width: 7, height: 14, background: 'var(--color-accent)' }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ── Placeholder: browser-chrome mockup ── */
                    <div className="absolute inset-0 flex flex-col bg-[var(--background)]">
                      {/* Chrome bar */}
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] shrink-0">
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ background: 'var(--border)' }}
                            />
                          ))}
                        </div>
                        <div
                          className="flex-1 h-4 rounded-full mx-4 opacity-30"
                          style={{ background: 'var(--border)' }}
                        />
                      </div>

                      {/* Body */}
                      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                        {/* Dot grid */}
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle, color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                            opacity: 0.4,
                          }}
                        />
                        {/* Project name watermark */}
                        <div className="relative text-center select-none px-8 space-y-3">
                          <p
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontStyle: 'italic',
                              fontSize: 'clamp(1.6rem, 4.5vw, 3.5rem)',
                              lineHeight: 1,
                              letterSpacing: '-0.04em',
                              color: 'var(--foreground)',
                              opacity: 0.07,
                            }}
                          >
                            {project.title}
                          </p>
                          <p
                            className="font-mono text-[9px] tracking-widest uppercase"
                            style={{ color: 'var(--muted-foreground)', opacity: 0.4 }}
                          >
                            demo · preview
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wipe-reveal overlay — GSAP peels this from right to left */}
                  <div
                    className="media-reveal absolute inset-0"
                    style={{
                      background: 'var(--background)',
                      transformOrigin: 'right center',
                    }}
                  />
                </div>

                {/* Caption below media */}
                <p className="mt-3 font-mono text-[10px] tracking-widest uppercase text-[var(--muted-foreground)] opacity-40 text-right">
                  {project.video ? 'demo' : project.images?.[0] ? 'screenshot' : 'preview pending'}
                </p>
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="relative z-[5] px-8 md:px-20 pb-14 pt-20 bg-[var(--background)]">
        <div className="mx-auto max-w-7xl">
          <FooterBottom />
        </div>
      </footer>
    </div>
  );
}
