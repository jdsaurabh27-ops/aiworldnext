import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formsubmit.co/ajax/business@aiworldnext.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          _subject: 'New Newsletter Subscription - AIWorldNext',
          _template: 'table'
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully subscribed! Check your email for confirmation.');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-neon-blue/10 via-gray-900 to-black border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-neon-blue/20 rounded-2xl mb-6">
            <Mail className="w-10 h-10 text-neon-blue" />
            <div className="absolute inset-0 bg-neon-blue blur-xl opacity-20 animate-pulse"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated with <span className="text-neon-blue">AI Innovation</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Get the latest AI news, job opportunities, and exclusive insights delivered to your inbox weekly.
          </p>

          {status === 'success' ? (
            <div className="bg-green-500/20 border-2 border-green-500/50 rounded-xl p-8 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/20">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <p className="text-green-400 font-semibold text-lg">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={status === 'loading'}
                className="flex-1 px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-neon-blue transition-all duration-200 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-neon-blue text-black font-bold rounded-xl hover:bg-neon-cyan hover:shadow-xl hover:shadow-neon-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transform hover:scale-105"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-400 mt-4 font-medium">{message}</p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-sm">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-neon-blue" />
              Join 10,000+ AI enthusiasts
            </p>
            <span className="hidden sm:block">•</span>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-neon-blue" />
              Weekly updates
            </p>
            <span className="hidden sm:block">•</span>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-neon-blue" />
              Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
