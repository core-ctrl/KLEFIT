'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleMockMicrosoftLogin = () => {
    setIsAuthenticating(true);
    
    // Simulate network delay for realistic feel
    setTimeout(() => {
       login(
         { id: '1', email: 'admin@kluniversity.in', name: 'EFIT Admin', studentId: '230003xxxx', accountType: 'MEMBER', status: 'ACTIVE' },
         ['SUPER_ADMIN'],
         ['SUPER_ADMIN']
       );
       router.push('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative bg-[var(--color-black)] overflow-hidden">
      <div className="fixed inset-0 noise opacity-20 pointer-events-none z-0" />
      <div className="fixed inset-0 grid-texture opacity-10 pointer-events-none z-0" />
      
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] border-[1px] border-[var(--color-blue-1)] opacity-10 rounded-full z-0" 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
           <h1 className="font-editorial text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-white-dim)] tracking-tighter uppercase">
             CORE PORTAL
           </h1>
           <div className="flex items-center justify-center gap-2 mt-4">
             <div className="w-8 h-[1px] bg-[var(--color-blue-3)]" />
             <p className="font-mono text-[10px] text-[var(--color-blue-3)] uppercase tracking-[0.3em]">
               Authorized Personnel Only
             </p>
             <div className="w-8 h-[1px] bg-[var(--color-blue-3)]" />
           </div>
        </div>

        <GlassCard hover={false} glow className="p-8 md:p-10 border border-[var(--color-white-dim)]/20 relative overflow-hidden">
           
           {isAuthenticating && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--color-blue-1)] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="font-mono text-xs text-[var(--color-blue-1)] animate-pulse tracking-widest uppercase">Authenticating...</p>
             </div>
           )}

           <div className="space-y-8">
              <div className="text-center space-y-2">
                 <p className="font-sans text-sm text-[var(--color-white-muted)] leading-relaxed">
                   Sign in using your official KL University Microsoft 365 credentials to access the EFIT Management Dashboard.
                 </p>
              </div>

              <div className="pt-2">
                 <button 
                   onClick={handleMockMicrosoftLogin}
                   disabled={isAuthenticating}
                   className="w-full group relative flex items-center justify-center gap-3 bg-white text-black py-4 px-6 rounded-md hover:bg-gray-100 transition-all overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                   
                   {/* Microsoft Logo SVG */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                     <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                     <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                     <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                     <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                   </svg>
                   
                   <span className="font-sans font-semibold text-sm">Sign in with Microsoft</span>
                 </button>
              </div>

              <div className="pt-6 border-t border-[var(--color-white-dim)]/10 text-center">
                 <p className="font-mono text-[9px] text-[var(--color-white-muted)] leading-relaxed">
                   BY AUTHENTICATING, YOU VERIFY THAT YOU ARE AN ACTIVE MEMBER OF THE ENGINEERING FORUM OF INFORMATION TECHNOLOGY.
                 </p>
              </div>
           </div>
        </GlassCard>
        
        {/* Tiny System Status */}
        <div className="mt-8 flex justify-between items-center px-4 font-mono text-[9px] text-[var(--color-white-dim)] uppercase">
          <span>SYS_STATUS: <span className="text-green-400">ONLINE</span></span>
          <span>NODE: SECURE_AUTH</span>
        </div>
      </motion.div>
    </div>
  );
}
