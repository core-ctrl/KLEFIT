'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function ClubsScene() {
  return (
    <div className="absolute inset-0 w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-blue-1)]/5 via-black to-black" />

      {/* Title */}
      <div className="absolute top-24 left-12 md:left-24">
        <p className="font-mono text-xs tracking-[0.4em] text-[var(--color-blue-1)] uppercase mb-2 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[var(--color-blue-1)]" />
          03 / Divisions
        </p>
        <h2 className="font-editorial text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter">
          Our Clubs
        </h2>
      </div>

      <div className="relative w-full max-w-5xl h-[60vh] mt-24 flex flex-col items-center justify-between z-10">
        
        {/* TOP: EFIT LOGO */}
        <div className="z-10 flex flex-col items-center relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-[var(--color-blue-1)] flex items-center justify-center bg-black shadow-[0_0_40px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-shadow duration-500 relative">
            <div className="absolute inset-0 rounded-full border border-white/20 scale-110 animate-[spin_10s_linear_infinite]" />
            <span className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-lg">EFIT</span>
          </div>
        </div>

        {/* SVG BRANCHES connecting Top to Bottom Left/Right */}
        <svg className="absolute top-[3rem] md:top-[4rem] left-0 w-full h-[calc(100%-6rem)] pointer-events-none z-0" preserveAspectRatio="none">
           {/* Branch to left */}
           <path 
             d="M 50% 0 C 50% 60%, 25% 40%, 25% 100%" 
             fill="none" 
             stroke="url(#blue-grad)" 
             strokeWidth="2" 
             strokeDasharray="6 6" 
             className="animate-[dash_20s_linear_infinite]" 
           />
           {/* Branch to right */}
           <path 
             d="M 50% 0 C 50% 60%, 75% 40%, 75% 100%" 
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
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            to { stroke-dashoffset: -1000; }
          }
        `}} />

        {/* BOTTOM: CLUBS */}
        <div className="w-full flex justify-between px-8 md:px-24 relative z-10">
          
          {/* RUBIX */}
          <Link href="/projects" className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform duration-500">
             <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl border border-blue-500/30 bg-blue-500/5 flex items-center justify-center mb-6 group-hover:border-blue-500 transition-colors backdrop-blur-md shadow-[0_0_30px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_60px_rgba(37,99,235,0.4)] relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl" />
                <span className="font-mono text-xs text-blue-300 uppercase tracking-widest text-center px-2 relative z-10">Rubix<br/>Logo</span>
             </div>
             <h3 className="font-editorial text-4xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tighter">RUBIX</h3>
             <p className="font-mono text-xs text-blue-500 mt-2 uppercase tracking-[0.3em]">Development</p>
          </Link>

          {/* FORENSIC */}
          <Link href="/projects" className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform duration-500">
             <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-white/30 bg-white/5 flex items-center justify-center mb-6 group-hover:border-white transition-colors backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-widest text-center px-2 relative z-10">Forensic<br/>Logo</span>
             </div>
             <h3 className="font-editorial text-4xl font-bold text-white group-hover:text-white/80 transition-colors tracking-tighter">FORENSIC</h3>
             <p className="font-mono text-xs text-white/50 mt-2 uppercase tracking-[0.3em]">Security</p>
          </Link>

        </div>

      </div>
    </div>
  );
}
