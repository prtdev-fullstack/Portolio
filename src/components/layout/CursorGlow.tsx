import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || reduceMotion) return;
    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl"
      style={{
        translateX: springX,
        translateY: springY,
        x: '-50%',
        y: '-50%',
        background: 'radial-gradient(circle, #6E56CF 0%, transparent 70%)',
      }}
    />
  );
}
