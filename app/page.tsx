import Hero from '@/components/Hero';
import About from '@/components/About';
import History from '@/components/History';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <History />
      <Projects />
      <Contact />
    </main>
  );
}