import { Code2, Server, Database, Palette, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML / CSS', 'Framer Motion'],
  },
  {
    title: 'Backend & IA',
    icon: Server,
    skills: ['Next.js', 'Node.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Anthropic API (Claude)'],
  },
  {
    title: 'Data',
    icon: Database,
    skills: ['Python', 'pandas', 'Jupyter Notebook', 'Power BI', 'Visualisation de données'],
  },
  {
    title: 'CMS & Design',
    icon: Palette,
    skills: ['WordPress', 'Elementor', 'Responsive Design', 'UI/UX'],
  },
  {
    title: 'Outils & Méthodes',
    icon: Wrench,
    skills: ['Git', 'Docker', 'VS Code', 'Agile', 'Résolution de problèmes'],
  },
];
