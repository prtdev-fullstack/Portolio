import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export function RevealOnScroll({ children, delay = 0, className, y = 24 }: RevealOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
