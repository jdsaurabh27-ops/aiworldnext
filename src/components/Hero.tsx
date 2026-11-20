import SearchForm from './SearchForm';
import { ArrowRight, BookOpen, Wrench } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-black py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/25 via-transparent to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Practical AI starts here</p>
        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Find the right AI tool.<br className="hidden sm:block" /><span className="text-cyan-400">Learn how to use it.</span></h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">Clear tutorials, useful tool directories and carefully sourced AI updates to help you get real work done.</p>
        <div className="mx-auto mb-7 max-w-2xl"><SearchForm /></div>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/guides/" className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-gray-950 transition hover:bg-cyan-300"><BookOpen className="h-4 w-4" />Explore practical guides<ArrowRight className="h-4 w-4" /></a>
          <a href="/tools/" className="inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-900 px-5 py-3 font-semibold text-white hover:border-cyan-400"><Wrench className="h-4 w-4" />Browse AI tools</a>
        </div>
        <p className="mt-6 text-sm text-gray-400">Independent guides · Source-linked listings · Weekly updates</p>
      </div>
    </section>
  );
}
