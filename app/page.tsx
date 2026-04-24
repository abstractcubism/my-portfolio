import Hero from '@/components/Hero';
import About from '@/components/About';
import History from '@/components/History';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import PageWrapper from '@/components/PageWrapper';

export default function HomePage() {
  return (
    <PageWrapper>
      <main>
        <Hero />
        <About />
        <History />
        <Projects />
        <Contact />
      </main>
    </PageWrapper>
  );
}