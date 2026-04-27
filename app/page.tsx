import Hero from '@/components/homepage/Hero';
import History from '@/components/homepage/HeroHistory';
import TechStack from '@/components/homepage/HeroTechStack';
import Projects from '@/components/homepage/HeroProjects';
import Footer from '@/components/homepage/HeroFooter';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TechStack />
      <History />
      <Projects />
      <Footer />
    </main>
  );
}
