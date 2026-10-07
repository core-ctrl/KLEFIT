'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

export function HeroScene() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[var(--color-deep-navy)] rounded-[var(--radius-shell)] border border-[var(--color-blue-gray)] shadow-2xl">
      
      {/* ─── LAYER 1: ATMOSPHERIC LIGHTING & GLOW ─── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[var(--color-blue-1)] opacity-20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      {/* ─── LAYER 2: GIANT EFIT LOGO (CENTERED DIRECTLY BEHIND THE TEAM) ─── */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden pb-6 sm:pb-10">
        <Image
          src="https://res.cloudinary.com/dkrvtfbor/image/upload/v1790091367/EFIT_White_logo_3x_nxsrck.png"
          alt="EFIT Logo Backdrop"
          width={1350}
          height={450}
          className="w-[94vw] md:w-[82vw] max-w-[1350px] object-contain opacity-60 drop-shadow-[0_0_60px_rgba(37,99,235,0.3)]"
          priority
        />
      </div>

      {/* ─── LAYER 3: STAGE LIGHTING & GROUND HORIZON ─── */}
      <div className="absolute inset-x-0 bottom-0 z-15 pointer-events-none flex flex-col items-center">
        {/* Ambient floor glow */}
        <div className="w-[92%] max-w-[1200px] h-24 bg-gradient-to-t from-[var(--color-blue-1)]/25 via-[var(--color-midnight-blue)]/50 to-transparent blur-xl rounded-full" />
        {/* Cyber baseline */}
        <div className="w-[85%] max-w-[1100px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-blue-2)]/50 to-transparent -mt-2" />
      </div>

      {/* ─── LAYER 4: THE GROUP CUTOUT (STANDING IN FRONT OF THE LOGO) ─── */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none pb-0">
        <div className="w-[100%] sm:w-[96%] md:w-[92%] lg:w-[90%] max-w-[1400px] flex flex-col items-center justify-end group origin-bottom transition-transform duration-700 hover:scale-[1.015]">
          {/* Negative margin pulls the transparent bottom space of the PNG below the container, grounding the people */}
          <Image
            src="https://res.cloudinary.com/dkrvtfbor/image/upload/v1790081274/Firefly_RemoveBackground_uru5t9.png" 
            alt="EFIT Group Photograph Cutout"
            width={1400}
            height={800}
            className="w-full h-auto object-contain object-bottom pointer-events-auto filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] -mb-[22%] sm:-mb-[19%] md:-mb-[16%]"
            priority
          />
        </div>
        {/* Bottom subtle edge blend fixed to the bottom of the card - taller for smooth fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-deep-navy)] via-[var(--color-deep-navy)]/90 via-30% to-transparent pointer-events-none" />
      </div>

      {/* ─── LAYER 5: ANNOTATIONS & UI CONTROLS ─── */}
      <div className="absolute inset-0 z-30 pointer-events-none p-6 md:p-10 lg:p-14 flex flex-col justify-between">
        
        {/* Top left / right labels */}
        <div className="flex justify-between items-start mt-2 sm:mt-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[var(--color-blue-3)] uppercase font-semibold">
              01 / EFIT
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[var(--color-white-dim)] uppercase">
              CS&IT / KL UNIVERSITY
            </span>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[var(--color-blue-3)] uppercase font-semibold">
              EST. 2026
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[var(--color-white-dim)] uppercase">
              STUDENT BODY
            </span>
          </div>
        </div>

        {/* Bottom CTA & System Node Indicator */}
        <div className="flex justify-between items-end gap-6 pb-10 sm:pb-12 md:pb-16">
          
          {/* Signature Graphic */}
          <div className="flex items-center gap-3 opacity-90 hidden sm:flex bg-[var(--color-deep-navy)]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--color-blue-gray)]/60">
             <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-blue-1)] shadow-[0_0_10px_var(--color-blue-1)] animate-pulse" />
             <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-blue-1)] to-transparent" />
             <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-blue-3)] uppercase font-medium">Sys.Node_01</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto ml-auto">
             <Button href="/explore" className="bg-white text-[var(--color-deep-navy)] hover:bg-[var(--color-blue-3)] rounded-full px-6 sm:px-8 py-5 sm:py-6 font-mono text-xs tracking-wider uppercase font-bold shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all">
               Discover EFIT <ArrowRightIcon className="inline-block ml-2 w-4 h-4" />
             </Button>
             <Button href="/core-team" variant="outline" className="backdrop-blur-md bg-[var(--color-midnight-blue)]/60 border-[var(--color-blue-gray)] text-[var(--color-blue-3)] hover:bg-[var(--color-blue-gray)]/60 hover:border-[var(--color-blue-2)] rounded-full px-6 sm:px-8 py-5 sm:py-6 font-mono text-xs tracking-wider uppercase transition-all hidden md:flex">
               Meet The Team
             </Button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
