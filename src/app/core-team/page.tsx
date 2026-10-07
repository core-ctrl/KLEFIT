'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ROLE_CATEGORIES } from '@/lib/constants';

// ─── SAKURA (PINK LEAVES) BURST EFFECT ───
// A lightweight 2D canvas particle system for the cherry blossom wipe transition
function SakuraCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const petals: any[] = [];
    // Generate 200 leaves
    const colors = [
      '249, 115, 22', // Orange
      '220, 38, 38',  // Red
      '251, 191, 36', // Gold/Yellow
      '185, 28, 28'   // Deep Red
    ];

    for (let i = 0; i < 200; i++) {
      petals.push({
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        z: Math.random() * 2 + 0.5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 20 + 15, // slightly larger for the sharp leaf
        speedX: (Math.random() - 0.5) * 3 + 2,
        speedY: (Math.random() - 0.5) * 3 + 3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Keep rendering leaves smoothly throughout the initial tunnel phase
      if (progress > 0.02 && progress < 0.4) {
        // Slow, gentle burst
        const burst = Math.max(0, 1 - Math.abs(progress - 0.2) * 2);
        
        petals.forEach(p => {
          p.x += p.speedX * (1 + burst * 3); // Slowed down from 15 to 3
          p.y += p.speedY * (1 + burst * 3);
          p.rot += p.rotSpeed * (1 + burst * 2);
          
          if (p.x > width + 50) p.x = -50;
          if (p.y > height + 50) p.y = -50;
          
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(p.z, p.z);
          
          // Draw a sleek, sharp "ninja" autumn leaf (willow/dart shape)
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size / 2, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size / 2, 0, 0, -p.size);
          
          // Autumn styling
          const opacity = burst * 0.9;
          ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
          ctx.fill();
          
          ctx.restore();
        });
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [progress]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-50" />;
}

// ─── WING QUOTATIONS ───
const WING_QUOTES: Record<string, { title: string, quote: string }> = {
  'ZERO_ORDER': { title: 'The Zero Order', quote: 'Where vision becomes trajectory.' },
  'DESIGNING': { title: 'Creative Division', quote: 'Pixels forged in the fires of imagination.' },
  'SOCIAL_MEDIA': { title: 'Social Media Nexus', quote: 'The pulse of the network, amplifying every signal.' },
  'LOGISTICS': { title: 'Logistics Command', quote: 'The unseen architects of flawless execution.' },
  'TECHNICAL': { title: 'Event Operations', quote: 'Engineering experiences that defy the ordinary.' },
  'COORDINATORS': { title: 'The Vanguard', quote: 'The frontline force driving the vision forward.' }
};

// ─── COMPONENT: INTRO CARD ───
function CinematicIntro({ totalItems, progress }: any) {
  const step = 1 / (totalItems || 1); // fallback to 1 to avoid NaN
  const introOpacity = useTransform(progress, [0, step * 0.5, step], [1, 1, 0]);
  const introScale = useTransform(progress, [0, step], [1, 5]);
  
  return (
    <motion.div 
      className="absolute flex flex-col items-center text-center inset-0 justify-center px-8"
      style={{ opacity: introOpacity, scale: introScale, pointerEvents: introOpacity.get() > 0 ? 'auto' : 'none' }}
    >
      <div className="relative flex flex-col items-center justify-center">
        <p className="font-display text-2xl md:text-4xl text-white/80 font-light tracking-[0.2em] mb-6 shadow-black drop-shadow-2xl">
          "Even in the darkest storms...
        </p>
        <p className="font-editorial text-5xl md:text-7xl font-bold italic text-white tracking-tighter drop-shadow-2xl">
          Legends are forged in silence."
        </p>
        <div className="absolute top-full mt-16 w-[1px] h-24 bg-gradient-to-b from-[var(--color-blue-1)] to-transparent mx-auto" />
      </div>
    </motion.div>
  );
}

// ─── COMPONENT: WING TITLE CARD ───
function WingTitleCard({ data, index, totalItems, progress }: any) {
  const step = 1 / totalItems;
  const start = index * step;
  const enterEnd = start + (step * 0.2);
  const exitStart = start + (step * 0.6); // Start zooming slightly earlier for effect
  const exitEnd = start + step;

  // Opacity stays 1 until the text has fully eclipsed the screen, then cuts to 0
  const opacity = useTransform(progress, [start, enterEnd, exitEnd - 0.01, exitEnd], [0, 1, 1, 0]);
  
  // Scale goes to an extreme 150 to fly THROUGH the text/letter
  const scale = useTransform(progress, [start, enterEnd, exitStart, exitEnd], [0.5, 1, 1, 150]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ opacity, scale, pointerEvents: opacity.get() > 0 ? 'auto' : 'none' }}
    >
      <div className="text-center">
        <h2 
          className="font-editorial text-7xl md:text-9xl font-bold uppercase tracking-tighter mb-6"
          style={{ 
            color: '#020617', // EXACT match to the cinematic page background
            WebkitTextStroke: '2px rgba(255, 255, 255, 0.9)',
            textShadow: '0 0 40px rgba(37,99,235,0.8)'
          }}
        >
          {data.title}
        </h2>
        <p className="font-mono text-sm tracking-[0.3em] text-[var(--color-blue-1)] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          "{data.quote}"
        </p>
      </div>
    </motion.div>
  );
}

// ─── COMPONENT: OUTRO CARD ───
function OutroCard({ index, totalItems, progress }: any) {
  const step = 1 / totalItems;
  const start = index * step;
  
  // It fades in at the very end
  const opacity = useTransform(progress, [start - step*0.2, start], [0, 1]);
  
  // A small hack: since pointerEvents won't evaluate motion values reactively in render,
  // we'll just use a wrapper that ignores pointer events, but the button inside uses auto.
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] z-50 pointer-events-none"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center pointer-events-auto">
        <h2 className="font-editorial text-6xl md:text-9xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          THANK YOU
        </h2>
        <Link href="/" className="group relative flex flex-col items-center cursor-pointer">
          <span className="font-mono text-sm tracking-[0.3em] text-[var(--color-blue-1)] uppercase group-hover:text-white transition-colors duration-300">
            RETURN TO BASE
          </span>
          <div className="w-0 h-[1px] bg-[var(--color-blue-1)] group-hover:w-full transition-all duration-300 mt-2" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── COMPONENT: CHARACTER CARD ───
function CinematicCharacter({ data, index, totalItems, progress }: any) {
  const step = 1 / totalItems;
  const start = index * step;
  const enterEnd = start + (step * 0.4); // Slowed down fade-in (takes 40% of the step now)
  const exitStart = start + (step * 0.7);
  const exitEnd = start + step;

  const opacity = useTransform(progress, [start, enterEnd, exitStart, exitEnd], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, enterEnd, exitStart, exitEnd], [0.8, 1, 1, 8]);

  // Make names look cool
  const nameParts = data.name.split(' ');
  const nameLine1 = nameParts[0] || '';
  const nameLine2 = nameParts.slice(1).join(' ') || '';

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 md:px-24 pt-20"
      style={{ opacity, scale, pointerEvents: opacity.get() > 0 ? 'auto' : 'none' }}
    >
      <div className="w-full max-w-[1400px] h-[80vh] flex flex-col md:flex-row items-center gap-12 md:gap-24 relative">
        {/* Left: Huge Placeholder Image */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full max-h-[700px] relative group perspective-[1000px]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[var(--radius-lg)] border border-white/20 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden transition-transform duration-700 group-hover:rotate-y-12 group-hover:rotate-x-12">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 noise">
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-4">
                <div className="w-2 h-2 bg-white/50 rounded-full animate-ping" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
                Awaiting Subject Data
              </p>
            </div>
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50 transform -skew-y-12 -translate-y-1/2" />
          </div>
        </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center relative">
          <div className="mb-8">
            <p className="font-mono text-sm text-[var(--color-blue-2)] tracking-[0.3em] uppercase mb-2 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[var(--color-blue-2)]" />
              Rank: {data.role}
            </p>
            <h1 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
              {nameLine1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">{nameLine2}</span>
            </h1>
          </div>

          <div className="glass p-6 md:p-8 rounded-[var(--radius-md)] border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen" />
            
            <p className="font-sans text-white/70 text-lg leading-relaxed relative z-10 mb-8 italic border-l-2 border-[var(--color-blue-1)] pl-4">
              "{data.lore}"
            </p>

            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between font-mono text-[10px] text-white/50 uppercase mb-1">
                  <span>Synchronization</span>
                  <span>{Math.floor(Math.random() * 10 + 90)}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-blue-2)]" style={{ width: `${Math.floor(Math.random() * 10 + 90)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[10px] text-white/50 uppercase mb-1">
                  <span>Bandwidth</span>
                  <span>{Math.floor(Math.random() * 15 + 85)}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-blue-1)]" style={{ width: `${Math.floor(Math.random() * 15 + 85)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN INTERACTIVE COMPONENT ───
export default function CoreTeamCinematic() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Smooth out the scroll progress for physics-based feeling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    smoothProgress.onChange((v) => setCurrentProgress(v));
  }, [smoothProgress]);

  // Load and Group CSV Data
  useEffect(() => {
    fetch('/data/EFIT-Team.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const parsedMembers: any[] = [];
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
             if (roleLower.includes('mentor')) category = 'MENTOR';
             else if (roleLower.includes('president') || roleLower.includes('secretary')) category = 'ZERO_ORDER';
             else if (roleLower.includes('design')) category = 'DESIGNING';
             else if (roleLower.includes('social media')) category = 'SOCIAL_MEDIA';
             else if (roleLower.includes('logistic')) category = 'LOGISTICS';
             else if (roleLower.includes('tech') || roleLower.includes('event')) category = 'TECHNICAL';
             
             const n = name.toLowerCase();
             let lore = "A crucial node in the network, amplifying the core vision.";
             
             // Core Order
             if (n.includes('eswar')) lore = "The visionary architect, navigating the complex matrix of technology and leadership with absolute precision.";
             else if (n.includes('krishna saran')) lore = "The operational mastermind. Executes large-scale initiatives with ruthless efficiency and unyielding resolve.";
             else if (n.includes('ram gopal')) lore = "The central communication nexus. Bridges the gap between raw engineering talent and administrative protocol.";
             else if (n.includes('khaja')) lore = "The relentless enforcer of standards. Ensures every team operates at maximum bandwidth with zero packet loss.";
             
             // Designing
             else if (n.includes('rupesh')) lore = "Forging reality from imagination. The supreme architect of our digital and visual identity.";
             else if (n.includes('dinesh')) lore = "Bending pixels and breaking limits. A visionary artist of the digital frontier.";
             else if (n.includes('sakyath')) lore = "Transforming abstract concepts into stunning visual masterpieces with unmatched clarity.";
             
             // Social Media
             else if (n.includes('harshitha')) lore = "The voice of the void. Orchestrating the frequency and rhythm of our entire digital empire.";
             else if (n.includes('rajeswararao')) lore = "Amplifying signals across the network. A master of strategic digital engagement and reach.";
             else if (n.includes('teja')) lore = "Curating the narrative. Turning passing impressions into lasting digital legacies.";
             else if (n.includes('khushi')) lore = "Broadcasting the vision to the world, ensuring our signal cuts through the absolute noise.";
             
             // Logistics
             else if (n.includes('bhavya')) lore = "The unseen grandmaster. Engineering the invisible framework that holds the entire vision together.";
             else if (n.includes('lalithya')) lore = "Executing complex ground-level operations with machine-like precision in the shadows.";
             else if (n.includes('satyavani')) lore = "The silent gears of the machine, ensuring flawless execution before the curtain even rises.";
             else if (n.includes('preethi')) lore = "Mastering the flow of resources and time. A true orchestrator of logistical harmony.";
             
             // Events
             else if (n.includes('fayaz')) lore = "The architect of chaos and logic. Designing experiences that consistently defy the ordinary.";
             else if (n.includes('justina')) lore = "Transforming complex technical concepts into seamless, unforgettable event experiences.";
             else if (n.includes('bhavani')) lore = "Orchestrating technical brilliance and operational flow into a unified, flawless spectacle.";
             
             // Coordinators
             else if (n.includes('harshith')) lore = "The vanguard force, pushing operational boundaries beyond known limits.";
             else if (n.includes('sanjay')) lore = "Executing ground-level operations with relentless energy and unwavering focus.";
             else if (n.includes('yashwanth')) lore = "The frontline catalyst, turning grand plans into tangible, high-impact reality.";
             else if (n.includes('mohan')) lore = "Bridging logic and execution with absolute precision on the front lines.";

             if (category !== 'MENTOR') {
                parsedMembers.push({ type: 'member', id, name, role, category, lore });
             }
          }
        }

        // Group them and insert Title Cards
        const finalItems: any[] = [];
        
        // Push Intro Dialogue as first item to use the same bounds logic
        finalItems.push({ type: 'intro' });

        const groups = ['ZERO_ORDER', 'DESIGNING', 'SOCIAL_MEDIA', 'LOGISTICS', 'TECHNICAL', 'COORDINATORS'];
        groups.forEach(group => {
           const members = parsedMembers.filter(m => m.category === group);
           if (members.length > 0) {
              finalItems.push({ 
                 type: 'title', 
                 category: group, 
                 ...WING_QUOTES[group] 
              });
              finalItems.push(...members);
           }
        });

        // Add Outro Card
        finalItems.push({ type: 'outro' });

        setItems(finalItems);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching CSV:", err);
        setIsLoading(false);
      });
  }, []);

  // BACKGROUND THEME
  const bgOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className="relative text-white selection:bg-[var(--color-blue-1)]" style={{ height: `${items.length * 150}vh`, backgroundColor: '#020617' }}>
      
      {/* ─── FIXED CINEMATIC VIEWPORT ─── */}
      <div className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center">
        
        {/* NAV BACK BUTTON */}
        <div className="absolute top-8 left-8 z-50">
          <Link href="/" className="font-mono text-xs text-white/50 hover:text-white transition-colors tracking-widest uppercase">
            &larr; Return to Base
          </Link>
        </div>

        {/* --- DYNAMIC BACKGROUND --- */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0f1d] to-[#041a3a] z-0"
          style={{ opacity: bgOpacity }}
        >
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-cyan-900/20 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
        </motion.div>

        {/* --- DYNAMIC RENDERER --- */}
        <div className="absolute inset-0 z-40" style={{ perspective: '2000px' }}>
          {isLoading ? (
             <div className="w-full h-full flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center gap-6">
                   <div className="w-[30vw] h-[40vw] max-w-sm max-h-[500px] bg-white/5 rounded-xl border border-white/10" />
                   <div className="w-48 h-8 bg-white/10 rounded" />
                   <div className="w-32 h-4 bg-white/5 rounded" />
                </div>
             </div>
          ) : (
          items.map((item, idx) => {
             if (item.type === 'intro') {
                return <CinematicIntro key={`intro-${idx}`} totalItems={items.length} progress={smoothProgress} />;
             }
             
             if (item.type === 'title') {
                return <WingTitleCard key={`title-${item.category}`} data={item} index={idx} totalItems={items.length} progress={smoothProgress} />;
             }
             
             if (item.type === 'member') {
                return <CinematicCharacter key={`member-${item.id}`} data={item} index={idx} totalItems={items.length} progress={smoothProgress} />;
             }
             
             if (item.type === 'outro') {
                return <OutroCard key={`outro`} index={idx} totalItems={items.length} progress={smoothProgress} />;
             }
             
             return null;
          })
          )}
        </div>

      </div>
    </div>
  );
}
