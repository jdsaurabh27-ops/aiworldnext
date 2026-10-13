import { Globe } from 'lucide-react';

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return <span className="inline-flex items-center gap-3">
    <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-950/40">
      <Globe className="h-8 w-8 text-cyan-400" strokeWidth={1.4} aria-hidden="true" />
      <span className="absolute inset-x-0 top-4 h-3 rotate-[-20deg] rounded-[50%] border-t-2 border-orange-400" aria-hidden="true" />
    </span>
    <span>
      <span className="block text-2xl font-bold leading-tight tracking-tight text-white">AIWorld<span className="text-orange-400">Next</span></span>
      {!compact && <span className="mt-1 block text-xs font-medium leading-snug text-gray-300">Discover AI News, Tools &amp; Opportunities</span>}
    </span>
  </span>;
}
