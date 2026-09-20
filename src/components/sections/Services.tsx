import { useRef, useState, type MouseEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { cn } from '../../lib/utils';
import { services } from '../../data/services';

interface ServiceTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  className?: string;
}

function ServiceTile({ icon: Icon, title, description, index, className }: ServiceTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent-border hover:shadow-[0_24px_60px_-24px_rgba(110,86,207,0.45)]',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${pos.x}% ${pos.y}%, rgba(110,86,207,0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-border bg-accent-soft text-accent transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
            <Icon className="h-6 w-6" />
          </div>
          <span className="font-mono text-xs text-text-muted/40">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className="mb-2 font-heading text-xl font-semibold tracking-tight text-text">{title}</h3>
        <p className="text-sm leading-relaxed text-text-muted">{description}</p>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="Comment je peux vous aider"
          description="De l'idée au produit en production, avec la même exigence à chaque étape."
        />

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealOnScroll
              key={service.title}
              delay={(index % 3) * 0.08}
              className={index === 0 ? 'sm:col-span-2 lg:col-span-2' : undefined}
            >
              <ServiceTile
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
