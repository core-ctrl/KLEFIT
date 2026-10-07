'use client';

import dynamic from 'next/dynamic';

const ShaderWall = dynamic(
  () => import('@/components/wall/ShaderWall').then((m) => m.HolographicWall),
  { ssr: false }
);

export function GlobalShader() {
  return <ShaderWall />;
}
