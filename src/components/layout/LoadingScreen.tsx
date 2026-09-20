import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

const SESSION_KEY = 'ofm-portfolio-visited';
const HOLD_MS = 700;
const FADE_MS = 400;

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [fading, setFading] = useState(false);
  // Décision calculée une seule fois et mise en cache dans une ref : en dev,
  // StrictMode monte/démonte l'effet deux fois, et sessionStorage.getItem
  // renverrait un résultat différent au deuxième passage sans ce cache.
  const shouldShowRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (shouldShowRef.current === null) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const alreadyVisited = sessionStorage.getItem(SESSION_KEY);
      shouldShowRef.current = !reduceMotion && !alreadyVisited;
      if (shouldShowRef.current) sessionStorage.setItem(SESSION_KEY, '1');
    }

    if (!shouldShowRef.current) return;

    setMounted(true);
    const enterRaf = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    const fadeTimer = setTimeout(() => setFading(true), HOLD_MS);
    const removeTimer = setTimeout(() => setMounted(false), HOLD_MS + FADE_MS);

    return () => {
      cancelAnimationFrame(enterRaf);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity ease-in-out',
        fading ? 'opacity-0' : 'opacity-100'
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <span
        className={cn(
          'font-heading text-2xl font-semibold text-text transition-all duration-700 ease-out',
          entered ? 'tracking-[0.05em] opacity-100' : 'tracking-[0.3em] opacity-0'
        )}
      >
        OFM<span className="text-accent">.</span>
      </span>
    </div>
  );
}
