'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/components/providers/AuthProvider';
import { MOCK_EVENTS } from '@/lib/mock-data';

export default function AdminDashboard() {
  const { user, roles } = useAuth();
  
  return (
    <div className="space-y-8">
       <div className="flex justify-between items-end border-b border-[var(--color-border)] pb-4">
          <div>
            <h1 className="font-editorial text-3xl font-bold text-white tracking-tight">Overview</h1>
            <p className="font-mono text-xs text-[var(--color-white-muted)] mt-1 uppercase tracking-wider">
              {roles?.join(', ') || 'SYSTEM ADMIN'} / ACCESS_LEVEL_1
            </p>
          </div>
       </div>
       
       {/* Stats Overview */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'TOTAL MEMBERS', value: '42' },
            { label: 'ACTIVE EVENTS', value: '3' },
            { label: 'REGISTRATIONS', value: '342' },
            { label: 'SYSTEM HEALTH', value: '100%' }
          ].map((stat, i) => (
             <GlassCard key={i} className="p-5">
                <span className="block font-mono text-[9px] text-[var(--color-white-dim)] tracking-wider mb-2">{stat.label}</span>
                <span className="block font-display text-3xl font-bold text-white">{stat.value}</span>
             </GlassCard>
          ))}
       </div>

       {/* Quick Actions & Recent Activity */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
             <h3 className="font-editorial text-lg font-bold text-white mb-4">Event Status</h3>
             <div className="space-y-3">
                {MOCK_EVENTS.slice(0, 3).map(event => (
                   <div key={event.id} className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/[0.05] rounded">
                      <div>
                         <h4 className="text-sm font-medium text-white">{event.title}</h4>
                         <p className="text-[10px] font-mono text-[var(--color-white-dim)] mt-1">{event.currentRegistrations} / {event.maxParticipants || '∞'} REGISTRATIONS</p>
                      </div>
                      <span className={`px-2 py-1 text-[9px] font-mono tracking-wider rounded ${event.registrationOpen ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' : 'bg-white/[0.1] text-white'}`}>
                         {event.registrationOpen ? 'OPEN' : 'CLOSED'}
                      </span>
                   </div>
                ))}
             </div>
          </GlassCard>
          
          <GlassCard className="p-6">
             <h3 className="font-editorial text-lg font-bold text-white mb-4">Audit Log (Recent)</h3>
             <div className="space-y-4">
                {[
                  { action: 'EVENT_CREATED', user: 'adithya@kl', time: '10 mins ago' },
                  { action: 'MEMBER_ADDED', user: 'system', time: '1 hour ago' },
                  { action: 'ROLE_MODIFIED', user: 'admin', time: '3 hours ago' },
                ].map((log, i) => (
                   <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-3)] mt-1.5" />
                      <div>
                         <p className="text-sm font-mono text-white">{log.action}</p>
                         <p className="text-xs text-[var(--color-white-dim)]">by {log.user} • {log.time}</p>
                      </div>
                   </div>
                ))}
             </div>
          </GlassCard>
       </div>
    </div>
  );
}
