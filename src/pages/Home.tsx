import { Suspense, lazy } from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Experience } from '../components/sections/Experience';
import { Services } from '../components/sections/Services';
import { Contact } from '../components/sections/Contact';

const Testimonials = lazy(() =>
  import('../components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
);

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Experience />
      <Suspense fallback={<div className="h-96" />}>
        <Testimonials />
      </Suspense>
      <Contact />
    </main>
  );
}
