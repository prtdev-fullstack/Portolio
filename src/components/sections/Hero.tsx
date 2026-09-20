import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, ArrowRight } from 'lucide-react';
import profilePhoto from '../../assets/img/profile.jpg';
import { socials } from '../../data/socials';
import { MagneticButton } from '../ui/MagneticButton';

export function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(600px circle at 50% 20%, rgba(110,86,207,0.18), transparent 60%), radial-gradient(500px circle at 80% 60%, rgba(110,86,207,0.08), transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-2 border-accent-border p-1.5 sm:h-48 sm:w-48"
        >
          <img src={profilePhoto} alt={socials.name} className="h-full w-full rounded-full object-cover" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-glow-pulse rounded-full bg-accent" />
          </span>
          Disponible pour de nouveaux projets
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-heading text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl"
        >
          {socials.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-4 font-heading text-xl italic text-text-muted md:text-2xl"
        >
          {socials.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-muted"
        >
          Je conçois des produits SaaS et des applications IA qui résolvent de vrais
          problèmes — de l'idée floue au produit utilisable, avec une exigence de qualité
          de bout en bout.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <button
              onClick={() => scrollTo('contact')}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Me contacter
              <ArrowRight className="h-4 w-4" />
            </button>
          </MagneticButton>
          <button
            onClick={() => scrollTo('projects')}
            className="cursor-pointer rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-accent/50"
          >
            Voir mes projets
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-text-muted transition-colors hover:text-accent" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-text-muted transition-colors hover:text-accent" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('about')}
        animate={reduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 cursor-pointer text-text-muted transition-colors hover:text-accent"
        aria-label="Défiler vers le bas"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
