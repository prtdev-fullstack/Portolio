import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Download, Menu, X } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { socials } from '../../data/socials';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
  { id: 'testimonials', label: 'Témoignages' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-4 top-4 z-40 mx-auto max-w-5xl"
    >
      <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
        <button
          onClick={() => scrollTo('home')}
          className="cursor-pointer font-heading text-sm font-semibold tracking-wide text-text"
        >
          OFM<span className="text-accent">.</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                'cursor-pointer rounded-full px-3 py-1.5 text-sm transition-colors duration-200',
                activeId === item.id ? 'bg-accent-soft text-accent' : 'text-text-muted hover:text-text'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="hidden cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent/50 hover:text-text sm:flex"
            aria-label="Ouvrir la palette de commandes"
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>
          <a
            href={socials.cvUrl}
            download
            className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 sm:flex"
          >
            <Download className="h-3.5 w-3.5" />
            CV
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="cursor-pointer p-2 text-text lg:hidden"
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors',
                  activeId === item.id ? 'bg-accent-soft text-accent' : 'text-text-muted hover:text-text'
                )}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
