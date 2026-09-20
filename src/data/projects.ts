import img1 from '../assets/img/1.jpeg';
import img2 from '../assets/img/2.jpeg';
import img3 from '../assets/img/3.jpeg';
import img4 from '../assets/img/4.jpeg';
import img6 from '../assets/img/6.png';
import athenaLogo from '../assets/img/athena-logo.png';
import bantudocLogo from '../assets/img/bantudoc-logo.png';
import kdjLogo from '../assets/img/kdj-logo.png';

export type ProjectCategory = 'saas' | 'ecommerce' | 'app' | 'vitrine' | 'data';

export const categoryLabels: Record<ProjectCategory, string> = {
  vitrine: 'Sites vitrines',
  saas: 'SaaS & IA',
  ecommerce: 'E-commerce',
  app: 'Applications & Outils',
  data: 'Data & Analyse',
};

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  image?: string;
  imageFit?: 'cover' | 'contain';
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'athena',
    title: 'Athena',
    category: 'saas',
    description:
      "Assistant IA qui transforme un projet flou en plan d'action concret et réaliste, adapté au contexte réel de l'utilisateur — statut, agenda, priorités de la semaine.",
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Prisma', 'PostgreSQL'],
    image: athenaLogo,
    imageFit: 'contain',
  },
  {
    slug: 'bantudoc',
    title: 'BantuDoc',
    category: 'saas',
    description:
      'Plateforme de conversion de documents (PDF, Word, images) traitée directement dans le navigateur pour plus de rapidité et de confidentialité.',
    stack: ['À préciser'],
    image: bantudocLogo,
    imageFit: 'contain',
    demoUrl: 'https://www.bantu-doc.com/',
  },
  {
    slug: 'parfumerie',
    title: 'Site E-commerce de parfumerie',
    category: 'ecommerce',
    description:
      "Site e-commerce spécialisé dans la vente de parfums premium avec interface élégante et expérience d'achat fluide.",
    stack: ['React.js', 'Tailwind CSS'],
    image: img1,
    demoUrl: 'https://sillage-parfumerie.vercel.app/',
  },
  {
    slug: 'fall-tech-store',
    title: 'Fall Tech Store',
    category: 'ecommerce',
    description: 'Boutique en ligne spécialisée dans la vente de smartphones et appareils tech modernes.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    image: img2,
    demoUrl: 'https://projet-fall-tech-store.vercel.app/',
  },
  {
    slug: 'egn-location',
    title: 'EGN Location',
    category: 'ecommerce',
    description:
      'Service de location fiable proposant véhicules et équipements adaptés aux besoins du quotidien et des projets professionnels.',
    stack: ['React.js', 'JavaScript', 'CSS'],
    image: img3,
    demoUrl: 'https://projet-egn-location.vercel.app/',
  },
  {
    slug: 'kdj-solutions',
    title: 'KDJ Solutions',
    category: 'app',
    description:
      "Plateforme de conformité bancaire (KYC) avec moteur de risque explicable — chaque décision est justifiée, pas une boîte noire, avec un mode strict pour les contrôles réglementaires.",
    stack: ['React', 'TypeScript', 'shadcn/ui'],
    image: kdjLogo,
    imageFit: 'contain',
    demoUrl: 'https://kdj-solutions-v2.vercel.app/',
  },
  {
    slug: 'oworise',
    title: 'Oworise',
    category: 'app',
    description: 'Calculatrice scientifique avancée avec interface élégante, opérations complexes et historique des calculs.',
    stack: ['React.js', 'Tailwind CSS', 'JavaScript'],
    image: img4,
    demoUrl: 'https://oworise.vercel.app/',
  },
  {
    slug: 'senagritech',
    title: 'SenAgriTech',
    category: 'vitrine',
    description:
      "Entreprise sénégalaise innovante spécialisée dans les solutions technologiques pour l'agriculture durable, l'eau et l'énergie.",
    stack: ['WordPress', 'Elementor', 'CSS'],
    image: img6,
    demoUrl: 'https://senagritech.app/',
  },
  {
    slug: 'analyse-donnees',
    title: 'Analyse de Données',
    category: 'data',
    description:
      "Projet d'analyse et visualisation de données complexes avec génération de rapports et insights actionnables.",
    stack: ['Python', 'pandas', 'Jupyter', 'Matplotlib'],
    image:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  
];
