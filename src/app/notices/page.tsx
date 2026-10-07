import { SectionHeading } from '@/components/ui/SectionHeading';
import { MOCK_NOTICES } from '@/lib/mock-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatDate } from '@/lib/utils';

export default function NoticesPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <SectionHeading 
        number="05 / NOTICES" 
        title="Announcements & Updates" 
        subtitle="Stay updated with the latest from the EFIT administration."
      />
      
      <div className="mt-16 max-w-4xl mx-auto space-y-4">
        {MOCK_NOTICES.map(notice => (
           <GlassCard key={notice.id} hover={false} className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="flex-shrink-0 w-32 hidden md:block">
                <span className="block font-mono text-sm text-[var(--color-white-dim)]">{formatDate(notice.date).full}</span>
                <span className={`inline-block mt-2 px-2 py-1 text-[10px] font-mono tracking-wider rounded-md
                  ${notice.category === 'IMPORTANT' ? 'bg-[var(--color-blue-subtle)] text-[var(--color-blue-3)]' : 'bg-white/[0.06] text-[var(--color-white-muted)]'}
                `}>
                  {notice.category}
                </span>
              </div>
              <div className="flex-1">
                 <div className="md:hidden flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[var(--color-white-dim)]">{formatDate(notice.date).full}</span>
                    <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider rounded-md bg-white/[0.06] text-[var(--color-white-muted)]">
                      {notice.category}
                    </span>
                 </div>
                 <h2 className="text-xl font-bold text-white mb-2">{notice.title}</h2>
                 <p className="text-[var(--color-white-muted)] leading-relaxed">{notice.content}</p>
                 <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
                    <span className="font-mono text-[10px] text-[var(--color-white-dim)] uppercase">AUTHOR: {notice.author}</span>
                 </div>
              </div>
           </GlassCard>
        ))}
      </div>
    </div>
  );
}
