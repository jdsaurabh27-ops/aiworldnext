import SearchForm from './SearchForm';
import { Menu, X, Search } from 'lucide-react';
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
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 gap-4">
          <a href="#home" className="block shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-blue" aria-label="AIWorldNext home">
            <img
              src="/brand/aiworldnext-logo-transparent.png"
              alt="AIWorldNext — The Global Search Engine for AI"
              width={1983}
              height={793}
              className="w-60 sm:w-64 h-auto"
            />
          </a>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-2 2xl:px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap text-gray-300 hover:text-neon-blue hover:bg-gray-900 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>



          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-neon-blue hover:bg-gray-900 transition-all duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 border-t border-gray-800 py-2">
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

        {isSearchOpen && (
          <div className="pb-4">
            <SearchForm autoFocus />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2">
              <SearchForm />
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

          </div>
        </div>
      )}
    </nav>
  );
}
