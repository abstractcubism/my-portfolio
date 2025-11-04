import ThemeToggle from './ThemeToggle';
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.3)] z-50 transition-colors duration-300"
      style={{ background: 'color-mix(in oklch, var(--background) 70%, transparent)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center text-[var(--foreground)]">
        <a href="#hero" className="font-bold text-2xl text-indigo-600 dark:text-indigo-400 font-sans">
          Leah
        </a>

        {/* Navigation */}

        <ul className="flex space-x-6 items-center font-medium font-sans text-lg">
          <li><a href="#about" className="transition hover:text-[var(--muted-foreground)]">About</a></li>
          <li><a href="#timeline" className="transition hover:text-[var(--muted-foreground)]">Timeline</a></li>
          <li><a href="#projects" className="transition hover:text-[var(--muted-foreground)]">Projects</a></li>
          <li><a href="#contact" className="transition hover:text-[var(--muted-foreground)]">Contact</a></li>
          <li>

            {/* Social Links */}

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/leahhami"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="transition hover:text-[#0A66C2]"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/abstractcubism"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className="transition hover:text-gray-500"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </li>
          <li aria-hidden className="hidden sm:block h-6 w-px" style={{ background: 'color-mix(in oklch, var(--foreground) 20%, transparent)' }} />
          <li><ThemeToggle /></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
