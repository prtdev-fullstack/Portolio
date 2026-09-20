import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { Badge } from '../ui/Badge';
import { ServiceCard, type ServiceCardProps } from '../ui/service-card';
import { skillCategories } from '../../data/skills';

const VARIANTS: NonNullable<ServiceCardProps['variant']>[] = ['default', 'accent', 'default', 'muted', 'default'];

export function Skills() {
  return (
    <section id="skills" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Compétences"
          title="Une boîte à outils complète"
          description="Du frontend à l'intégration de modèles de langage, en passant par l'analyse de données. Cliquez sur une catégorie pour voir le détail."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <RevealOnScroll key={category.title} delay={(i % 3) * 0.08}>
              <ServiceCard
                title={category.title}
                description={`${category.skills.length} technologies et outils maîtrisés`}
                icon={category.icon}
                count={category.skills.length}
                variant={VARIANTS[i % VARIANTS.length]}
                className="min-h-[200px]"
              >
                {category.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </ServiceCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
