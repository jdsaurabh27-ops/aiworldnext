import { Bot, ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
export default function RobotHardware() {
  return <section id="robot-hardware" className="max-w-7xl mx-auto px-4 py-12">
    <div className="rounded-2xl border border-cyan-900 bg-gray-900 p-6 sm:p-9">
      <Bot className="text-cyan-400 mb-4" size={32} aria-hidden="true" />
      <h2 className="text-3xl font-bold text-white">Robots &amp; AI Hardware</h2>
      <p className="text-gray-300 mt-3 max-w-2xl">Explore coding robots, companion robots and robot dogs. Compare use cases and buying checks before contacting an official seller.</p>
      <p className="text-gray-400 text-sm mt-3">Independent, source-linked catalogue. We do not currently sell or take payments for robots. Listings are not hands-on reviews or authorised partnerships.</p>
      <a href="/robots/" onClick={() => trackEvent('robot_catalogue_click')} className="inline-flex items-center gap-2 mt-5 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-gray-950">Explore robots <ArrowRight size={18} /></a>
    </div>
  </section>;
}
