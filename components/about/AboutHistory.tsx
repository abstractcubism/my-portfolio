"use client";
import { motion } from "motion/react";
import React from "react";

export default function History() {
  const data = [
    {
      title: "May 2027",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            Rutgers, The State University of New Jersey
          </h3>
          <p className="text-[var(--muted-foreground)]">Rutgers Business School</p>
          <p className="italic text-[var(--muted-foreground)]">GPA: 3.5 — Dean’s List Sophomore Year, Fall of Junior Year</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Bachelor in Business Analytics and IT (BAIT) and Computer Science</li>
            <li>Courses: Data Structures, Python, SQL, R, Statistics, Business Fundamentals</li>
          </ul>
        </div>
      ),
    },
    {
      title: "June 2026 – August 2026",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            Technology Intern
          </h3>
          <p className="text-[var(--muted-foreground)]">Macy&apos;s</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Upcoming for Summer 2026!</li>
            <li>AI and Data Analytics team</li>
          </ul>
        </div>
      ),
    },
    {
      title: "March 2026 – Present",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            Full Stack Developer (Freelance)
          </h3>
          <p className="text-[var(--muted-foreground)]">Taxflow - An unannounced startup</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Redesign and implement web application using React</li>
            <li>Establish connections to SupaBase, Stripe, Clerk, and other third-party services</li>
            <li>Develop identification LLM connected to an AI based on confidence scores</li>
          </ul>
        </div>
      ),
    },
    {
      title: "October 2025 – May 2026",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            AI Technician Co-Op
          </h3>
          <p className="text-[var(--muted-foreground)]">Construction Specialties Group</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Developed a multi-agentic ITSM solution for managing and optimizing IT services</li>
            <li>Developed and connected to an MCP server for modifying Outlook Calendar and Fabric tables</li>
          </ul>
        </div>
      ),
    },
    {
      title: "June 2025 – Aug 2025",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            AI Engineer Intern
          </h3>
          <p className="text-[var(--muted-foreground)]">Construction Specialties Group</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Built internal Data Analytics Assistant in Microsoft AI Foundry with access to SuperScreen DB + Microsoft Fabric</li>
            <li>Wrote sample SQL queries for large purchase order datasets</li>
            <li>Developed HR LLM in Python + Flask web app</li>
          </ul>
        </div>
      ),
    },
    {
      title: "May 2024 – Present",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            Head Supervisor / IT Support Specialist
          </h3>
          <p className="text-[var(--muted-foreground)]">Rutgers Office of Information Technology</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Lead Help Desk operations, supervise 200+ consultants</li>
            <li>Resolve advanced hardware/software/network issues via ServiceNow</li>
            <li>Managed outages independently during late shifts</li>
          </ul>
        </div>
      ),
    },
    {
      title: "October 2021 – February 2025",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            Manager
          </h3>
          <p className="text-[var(--muted-foreground)]">Kuay Tiew Noodles and More</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Supervised 10+ staff, maintained 4.6 Google rating</li>
            <li>Designed menus with Adobe InDesign, Illustrator, Photoshop</li>
            <li>Handled customer service challenges in high-pressure environment</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Summer 2023 – 2024",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            IT Intern
          </h3>
          <p className="text-[var(--muted-foreground)]">Voorhees High School</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Reimaged and refurbished 1,000+ laptops/desktops</li>
            <li>Repaired laptops (screens, batteries, keyboards)</li>
          </ul>
        </div>
      ),
    },
    {
      title: "June 2023",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-accent)]">
            Computer Science & Applied Engineering Academy
          </h3>
          <p className="text-[var(--muted-foreground)]">Voorhees High School</p>
          <p className="italic text-[var(--muted-foreground)]">GPA: 3.7 — National Technical Honors Society</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>1 of 25 students selected for 4-year technical program</li>
            <li>Completed projects in programming, ML, data analytics, networking, cybersecurity</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="timeline" className="px-6 pb-8 pt-24 scroll-mt-24 bg-[var(--background)] text-[var(--foreground)] relative z-10 overflow-hidden transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-[var(--foreground)] leading-none mb-12"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '-0.01em',
          }}
        >
          experience &amp; education
        </h2>

        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
            className="group grid grid-cols-[2.5rem_1fr] gap-x-6 py-8 border-t border-[var(--border)]"
          >
            <span
              className="font-mono text-sm pt-0.5 text-[var(--color-accent)] tabular-nums"
              aria-hidden
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <span className="inline-block font-mono text-xs text-[var(--muted-foreground)] tracking-wide mb-2">
                {item.title}
              </span>
              {item.content}
            </div>
          </motion.div>
        ))}

        <div className="border-t border-[var(--border)]" />
      </div>
    </section>
  );
}

