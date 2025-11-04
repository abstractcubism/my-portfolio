"use client";

import React from "react";

// Icons from react-icons.github.io/react-icons/

import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaExternalLinkAlt, 
  FaRegCopy, 
  FaCheck 
} from "react-icons/fa";

export default function Contact() {

  // Obfuscation and email copy functionality written by ChatGPT

  const emailUser = ["leah", "hamilton", "jobs"].join("");
  const emailDomain = ["g", "mail", ".", "com"].join("");
  const email = `${emailUser}\u0040${emailDomain}`;
  const [copied, setCopied] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(`${emailUser}@${emailDomain}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_) {
      const el = document.createElement("textarea");
      el.value = `${emailUser}@${emailDomain}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      <div className="max-w-5xl mx-auto grid gap-10 items-stretch">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">Let’s work together</h2>
          <p className="text-[var(--muted-foreground)] mb-6">
            I’m open to internships and startup opportunities. The quickest way to reach me is through email:
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-lg mb-4">
            <div className="inline-flex items-center gap-2 px-0 py-0 rounded-lg text-[var(--muted-foreground)]" aria-label="Email address (not a button)" title="Email address (not clickable)">
              <FaEnvelope className="shrink-0" />
              <span className="text-base md:text-lg select-text">

                {/* Email Address to prevent bot spam */}

                {emailUser} [at] gmail.com
              </span>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className={`group inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 transition transform hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-[color-mix(in_oklch,var(--background)_90%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${copied ? "bg-green-600 text-white border-green-600 hover:bg-green-600" : ""}`}
              aria-label="Copy email address to clipboard"
              title="Copy email"
            >
              {copied ? (
                <FaCheck className="animate-bounce" />
              ) : (
                <FaRegCopy className="transition-transform duration-300 group-hover:scale-110" />
              )}
              <span className="text-sm md:text-base">{copied ? "Copied!" : "Copy email"}</span>
            </button>

            {/* Social Links */}

            <div className="basis-full flex items-center gap-3 md:gap-4 mt-2">
              <a
                href="https://www.linkedin.com/in/leahhami"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 transition transform hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-[color-mix(in_oklch,var(--background)_90%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="LinkedIn (opens in a new tab)"
                title="LinkedIn"
              >
                <FaLinkedin className="transition-transform duration-300 group-hover:rotate-6" /> LinkedIn
              </a>

              <a
                href="https://github.com/abstractcubism"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 transition transform hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-[color-mix(in_oklch,var(--background)_90%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="GitHub (opens in a new tab)"
                title="GitHub"
              >
                <FaGithub className="transition-transform duration-300 group-hover:-rotate-6" /> GitHub
              </a>
            </div>
          </div>

          {/* Calendar Booking */}

          <div className="mt-3">
            <div className="text-sm text-[var(--muted-foreground)] mb-2">Prefer to chat? (Opens a new tab)</div>
            <a
              href="https://calendar.app.google/JtcjLYhEQw6WqES57"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow transition hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Book a meeting via Google Calendar (opens in a new tab)"
              title="Book a meeting"
            >
              <FaCalendarAlt className="transition-transform duration-300 group-hover:scale-110" />
              Book a meeting
              <FaExternalLinkAlt className="h-3 w-3 opacity-80 transition-opacity group-hover:opacity-100" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
