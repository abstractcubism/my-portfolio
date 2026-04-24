"use client";
import { Timeline } from "./ui/timeline";

export default function History() {
  const data = [
    {
      title: "May 2027",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
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
      title: "October 2025 – Present",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            AI Technician Co-Op
          </h3>
          <p className="text-[var(--muted-foreground)]">Construction Specialties Group</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Templating and researching AI solutions for common problem types</li>
            <li>Developing a failure prediction model with analytics reporting on factory machinery</li>
          </ul>
        </div>
      ),
    },
    {
      title: "June 2025 – Aug 2025",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            AI Engineer Intern
          </h3>
          <p className="text-[var(--muted-foreground)]">Construction Specialties Group</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Built internal Azure AI Foundry LLM with Oracle DB + Microsoft Fabric</li>
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
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Head Supervisor / IT Support Specialist
          </h3>
          <p className="text-[var(--muted-foreground)]">Rutgers Office of Information Technology</p>
          <ul className="list-disc list-inside text-[var(--foreground)] mt-2 space-y-1">
            <li>Lead Help Desk operations, supervise 100+ consultants</li>
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
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
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
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
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
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
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
    <section id="timeline" className="py-24 px-6 scroll-mt-24 bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden transition-colors duration-500">
      <Timeline data={data} />
    </section>
  );
}

