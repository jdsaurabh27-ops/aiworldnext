import { Sparkles, TrendingUp, Users, Briefcase, Newspaper, ArrowRight, Search } from 'lucide-react';

export default function Hero() {
  return (
    <div id="home" className="relative bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-neon-blue animate-pulse-glow" />
              <div className="absolute inset-0 w-16 h-16 bg-neon-blue blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Global <span className="text-neon-blue">Search Engine</span> for Artificial Intelligence
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto font-light">
            Your Ultimate Platform for AI News, Blogs, Jobs, and Tools
          </p>

          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
            Discover everything AI in one place. From breaking news to career opportunities,
            we bring you the most comprehensive AI resource platform on the web.
          </p>

          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI news, jobs, tools, blogs, and more..."
                className="w-full px-6 py-5 pl-16 bg-white/10 backdrop-blur-md border-2 border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300 text-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-neon-blue text-black rounded-full font-semibold hover:bg-neon-cyan transition-all duration-300 shadow-lg shadow-neon-blue/30">
                Search
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <span className="text-gray-500 text-sm">Popular searches:</span>
              <a href="#news" className="text-neon-blue text-sm hover:underline">ChatGPT</a>
              <span className="text-gray-600">•</span>
              <a href="#jobs" className="text-neon-blue text-sm hover:underline">AI Engineer Jobs</a>
              <span className="text-gray-600">•</span>
              <a href="#tools" className="text-neon-blue text-sm hover:underline">ML Tools</a>
              <span className="text-gray-600">•</span>
              <a href="#blogs" className="text-neon-blue text-sm hover:underline">Deep Learning</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#news"
              className="px-8 py-4 bg-neon-blue text-black rounded-lg text-lg font-semibold hover:bg-neon-cyan transition-all duration-300 shadow-lg shadow-neon-blue/30 hover:shadow-neon-blue/50 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Browse AI News
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#jobs"
              className="px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue rounded-lg text-lg font-semibold hover:bg-neon-blue hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              Find AI Jobs
              <Briefcase className="w-5 h-5" />
            </a>
            <a
              href="#submit"
              className="px-8 py-4 bg-gray-800 border-2 border-gray-700 text-white rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Submit Content
              <Sparkles className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-neon-blue transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/20 transform hover:scale-105">
              <TrendingUp className="w-10 h-10 text-neon-blue mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-white font-bold text-lg mb-3">Latest Updates</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Stay informed with real-time AI news and breakthroughs from around the world</p>
            </div>

            <div className="group bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-neon-blue transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/20 transform hover:scale-105">
              <Users className="w-10 h-10 text-neon-blue mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-white font-bold text-lg mb-3">Global Community</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Connect with AI professionals and enthusiasts from every corner of the globe</p>
            </div>

            <div className="group bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-neon-blue transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/20 transform hover:scale-105">
              <Briefcase className="w-10 h-10 text-neon-blue mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-white font-bold text-lg mb-3">Career Opportunities</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Explore cutting-edge AI and robotics job openings at top companies</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Quick Access to <span className="text-neon-blue">Top Categories</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <a
              href="#news"
              className="group flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-neon-blue hover:bg-gray-800 transition-all duration-300"
            >
              <Newspaper className="w-8 h-8 text-neon-blue mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white font-medium">AI News</span>
            </a>
            <a
              href="#jobs"
              className="group flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-neon-blue hover:bg-gray-800 transition-all duration-300"
            >
              <Briefcase className="w-8 h-8 text-neon-blue mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white font-medium">Jobs</span>
            </a>
            <a
              href="#tools"
              className="group flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-neon-blue hover:bg-gray-800 transition-all duration-300"
            >
              <Sparkles className="w-8 h-8 text-neon-blue mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white font-medium">AI Tools</span>
            </a>
            <a
              href="#blogs"
              className="group flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-neon-blue hover:bg-gray-800 transition-all duration-300"
            >
              <Users className="w-8 h-8 text-neon-blue mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white font-medium">AI Blogs</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
