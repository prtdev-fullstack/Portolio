import { Github, Linkedin, Mail } from 'lucide-react';
import { socials } from '../../data/socials';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-heading text-sm font-semibold text-text">
            {socials.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-text-muted">{socials.role}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${socials.email}`}
            className="cursor-pointer text-text-muted transition-colors hover:text-accent"
            aria-label="Envoyer un email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-text-muted transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-text-muted transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        <p className="text-center text-xs text-text-muted sm:text-right">
          © {currentYear} {socials.name}. Conçu avec soin.
        </p>
      </div>
    </footer>
  );
}
