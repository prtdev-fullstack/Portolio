import { SectionHeading } from '../ui/SectionHeading';
import { ScrollReelTestimonials } from '../ui/scroll-reel-testimonials';
import { testimonials } from '../../data/testimonials';

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-32">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <SectionHeading eyebrow="Témoignages" title="Ce qu'on en dit" />
        <ScrollReelTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
