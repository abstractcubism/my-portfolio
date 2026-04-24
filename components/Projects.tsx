'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: '01',
    title: 'Portfolio Website',
    description:
      'The site you\'re on. Built with Next.js 15, Tailwind CSS v4, GSAP, and Framer Motion. Features a terminal load animation, ASCII cube renderer, and GSAP horizontal scroll.',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind'],
    github: 'https://github.com/abstractcubism/my-portfolio',
    live: null,
    private: false,
  },
  {
    number: '02',
    title: 'Taxflow',
    description:
      'Full-stack tax workflow application built for an unannounced startup. React frontend, Supabase backend, Stripe payments, Clerk auth, and an LLM-based document identification pipeline.',
    tags: ['React', 'Supabase', 'Stripe', 'Python', 'LLM'],
    github: null,
    live: null,
    private: true,
  },
  {
    number: '03',
    title: 'Data Analytics Assistant',
    description:
      'Internal AI assistant built in Microsoft AI Foundry during an internship at Construction Specialties. Connected to SuperScreen DB + Microsoft Fabric; supports natural-language SQL querying over large purchase order datasets.',
    tags: ['Azure AI Foundry', 'Python', 'SQL', 'Microsoft Fabric'],
    github: null,
    live: null,
    private: true,
  },
];

export default function Projects() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Give the track tween an ID for containerAnimation reference
      const trackTween = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Flip-up animation for each card as it enters view
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        gsap.fromTo(card, 
          { 
            y: 100, 
            rotationX: 12, 
            opacity: 0,
            scale: 0.92,
          },
          {
            y: 0,
            rotationX: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: trackTween,
              start: 'left 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[var(--background)] overflow-hidden"
    >
      {/* Section label pinned top-left */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--color-accent)]">
          selected work
        </p>
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 pl-[10vw] pr-[10vw] h-screen"
        style={{ width: `${PROJECTS.length * 80 + 20}vw` }}
      >
        {PROJECTS.map((p, i) => (
          <article
            key={p.number}
            ref={el => { cardsRef.current[i] = el; }}
            className="flex-shrink-0 w-[70vw] max-w-2xl h-[60vh] max-h-[520px] rounded-2xl border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between p-10"
            style={{ boxShadow: '0 16px 48px oklch(0.1 0 0 / 0.06)' }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <span className="font-mono text-4xl font-bold text-[var(--color-accent)] opacity-25 leading-none select-none">
                {p.number}
              </span>
              <div className="flex items-center gap-3">
                {p.private && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-[var(--muted-foreground)] border border-[var(--border)] rounded-full px-3 py-1">
                    <FaLock className="w-3 h-3" /> private
                  </span>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live site"
                    className="text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Title + description */}
            <div>
              <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)]">{p.title}</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-base">{p.description}</p>
            </div>

            {/* Tag row */}
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-[var(--color-accent)] border border-[var(--color-accent-muted)] rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
