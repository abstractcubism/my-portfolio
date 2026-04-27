import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[var(--background)] px-6 pt-28"
    >
      {/* Faint decorative rule at top */}
      <div className="absolute left-6 right-6 top-0 h-px bg-[var(--border)]" />

      {/* Spotlight-visible zone — no z-index so the blob shines over this content.
          Text turns white via JS; the green glow is visible on the cream background. */}
      <div className="mx-auto max-w-5xl pb-20">
        <h2
          className="mb-10 text-[var(--foreground)] leading-[0.95]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 6,
          }}
        >
          let&apos;s be friends!
        </h2>

        <a
          href="mailto:leahhamiltonjobs@gmail.com"
          className="group inline-flex items-center gap-3 transition-colors duration-300 hover:text-[var(--color-accent)]"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.8vw, 1.75rem)',
            color: 'var(--muted-foreground)',
            position: 'relative',
            zIndex: 6,
          }}
        >
          <MdOutlineEmail
            className="flex-shrink-0 transition-colors duration-300 group-hover:text-[var(--color-accent)]"
            style={{ width: '1.1em', height: '1.1em', fontStyle: 'normal' }}
          />
          leahhamiltonjobs@gmail.com
          <span className="inline-block -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            →
          </span>
        </a>
      </div>

      {/* Bottom bar — full-width, z:10, solid background masks the spotlight here.
          data-no-glow keeps its text out of the white-lighting JS loop. */}
      <div
        data-no-glow
        className="-mx-6 bg-[var(--background)] pb-12"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="mx-auto max-w-5xl px-6 border-t border-[var(--border)] pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

          {/* Socials */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/leahhami"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              <FaLinkedin style={{ width: '0.85rem', height: '0.85rem' }} />
              LinkedIn
            </a>
            <a
              href="https://github.com/abstractcubism"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-[var(--color-accent)] hover:opacity-70 transition-opacity duration-200"
            >
              <FaGithub style={{ width: '0.85rem', height: '0.85rem' }} />
              GitHub
            </a>
          </div>

          {/* Name + year */}
          <div className="flex items-center gap-4">
            <span
              className="text-[var(--muted-foreground)]"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem' }}
            >
              leah hamilton
            </span>
            <span className="font-mono text-[10px] text-[var(--muted-foreground)] opacity-60">
              © {new Date().getFullYear()}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
