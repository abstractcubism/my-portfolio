'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt, FaLock, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { PROJECTS, type Project } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);

  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(panelRef.current, {
      y: 24,
      opacity: 0,
      scale: 0.97,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo(
      panelRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', delay: 0.05 }
    );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 md:p-10"
        style={{ boxShadow: '0 32px 80px oklch(0.1 0 0 / 0.25)' }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <span className="font-mono text-5xl font-bold text-[var(--color-accent)] opacity-20 leading-none select-none shrink-0">
            {project.number}
          </span>
          <div>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">{project.title}</h2>
            {project.private && (
              <span className="inline-flex items-center gap-1.5 mt-2 font-mono text-xs text-[var(--muted-foreground)] border border-[var(--border)] rounded-full px-3 py-1">
                <FaLock className="w-3 h-3" /> private
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">{project.description}</p>
        <p className="text-[var(--foreground)] leading-relaxed mb-8">{project.details}</p>

        {/* Images */}
        {project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {project.images.map((src, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border)]"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-[var(--color-accent)] border border-[var(--color-accent-muted)] rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.github || project.live) && (
          <div className="flex gap-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <FaGithub className="w-4 h-4" /> GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors"
              >
                <FaExternalLinkAlt className="w-4 h-4" /> Live site
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 100, rotationX: 12, opacity: 0, scale: 0.92 },
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
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="bg-[var(--background)] overflow-hidden relative z-[5]"
      >
        {/* Section label */}
        <div className="absolute top-8 left-0 right-0 z-10 pointer-events-none px-6">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-[var(--foreground)] leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '-0.01em',
              }}
            >
              projects
            </h2>
          </div>
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
              ref={(el) => { cardsRef.current[i] = el; }}
              onClick={() => setSelectedProject(p)}
              className="group relative flex-shrink-0 w-[70vw] max-w-2xl h-[60vh] max-h-[520px] rounded-2xl border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between p-10 cursor-pointer hover:border-[var(--color-accent)] transition-colors duration-300"
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
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
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

              {/* Tags + expand hint */}
              <div className="flex items-end justify-between gap-4">
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
                <span className="font-mono text-xs text-[var(--color-accent)] opacity-0 group-hover:opacity-60 transition-opacity whitespace-nowrap shrink-0">
                  expand →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
