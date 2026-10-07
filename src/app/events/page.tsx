import { SectionHeading } from '@/components/ui/SectionHeading';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsPage() {
  const now = new Date();
  
  // Separate events into Upcoming and Past
  const upcomingEvents = MOCK_EVENTS.filter(e => new Date(e.date) >= now);
  const pastEvents = MOCK_EVENTS.filter(e => new Date(e.date) < now);

  // Group Past Events by Year -> Month
  const groupedPastEvents = pastEvents.reduce((acc, event) => {
    const d = new Date(event.date);
    const year = d.getFullYear();
    const month = d.toLocaleString('default', { month: 'long' });
    
    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    
    acc[year][month].push(event);
    return acc;
  }, {} as Record<number, Record<string, typeof pastEvents>>);

  // Sort years descending
  const sortedYears = Object.keys(groupedPastEvents).map(Number).sort((a, b) => b - a);

  const EventCard = ({ event }: { event: any }) => (
    <GlassCard hover glow className="p-6 h-full flex flex-col relative overflow-hidden group">
      
      {/* Background Poster Placeholder (if event.image exists, it will show) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10" />
        {event.image ? (
          <Image src={event.image} alt={event.title} fill className="object-cover blur-sm group-hover:blur-none opacity-30 group-hover:opacity-60 transition-all duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-black noise opacity-50" />
        )}
      </div>

      <div className="relative z-20 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-[10px] font-mono tracking-widest uppercase rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {event.category}
              </span>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{event.mode}</span>
            </div>
            <div className="text-right">
              <span className="block font-mono text-[10px] text-white/50 uppercase tracking-wider">
                {formatDate(event.date).month}
              </span>
              <span className="block font-editorial text-3xl font-bold text-white leading-none mt-1">
                {formatDate(event.date).day}
              </span>
            </div>
        </div>
        
        <h3 className="font-editorial text-3xl font-bold text-white mb-3 uppercase tracking-tight">{event.title}</h3>
        <p className="text-sm text-white/60 mb-8 flex-grow">{event.description}</p>
        
        <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-white/10">
            <div className="flex justify-between items-center text-xs font-mono text-white/40">
              <span>{event.time}</span>
              <span>{event.venue}</span>
            </div>
            <div className="flex gap-3">
              <Link href={`/events/${event.slug}`} className="flex-1 py-3 text-center border border-white/20 hover:border-white/50 text-white font-mono text-xs tracking-widest uppercase rounded transition-colors backdrop-blur-md">
                Details
              </Link>
              {/* College Portal Registration link for upcoming events */}
              {new Date(event.date) >= now && (
                <a 
                  href="https://kluniversity.in/student-portal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center bg-[var(--color-blue-1)] hover:bg-blue-600 text-white font-mono text-xs tracking-widest uppercase rounded transition-colors"
                >
                  Register
                </a>
              )}
            </div>
        </div>
      </div>
    </GlassCard>
  );

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen">
      <SectionHeading 
        number="03 / EVENTS" 
        title="EFIT Events" 
        subtitle="Workshops, Hackathons, and Special Operations."
      />
      
      {/* ─── UPCOMING EVENTS ─── */}
      <div className="mt-16 mb-24">
        <h2 className="font-mono text-sm tracking-[0.3em] text-[var(--color-blue-2)] uppercase mb-8 border-l-2 border-[var(--color-blue-2)] pl-4">
          Current & Upcoming
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="glass p-12 text-center rounded border border-white/5">
            <p className="font-mono text-sm text-white/30 uppercase tracking-widest">No upcoming events currently scheduled.</p>
          </div>
        )}
      </div>

      {/* ─── PREVIOUS EVENTS ARCHIVE ─── */}
      <div>
        <h2 className="font-mono text-sm tracking-[0.3em] text-white/40 uppercase mb-12 border-l-2 border-white/20 pl-4">
          The Archive (Past Events)
        </h2>
        
        <div className="space-y-16">
          {sortedYears.map(year => (
            <div key={year} className="relative">
              <h3 className="font-editorial text-5xl font-bold text-white/20 mb-8 sticky top-24 z-10 mix-blend-difference">{year}</h3>
              
              <div className="space-y-12 pl-4 md:pl-12 border-l border-white/10">
                {Object.keys(groupedPastEvents[year]).map(month => (
                  <div key={`${year}-${month}`}>
                    <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.4em] mb-6">{month}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {groupedPastEvents[year][month].map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
