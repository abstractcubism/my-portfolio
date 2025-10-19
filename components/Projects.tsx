const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built with Next.js and Tailwind CSS showcasing projects and experience.',
    link: 'https://your-portfolio.com',
  },
  {
    title: 'Weather App',
    description: 'A real-time weather app using OpenWeatherMap API and styled with Tailwind CSS.',
    link: 'https://weather-app-demo.com',
  },
  {
    title: 'Blog Platform',
    description: 'A Markdown-based blog built using Next.js, MDX, and Vercel for fast publishing.',
    link: 'https://blog-example.com',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-black">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Projects</h2>

      <div className="grid gap-8 max-w-5xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-black rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-800"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 hover:underline"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
