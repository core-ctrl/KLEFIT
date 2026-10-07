'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // The interactive cinematic page should take up the full screen without shell borders or navbars
  const isCinematicMode = pathname === '/core-team';

  if (isCinematicMode) {
    return <main className="w-full h-full min-h-screen">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-black)] p-4 md:p-8 lg:p-12">
      <div className="bg-[var(--color-background)] min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] rounded-[var(--radius-shell)] border border-[var(--color-blue-gray)] relative shadow-[0_0_80px_rgba(37,99,235,0.05),inset_0_0_40px_rgba(37,99,235,0.03)]">
        <Navbar />
        <main className="flex-1 w-full max-w-[1440px] mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
