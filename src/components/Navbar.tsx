import { useState } from 'react';
import { Search, Home, Newspaper, BookOpen, Briefcase, Wrench, Calendar, Building2, Rocket, Bot, Mic, Users, Globe, Library, Send } from 'lucide-react';
import SearchForm from './SearchForm';

export const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'AI News', href: '#news', icon: Newspaper },
  { name: 'AI Blogs', href: '/blogs/', icon: BookOpen },
  { name: 'AI Jobs', href: '#jobs', icon: Briefcase },
  { name: 'AI Tools', href: '/tools/', icon: Wrench },
  { name: 'AI Events', href: '#events', icon: Calendar },
  { name: 'AI Companies', href: '#companies', icon: Building2 },
  { name: 'AI Startups', href: '#startups', icon: Rocket },
  { name: 'Robotics', href: '#robotics', icon: Bot },
  { name: 'AI Podcasts', href: '#podcasts', icon: Mic },
  { name: 'AI Community', href: '#community', icon: Users },
  { name: 'AI Directories', href: '#websites', icon: Globe },
  { name: 'Resources', href: '#resources', icon: Library },
  { name: 'Submit', href: '#submit', icon: Send },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <nav aria-label="Main navigation" className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-2 py-2">
          <a href="#home" aria-label="AIWorldNext home" className="block shrink-0">
            <img src="/brand/aiworldnext-logo-transparent.png" alt="AIWorldNext — The Global Search Engine for AI"
              width={1983} height={793} className="w-52 sm:w-60 h-auto" />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search" aria-expanded={isSearchOpen}
              className="p-2 text-gray-300 hover:text-neon-blue"><Search className="w-5 h-5" /></button>
            <a href="#newsletter" className="px-3 py-2 bg-neon-blue text-black rounded-md text-sm font-semibold">Subscribe</a>
            <a href="#support" className="px-3 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold">Support</a>
            <a href="#community" className="px-3 py-2 bg-gray-800 text-white rounded-md text-sm font-semibold">Join Community</a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-1 border-t border-gray-800 py-2">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <a key={href} href={href} className="flex items-center gap-1.5 px-2 py-1.5 text-xs sm:text-sm font-medium text-gray-300 rounded-md hover:text-neon-blue hover:bg-gray-900 focus-visible:outline focus-visible:outline-neon-blue">
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" /><span className="whitespace-nowrap">{name}</span>
            </a>
          ))}
        </div>
        {isSearchOpen && <div className="pb-3"><SearchForm autoFocus /></div>}
      </div>
    </nav>
  );
}
