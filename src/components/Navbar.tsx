import { useState } from 'react';
import { Search, Home, Newspaper, BookOpen, Briefcase, Wrench, Menu, X } from 'lucide-react';
import SearchForm from './SearchForm';
import BrandMark from './BrandMark';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'AI Tools', href: '/tools/', icon: Wrench },
  { name: 'Guides', href: '/guides/', icon: BookOpen },
  { name: 'News', href: '/news/', icon: Newspaper },
  { name: 'Jobs', href: '/jobs/', icon: Briefcase },
  { name: 'More', href: '/discover/', icon: Menu },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3">
          <a href="/" aria-label="AIWorldNext home" className="block shrink-0"><BrandMark /></a>
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <a key={name} href={href} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-900 hover:text-cyan-300">
                <Icon className="h-4 w-4" aria-hidden="true" />{name}
              </a>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Toggle search" aria-expanded={isSearchOpen} className="rounded-lg p-2 text-gray-300 hover:bg-gray-900 hover:text-cyan-300"><Search className="h-5 w-5" /></button>
            <a href="#newsletter" className="rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-gray-950 hover:bg-cyan-300">Subscribe</a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation" aria-expanded={isMenuOpen} className="rounded-lg p-2 text-gray-300 hover:bg-gray-900 md:hidden">{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {isMenuOpen && <div className="grid grid-cols-2 gap-2 border-t border-gray-800 py-3 md:hidden">{navLinks.map(({name,href,icon:Icon})=><a key={name} href={href} onClick={()=>setIsMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-gray-200 hover:bg-gray-900"><Icon className="h-4 w-4 text-cyan-300"/>{name}</a>)}</div>}
        {isSearchOpen && <div className="border-t border-gray-800 py-3"><SearchForm autoFocus /></div>}
      </div>
    </nav>
  );
}
