'use client';

import dynamic from 'next/dynamic';
import { MOCK_WALL_ITEMS } from '@/lib/mock-data';

const HolographicWall = dynamic(
  () => import('@/components/wall/ShaderWall').then((m) => m.HolographicWall),
  { ssr: false }
);

// Scattered card positions — randomized rotations, sizes, and offsets
const CARD_LAYOUTS = [
  { top: '6%',   left: '8%',   rotate: -3,   w: 180, h: 140 },
  { top: '4%',   left: '42%',  rotate: 2,    w: 160, h: 200 },
  { top: '8%',   left: '72%',  rotate: -1.5, w: 190, h: 150 },
  { top: '32%',  left: '18%',  rotate: 1.8,  w: 200, h: 160 },
  { top: '28%',  left: '50%',  rotate: -2.5, w: 220, h: 220 },
  { top: '55%',  left: '5%',   rotate: 2.2,  w: 150, h: 180 },
  { top: '52%',  left: '35%',  rotate: -1,   w: 170, h: 140 },
  { top: '50%',  left: '68%',  rotate: 3,    w: 160, h: 190 },
  { top: '75%',  left: '22%',  rotate: -2,   w: 180, h: 150 },
  { top: '78%',  left: '58%',  rotate: 1.5,  w: 200, h: 170 },
];

export default function WallPage() {
  const items = MOCK_WALL_ITEMS;

  return (
    <div className="relative w-full min-h-screen overflow-hidden rounded-[var(--radius-shell)]">
      {/* ── Holographic WebGL Background ── */}
      <HolographicWall />

      {/* ── Content layer (above shader) ── */}
      <div className="relative z-10 min-h-screen">

        {/* ── Top bar ── */}
        <div className="flex justify-between items-center px-8 pt-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            07 / WALL OF KL
          </span>
          <div className="flex gap-6">
            <span className="font-mono text-xs text-white/30 cursor-pointer hover:text-white/60 transition-colors">settings</span>
            <span className="font-mono text-xs text-white/30 cursor-pointer hover:text-white/60 transition-colors">black</span>
          </div>
        </div>

        {/* ── Scattered Photo Cards ── */}
        <div className="relative w-full" style={{ height: '260vh' }}>
          {items.map((item, i) => {
            const layout = CARD_LAYOUTS[i % CARD_LAYOUTS.length];
            return (
              <div
                key={item.id}
                className="absolute group cursor-pointer"
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: layout.w,
                  transform: `rotate(${layout.rotate}deg)`,
                  transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease',
                }}
              >
                <div
                  className="relative overflow-hidden bg-black/20 backdrop-blur-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_12px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-105 border border-white/10 group-hover:border-white/30"
                  style={{ width: layout.w, height: layout.h }}
                >
                  {/* Glass reflection highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
                  
                  {/* Photo placeholder area */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    {/* Silhouette / text placeholder */}
                    <span className="relative font-display text-xl font-bold text-white text-center leading-tight select-none drop-shadow-md">
                      {item.title}
                    </span>
                  </div>

                  {/* Category label */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-[4px] font-mono text-[8px] uppercase tracking-widest text-white/90 border border-white/10">
                    {item.category}
                  </div>

                  {/* Hover: subtle glow edge */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 20px rgba(255,255,255,0.1)`,
                    }}
                  />
                </div>

                {/* Caption below the "photo" */}
                <div className="mt-2 px-1">
                  <p className="font-sans text-[11px] text-white/60 leading-tight truncate">
                    {item.title}
                  </p>
                  <p className="font-mono text-[9px] text-white/30 mt-0.5">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom label ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
          Scroll · Refract
        </div>
      </div>
    </div>
  );
}
