'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { GlassCard } from '@/components/ui/GlassCard';
import { MOCK_EVENTS, MOCK_NOTICES } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

export default function PortalDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
       <div className="flex justify-between items-end border-b border-[var(--color-border)] pb-4">
          <div>
            <h1 className="font-editorial text-3xl font-bold text-white tracking-tight">
              Good morning, {user?.name || 'Student'}
            </h1>
            <p className="font-mono text-xs text-[var(--color-white-muted)] mt-1 uppercase tracking-wider">
              {user?.studentId || 'ID: UNKNOWN'} / EFIT PORTAL
            </p>
          </div>
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
             
             {/* Next Event / Registration Status */}
             <GlassCard className="p-6 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-blue-900)]/10">
                <h3 className="font-mono text-[10px] text-[var(--color-blue-3)] uppercase tracking-wider mb-2">Upcoming Registration</h3>
                <h2 className="font-display text-2xl font-bold text-white mb-1">EFIT CodeSprint 2026</h2>
                <p className="text-sm text-[var(--color-white-muted)] mb-4">You are registered. Check-in starts at 10:00 AM.</p>
                <div className="inline-flex px-3 py-1 bg-[var(--color-success)]/20 text-[var(--color-success)] text-xs font-mono rounded border border-[var(--color-success)]/30">
                  STATUS: CONFIRMED
                </div>
             </GlassCard>

             {/* Recommended Events */}
             <div>
                <h3 className="font-editorial text-xl font-bold text-white mb-4">Recommended for you</h3>
                <div className="space-y-3">
                   {MOCK_EVENTS.slice(1, 3).map(event => (
                      <GlassCard key={event.id} hover className="p-4 flex items-center justify-between">
                         <div>
                            <h4 className="font-medium text-white">{event.title}</h4>
                            <p className="text-xs text-[var(--color-white-muted)] mt-0.5">{formatDate(event.date).full}</p>
                         </div>
                         <button className="px-3 py-1.5 border border-[var(--color-border)] rounded text-xs hover:bg-white hover:text-black transition-colors">
                           View
                         </button>
                      </GlassCard>
                   ))}
                </div>
             </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
             {/* Notices */}
             <GlassCard className="p-5">
                <h3 className="font-editorial text-lg font-bold text-white mb-4">Latest Notices</h3>
                <div className="space-y-4">
                   {MOCK_NOTICES.slice(0, 3).map(notice => (
                      <div key={notice.id} className="border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
                         <span className="text-[9px] font-mono text-[var(--color-white-dim)] uppercase">{formatDate(notice.date).full}</span>
                         <h4 className="text-sm font-medium text-white mt-1 line-clamp-2">{notice.title}</h4>
                      </div>
                   ))}
                </div>
             </GlassCard>
          </div>
       </div>
    </div>
  );
}
