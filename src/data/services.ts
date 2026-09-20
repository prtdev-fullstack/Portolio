import { Layers, Rocket, Sparkles, Plug, Workflow, MessageSquareCode } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: Layers,
    title: 'Développement Full Stack',
    description: "Conception et développement d'applications web complètes, du frontend à la base de données.",
  },
  {
    icon: Rocket,
    title: 'Développement SaaS',
    description: 'Produits SaaS pensés pour évoluer : authentification, facturation, multi-utilisateurs.',
  },
  {
    icon: Sparkles,
    title: "Applications IA",
    description: "Intégration de modèles de langage (Claude, GPT) dans des produits réellement utiles au quotidien.",
  },
  {
    icon: Plug,
    title: "Développement d'API",
    description: 'API REST robustes, documentées et sécurisées pour connecter vos systèmes.',
  },
  {
    icon: Workflow,
    title: 'Automatisation',
    description: 'Scripts et workflows qui suppriment les tâches répétitives et font gagner du temps.',
  },
  {
    icon: MessageSquareCode,
    title: 'Conseil technique',
    description: 'Choix de stack, architecture et bonnes pratiques pour des projets qui durent.',
  },
];
