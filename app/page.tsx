import Hero from '@/components/Hero';
import About from '@/components/About';
import History from '@/components/History';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import LinkedInCarousel from "@/components/LinkedInCarousel";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/*<LinkedInCarousel />*/}
      <About />
      <History />
      <Projects />
      <Contact />
    </main>
  );
}