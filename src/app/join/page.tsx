'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { MOCK_RECRUITMENT_DEPARTMENTS } from '@/lib/mock-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export default function JoinPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <SectionHeading 
        number="08 / JOIN US" 
        title="Become a part of EFIT" 
        subtitle="Recruitment for the 2026-27 academic year is now open."
        align="center"
      />
      
      <div className="mt-16 max-w-5xl mx-auto">
        <GlassCard hover={false} glow className="p-8 md:p-12 text-center mb-16 relative overflow-hidden">
           <div className="absolute inset-0 grid-texture opacity-30" />
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="font-editorial text-3xl md:text-5xl font-bold mb-6">WHY JOIN EFIT?</h2>
             <p className="text-[var(--color-white-muted)] mb-8 leading-relaxed text-lg">
               Gain hands-on experience building real products, organizing large-scale events, and leading teams. EFIT is where you apply what you learn in the classroom.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
               <span className="px-4 py-2 bg-white/[0.05] rounded-full text-sm font-mono tracking-wider">Mentorship</span>
               <span className="px-4 py-2 bg-white/[0.05] rounded-full text-sm font-mono tracking-wider">Networking</span>
               <span className="px-4 py-2 bg-white/[0.05] rounded-full text-sm font-mono tracking-wider">Skill Development</span>
             </div>
           </div>
        </GlassCard>

        <h3 className="font-mono text-xs tracking-[0.2em] text-[var(--color-blue-3)] uppercase mb-8 border-b border-[var(--color-border)] pb-4">
          Open Positions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_RECRUITMENT_DEPARTMENTS.map(dept => (
            <GlassCard key={dept.id} hover className="p-6">
               <div className="flex justify-between items-start mb-4">
                  <h4 className="font-display text-xl font-bold text-white">{dept.name}</h4>
                  <span className={`px-2 py-1 text-[10px] font-mono tracking-wider rounded border
                    ${dept.open ? 'border-[var(--color-success)] text-[var(--color-success)] bg-[var(--color-success)]/10' : 'border-[var(--color-border)] text-[var(--color-white-dim)]'}
                  `}>
                    {dept.open ? `${dept.positions} POSITIONS` : 'CLOSED'}
                  </span>
               </div>
               <p className="text-sm text-[var(--color-white-muted)] mb-6">{dept.description}</p>
               <Button variant="outline" className="w-full justify-center" disabled={!dept.open}>
                 {dept.open ? 'Apply Now' : 'Currently Closed'}
               </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
