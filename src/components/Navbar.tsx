import { Menu, X, Zap, Search, Bell } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'AI News', href: '#news' },
    { name: 'AI Blogs', href: '#blogs' },
    { name: 'AI Jobs', href: '#jobs' },
    { name: 'AI Tools', href: '#tools' },
    { name: 'AI Events', href: '#events' },
    { name: 'Resources', href: '#resources' },
    { name: 'Submit', href: '#submit' },
  ];

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-neon-blue" />
            <div>
              <h1 className="text-xl font-bold text-white">AIWorldNext</h1>
              <p className="text-xs text-neon-blue hidden sm:block">The Global Search Engine for AI</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-neon-blue hover:bg-gray-900 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-neon-blue hover:bg-gray-900 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="#newsletter"
              className="px-4 py-2 bg-neon-blue text-black rounded-md text-sm font-semibold hover:bg-neon-cyan transition-all duration-200 shadow-lg shadow-neon-blue/20"
            >
              Subscribe
            </a>
            <a
              href="#support"
              className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-700 transition-all duration-200 border border-neon-blue/30"
            >
              Support
            </a>
            <a
              href="#community"
              className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-700 transition-all duration-200 border border-neon-blue/30"
            >
              Join Community
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-neon-blue hover:bg-gray-900 transition-all duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isSearchOpen && (
          <div className="hidden lg:block pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI news, jobs, tools, and resources..."
                className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all duration-200"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all duration-200"
              />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-neon-blue hover:bg-gray-800 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-3 py-3 space-y-2 border-t border-gray-800 mt-2">
              <a
                href="#newsletter"
                className="block w-full px-4 py-2 bg-neon-blue text-black rounded-md text-sm font-semibold text-center hover:bg-neon-cyan transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Subscribe
              </a>
              <a
                href="#support"
                className="block w-full px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold text-center hover:bg-gray-700 transition-all duration-200 border border-neon-blue/30"
                onClick={() => setIsOpen(false)}
              >
                Support
              </a>
              <a
                href="#community"
                className="block w-full px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold text-center hover:bg-gray-700 transition-all duration-200 border border-neon-blue/30"
                onClick={() => setIsOpen(false)}
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
