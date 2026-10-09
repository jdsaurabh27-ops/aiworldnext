import { Heart, Coffee, Zap, Target } from 'lucide-react';

export default function SupportSection() {
  const PAYMENT_LINKS = {
    paypal: 'https://aiworldnext.com/pay'
  };

  const supportTiers = [
    {
      icon: Coffee,
      name: 'Supporter',
      amount: '$5',
      description: 'Buy us a coffee and help keep the platform running',
      features: ['Support AI education', 'Help maintain free content', 'Community supporter badge'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      name: 'Contributor',
      amount: '$25',
      description: 'Contribute to AI advancement and community growth',
      features: ['All Supporter benefits', 'Early access to new features', 'Monthly AI insights newsletter', 'Recognition on supporters page'],
      color: 'from-purple-500 to-pink-500',
      popular: true,
    },
    {
      icon: Zap,
      name: 'Champion',
      amount: '$100',
      description: 'Become a champion of AI education and innovation',
      features: ['All Contributor benefits', 'Priority feature requests', 'Exclusive webinar access', 'Direct input on content roadmap', 'Premium supporter badge'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="support" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-4">
            <Target className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Support AI Innovation
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Help us maintain the world's most comprehensive AI hub. Your support enables free, high-quality AI content for millions globally.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Free Resources', value: '1000+' },
            { label: 'Community Members', value: '100K+' },
            { label: 'Articles Published', value: '500+' },
            { label: 'Countries Reached', value: '150+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                tier.popular
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`inline-flex p-3 bg-gradient-to-br ${tier.color} rounded-xl mb-4`}>
                <tier.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="mb-2">
                <div className="text-4xl font-bold text-white">
                  {tier.amount}
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start text-gray-300">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/pay"
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Become a {tier.name}
              </a>
            </div>
          ))}
        </div>

        <div id="payment-options" className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Choose Your Payment Method</h3>
            <p className="text-gray-400 mb-6">
              We support multiple payment options for your convenience. Payments accepted globally from all countries!
            </p>
          </div>

          <div className="flex justify-center max-w-xl mx-auto mb-8">
            <a
              href={PAYMENT_LINKS.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-8 bg-gradient-to-br from-neon-blue/10 to-blue-900/20 rounded-2xl hover:from-neon-blue/20 hover:to-blue-900/30 transition-all border-2 border-neon-blue/30 hover:border-neon-blue/50 shadow-lg shadow-neon-blue/20 hover:shadow-neon-blue/40 w-full"
            >
              <div className="text-5xl mb-4">💰</div>
              <div className="text-white font-bold text-2xl mb-3">Pay via PayPal</div>
              <div className="text-gray-300 text-base text-center mb-4">Secure worldwide payment platform</div>
              <div className="bg-neon-blue text-black px-6 py-2 rounded-full font-semibold text-sm">🌍 Accepted Globally</div>
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            100% of donations support platform maintenance, content creation, and AI education worldwide.
            Together, we're building the future of AI.
          </p>
        </div>
      </div>
    </section>
  );
}
