'use client';

export function WhoWeAreScene() {
  return (
    <div className="w-full h-full flex flex-col justify-center relative bg-[var(--color-surface)] overflow-hidden border border-[var(--color-blue-gray)] shadow-[0_-20px_50px_rgba(7,20,38,0.8)] rounded-[var(--radius-shell)] p-6 md:p-12 lg:p-20">
      

      {/* ─── LAYER 1: ENORMOUS BACKGROUND TYPOGRAPHY ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] overflow-hidden">
        <span className="font-editorial text-[28vw] font-bold leading-none tracking-tighter whitespace-nowrap text-white">
          CS&IT
        </span>
      </div>

      {/* ─── LAYER 2: ABSTRACT TECHNICAL RING GRAPHIC ─── */}
      <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-40">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_120s_linear_infinite]">
          {/* Using the gradient shades from the reference palette */}
          <circle cx="400" cy="400" r="300" stroke="#132A46" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="400" cy="400" r="350" stroke="#1D4ED8" strokeWidth="2" opacity="0.3" />
          <circle cx="400" cy="400" r="380" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 20" opacity="0.5" />
          <circle cx="400" cy="400" r="200" stroke="#BFDBFE" strokeWidth="1" opacity="0.1" />
          
          {/* Nodes */}
          <circle cx="700" cy="400" r="4" fill="#60A5FA" />
          <circle cx="400" cy="50" r="6" fill="#2563EB" />
          <circle cx="100" cy="400" r="3" fill="#BFDBFE" />
          <circle cx="400" cy="780" r="5" fill="#1D4ED8" />
          
          {/* Connecting lines */}
          <path d="M400 50 L400 200" stroke="#60A5FA" strokeWidth="1" opacity="0.5" />
          <path d="M700 400 L600 400" stroke="#2563EB" strokeWidth="1" opacity="0.5" />
        </svg>
        <div className="absolute inset-0 bg-[var(--color-blue-1)] opacity-10 blur-[120px] rounded-full" />
      </div>

      {/* ─── LAYER 3: MAIN CONTENT ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left: Statement & Editorial Copy */}
        <div className="lg:col-span-5 flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-blue-2)] mb-12">
            02 / WHO WE ARE
          </span>
          
          <h2 className="font-display font-bold text-6xl sm:text-7xl xl:text-8xl text-white mb-16 tracking-tighter leading-[0.9]">
            WE ARE<br/>
            <span className="text-[var(--color-blue-3)] drop-shadow-[0_0_30px_rgba(191,219,254,0.2)]">EFIT.</span>
          </h2>
          
          <div className="border-l border-[var(--color-blue-1)] pl-6 mb-8 flex flex-col gap-2">
            <span className="font-mono text-xs tracking-widest text-white uppercase">TECHNICAL STUDENT BODY</span>
            <span className="font-mono text-xs tracking-widest text-[var(--color-white-muted)] uppercase">COMPUTER SCIENCE & IT</span>
            <span className="font-mono text-xs tracking-widest text-[var(--color-white-dim)] uppercase">KL UNIVERSITY</span>
          </div>
          
          <p className="font-sans text-lg text-[var(--color-white-muted)] leading-relaxed max-w-md">
            EFIT brings students together through technical activities, projects, events, competitions and collaboration.
          </p>
        </div>

        {/* Right: Editorial Statistics */}
        <div className="lg:col-span-7 flex flex-col justify-center w-full max-w-2xl ml-auto">
          
          <div className="grid grid-cols-2 gap-12 w-full">
            <div className="flex flex-col">
              <span className="font-display text-6xl sm:text-7xl font-bold text-white tracking-tighter">500<span className="text-[var(--color-blue-1)] font-sans font-light">+</span></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-white-dim)] mt-2">STUDENTS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-6xl sm:text-7xl font-bold text-white tracking-tighter">50<span className="text-[var(--color-blue-1)] font-sans font-light">+</span></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-white-dim)] mt-2">EVENTS</span>
            </div>
          </div>
          
          {/* Blue Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-[var(--color-blue-1)] via-[var(--color-blue-gray)] to-transparent my-12" />
          
          <div className="grid grid-cols-2 gap-12 w-full">
            <div className="flex flex-col">
              <span className="font-display text-6xl sm:text-7xl font-bold text-white tracking-tighter">30<span className="text-[var(--color-blue-1)] font-sans font-light">+</span></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-white-dim)] mt-2">PROJECTS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-6xl sm:text-7xl font-bold text-white tracking-tighter">25<span className="text-[var(--color-blue-1)] font-sans font-light">+</span></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-white-dim)] mt-2">COMPETITIONS</span>
            </div>
          </div>

        </div>
      </div>

      {/* ─── LAYER 4: MICRO ANNOTATIONS & SCROLL CUE ─── */}
      <div className="absolute top-8 right-8 font-mono text-[9px] tracking-[0.3em] text-[var(--color-white-dim)] uppercase text-right hidden lg:block">
        EST. 2026<br/>KL UNIVERSITY
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-white-dim)]">
          02 / WHAT WE DO
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-blue-1)] to-transparent" />
      </div>

    </div>
  );
}
