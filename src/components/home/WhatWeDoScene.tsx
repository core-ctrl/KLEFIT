'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  { text: 'EXPLORE.', color: 'text-white', desc: 'Curiosity · Discovery · Ideas' },
  { text: 'ENGINEER.', color: 'text-[var(--color-blue-2)]', desc: 'Code · Systems · Technology' },
  { text: 'CREATE.', color: 'text-white', desc: 'Projects · Design · Innovation' },
  { text: 'COMPETE.', color: 'text-[var(--color-blue-1)]', desc: 'Hackathons · Challenges · Contests' },
  { text: 'LEAD.', color: 'text-white', desc: 'Community · Collaboration · Initiative' },
];

export function WhatWeDoScene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12 bg-[#0A1830] rounded-[var(--radius-shell)] border border-[var(--color-border)] shadow-[0_-30px_60px_rgba(7,20,38,0.8)] relative overflow-hidden">
      
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-blue-1)] opacity-[0.03] blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col gap-2 relative z-10 pt-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-blue-3)]">
          03 / WHAT WE DO
        </span>
        <h2 className="font-editorial text-2xl tracking-wide text-white">
          HOW EFIT MOVES.
        </h2>
      </div>

      {/* Main Interactive Visual */}
      <div className="flex-1 flex items-center justify-center relative w-full max-w-6xl mx-auto py-20">
        
        {/* Left: Vertical Technical Graphic */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[80%] w-12 hidden md:flex flex-col items-center pointer-events-none opacity-50">
          <div className="w-4 h-4 rounded-full border border-[var(--color-blue-2)]" />
          <div className="flex-1 w-[1px] bg-gradient-to-b from-[var(--color-blue-2)] via-[var(--color-blue-1)] to-transparent" />
          <div className="absolute top-[20%] w-2 h-2 rounded-full bg-[var(--color-blue-1)]" />
          <div className="absolute top-[50%] w-2 h-2 rounded-full bg-[var(--color-white-muted)]" />
          <div className="absolute top-[80%] w-2 h-2 rounded-full bg-[var(--color-blue-3)]" />
        </div>

        {/* Staircase Words */}
        <div className="flex flex-col w-full gap-2 lg:gap-4 relative z-10 pl-0 md:pl-20">
          {WORDS.map((item, index) => (
            <motion.div 
              key={item.text}
              className="flex items-center group cursor-default relative w-full"
              style={{ paddingLeft: `${index * 12}%` }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative">
                {/* Word */}
                <motion.h3 
                  layout
                  className={`what-we-do-word font-display font-bold text-[clamp(3rem,10vh,7.5rem)] tracking-tighter leading-[0.9] transition-colors duration-500 ${hoveredIndex === index ? 'text-white' : item.color} ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-20' : 'opacity-100'}`}
                >
                  {item.text}
                </motion.h3>

                {/* Animated Blue Line & Graphic Marker */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="absolute top-1/2 -left-8 md:-left-16 w-6 md:w-12 h-[2px] bg-[var(--color-blue-1)] origin-right flex items-center justify-start"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--color-blue-2)] shadow-[0_0_10px_var(--color-blue-2)] -ml-2" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Secondary Description */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="ml-8 hidden sm:block"
                  >
                    <span className="font-mono text-xs md:text-sm tracking-widest text-[var(--color-blue-3)] uppercase">
                      {item.desc}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Transition & Metadata */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 pt-8 border-t border-[var(--color-blue-gray)] relative z-10">
        
        <div className="flex flex-col gap-4">
          <span className="font-editorial text-xl text-white">ACTIVITIES</span>
          <div className="flex flex-wrap gap-3 max-w-2xl">
            {['TECHNICAL SKILLS', 'INDUSTRY PROJECTS', 'HACKATHONS', 'COMPETITIVE PROGRAMMING', 'WORKSHOPS', 'COMMUNITY'].map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full border border-[var(--color-blue-gray)] font-mono text-[10px] tracking-widest text-[var(--color-white-dim)]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-editorial text-xl text-white">EXPLORE EFIT →</span>
          <div className="flex flex-wrap gap-6">
            {['TEAM', 'EVENTS', 'PROJECTS', 'CONTESTS'].map((link) => (
              <Link key={link} href={`/${link.toLowerCase()}`} className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-blue-3)] hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
