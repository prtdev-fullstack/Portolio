export interface ExperienceItem {
  period: string;
  title: string;
  description: string;
}

// Timeline volontairement générique : à compléter avec les dates et intitulés réels.
export const experience: ExperienceItem[] = [
  {
    period: 'Formation',
    title: 'Développement Web & Analyse de Données',
    description:
      "Formation technique alliant développement web moderne et analyse de données — la base de mon double profil produit/data.",
  },
  {
    period: 'Débuts en développement',
    title: 'Premiers projets clients',
    description:
      'Sites vitrines, e-commerce et applications métier pour des clients réels, en autonomie complète.',
  },
  {
    period: 'Aujourd’hui',
    title: 'Produits SaaS & IA',
    description:
      "Conception de produits plus ambitieux comme Athena et BantuDoc, avec une approche full stack et orientée intelligence artificielle.",
  },
];

export const philosophy =
  "Je préfère un produit qui résout un vrai problème à une fonctionnalité impressionnante sur le papier. Chaque écran, chaque appel API a une raison d'exister — sinon je le retire. Le code doit rester lisible pour la personne qui le reprendra dans six mois, souvent moi-même.";
