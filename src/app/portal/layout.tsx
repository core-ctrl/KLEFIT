import { ReactNode } from 'react';
import Link from 'next/link';
import { PORTAL_NAV_ITEMS } from '@/lib/constants';

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-black)] pt-20">
      {/* Secondary Portal Nav */}
      <div className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-black)]/80 backdrop-blur-md z-40">
         <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6 overflow-x-auto no-scrollbar">
            {PORTAL_NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-[var(--color-white-muted)] hover:text-white whitespace-nowrap transition-colors">
                 {item.label}
              </Link>
            ))}
         </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
