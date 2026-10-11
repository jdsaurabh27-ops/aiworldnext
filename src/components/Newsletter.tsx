import { Mail, CheckCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
const signupUrl = 'https://c3df661c.sibforms.com/serve/MUIFAGdL3nxY6qiKi3_9h0eCiDH5w-fqpHSR0wNmKt3R4PRv60wCKwDwAd_jQ9r-_lZm9Jf82g7NCu0zh96I5YZblu-PZ3hmWWd4nC58wkOXgvjDJoIYygwjrYYh6N_mjwtaJ8g6akTMwv2T256k7S5dL9DX4XKpABisy0Wmr2cN_yhP8M9QPDb1WwEImeLBS-Dyd1EY52fs7Qn1Ew==';
export default function Newsletter() {
  const configured = import.meta.env.VITE_NEWSLETTER_SIGNUP_URL;
  const url = configured?.startsWith('https://') ? configured : signupUrl;
  return <section id="newsletter" className="py-20 bg-gradient-to-br from-neon-blue/10 via-gray-900 to-black border-y border-gray-800">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <Mail className="w-14 h-14 text-neon-blue mx-auto mb-6" />
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Join the AIWorldNext Newsletter</h2>
      <p className="text-xl text-gray-300 mb-8">Subscribe for curated AI news, tools, jobs and learning resources.</p>
      <a href={url} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('newsletter_signup_click', { method: 'brevo' })} className="inline-block px-8 py-4 bg-neon-blue text-black font-bold rounded-xl hover:bg-neon-cyan focus-visible:outline focus-visible:outline-white">Subscribe Now</a>
      <p className="text-gray-300 mt-5">Sign up on our secure Brevo form, then check your inbox and confirm your email to complete your subscription.</p>
      <div className="flex flex-wrap justify-center gap-5 text-gray-300 text-sm mt-6"><span className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-blue" />Unsubscribe using the link in any newsletter</span><a href="/privacy-policy.html" className="text-neon-blue underline">Privacy policy</a></div>
    </div>
  </section>;
}
