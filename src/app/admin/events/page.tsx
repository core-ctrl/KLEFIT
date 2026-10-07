'use client';

import { motion } from 'framer-motion';

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-[var(--color-white-dim)] pb-4">
        <div>
          <h1 className="font-editorial text-4xl font-bold text-white tracking-tight">Events Management</h1>
          <p className="font-mono text-xs text-[var(--color-white-muted)] mt-2 uppercase tracking-widest">
            Create, Edit, and Monitor Live Events
          </p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-blue-1)] text-white font-mono text-[10px] uppercase tracking-wider rounded hover:bg-opacity-80 transition-colors">
          + Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Sample Event Card */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="glass-card p-6 border border-[var(--color-blue-1)]/30 hover:border-[var(--color-blue-1)] transition-colors group cursor-pointer relative overflow-hidden"
         >
           <div className="absolute top-0 right-0 p-4">
             <span className="px-2 py-1 text-[9px] font-mono tracking-wider rounded bg-green-900/50 text-green-400 border border-green-700/50">
               LIVE
             </span>
           </div>
           
           <h3 className="font-sans text-xl font-bold text-white mb-2">EFIT CodeSprint 2026</h3>
           <p className="font-mono text-[10px] text-[var(--color-blue-3)] mb-6 uppercase">Hackathon • 200 Capacity</p>
           
           <div className="space-y-4">
             <div>
               <div className="flex justify-between text-[10px] font-mono text-[var(--color-white-muted)] mb-1">
                 <span>Registrations</span>
                 <span>87 / 200</span>
               </div>
               <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                 <div className="h-full bg-[var(--color-blue-1)] w-[43.5%]" />
               </div>
             </div>
             
             <div className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
               <button className="flex-1 py-1.5 text-[10px] font-mono text-[var(--color-white-muted)] hover:text-white transition-colors bg-black/20 rounded">
                 Edit
               </button>
               <button className="flex-1 py-1.5 text-[10px] font-mono text-[var(--color-white-muted)] hover:text-white transition-colors bg-black/20 rounded">
                 View List
               </button>
             </div>
           </div>
         </motion.div>

         {/* Second Sample Event */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="glass-card p-6 border border-[var(--color-border)] hover:border-[var(--color-blue-1)] transition-colors group cursor-pointer relative"
         >
           <div className="absolute top-0 right-0 p-4">
             <span className="px-2 py-1 text-[9px] font-mono tracking-wider rounded bg-yellow-900/50 text-yellow-400 border border-yellow-700/50">
               UPCOMING
             </span>
           </div>
           
           <h3 className="font-sans text-xl font-bold text-white mb-2">Web3 Dev Workshop</h3>
           <p className="font-mono text-[10px] text-[var(--color-blue-3)] mb-6 uppercase">Workshop • 100 Capacity</p>
           
           <div className="space-y-4">
             <div>
               <div className="flex justify-between text-[10px] font-mono text-[var(--color-white-muted)] mb-1">
                 <span>Registrations</span>
                 <span>0 / 100</span>
               </div>
               <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                 <div className="h-full bg-[var(--color-blue-1)] w-[0%]" />
               </div>
             </div>
             
             <div className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
               <button className="flex-1 py-1.5 text-[10px] font-mono text-[var(--color-white-muted)] hover:text-white transition-colors bg-black/20 rounded">
                 Edit
               </button>
               <button className="flex-1 py-1.5 text-[10px] font-mono text-[var(--color-white-muted)] hover:text-white transition-colors bg-black/20 rounded">
                 Launch
               </button>
             </div>
           </div>
         </motion.div>
      </div>
    </div>
  );
}
