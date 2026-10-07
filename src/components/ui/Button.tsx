'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  external?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium
    rounded-[var(--radius-pill)] transition-all duration-300
    focus-visible:outline-2 focus-visible:outline-[var(--color-blue-1)] focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    group
  `;

  const variants = {
    primary: `
      bg-white text-black
      hover:bg-[var(--color-blue-1)] hover:text-white
      hover:shadow-[var(--shadow-glow)]
      active:scale-[0.98]
    `,
    secondary: `
      bg-[var(--color-blue-1)] text-white
      hover:bg-[var(--color-blue-2)]
      hover:shadow-[var(--shadow-glow)]
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-white
      border border-[var(--color-border)]
      hover:border-[var(--color-border-hover)]
      hover:bg-white/[0.04]
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-[var(--color-white-muted)]
      hover:text-white hover:bg-white/[0.06]
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClassName}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClassName}>
      {content}
    </button>
  );
}
