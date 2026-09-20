import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-medium',
        variant === 'default' && 'border-border bg-surface text-text-muted',
        variant === 'accent' && 'border-accent-border bg-accent-soft text-accent',
        className
      )}
      {...props}
    />
  );
}
