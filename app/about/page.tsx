'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaDownload } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// ASCII art decorations
const ASCII_DECOR = {
  fern: `
  \\|/
   |
  /|\\`,
  mushroom: `
   .-.
  (o o)
  ( | )
   \\_/`,
  sparkles: `
  *.  .  *
    \\|/
  *  .  *`,
};

const TIMELINE = [
  {
    period: 'May 2027',
    title: 'Rutgers University',
    subtitle: 'Bachelor in Business Analytics and IT (BAIT) + Computer Science',
    details: ['GPA: 3.5 — Dean\'s List', 'Courses: Data Structures, Python, SQL, R, Statistics'],
    type: 'education',
  },
  {
    period: 'Mar 2026 – Present',
    title: 'Full Stack Developer (Freelance)',
    subtitle: 'Taxflow - Unannounced Startup',
    details: ['Redesign with React', 'Supabase, Stripe, Clerk', 'LLM document identification'],
    type: 'work',
  },
  {
    period: 'Oct 2025 – Present',
    title: 'AI Technician Co-Op',
    subtitle: 'Construction Specialties Group',
    details: ['Multi-agentic ITSM solution', 'MCP server for Outlook + Fabric'],
    type: 'work',
  },
  {
    period: 'Jun 2025 – Aug 2025',
    title: 'AI Engineer Intern',
    subtitle: 'Construction Specialties Group',
    details: ['Data Analytics Assistant in Azure AI Foundry', 'HR LLM in Python + Flask'],
    type: 'work',
  },
  {
    period: 'May 2024 – Present',
    title: 'Head Supervisor / IT Support',
    subtitle: 'Rutgers Office of Information Technology',
    details: ['Lead Help Desk, 200+ consultants', 'ServiceNow, hardware/software/network'],
    type: 'work',
  },
];

const SKILLS = [
  { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'R'] },
  { category: 'AI/ML', items: ['PyTorch', 'scikit-learn', 'Azure AI Foundry', 'LLMs'] },
  { category: 'Web', items: ['React', 'Next.js', 'Tailwind CSS', 'GSAP'] },
  { category: 'Tools', items: ['Git', 'Docker', 'ServiceNow', 'Microsoft Fabric'] },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline items stagger in from bottom
      gsap.from('.timeline-item', {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
      });

      // Skills fade in
      gsap.from('.skill-card', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-20 pb-24"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="mb-16">
          <pre className="font-mono text-xs text-[var(--color-accent)] mb-4 opacity-60">
{ASCII_DECOR.sparkles}
          </pre>
          <h1 
            className="font-extrabold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            about me
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl">
            I&apos;m a senior at Rutgers studying Business Analytics & IT + Computer Science. 
            I build things that blend software engineering with AI — currently freelancing 
            on a tax workflow startup and working as an AI Technician Co-Op at Construction Specialties.
          </p>
        </header>

        {/* Timeline */}
        <section ref={timelineRef} className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <pre className="font-mono text-xs text-[var(--color-accent)]">
{ASCII_DECOR.fern}
            </pre>
            <h2 className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--color-accent)]">
              timeline
            </h2>
          </div>

          <div className="relative border-l border-[var(--border)] ml-3">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className="timeline-item relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div 
                  className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[var(--background)] ${
                    item.type === 'education' ? 'bg-[var(--color-accent)]' : 'bg-[var(--foreground)]'
                  }`}
                />
                
                <span className="font-mono text-xs text-[var(--muted-foreground)] block mb-1">
                  {item.period}
                </span>
                <h3 className="text-lg font-bold mb-0.5">{item.title}</h3>
                <p className="text-[var(--muted-foreground)] text-sm mb-2">{item.subtitle}</p>
                <ul className="space-y-1">
                  {item.details.map((detail, j) => (
                    <li key={j} className="font-mono text-xs text-[var(--muted-foreground)] flex items-center gap-2">
                      <span className="text-[var(--color-accent)]">›</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <pre className="font-mono text-xs text-[var(--color-accent)]">
{ASCII_DECOR.mushroom}
            </pre>
            <h2 className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--color-accent)]">
              skills
            </h2>
          </div>

          <div className="skills-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {SKILLS.map((group) => (
              <div
                key={group.category}
                className="skill-card p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]"
              >
                <h3 className="font-mono text-xs text-[var(--color-accent)] mb-3">{group.category}</h3>
                <ul className="space-y-1.5">
                  {group.items.map((skill) => (
                    <li key={skill} className="text-sm text-[var(--foreground)]">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Download */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--color-accent)]">
              resume
            </h2>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--color-accent)] transition-colors group"
          >
            <FaDownload className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors" />
            <span className="font-medium">Download Resume</span>
          </a>
        </section>

        {/* Back to home link */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <Link
            href="/"
            className="font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--color-accent)] transition-colors"
          >
            ← back to home
          </Link>
        </div>

      </div>
    </div>
  );
}