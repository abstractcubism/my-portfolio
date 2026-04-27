import About from '@/components/about/About';
import FooterBottom from '@/components/FooterBottom';

export default function AboutPage() {
  return (
    <>
      <About />
      <footer className="bg-[var(--background)] px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <FooterBottom />
        </div>
      </footer>
    </>
  );
}
