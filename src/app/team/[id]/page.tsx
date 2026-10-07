import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

async function getMemberData(id: string) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'EFIT-Team.csv');
  try {
    const text = await fs.readFile(filePath, 'utf8');
    const lines = text.split('\n');
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith(',,')) break;
      const cols = line.split(',');
      if (cols.length >= 5 && cols[0].trim() === id) {
        return {
          id: cols[0].trim(),
          role: cols[1].trim(),
          name: cols[2].trim(),
          universityId: cols[3].trim(),
          email: cols[4].trim(),
        };
      }
    }
  } catch (error) {
    console.error("Error reading CSV:", error);
  }
  return null;
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const member = await getMemberData(resolvedParams.id);
  
  if (!member) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen">
        <Link href="/team" className="font-mono text-xs text-[var(--color-blue-3)] hover:text-white transition-colors mb-8 inline-block">
          &larr; BACK TO DIRECTORY
        </Link>
        <h2 className="text-xl text-white">Member not found.</h2>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 lg:px-24 min-h-screen bg-[var(--color-black)]">
      <Link href="/team" className="font-mono text-xs text-[var(--color-blue-3)] hover:text-white transition-colors mb-8 inline-block">
        &larr; BACK TO DIRECTORY
      </Link>
      
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[var(--radius-lg)] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center md:items-start relative overflow-hidden">
          
          {/* Subtle glow behind the profile */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[var(--color-blue-1)] opacity-10 blur-[100px] rounded-full pointer-events-none" />

          {/* Profile Picture Placeholder */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-[var(--radius-md)] bg-black/50 border border-white/20 relative overflow-hidden flex-shrink-0 shadow-lg">
            <div className="absolute inset-0 noise opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="font-mono text-white/20 text-sm tracking-widest">PHOTO</span>
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur font-mono text-[10px] text-white/80 rounded border border-white/10">
              ID: {member.id.padStart(4, '0')}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 w-full space-y-6">
            <div>
              <p className="font-mono text-sm text-[var(--color-blue-2)] tracking-widest uppercase mb-2">
                {member.role}
              </p>
              <h1 className="font-editorial text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-2">
                {member.name}
              </h1>
              <p className="font-sans text-white/60 text-lg">
                Department of Computer Science & Information Technology
              </p>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">KL ID Number</p>
                <p className="font-mono text-white/90 text-sm">{member.universityId || 'N/A'}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">Contact Email</p>
                <p className="font-sans text-[var(--color-blue-2)] text-sm">{member.email || 'N/A'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
