"use client";
import { Timeline } from "./ui/timeline";

export default function History() {
  const data = [
    {
      title: "May 2027",
      content: (
        <div>
          <h3 className="text-indigo-400 text-lg font-semibold">
            Rutgers, The State University of New Jersey
          </h3>
          <p className="text-gray-300">Rutgers Business School</p>
          <p className="text-gray-400 italic">GPA: 3.5 • Dean’s List Sophomore Year</p>
          <ul className="list-disc list-inside text-white mt-2 space-y-1">
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
          <h3 className="text-indigo-400 text-lg font-semibold">
            AI Technician Co-Op
          </h3>
          <p className="text-gray-300">Construction Specialties Group</p>
          <ul className="list-disc list-inside text-white mt-2 space-y-1">
            <li>Developing a failure prediction model with analytics reporting on factory machinery</li>
          </ul>
        </div>
      ),
    },
    {
      title: "June 2025 – Aug 2025",
      content: (
        <div>
          <h3 className="text-indigo-400 text-lg font-semibold">
            AI Engineer Intern
          </h3>
          <p className="text-gray-300">Construction Specialties Group</p>
          <ul className="list-disc list-inside text-white mt-2 space-y-1">
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
          <h3 className="text-indigo-400 text-lg font-semibold">
            Head Supervisor / IT Support Specialist
          </h3>
          <p className="text-gray-300">Rutgers Office of Information Technology</p>
          <ul className="list-disc list-inside text-white mt-2 space-y-1">
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
          <h3 className="text-indigo-400 text-lg font-semibold">
            Manager
          </h3>
          <p className="text-gray-300">Kuay Tiew Noodles and More</p>
          <ul className="list-disc list-inside text-white mt-2 space-y-1">
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
          <h3 className="text-indigo-400 text-lg font-semibold">
            IT Intern
          </h3>
          <p className="text-gray-300">Voorhees High School</p>
          <ul className="list-disc list-inside text-white mt-2 space-y-1">
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
          <h3 className="text-indigo-400 text-lg font-semibold">
            Computer Science & Applied Engineering Academy
          </h3>
          <p className="text-gray-300">Voorhees High School</p>
          <p className="text-gray-400 italic">GPA: 3.7 • National Technical Honors Society</p>
          <ul className="list-disc list-inside text-white mt-2 space-y-1">
            <li>1 of 25 students selected for 4-year technical program</li>
            <li>Completed projects in programming, ML, data analytics, networking, cybersecurity</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="timeline" className="py-20 px-6 bg-black relative overflow-hidden">
      <Timeline data={data} />
    </section>
  );
}
