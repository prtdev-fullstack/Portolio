import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DropdownMenuOption {
  id: string;
  label: string;
}

interface DropdownMenuProps {
  options: DropdownMenuOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}

export function DropdownMenu({ options, value, onChange, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (id: string) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={cn('relative w-56 text-sm', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between rounded-full border border-border bg-surface px-5 py-2.5 text-left font-medium text-text shadow-sm transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span>{selected?.label ?? 'Sélectionner'}</span>
        <ChevronDown
          className={cn('h-4 w-4 flex-shrink-0 text-text-muted transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 mt-2 w-full origin-top overflow-hidden rounded-2xl border border-border bg-surface py-2 shadow-2xl"
          >
            {options.map((option) => (
              <li
                key={option.id}
                role="option"
                aria-selected={option.id === value}
                onClick={() => handleSelect(option.id)}
                className={cn(
                  'cursor-pointer px-4 py-2.5 transition-colors',
                  option.id === value ? 'bg-accent-soft text-accent' : 'text-text-muted hover:bg-surface-hover hover:text-text'
                )}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
