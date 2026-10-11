import { Heart } from 'lucide-react';
export default function SupportSection() {
  const configured = import.meta.env.VITE_SUPPORT_PAYMENT_URL || 'https://www.paypal.com/ncp/payment/WA83J27M6LJD4';
  const payment = typeof configured === 'string' && configured.startsWith('https://') ? configured : null;
  return <section id="support" className="py-20 bg-gray-900"><div className="max-w-3xl mx-auto px-6 text-center">
    <Heart className="w-12 h-12 text-neon-blue mx-auto mb-5" />
    <h2 className="text-4xl font-bold text-white mb-5">Support AIWorldNext</h2>
    <p className="text-gray-300 text-lg mb-8">Help us maintain useful AI resources and source checks. You can also contribute by submitting a useful tool, suggesting a correction or sharing the site.</p>
    <a href={payment || 'mailto:business@aiworldnext.com?subject=Support%20AIWorldNext'} target={payment ? '_blank' : undefined} rel="noopener noreferrer" className="inline-block rounded-xl px-8 py-4 bg-neon-blue text-black font-bold">{payment ? 'Support with $5 USD · One-time' : 'Contact us about support'}</a>
    <p className="text-gray-400 text-sm mt-5">{payment ? 'One-time support, not a recurring subscription. No membership or premium benefits are included. Confirm the recipient and final amount on PayPal before paying.' : 'Online payments are not enabled yet.'}</p>
    <p className="text-gray-300 mt-8">For partnership enquiries: <a href="mailto:business@aiworldnext.com?subject=Partnership%20enquiry" className="text-neon-blue underline">business@aiworldnext.com</a>. Sponsored placements will be labelled and agreed separately.</p>
  </div></section>;
}
