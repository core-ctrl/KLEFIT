'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

// Dummy Projects for demonstration
const RUBIX_PROJECTS = [
  { id: 1, title: 'Rubix Core API', desc: 'Centralized backend architecture for EFIT platforms.', tech: ['Node.js', 'Express', 'MongoDB'] },
  { id: 2, title: 'Event Sync UI', desc: 'Real-time synchronization dashboard for event coordinators.', tech: ['React', 'Socket.io', 'Tailwind'] },
];

const FORENSIC_PROJECTS = [
  { id: 1, title: 'Cyber Sentinel', desc: 'Automated vulnerability scanning and reporting tool.', tech: ['Python', 'Bash', 'Docker'] },
  { id: 2, title: 'Log Analyzer Pro', desc: 'Deep-dive analytical engine for server security logs.', tech: ['Rust', 'ELK Stack', 'Vue'] },
];

export default function ProjectsPage() {
  const [hoveredSide, setHoveredSide] = useState<'rubix' | 'forensic' | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--color-blue-1)] pt-[var(--nav-height,72px)]">

      {/* ─── DYNAMIC TREE HERO SECTION ─── */}
      <div className="h-[80vh] w-full relative flex flex-col items-center overflow-hidden">
        
        {/* EFIT LOGO AT TOP CENTER */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-[var(--color-blue-1)] flex items-center justify-center bg-black shadow-[0_0_40px_rgba(37,99,235,0.3)] relative">
            <div className="absolute inset-0 rounded-full border border-white/20 scale-110 animate-[spin_10s_linear_infinite]" />
            <span className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-lg">EFIT</span>
          </div>
        </div>

        {/* The two SVG branches connecting EFIT to the clubs */}
        <svg className="absolute top-[6rem] md:top-[8rem] left-0 w-full h-[calc(100%-8rem)] pointer-events-none z-20" preserveAspectRatio="none">
           {/* Branch to left */}
           <path 
             d="M 50% 0 C 50% 50%, 25% 50%, 25% 100%" 
             fill="none" 
             stroke="url(#blue-grad)" 
             strokeWidth="2" 
             strokeDasharray="6 6" 
             className="animate-[dash_20s_linear_infinite]" 
           />
           {/* Branch to right */}
           <path 
             d="M 50% 0 C 50% 50%, 75% 50%, 75% 100%" 
             fill="none" 
             stroke="url(#white-grad)" 
             strokeWidth="2" 
             strokeDasharray="6 6" 
             className="animate-[dash_20s_linear_infinite]" 
           />
           <defs>
             <linearGradient id="blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="rgba(37,99,235,0.8)" />
               <stop offset="100%" stopColor="rgba(37,99,235,0.1)" />
             </linearGradient>
             <linearGradient id="white-grad" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
               <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
             </linearGradient>
           </defs>
        </svg>

        {/* The Split Hover Areas for Rubix and Forensic */}
        <div className="absolute top-[8rem] left-0 w-full h-[calc(100%-8rem)] flex z-10">
          
          {/* RUBIX SIDE */}
          <motion.div 
            className="h-full relative flex flex-col justify-end items-center cursor-pointer border-r border-white/5 overflow-hidden group pb-16"
            animate={{ width: hoveredSide === 'rubix' ? '65%' : hoveredSide === 'forensic' ? '35%' : '50%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            onHoverStart={() => setHoveredSide('rubix')}
            onHoverEnd={() => setHoveredSide(null)}
            onClick={() => document.getElementById('rubix-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="z-10 flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-blue-500/30 bg-blue-500/5 flex items-center justify-center mb-6 group-hover:border-blue-500 transition-colors backdrop-blur-md shadow-[0_0_30px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_60px_rgba(37,99,235,0.4)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <span className="font-mono text-[10px] text-blue-300 uppercase tracking-widest text-center px-2 relative z-10">Rubix<br/>Logo</span>
              </div>
              <motion.h2 
                className="font-editorial text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white"
                animate={{ scale: hoveredSide === 'rubix' ? 1.1 : 1 }}
              >
                Rubix
              </motion.h2>
              <p className="mt-4 font-mono text-xs tracking-[0.3em] text-blue-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Development & Architecture
              </p>
            </div>
          </motion.div>

          {/* FORENSIC SIDE */}
          <motion.div 
            className="h-full relative flex flex-col justify-end items-center cursor-pointer overflow-hidden group pb-16"
            animate={{ width: hoveredSide === 'forensic' ? '65%' : hoveredSide === 'rubix' ? '35%' : '50%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            onHoverStart={() => setHoveredSide('forensic')}
            onHoverEnd={() => setHoveredSide(null)}
            onClick={() => document.getElementById('forensic-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="z-10 flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/30 bg-white/5 flex items-center justify-center mb-6 group-hover:border-white transition-colors backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest text-center px-2 relative z-10">Forensic<br/>Logo</span>
              </div>
              <motion.h2 
                className="font-editorial text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white"
                animate={{ scale: hoveredSide === 'forensic' ? 1.1 : 1 }}
              >
                Forensic
              </motion.h2>
              <p className="mt-4 font-mono text-xs tracking-[0.3em] text-white/70 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Security & Analysis
              </p>
            </div>
          </motion.div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            to { stroke-dashoffset: -1000; }
          }
        `}} />
      </div>

      {/* ─── PROJECT LISTINGS ─── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-32 space-y-32 relative z-10">
        
        {/* RUBIX PROJECTS SECTION */}
        <section id="rubix-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-blue-500 uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-blue-500" />
                Club Division 01
              </p>
              <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
                Rubix Projects
              </h2>
            </div>
            <p className="font-sans text-white/50 max-w-sm mt-6 md:mt-0 text-sm">
              Core platform infrastructure, web applications, and internal tools developed by the Rubix software engineering division.
            </p>
          </div>
          
          <div className="w-full h-64 border border-white/5 rounded-2xl bg-white/[0.02] flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
            <div className="w-16 h-[1px] bg-blue-500 mb-6 opacity-50" />
            <h3 className="font-editorial text-4xl text-white/50 tracking-tighter uppercase">Coming Soon</h3>
            <p className="font-mono text-[10px] tracking-widest text-blue-400/50 mt-4 uppercase">Project Database Offline</p>
          </div>
        </section>

        {/* FORENSIC PROJECTS SECTION */}
        <section id="forensic-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/70 uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-white/70" />
                Club Division 02
              </p>
              <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
                Forensic Projects
              </h2>
            </div>
            <p className="font-sans text-white/50 max-w-sm mt-6 md:mt-0 text-sm">
              Cybersecurity tools, vulnerability scanners, and analytical engines engineered by the Forensic division.
            </p>
          </div>
          
          <div className="w-full h-64 border border-white/5 rounded-2xl bg-white/[0.02] flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
            <div className="w-16 h-[1px] bg-white/50 mb-6 opacity-50" />
            <h3 className="font-editorial text-4xl text-white/50 tracking-tighter uppercase">Coming Soon</h3>
            <p className="font-mono text-[10px] tracking-widest text-white/40 mt-4 uppercase">Clearance Required</p>
          </div>
        </section>

      </div>
    </div>
  );
}
