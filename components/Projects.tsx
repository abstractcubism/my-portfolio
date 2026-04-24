const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built with Next.js and Tailwind CSS showcasing projects and experience.',
    link: 'https://your-portfolio.com',
    github: 'https://github.com/your-username/portfolio',
  },
  // Hopefully more projects will appear here soon...
];

import EvervaultCard from './ui/evervault-card';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 scroll-mt-24 bg-[var(--background)] text-indigo-600 dark:text-indigo-400 transition-colors duration-500">
      <h2 className="text-5xl font-bold text-center mb-12">Projects</h2>

      <div className="grid gap-8 max-w-5xl mx-auto sm:grid-cols-2">
        <EvervaultCard
          title={projects[0].title}
          description={projects[0].description}
          href={projects[0].link}
          githubHref={projects[0].github}
        />
        
        <div className="flex items-center justify-center text-[var(--muted-foreground)] text-lg">
          More to come!
        </div>
      </div>
    </section>
  );
}

