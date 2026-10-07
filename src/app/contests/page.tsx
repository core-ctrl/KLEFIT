import { SectionHeading } from '@/components/ui/SectionHeading';
import { MOCK_CONTESTS } from '@/lib/mock-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function ContestsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24">
      <SectionHeading 
        number="06 / CONTESTS" 
        title="Compete & Win" 
        subtitle="Participate in our exclusive coding challenges and bug bounties."
      />
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_CONTESTS.map(contest => (
           <GlassCard key={contest.id} className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                 <span className={`px-3 py-1 text-xs font-mono tracking-wider rounded-full border
                    ${contest.status === 'Upcoming' ? 'border-[var(--color-warning)] text-[var(--color-warning)] bg-[var(--color-warning)]/10' : 
                      contest.status === 'Live' ? 'border-[var(--color-success)] text-[var(--color-success)] bg-[var(--color-success)]/10' : 
                      'border-[var(--color-border)] text-[var(--color-white-dim)]'
                    }
                 `}>
                   {contest.status.toUpperCase()}
                 </span>
                 <span className="font-mono text-[10px] text-[var(--color-white-dim)] uppercase tracking-wider">
                   Deadline: {formatDate(contest.deadline).full}
                 </span>
              </div>
              
              <h2 className="font-display text-3xl font-bold text-white mb-3">{contest.title}</h2>
              <p className="text-[var(--color-white-muted)] mb-6 flex-grow">{contest.description}</p>
              
              <div className="space-y-4 mb-8">
                <div>
                   <h3 className="font-mono text-xs text-[var(--color-white-dim)] uppercase mb-2">Rules</h3>
                   <ul className="list-disc list-inside text-sm text-[var(--color-white-muted)] space-y-1">
                     {contest.rules.slice(0, 3).map((rule, i) => <li key={i}>{rule}</li>)}
                   </ul>
                </div>
                <div>
                   <h3 className="font-mono text-xs text-[var(--color-white-dim)] uppercase mb-2">Prizes</h3>
                   <div className="flex flex-wrap gap-2">
                     {contest.prizes.map((prize, i) => (
                       <span key={i} className="px-2 py-1 text-xs bg-[var(--color-blue-subtle)] text-[var(--color-blue-3)] rounded-md border border-[var(--color-blue-1)]/20">
                         {prize}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
              
              <Button disabled={!contest.registrationOpen} className="w-full justify-center">
                {contest.registrationOpen ? 'Register Now' : 'Registration Closed'}
              </Button>
           </GlassCard>
        ))}
      </div>
    </div>
  );
}
