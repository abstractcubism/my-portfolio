'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { period: 'Jun 2023',   role: 'CS & Eng Academy',   org: 'Voorhees HS',  edu: true  },
  { period: 'May 2024–',  role: 'IT Head Supervisor',  org: 'Rutgers OIT',  edu: false },
  { period: 'Jun 2025',   role: 'AI Engineer Intern',  org: 'CSG',          edu: false },
  { period: 'Oct 2025–',  role: 'AI Technician Co-Op', org: 'CSG',          edu: false },
  { period: 'Mar 2026–',  role: 'Full Stack Dev',       org: 'Taxflow',      edu: false },
  { period: 'May 2027',   role: 'B.S. BAIT + CS',      org: 'Rutgers',      edu: true  },
];

export default function HeroHistory() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const itemsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1, ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[5] bg-[var(--background)] text-[var(--foreground)] px-6 py-20 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {/* heading row */}
        <div className="flex items-baseline justify-between mb-14">
          <h2
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
              lineHeight: 1,
            }}
          >
            experience &amp; education
          </h2>
          <Link
            href="/about"
            className="font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors duration-200 hidden sm:block"
          >
            full timeline →
          </Link>
        </div>

        {/* timeline */}
        <div className="relative">
          {/* connecting line – scaleX animated left→right */}
          <div
            ref={lineRef}
            className="absolute inset-x-0 h-px bg-[var(--border)] pointer-events-none"
            style={{ top: '5px' }}
          />

          {/* horizontal scroll wrapper for small screens */}
          <div className="overflow-x-auto -mx-6 px-6 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
            <div className="grid grid-cols-6 gap-4 min-w-[560px]">
              {ITEMS.map((item, i) => (
                <div
                  key={i}
                  ref={el => { itemsRef.current[i] = el; }}
                  className="flex flex-col"
                >
                  {/* dot sits on the connector line */}
                  <div
                    className={`w-[10px] h-[10px] shrink-0 rounded-full ring-2 ring-[var(--background)] mb-5 ${
                      item.edu
                        ? 'bg-[var(--color-accent)]'
                        : 'bg-[var(--muted-foreground)] opacity-50'
                    }`}
                  />
                  <span className="font-mono text-[10px] leading-tight text-[var(--color-accent)] mb-1">
                    {item.period}
                  </span>
                  <span className="text-[12px] font-semibold text-[var(--foreground)] leading-snug mb-0.5">
                    {item.role}
                  </span>
                  <span className="text-[11px] text-[var(--muted-foreground)] italic leading-tight">
                    {item.org}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
