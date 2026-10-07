'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HamburgerMenuIcon,
  Cross1Icon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { NAV_ITEMS } from '@/lib/constants';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Hide navbar on admin/portal pages (they have their own layout)
  const isInternalPage = pathname.startsWith('/admin') || pathname.startsWith('/portal');

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (isInternalPage) return null;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full flex justify-center pt-6 px-4 pointer-events-none">
        
        {/* Deep-Blue Glass Navigation Container */}
        <div className="flex items-center justify-between h-[var(--nav-height)] px-8 rounded-full bg-[var(--color-midnight-blue)]/60 backdrop-blur-xl border border-[var(--color-blue-gray)] pointer-events-auto shadow-[0_10px_30px_rgba(7,20,38,0.5)] max-w-6xl w-full">
          
          {/* Left: Branding */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-display font-bold text-xl tracking-wider text-white hover:text-[var(--color-blue-2)] transition-colors"
              aria-label="EFIT Home"
            >
              EFIT
            </Link>
          </div>

          {/* Center/Right: Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-sans text-sm transition-colors py-1 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-[var(--color-white-dim)] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-blue-2)] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Far Right: Login CTA */}
          <div className="hidden lg:flex items-center ml-8 pl-8 border-l border-[var(--color-blue-gray)]/50">
            <Link
              href="/login"
              className="group font-sans text-sm text-[var(--color-white-muted)] hover:text-white transition-colors flex items-center gap-2"
            >
              Login
              <ChevronRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-blue-2)]" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2.5 text-white rounded-full hover:bg-white/[0.06] transition-colors pointer-events-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <Cross1Icon className="w-4 h-4" />
            ) : (
              <HamburgerMenuIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] glass"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-2 p-8">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-8 py-3 text-lg font-medium tracking-wide rounded-[var(--radius-pill)]
                        transition-all duration-200
                        ${isActive
                          ? 'bg-white text-black'
                          : 'text-[var(--color-white-muted)] hover:text-white'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                className="mt-4"
              >
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-8 py-3 text-lg font-medium
                    border border-[var(--color-border)] rounded-[var(--radius-pill)]
                    text-white hover:bg-white/[0.06] transition-all"
                >
                  Login
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
