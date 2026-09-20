import ahmadouKaPhoto from '../assets/img/ahmadou-ka.jpeg';
import type { ScrollReelTestimonial } from '../components/ui/scroll-reel-testimonials';

// Témoignages réels. Ajouter isExample: true pour un futur placeholder
// si aucun témoignage réel n'est encore disponible dans une catégorie donnée.
export const testimonials: ScrollReelTestimonial[] = [
  {
    quote:
      "Travailler avec Marc a été une excellente expérience. Il a su transformer notre vision en un site web moderne, élégant et performant, parfaitement adapté à nos besoins. Son professionnalisme, sa capacité d'écoute et son souci de la qualité ont fait toute la différence. Le résultat renforce aujourd'hui l'image de SenAgriTech auprès de nos partenaires et de nos clients. Je recommande vivement son expertise à toute entreprise souhaitant réussir sa transformation numérique.",
    author: 'Ahmadou Ka',
    role: 'Directeur Général · SenAgriTech',
    image: ahmadouKaPhoto,
    alt: 'Ahmadou Ka, Directeur Général de SenAgriTech',
  },
];
