export type Project = {
  number: string;
  title: string;
  description: string;
  details: string;
  tags: string[];
  github: string | null;
  live: string | null;
  private: boolean;
  images: string[];
  video?: string | null;
  comingSoon?: boolean;
};

export const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'Portfolio Website',
    description:
      'The site you\'re on. Built with Next.js 15, Tailwind CSS v4, GSAP, and Framer Motion. Features a terminal load animation, ASCII cube renderer, and GSAP horizontal scroll.',
    details:
      'Designed with a focus on interactive animation and clean design. Features a custom terminal boot sequence, a real-time ASCII cube rendered in a React component, and GSAP animations. Deployed on Vercel.',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind'],
    github: 'https://github.com/abstractcubism/my-portfolio',
    live: null,
    private: false,
    images: [],
  },
  {
    number: '02',
    title: 'reroot',
    description:
      'reroot lets students match their way, whether it\'s the right roommate, the right home, or both, powered by adaptive AI.',
    details:
      'Developed solo as part of a 4-person team for the Techstart 2026 competition in March, where the project placed in the top 5 and was evaluated by industry professionals. Reroot lets users browse and match with potential roommates or housing listings, with flexible filtering across both categories.',
    tags: ['React', 'TypeScript', 'Flask', 'Tailwind', 'OpenAI', 'Docker'],
    github: 'https://github.com/abstractcubism/reroot-app',
    live: null,
    private: false,
    images: [],
    video: '/demoVideos/ReRootDemo.mov',
  },
  {
    number: '03',
    title: 'Coming Soon',
    description: 'Something new is in the works... generating description...',
    details: 'Stay tuned!',
    tags: [],
    github: null,
    live: null,
    private: false,
    images: [],
    comingSoon: true,
  },
];
