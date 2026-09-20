import * as React from 'react';
import { Quote } from 'lucide-react';
import { cn } from '../../lib/utils';

/* ----------------------------------------------------------------
 * ScrollReelTestimonials
 *
 * Counter-rotating scroll reel + per-character text rise.
 * The middle column is a real vertical list of portraits that
 * translates by one "pitch" per step; the outer columns counter-
 * rotate the opposite way. Text animates in character-by-character
 * with a stagger; the old block exits as a whole before the new
 * characters rise in sequence.
 * ---------------------------------------------------------------- */

export interface ScrollReelTestimonial {
  quote: string;
  author: string;
  role?: string;
  image: string;
  alt?: string;
  isExample?: boolean;
}

export interface ScrollReelTestimonialsProps {
  testimonials: ScrollReelTestimonial[];
  charStaggerMs?: number;
  className?: string;
}

/* Geometry — middle column pitch between portrait centers:
 * 3 * (cell 121.33px + gap 8px) = 388px */
const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 260;
const SLIDE_MS = 800;

const EASE_INOUT = 'cubic-bezier(0.65,0,0.35,1)';

const QUOTE_CLASSES = 'm-0 text-lg font-medium leading-[1.3] tracking-[-0.02em] text-text sm:text-[22px]';
const AUTHOR_CLASSES = 'm-0 text-sm font-medium leading-[1.3] text-text-muted';

const FEATURED_SHADOW =
  '0 1.008px 0.705px -0.563px rgba(0,0,0,0.18), 0 2.389px 1.672px -1.125px rgba(0,0,0,0.17), 0 4.357px 3.05px -1.688px rgba(0,0,0,0.17), 0 7.244px 5.07px -2.25px rgba(0,0,0,0.16), 0 11.698px 8.188px -2.813px rgba(0,0,0,0.15), 0 19.148px 13.404px -3.375px rgba(0,0,0,0.13), 0 32.972px 23.08px -3.938px rgba(0,0,0,0.09), 0 60px 42px -4.5px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6)';

function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-xl border border-border bg-gradient-to-b from-surface-hover to-surface blur-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-white/10"
      style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
    >
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-white mix-blend-saturation"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] blur-[6px] mix-blend-overlay"
        style={{
          background:
            'linear-gradient(220.99deg, rgba(110,86,207,0) 32%, rgb(110,86,207) 41%, rgb(173,160,255) 47%, rgba(130,150,237,0.57) 54%, rgba(130,150,237,0) 65%)',
        }}
      />
    </div>
  );
}

function Chars({ text, startIndex, staggerMs }: { text: string; startIndex: number; staggerMs: number }) {
  let idx = startIndex;
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span key={ci} className="scroll-reel-char" style={{ animationDelay: `${delay}ms` }}>
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({ testimonials, charStaggerMs = 6, className }: ScrollReelTestimonialsProps) {
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const count = testimonials.length;

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    const activeTimeouts = timeouts.current;
    return () => {
      cancelAnimationFrame(raf);
      activeTimeouts.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      paginate(-1);
    }
  };

  const middleItems = React.useMemo(() => {
    const items: Array<{ type: 'cell' } | { type: 'featured'; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: 'cell' });
    testimonials.forEach((_, i) => {
      items.push({ type: 'featured', i });
      if (i < count - 1) {
        items.push({ type: 'cell' }, { type: 'cell' });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: 'cell' });
    return items;
  }, [testimonials, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : 'none',
  });

  const current = testimonials[displayIndex];

  const [expanded, setExpanded] = React.useState(false);
  const [prevDisplayIndex, setPrevDisplayIndex] = React.useState(displayIndex);
  if (displayIndex !== prevDisplayIndex) {
    setPrevDisplayIndex(displayIndex);
    setExpanded(false);
  }

  const [isTruncated, setIsTruncated] = React.useState(false);
  const quoteRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const el = quoteRef.current;
    if (!el || expanded) return;
    setIsTruncated(el.scrollHeight > el.clientHeight + 1);
  }, [displayIndex, current.quote, expanded]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Témoignages"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        'relative flex w-full max-w-[1060px] flex-col items-stretch gap-2.5 overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-accent md:min-h-[320px] md:flex-row',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="relative h-56 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[380px]"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === 'featured' ? (
                <Featured key={i} src={testimonials[item.i].image} alt={testimonials[item.i].alt} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-5 py-7 md:py-10">
        <div className="flex flex-col gap-[9px]">
          <Quote className="h-10 w-10 text-accent/30" aria-hidden="true" />

          <div className={cn('relative w-full', expanded ? 'overflow-visible' : 'overflow-hidden')} aria-live="polite">
            {!expanded && (
              <div aria-hidden="true" className="invisible flex min-h-[120px] flex-col gap-[19px]">
                <p className={cn(QUOTE_CLASSES, 'line-clamp-4')}>{current.quote}</p>
                <p className={AUTHOR_CLASSES}>
                  {current.author}
                  {current.role ? ` — ${current.role}` : ''}
                </p>
              </div>
            )}
            <div
              key={displayIndex}
              className={cn(
                'flex flex-col gap-[19px] will-change-[transform,opacity]',
                expanded ? 'relative' : 'absolute inset-x-0 top-0',
                exiting && 'scroll-reel-exit'
              )}
            >
              <p ref={quoteRef} className={cn(QUOTE_CLASSES, expanded ? 'line-clamp-none' : 'line-clamp-4')}>
                <Chars text={current.quote} startIndex={0} staggerMs={charStaggerMs} />
              </p>
              {isTruncated && (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="w-fit cursor-pointer text-sm font-medium text-accent transition-colors hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {expanded ? 'Voir moins' : 'Voir plus'}
                </button>
              )}
              <p className={cn(AUTHOR_CLASSES, 'flex items-center gap-2')}>
                <Chars
                  text={current.role ? `${current.author} — ${current.role}` : current.author}
                  startIndex={current.quote.length + 6}
                  staggerMs={charStaggerMs}
                />
                {current.isExample && (
                  <span className="rounded-full border border-accent-border bg-accent-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                    Exemple
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-1.5 md:mt-0">
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label="Témoignage précédent"
            className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border border-border bg-transparent p-0 text-text transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:enabled:scale-[1.08] active:enabled:scale-[0.94] disabled:cursor-default disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg className="h-3 w-3 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.5 2.5 3.5 6l4 3.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label="Témoignage suivant"
            className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border border-border bg-transparent p-0 text-text transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:enabled:scale-[1.08] active:enabled:scale-[0.94] disabled:cursor-default disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg className="h-3 w-3 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4.5 2.5 4 3.5-4 3.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
