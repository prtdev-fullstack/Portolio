import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-border bg-surface/60 transition-all duration-300 hover:border-accent-border hover:shadow-[0_0_40px_-15px_rgba(110,86,207,0.4)]',
        className
      )}
      {...props}
    />
  );
}
