import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { experience } from '../../data/experience';

export function Experience() {
  return (
    <section id="experience" className="px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Parcours" title="Expérience" align="left" />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 0.12}>
                <div className="relative pl-8">
                  <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg" aria-hidden />
                  <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">{item.period}</p>
                  <h3 className="mb-2 font-heading text-xl font-semibold text-text">{item.title}</h3>
                  <p className="leading-relaxed text-text-muted">{item.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
