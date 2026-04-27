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
};

export const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'Portfolio Website',
    description:
      'The site you\'re on. Built with Next.js 15, Tailwind CSS v4, GSAP, and Framer Motion. Features a terminal load animation, ASCII cube renderer, and GSAP horizontal scroll.',
    details:
      'Designed and built from scratch with a focus on interactive animation and clean design. Features a custom terminal boot sequence, a real-time ASCII cube rendered in a React component, smooth horizontal project scrolling driven by GSAP ScrollTrigger, and a system-aware dark/light mode toggle. Deployed on Vercel.',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind'],
    github: 'https://github.com/abstractcubism/my-portfolio',
    live: null,
    private: false,
    images: [],
  },
  {
    number: '02',
    title: 'Taxflow',
    description:
      'Full-stack tax workflow application built for an unannounced startup. React frontend, Supabase backend, Stripe payments, Clerk auth, and an LLM-based document identification pipeline.',
    details:
      'Built the complete frontend in React and integrated Supabase for real-time database and authentication, Stripe for subscription payments, and Clerk for user management. Implemented a Python-based document processing pipeline using LLMs to classify and extract structured data from uploaded tax documents.',
    tags: ['React', 'Supabase', 'Stripe', 'Python', 'LLM'],
    github: null,
    live: null,
    private: true,
    images: [],
  },
  {
    number: '03',
    title: 'Data Analytics Assistant',
    description:
      'Internal AI assistant built in Microsoft AI Foundry during an internship at Construction Specialties. Connected to SuperScreen DB + Microsoft Fabric; supports natural-language SQL querying over large purchase order datasets.',
    details:
      "Developed during a summer internship at Construction Specialties. The assistant connects to the company's SuperScreen database and Microsoft Fabric data warehouse, enabling analysts to query purchase order data using plain English. Built with Azure AI Foundry's agent framework and deployed internally to the data analytics team.",
    tags: ['Azure AI Foundry', 'Python', 'SQL', 'Microsoft Fabric'],
    github: null,
    live: null,
    private: true,
    images: [],
  },
];
