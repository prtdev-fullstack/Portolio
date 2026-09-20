import { Code2, Database } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { Card } from '../ui/Card';
import { philosophy } from '../../data/experience';

const pillars = [
  {
    icon: Code2,
    title: 'Développement Web',
    description:
      "Je crée des applications web modernes et performantes avec React, TypeScript et des architectures pensées pour durer. L'expérience utilisateur et la maintenabilité du code priment sur l'effet visuel.",
  },
  {
    icon: Database,
    title: 'Produit & Données',
    description:
      "J'exploite la donnée pour transformer des informations brutes en décisions concrètes — analyse, visualisation et tableaux de bord — et j'applique cette même rigueur analytique à la conception de produits.",
  },
];

export function About() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="À propos"
          title="Une double approche : produit et données"
          description={philosophy}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <RevealOnScroll key={pillar.title} delay={i * 0.1}>
              <Card className="h-full p-8">
                <pillar.icon className="mb-4 h-10 w-10 text-accent" />
                <h3 className="mb-3 font-heading text-xl font-semibold text-text">{pillar.title}</h3>
                <p className="leading-relaxed text-text-muted">{pillar.description}</p>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
