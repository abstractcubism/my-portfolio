import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

// Cottage core ASCII decorations
const ASCII_ART = {
  cottage: `
  /\\
 /  \\
/____\\
 |  |
 |__|`,
  flower: `
  .*.   *.   .*.
    |     |
   /|\\  /|\\  /|\\
    `,
  sparkles: `
  ──·∙──·∙──·∙──
  `,
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[var(--background)] border-t border-[var(--border)] px-6 py-20"
    >
      <div className="max-w-4xl mx-auto">

        {/* Decorative ASCII */}
        <pre className="font-mono text-xs text-[var(--color-accent)] opacity-40 mb-8">
{ASCII_ART.sparkles}
        </pre>

        <p className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--color-accent)] mb-8">
          get in touch
        </p>

        <h2
          className="font-extrabold text-[var(--foreground)] leading-tight mb-12"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
        >
          let&apos;s work together.
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-16">
          <a
            href="mailto:leahhamiltonjobs@gmail.com"
            className="flex items-center gap-3 font-mono text-base text-[var(--foreground)] hover:text-[var(--color-accent)] transition-colors group"
          >
            <MdOutlineEmail className="w-5 h-5 flex-shrink-0 group-hover:text-[var(--color-accent)] transition-colors" />
            leahhamiltonjobs@gmail.com
          </a>

          <span className="hidden sm:block text-[var(--border)]">|</span>

          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/leahhami"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[#0A66C2] transition-colors font-medium text-sm"
            >
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/abstractcubism"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-medium text-sm"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Cottage core footer decoration */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <pre className="font-mono text-[10px] text-[var(--muted-foreground)] leading-none">
{ASCII_ART.cottage}
            </pre>
            <span className="font-mono text-xs text-[var(--muted-foreground)]">
              © {new Date().getFullYear()} Leah Hamilton
            </span>
          </div>
          <span className="font-mono text-xs text-[var(--muted-foreground)]">
            built with Next.js + GSAP
          </span>
        </div>

      </div>
    </footer>
  );
}
