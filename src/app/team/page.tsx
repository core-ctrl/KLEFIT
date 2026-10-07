'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ROLE_CATEGORIES } from '@/lib/constants';

function MemberCard({ member }: { member: any }) {
  return (
    <motion.div
      layoutId={`member-${member.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer h-full"
    >
      <Link href={`/team/${member.id}`} className="block h-full">
        {/* Clean card container */}
        <div className="relative h-full bg-white/[0.03] backdrop-blur-md p-4 md:p-6 rounded-[var(--radius-md)] border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 flex flex-col">
          
          {/* Decorative corner pieces */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-blue-1)] opacity-50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-blue-1)] opacity-50" />
          
          {/* Image placeholder */}
          <div className="w-full h-32 bg-black/40 relative overflow-hidden mb-4 rounded-[var(--radius-sm)] flex-shrink-0">
            <div className="absolute inset-0 noise opacity-30" />
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 backdrop-blur font-mono text-[8px] text-[var(--color-white-dim)] rounded-[2px]">
              ID:{member.id.padStart(4, '0')}
            </div>
          </div>

          <h3 className="font-editorial text-xl font-bold uppercase tracking-tight mb-1">{member.name}</h3>
          <p className="font-mono text-[10px] text-[var(--color-blue-3)] tracking-wider leading-relaxed flex-grow">
            {member.role}
          </p>
          
          <div className="mt-4 pt-3 border-t border-dashed border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-mono text-[9px] text-[var(--color-white-muted)]">VIEW PROFILE</span>
            <span className="font-mono text-[9px] text-[var(--color-blue-2)]">+</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/EFIT-Team.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const parsedMembers = [];
        for (let i = 2; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || line.startsWith(',,')) break;
          const cols = line.split(',');
          if (cols.length >= 3 && cols[1] && cols[2]) {
             const role = cols[1].trim();
             const name = cols[2].trim();
             const id = cols[0].trim();
             let category = 'COORDINATORS';
             const roleLower = role.toLowerCase();
             if (roleLower.includes('mentor')) {
               category = 'MENTOR';
             } else if (roleLower.includes('president') || roleLower.includes('secretary')) {
               category = 'ZERO_ORDER';
             } else if (roleLower.includes('broadcast')) {
               category = 'BROADCASTING';
             } else if (roleLower.includes('edit')) {
               category = 'EDITING';
             } else if (roleLower.includes('design')) {
               category = 'DESIGNING';
             } else if (roleLower.includes('social media')) {
               category = 'SOCIAL_MEDIA';
             } else if (roleLower.includes('tech') || roleLower.includes('event')) {
               category = 'TECHNICAL';
             } else if (roleLower.includes('logistic')) {
               category = 'LOGISTICS';
             }
             const numId = parseInt(id) || 1;
             const x = (numId * 37 % 80 + 10) + '%';
             const y = (numId * 53 % 80 + 10) + '%';
             parsedMembers.push({ id, name, role, category, x, y });
          }
        }
        setMembers(parsedMembers);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching CSV:", err);
        setIsLoading(false);
      });
  }, []);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={ref} className="min-h-[200vh] bg-[var(--color-black)] text-white overflow-hidden relative">
      
      {/* --- EXPERIMENTAL BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none noise opacity-20 z-0" />
      <div className="fixed inset-0 pointer-events-none grid-texture opacity-10 z-0" />
      
      <motion.div 
        style={{ rotate: rotate1 }} 
        className="fixed -top-1/4 -right-1/4 w-[100vw] h-[100vw] border-[1px] border-[var(--color-white-dim)] opacity-10 rounded-full z-0" 
      />
      
      <motion.div 
        style={{ rotate: rotate2, y: yParallax }} 
        className="fixed top-1/2 -left-1/4 w-[150vw] h-[1px] bg-[var(--color-blue-1)] opacity-20 z-0" 
      />

      {/* --- TINY FLOATING ANNOTATIONS --- */}
      <div className="fixed top-32 left-8 font-mono text-[9px] text-[var(--color-white-dim)] z-10 hidden md:block">
        &gt;&gt; SYS_OP: EFIT_CORE_TEAM<br />
        &gt;&gt; STATUS: CLASSIFIED_ACCESS<br />
        &gt;&gt; INIT_SEQUENCE: 2026.4
      </div>
      
      <div className="fixed bottom-12 right-12 font-mono text-[9px] text-[var(--color-white-dim)] z-10 hidden md:block text-right">
        [INDEX_MAPPING: ENABLED]<br />
        COORD: 32.44, -14.99<br />
        MEMBERS: CORE
      </div>

      {/* --- HERO: OVERSIZED TYPOGRAPHY --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 z-10">
        <div className="flex justify-between items-end mb-8 w-full border-b border-[var(--color-white-dim)] pb-4">
          <span className="font-mono text-xs tracking-[0.3em] text-[var(--color-blue-3)] uppercase">
            Directory
          </span>
          <span className="font-mono text-xs text-[var(--color-white-muted)]">
            [02 / TEAM]
          </span>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 50, skewY: 5 }}
          animate={{ opacity: 1, y: 0, skewY: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial text-[15vw] leading-[0.8] tracking-tighter uppercase font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[var(--color-white-dim)]"
        >
          THE<br/>
          <span className="ml-[10vw]">MIND</span><br/>
          TRUST.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute right-12 bottom-32 max-w-sm"
        >
          <p className="font-sans text-sm text-[var(--color-white-muted)] leading-relaxed border-l border-[var(--color-blue-1)] pl-4">
            A collective of engineers, designers, and strategists operating at the intersection of technology and creativity. 
            <br/><br/>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-white-dim)]">Scroll to unpack</span>
          </p>
        </motion.div>
      </section>

      {/* --- FILTER/NAVIGATION (Irregular placement) --- */}
      <section className="relative z-20 px-6 md:px-16 py-12 flex justify-end">
        <div className="glass-subtle p-4 rounded-[var(--radius-lg)] flex flex-wrap gap-2 w-full max-w-md">
           <button 
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 text-xs font-mono tracking-wider rounded-full transition-all ${
                activeCategory === null ? 'bg-white text-black' : 'hover:bg-white/[0.1] text-[var(--color-white-muted)]'
              }`}
            >
              [ALL]
            </button>
          {Object.entries(ROLE_CATEGORIES).map(([key, cat]) => (
            <button 
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 text-xs font-mono tracking-wider rounded-full transition-all ${
                activeCategory === key ? 'bg-[var(--color-blue-1)] text-white' : 'hover:bg-white/[0.1] text-[var(--color-white-muted)]'
              }`}
            >
              {cat.label.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* --- MEMBERS GRID (Clean Responsive Layout) --- */}
      <section className="relative z-10 px-6 md:px-16 min-h-screen pb-32">
        {isLoading ? (
          <div className="space-y-16 animate-pulse">
            {[1, 2].map((wing) => (
              <div key={wing}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-8 w-48 bg-white/10 rounded" />
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {[1, 2, 3, 4, 5].map((card) => (
                    <div key={card} className="h-40 bg-white/5 border border-white/10 rounded-[var(--radius-shell)] p-4 flex flex-col justify-end gap-2">
                      <div className="h-4 w-1/2 bg-white/20 rounded" />
                      <div className="h-3 w-1/3 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : activeCategory === null ? (
          <div className="space-y-16">
            {Object.entries(ROLE_CATEGORIES).map(([key, cat]) => {
              const wingMembers = members.filter(m => m.category === key);
              if (wingMembers.length === 0) return null;
              
              return (
                <div key={key}>
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-editorial text-3xl font-bold uppercase tracking-tight text-white">{cat.label}</h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {wingMembers.map((member, i) => (
                        <MemberCard key={member.id} member={member} />
                      ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {members.filter(m => m.category === activeCategory).map((member, i) => (
                <MemberCard key={member.id} member={member} />
              ))}
          </motion.div>
        )}
      </section>

      {/* --- FOOTER BANNER --- */}
      <section className="relative z-10 border-t border-[var(--color-border)] py-24 overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="whitespace-nowrap"
        >
          <span className="font-editorial text-[8vw] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-white-dim)] to-[var(--color-border)] px-8">
            WE BUILD / WE COMPETE / WE LEAD / 
          </span>
          <span className="font-editorial text-[8vw] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-white-dim)] to-[var(--color-border)] px-8">
            WE BUILD / WE COMPETE / WE LEAD / 
          </span>
        </motion.div>
      </section>
      
    </div>
  );
}
