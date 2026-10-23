import { ArrowRight, BookOpen } from 'lucide-react';

import editorialGuides from '../data/editorial-guides.json';

// New dated guides become discoverable without maintaining a second title list.
const latestGuides = [...editorialGuides]
 .filter(g => g.checkedAt)
 .sort((a, b) => Date.parse(b.checkedAt!) - Date.parse(a.checkedAt!))
 .slice(0, 3);
const featuredSlugs = ['gamma-ai-presentation-workflow', 'murf-vs-elevenlabs', 'create-an-ai-voiceover'];
const selectedGuides = [...latestGuides, ...featuredSlugs.map(slug => editorialGuides.find(g => g.slug === slug)!)];
const guides = selectedGuides.filter((g, index) => selectedGuides.findIndex(item => item.slug === g.slug) === index)
 .map(g => ({title: g.title, description: g.intro, href: `/guides/${g.slug}/`}));
export default function PracticalGuides() {
 return <section id="guides" className="bg-gray-950 py-12 sm:py-16">
 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">Put AI into practice</p><h2 className="text-3xl font-bold text-white">AI Blogs &amp; Practical Guides</h2></div><a href="/blogs/" className="inline-flex items-center gap-2 text-cyan-400">Explore AI blogs <ArrowRight className="h-4 w-4" /></a></div>
 <p className="mb-6 max-w-3xl text-gray-300">Original workflows and decision checklists from AIWorldNext. Documentation-based comparisons are labelled; we do not claim hands-on testing where none was performed.</p>
 <div className="grid gap-5 md:grid-cols-3">{guides.map(g=><a key={g.href} href={g.href} className="rounded-xl border border-gray-700 bg-gray-900 p-6 transition-colors hover:border-cyan-400"><BookOpen className="mb-5 h-6 w-6 text-cyan-400" aria-hidden="true"/><h3 className="mb-3 text-xl font-semibold text-white">{g.title}</h3><p className="mb-5 text-gray-300">{g.description}</p><span className="text-sm font-semibold text-cyan-400">Read the guide →</span></a>)}</div>
 <p className="mt-6"><a href="/guides/" className="font-semibold text-cyan-400">Browse all original AI guides →</a></p>
 </div></section>;
}

