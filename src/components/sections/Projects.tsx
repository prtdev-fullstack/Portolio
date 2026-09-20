import { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { DropdownMenu } from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';
import { projects, categoryLabels, type Project, type ProjectCategory } from '../../data/projects';

const FILTERS: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Tous' },
  ...(Object.entries(categoryLabels) as [ProjectCategory, string][]).map(([id, label]) => ({ id, label })),
];

export function Projects() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projets"
          title="Ce que je construis"
          description="Des produits SaaS aux sites vitrines, classés par catégorie — cliquez pour explorer."
        />

        <div className="mb-10 flex justify-center">
          <DropdownMenu
            options={FILTERS}
            value={filter}
            onChange={(id) => setFilter(id as 'all' | ProjectCategory)}
          />
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const initials = project.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <Card
      onClick={project.demoUrl ? () => window.open(project.demoUrl, '_blank', 'noopener,noreferrer') : undefined}
      className={cn('flex h-full flex-col overflow-hidden', project.demoUrl && 'cursor-pointer')}
    >
      {project.image ? (
        <div
          className={cn(
            'h-40 overflow-hidden',
            project.imageFit === 'contain' && 'flex items-center justify-center bg-white p-8'
          )}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width={480}
            height={320}
            className={cn(
              'transition-transform duration-300 group-hover:scale-105',
              project.imageFit === 'contain' ? 'h-full w-full object-contain' : 'h-full w-full object-cover'
            )}
          />
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-accent-soft to-surface">
          <span className="font-heading text-3xl font-semibold text-accent">{initials}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            {!project.image && <Sparkles className="h-4 w-4 flex-shrink-0 text-accent" />}
            <h3 className="truncate font-heading text-lg font-semibold text-text transition-colors group-hover:text-accent">
              {project.title}
            </h3>
          </div>
          {project.demoUrl && (
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-text-muted transition-colors group-hover:text-accent" />
          )}
        </div>

        <p className="mb-4 line-clamp-2 min-h-[2.6rem] text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        <div className="mt-auto flex h-7 flex-wrap gap-2 overflow-hidden">
          {project.stack.slice(0, 3).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.stack.length > 3 && <Badge>+{project.stack.length - 3}</Badge>}
        </div>

        <p className="mt-4 h-4 text-xs text-text-muted opacity-70">
          {!project.demoUrl && 'Démo bientôt disponible'}
        </p>
      </div>
    </Card>
  );
}
