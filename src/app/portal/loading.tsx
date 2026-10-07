import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

export default function PortalLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-end border-b border-[var(--color-border)] pb-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-[var(--color-blue-gray)]/40 rounded-md" />
          <div className="h-4 w-40 bg-[var(--color-blue-gray)]/20 rounded-md mt-1" />
        </div>
      </div>
       
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
             
          {/* Next Event / Registration Status Skeleton */}
          <GlassCard className="p-6 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-blue-900)]/10">
            <div className="h-3 w-32 bg-[var(--color-blue-3)]/30 rounded mb-4" />
            <div className="h-6 w-3/4 bg-[var(--color-blue-gray)]/40 rounded mb-2" />
            <div className="h-4 w-1/2 bg-[var(--color-blue-gray)]/20 rounded mb-6" />
            <div className="h-6 w-32 bg-[var(--color-success)]/20 rounded border border-[var(--color-success)]/30" />
          </GlassCard>

          {/* Recommended Events Skeleton */}
          <div>
            <div className="h-6 w-48 bg-[var(--color-blue-gray)]/40 rounded mb-4" />
            <div className="space-y-3">
              {[1, 2].map(i => (
                <GlassCard key={i} className="p-4 flex items-center justify-between">
                  <div className="space-y-2 w-full">
                    <div className="h-5 w-1/2 bg-[var(--color-blue-gray)]/40 rounded" />
                    <div className="h-3 w-1/4 bg-[var(--color-blue-gray)]/20 rounded" />
                  </div>
                  <div className="h-8 w-16 bg-[var(--color-border)]/50 rounded ml-4" />
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          {/* Notices Skeleton */}
          <GlassCard className="p-5">
            <div className="h-6 w-32 bg-[var(--color-blue-gray)]/40 rounded mb-6" />
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="border-b border-[var(--color-border)] pb-4 last:border-0 last:pb-0 space-y-2">
                  <div className="h-2 w-24 bg-[var(--color-blue-gray)]/20 rounded" />
                  <div className="h-4 w-full bg-[var(--color-blue-gray)]/40 rounded" />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
