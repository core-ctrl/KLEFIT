import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-16 animate-pulse">
      
      {/* Title Skeleton */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <div className="h-6 w-32 bg-[var(--color-blue-gray)]/30 rounded-md" />
        <div className="h-16 w-3/4 bg-[var(--color-blue-gray)]/40 rounded-lg" />
        <div className="h-4 w-full bg-[var(--color-blue-gray)]/20 rounded-md mt-4" />
        <div className="h-4 w-5/6 bg-[var(--color-blue-gray)]/20 rounded-md" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="w-full h-80 rounded-[var(--radius-shell)] border border-[var(--color-blue-gray)] bg-[var(--color-surface)] shadow-lg overflow-hidden flex flex-col relative p-6"
          >
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-blue-900)]/10 to-black/40 z-0" />
            
            {/* Content Placeholders */}
            <div className="relative z-10 flex flex-col h-full justify-end gap-3">
              <div className="h-8 w-2/3 bg-[var(--color-blue-gray)]/40 rounded-md" />
              <div className="flex items-center gap-4 mt-2">
                <div className="h-4 w-24 bg-[var(--color-blue-gray)]/30 rounded-md" />
                <div className="h-4 w-16 bg-[var(--color-blue-gray)]/20 rounded-md" />
              </div>
              <div className="h-10 w-32 bg-[var(--color-blue-1)]/20 rounded-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
