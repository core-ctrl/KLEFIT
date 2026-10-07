'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Temporarily fetching from CSV for the mockup until we connect the API
  useEffect(() => {
    fetch('/data/EFIT-Team.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const parsedMembers = [];
        for (let i = 2; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || line.startsWith(',,')) break;
          const cols = line.split(',');
          if (cols.length >= 3 && cols[1] && cols[2]) {
             parsedMembers.push({
               id: cols[0].trim(),
               role: cols[1].trim(),
               name: cols[2].trim(),
               email: cols[4] ? cols[4].trim() : 'pending@kluniversity.in',
               status: 'ACTIVE'
             });
          }
        }
        setMembers(parsedMembers);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching CSV:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-[var(--color-white-dim)] pb-4">
        <div>
          <h1 className="font-editorial text-4xl font-bold text-white tracking-tight">Members Directory</h1>
          <p className="font-mono text-xs text-[var(--color-white-muted)] mt-2 uppercase tracking-widest">
            Manage EFIT Personnel & Access
          </p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-blue-1)] text-white font-mono text-[10px] uppercase tracking-wider rounded hover:bg-opacity-80 transition-colors">
          + Add Member
        </button>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
         <input 
           type="text" 
           placeholder="Search members by name or role..." 
           value={search}
           onChange={e => setSearch(e.target.value)}
           className="w-full md:max-w-md bg-black/40 border border-[var(--color-border)] rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-blue-1)] transition-colors placeholder-[var(--color-white-dim)] font-mono"
         />
         <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 border border-[var(--color-border)] rounded text-xs font-mono text-[var(--color-white-dim)] hover:text-white transition-colors bg-black/20">
              Filter By Role
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 border border-[var(--color-border)] rounded text-xs font-mono text-[var(--color-white-dim)] hover:text-white transition-colors bg-black/20">
              Export CSV
            </button>
         </div>
      </div>

      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-6 animate-pulse">
            <div className="flex gap-8 border-b border-white/10 pb-4">
              <div className="h-4 w-12 bg-white/10 rounded" />
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-4 w-24 bg-white/10 rounded" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-8 border-b border-white/5 pb-4">
                <div className="h-4 w-12 bg-white/10 rounded" />
                <div className="h-4 w-40 bg-white/20 rounded" />
                <div className="h-4 w-32 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-black-2)]">
                <th className="py-4 px-6 font-mono text-[10px] text-[var(--color-white-muted)] uppercase tracking-widest">ID</th>
                <th className="py-4 px-6 font-mono text-[10px] text-[var(--color-white-muted)] uppercase tracking-widest">Name</th>
                <th className="py-4 px-6 font-mono text-[10px] text-[var(--color-white-muted)] uppercase tracking-widest">Role</th>
                <th className="py-4 px-6 font-mono text-[10px] text-[var(--color-white-muted)] uppercase tracking-widest">Email Address</th>
                <th className="py-4 px-6 font-mono text-[10px] text-[var(--color-white-muted)] uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 font-mono text-[10px] text-[var(--color-white-muted)] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  key={member.id} 
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-blue-subtle)] transition-colors group"
                >
                  <td className="py-4 px-6 font-mono text-xs text-[var(--color-white-dim)]">#{member.id.padStart(4, '0')}</td>
                  <td className="py-4 px-6 font-sans text-sm font-semibold text-white">{member.name}</td>
                  <td className="py-4 px-6 font-mono text-[10px] text-[var(--color-blue-3)]">{member.role.toUpperCase()}</td>
                  <td className="py-4 px-6 font-mono text-xs text-[var(--color-white-muted)]">{member.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-[9px] font-mono tracking-wider rounded bg-green-900/50 text-green-400 border border-green-700/50">
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right opacity-50 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] font-mono text-[var(--color-white-muted)] hover:text-white mr-4 transition-colors">EDIT</button>
                    <button className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors">REMOVE</button>
                  </td>
                </motion.tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center font-mono text-xs text-[var(--color-white-dim)]">
                    No members found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
