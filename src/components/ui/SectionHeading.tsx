'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  editorial?: boolean;
}

export function SectionHeading({
  number,
  title,
  subtitle,
  children,
  align = 'left',
  className = '',
  editorial = false,
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className={`
        ${align === 'center' ? 'text-center' : ''}
        ${className}
      `}
    >
      {number && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="block font-mono text-xs tracking-[0.2em] text-[var(--color-white-dim)] mb-3"
        >
          {number}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`
          font-bold tracking-tight text-white leading-[1.1]
          ${editorial
            ? 'font-editorial text-4xl sm:text-5xl md:text-6xl'
            : 'font-display text-3xl sm:text-4xl md:text-5xl'
          }
        `}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-[var(--color-white-muted)] text-base sm:text-lg max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </div>
  );
}
