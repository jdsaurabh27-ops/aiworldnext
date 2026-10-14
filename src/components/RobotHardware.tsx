import { Bot, ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
export default function RobotHardware() {
  return <section id="robot-hardware" className="max-w-7xl mx-auto px-4 py-12">
    <div className="rounded-2xl border border-cyan-900 bg-gray-900 p-6 sm:p-9">
      <Bot className="text-cyan-400 mb-4" size={32} aria-hidden="true" />
      <h2 className="text-3xl font-bold text-white">Robots &amp; AI Hardware</h2>
      <p className="text-gray-300 mt-3 max-w-2xl">Explore robot dogs, humanoids, coding kits and robots for mall reception, hospitality and supervised event performances.</p>
      <p className="text-gray-400 text-sm mt-3">Send a purchase, rental or demo enquiry to our team. Availability and supplier introductions require confirmation; payments and fulfilment are arranged with the seller.</p>
      <a href="/robots/" onClick={() => trackEvent('robot_catalogue_click')} className="inline-flex items-center gap-2 mt-5 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-gray-950">Explore robots <ArrowRight size={18} /></a><a href="/robots/enquiry/" className="inline-flex mt-5 ml-3 rounded-lg border border-orange-400 px-5 py-3 font-semibold text-orange-300">Request information</a>
    </div>
  </section>;
}
