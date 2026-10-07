'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroScene } from '@/components/home/HeroScene';
import { WhoWeAreScene } from '@/components/home/WhoWeAreScene';
import { ClubsScene } from '@/components/home/ClubsScene';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use matchMedia WITH SCOPE instead of context
    const mm = gsap.matchMedia(containerRef);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Ensure proper setup inside the matchMedia scope
      gsap.set('.scene-2', { yPercent: 100 });
      gsap.set('.scene-3', { yPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scene = progress < 0.33 ? 1 : progress < 0.66 ? 2 : 3;
            const indicators = document.querySelectorAll('.chapter-indicator-dot');
            indicators.forEach((el, i) => {
              if (i + 1 === scene) {
                el.classList.add('text-[var(--color-blue-1)]');
                el.classList.remove('text-[var(--color-white-dim)]');
              } else {
                el.classList.remove('text-[var(--color-blue-1)]');
                el.classList.add('text-[var(--color-white-dim)]');
              }
            });
          }
        }
      });

      // ─── TRANSITION 1: Hero -> Who We Are ───
      tl.to('.scene-1', {
        scale: 0.94,
        z: -180,
        rotationX: -3,
        opacity: 0.75,
        ease: 'none',
      }, 0);

      tl.fromTo('.scene-2',
        { yPercent: 100, z: -140, scale: 0.96 },
        { yPercent: 0, z: 0, scale: 1, ease: 'power2.inOut' },
        0
      );

      // ─── TRANSITION 2: Who We Are -> What We Do ───
      tl.to('.scene-2', {
        scale: 0.94,
        z: -160,
        rotationX: -3,
        opacity: 0.75,
        ease: 'none',
      }, 1);

      tl.fromTo('.scene-3',
        { yPercent: 100, z: -120, scale: 0.96 },
        { yPercent: 0, z: 0, scale: 1, ease: 'power2.inOut' },
        1
      );

      // Word staggered entrance inside Scene 3
      tl.fromTo('.what-we-do-word',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
        1.2
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      // Ensure proper setup inside the matchMedia scope
      gsap.set('.scene-2', { yPercent: 100 });
      gsap.set('.scene-3', { yPercent: 100 });

      // Fallback simple fade transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scene = progress < 0.33 ? 1 : progress < 0.66 ? 2 : 3;
            const indicators = document.querySelectorAll('.chapter-indicator-dot');
            indicators.forEach((el, i) => {
              if (i + 1 === scene) {
                el.classList.add('text-[var(--color-blue-1)]');
                el.classList.remove('text-[var(--color-white-dim)]');
              } else {
                el.classList.remove('text-[var(--color-blue-1)]');
                el.classList.add('text-[var(--color-white-dim)]');
              }
            });
          }
        }
      });

      tl.to('.scene-1', { opacity: 0, ease: 'none' }, 0);
      tl.fromTo('.scene-2', { opacity: 0, yPercent: 0 }, { opacity: 1, ease: 'none' }, 0);
      
      tl.to('.scene-2', { opacity: 0, ease: 'none' }, 1);
      tl.fromTo('.scene-3', { opacity: 0, yPercent: 0 }, { opacity: 1, ease: 'none' }, 1);
      
      tl.fromTo('.what-we-do-word', 
        { opacity: 0 }, { opacity: 1, stagger: 0.1, ease: 'none' }, 1.2
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <>
      <div>
        <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden" style={{ perspective: '1400px' }}>
            {/* 3D Scene Wrapper */}
            <div 
              className="relative w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-6 pt-[calc(var(--nav-height,72px)+8px)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
               {/* Scene 1 */}
               <div className="scene scene-1 absolute inset-0 z-10 w-full h-full origin-top will-change-transform p-3 sm:p-5 md:p-6 pt-[calc(var(--nav-height,72px)+8px)]">
                 <HeroScene />
               </div>
               
               {/* Scene 2 */}
               <div 
                 className="scene scene-2 absolute inset-0 z-20 w-full h-full origin-bottom will-change-transform p-3 sm:p-5 md:p-6 pt-[calc(var(--nav-height,72px)+8px)]"
               >
                 <WhoWeAreScene />
               </div>
               
               {/* Scene 3 */}
               <div 
                 className="scene scene-3 absolute inset-0 z-30 w-full h-full origin-bottom will-change-transform p-3 sm:p-5 md:p-6 pt-[calc(var(--nav-height,72px)+8px)]"
               >
                 <ClubsScene />
               </div>
            </div>
        </div>
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex flex-col items-center gap-2">
            <span className={`chapter-indicator-dot font-mono text-[10px] transition-colors duration-300 ${num === 1 ? 'text-[var(--color-blue-1)]' : 'text-[var(--color-white-dim)]'}`}>
              0{num}
            </span>
            {num !== 3 && (
              <div className="w-[1px] h-6 bg-[var(--color-border)]" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
