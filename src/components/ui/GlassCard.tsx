'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[#0A0D11] overflow-hidden',
        hover && 'card-hover-fx',
        className
      )}
    >
      {/* Optional subtle blue top accent instead of full glow */}
      {glow && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-blue-1)] to-transparent opacity-50" />
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
