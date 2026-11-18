import { ArrowRight, BookOpen } from 'lucide-react';
import editorialGuides from '../data/editorial-guides.json';

const featuredSlugs = ['gamma-ai-presentation-workflow', 'murf-vs-elevenlabs', 'create-an-ai-voiceover'];
const guides = featuredSlugs.map(slug => editorialGuides.find(g => g.slug === slug)).filter((g): g is (typeof editorialGuides)[number] => Boolean(g));

export default function PracticalGuides() {
  return (
    <section id="guides" className="bg-gray-950 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">Learn by doing</p><h2 className="text-3xl font-bold text-white">Practical AI guides</h2></div><a href="/guides/" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">All guides <ArrowRight className="h-4 w-4"/></a></div>
        <p className="mb-6 max-w-3xl text-gray-400">Step-by-step workflows and clear comparisons to help you choose a tool and complete a real task.</p>
        <div className="grid gap-5 md:grid-cols-3">{guides.map(g=><a key={g.slug} href={`/guides/${g.slug}/`} className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-cyan-500"><BookOpen className="mb-5 h-6 w-6 text-cyan-400" aria-hidden="true"/><h3 className="mb-3 text-xl font-semibold text-white">{g.title}</h3><p className="mb-5 text-sm leading-relaxed text-gray-400">{g.intro}</p><span className="text-sm font-semibold text-cyan-300">Read the guide →</span></a>)}</div>
      </div>
    </section>
  );
}
