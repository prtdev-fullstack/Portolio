import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'group relative flex w-full flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-300 ease-in-out hover:shadow-lg',
  {
    variants: {
      variant: {
        default: 'border border-border bg-surface/60 text-text',
        accent: 'border border-accent-border bg-accent-soft text-text',
        muted: 'border border-border bg-surface-hover text-text',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface ServiceCardProps
  extends Omit<HTMLMotionProps<'div'>, 'title'>,
    VariantProps<typeof cardVariants> {
  title: string;
  description: string;
  icon: LucideIcon;
  count: number;
}

const cardAnimation: Variants = {
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};
const iconAnimation: Variants = {
  hover: { scale: 1.1, rotate: 3, x: 6, transition: { duration: 0.4, ease: 'easeInOut' } },
};

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, description, icon: Icon, count, children, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        variants={cardAnimation}
        whileHover="hover"
        {...props}
      >
        <div className="relative z-10 flex flex-col">
          <h3 className="font-heading text-xl font-bold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-text-muted">{description}</p>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-4 flex w-fit cursor-pointer items-center text-sm font-semibold text-accent transition-colors hover:text-accent/80"
          >
            {count} compétences
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="ml-2">
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 flex flex-wrap gap-2"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          aria-hidden
          variants={iconAnimation}
          className="pointer-events-none absolute -bottom-6 -right-6 text-accent/15"
        >
          <Icon className="h-32 w-32" strokeWidth={1} />
        </motion.div>
      </motion.div>
    );
  }
);
ServiceCard.displayName = 'ServiceCard';
