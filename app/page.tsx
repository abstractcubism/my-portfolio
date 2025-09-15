import Hero from '@components/Hero';
import About from '@components/About';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Contact />
    </main>
  );
}