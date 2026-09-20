import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, MessageCircle, Copy, Check, Send } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { Button, ButtonLink } from '../ui/Button';
import { socials } from '../../data/socials';

export function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact portfolio — ${form.name || 'Nouveau message'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Travaillons ensemble"
          description="Disponible pour des projets freelance ou des opportunités d'emploi. Un message et je réponds rapidement."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <RevealOnScroll className="lg:col-span-2">
            <div className="flex h-full flex-col gap-3">
              <ContactLink icon={Linkedin} label="LinkedIn" href={socials.linkedin} external />
              <ContactLink icon={Github} label="GitHub" href={socials.github} external />
              <ContactLink icon={MessageCircle} label="WhatsApp" href={socials.whatsapp} external />
              <button
                onClick={() => handleCopy(socials.email, 'email')}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-surface/60 px-5 py-4 text-left transition-colors hover:border-accent/50"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-text">{socials.email}</span>
                </span>
                {copiedField === 'email' ? (
                  <Check className="h-4 w-4 text-accent" />
                ) : (
                  <Copy className="h-4 w-4 text-text-muted" />
                )}
              </button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Votre email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
                />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Votre message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="flex-1 resize-none rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
              />
              <Button type="submit" className="self-start">
                Envoyer le message
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  icon: Icon,
  label,
  href,
  external,
}: {
  icon: typeof Mail;
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <ButtonLink
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      variant="secondary"
      className="justify-start"
    >
      <Icon className="h-5 w-5 text-accent" />
      {label}
    </ButtonLink>
  );
}
