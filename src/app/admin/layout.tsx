import { ReactNode } from 'react';
import Link from 'next/link';
import { ADMIN_NAV_ITEMS } from '@/lib/constants';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-black)]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)]/30 backdrop-blur-md hidden md:block fixed top-0 left-0 h-screen overflow-y-auto z-40">
         <div className="p-4 border-b border-[var(--color-border)]">
            <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-blue-3)] uppercase">EFIT Core</span>
            <span className="block font-mono text-[9px] text-[var(--color-white-dim)] mt-1 uppercase">Command Center</span>
         </div>
         <nav className="p-3 space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--color-white-muted)] hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
              >
                 {item.label}
              </Link>
            ))}
         </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
