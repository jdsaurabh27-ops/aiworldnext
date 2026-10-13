import SearchForm from './SearchForm';
import { ArrowRight, BookOpen, Briefcase } from 'lucide-react';

export default function Hero() {
  return <section id="home" className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-12 sm:py-16">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent" aria-hidden="true" />
    <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-cyan-400">Your starting point for practical AI</p>
      <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Discover AI news,<br className="hidden sm:block" /> <span className="text-cyan-400">tools &amp; opportunities.</span></h1>
      <p className="mx-auto mb-7 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">Explore source-linked news, useful tools, career openings and practical guides. Find a clear starting point for your next AI project.</p>
      <div className="mx-auto mb-6 max-w-3xl"><SearchForm /></div>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/tools/" className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-gray-950 hover:bg-cyan-300">Explore tools <ArrowRight className="h-4 w-4" /></a>
        <a href="/guides/" className="inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-900 px-5 py-3 font-semibold text-white hover:border-cyan-400"><BookOpen className="h-4 w-4" /> Read practical guides</a>
        <a href="#jobs" className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-3 font-semibold text-gray-200 hover:border-cyan-400"><Briefcase className="h-4 w-4" /> Find AI jobs</a>
      </div>
      <p className="mt-6 text-sm text-gray-400">Source-linked listings · Original guides · Weekly source updates</p>
    </div>
  </section>;
}
