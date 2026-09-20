import { useEffect } from 'react';
import { Command } from 'cmdk';
import {
  Home,
  User,
  Code2,
  Briefcase,
  Layers,
  MessageSquare,
  Mail,
  Github,
  Linkedin,
  Download,
  Copy,
} from 'lucide-react';
import { socials } from '../../data/socials';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onOpenChange(false);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Palette de commandes"
      className="fixed left-1/2 top-24 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
    >
      <div className="flex items-center border-b border-border px-4">
        <Command.Input
          autoFocus
          placeholder="Rechercher une action..."
          className="w-full bg-transparent py-4 text-sm text-text placeholder:text-text-muted focus:outline-none"
        />
      </div>
      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-text-muted">Aucun résultat.</Command.Empty>

        <Command.Group heading="Navigation" className="px-2 py-1 font-mono text-xs uppercase tracking-wider text-text-muted [&_[cmdk-group-heading]]:mb-1">
          <Item icon={Home} onSelect={() => go('home')}>Accueil</Item>
          <Item icon={User} onSelect={() => go('about')}>À propos</Item>
          <Item icon={Code2} onSelect={() => go('skills')}>Compétences</Item>
          <Item icon={Briefcase} onSelect={() => go('projects')}>Projets</Item>
          <Item icon={Layers} onSelect={() => go('services')}>Services</Item>
          <Item icon={MessageSquare} onSelect={() => go('contact')}>Contact</Item>
        </Command.Group>

        <Command.Group heading="Actions" className="px-2 py-1 font-mono text-xs uppercase tracking-wider text-text-muted [&_[cmdk-group-heading]]:mb-1 [&_[cmdk-group-heading]]:mt-3">
          <Item icon={Copy} onSelect={() => { navigator.clipboard.writeText(socials.email); onOpenChange(false); }}>
            Copier l'email
          </Item>
          <Item icon={Download} onSelect={() => { window.open(socials.cvUrl, '_blank'); onOpenChange(false); }}>
            Télécharger le CV
          </Item>
          <Item icon={Github} onSelect={() => openLink(socials.github)}>Ouvrir GitHub</Item>
          <Item icon={Linkedin} onSelect={() => openLink(socials.linkedin)}>Ouvrir LinkedIn</Item>
          <Item icon={Mail} onSelect={() => openLink(`mailto:${socials.email}`)}>Envoyer un email</Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Item({
  icon: Icon,
  children,
  onSelect,
}: {
  icon: typeof Home;
  children: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text data-[selected=true]:bg-accent-soft data-[selected=true]:text-accent"
    >
      <Icon className="h-4 w-4" />
      {children}
    </Command.Item>
  );
}
