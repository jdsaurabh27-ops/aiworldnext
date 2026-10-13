import { ArrowRight } from 'lucide-react';

export default function VisionSection() {
 return <section id="vision" className="border-y border-gray-800 bg-gray-900/40 py-10">
  <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
   <div className="max-w-2xl"><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">About AIWorldNext</p><h2 className="mb-3 text-2xl font-bold text-white">A clear starting point for discovering AI.</h2><p className="leading-relaxed text-gray-300">We bring together source-linked listings and practical guides to help you explore AI tools, news, careers and learning resources.</p></div>
   <a href="/about.html" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-gray-600 px-5 py-3 font-semibold text-white hover:border-cyan-400">Our mission &amp; approach <ArrowRight className="h-4 w-4" /></a>
  </div>
 </section>;
}
