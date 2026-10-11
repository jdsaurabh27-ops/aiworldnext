import { useEffect, useState } from 'react';
import { searchContent, searchItems } from '../lib/search';

export default function SearchResults() {
  const [query, setQuery] = useState('');
  const [section, setSection] = useState('All');
  useEffect(() => {
    const listener = (event: Event) => {
      setQuery((event as CustomEvent<string>).detail);
      setSection('All');
      requestAnimationFrame(() => document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' }));
    };
    window.addEventListener('aiworldnext:search', listener);
    return () => window.removeEventListener('aiworldnext:search', listener);
  }, []);
  if (!query) return null;
  const results = searchContent(query, section);
  const categories = ['All', ...new Set(searchItems.map(item => item.section))];
  return (
    <section id="search-results" className="scroll-mt-44 max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Search results for “{query}”</h2>
        <button onClick={() => setQuery('')} className="text-neon-blue">Clear results</button>
      </div>
      <label className="text-gray-300">Category
        <select value={section} onChange={e => setSection(e.target.value)} className="ml-3 p-2 bg-gray-900 border border-gray-700 rounded text-white">
          {categories.map(category => <option key={category}>{category}</option>)}
        </select>
      </label>
      <p role="status" className="text-gray-400 my-4">{results.length} results found</p>
      {!results.length && <p className="text-white">No results. Try a different keyword or choose All categories.</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.slice(0, 60).map((item, index) => (
          <a key={`${item.section}-${item.link}-${index}`} href={item.link} target="_blank" rel="noopener noreferrer"
            className="block p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-neon-blue">
            <span className="text-neon-blue text-sm">{item.section}</span>
            <h3 className="text-white font-semibold mt-2">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-3">{item.description}</p>
          </a>
        ))}
      </div>
      {results.length > 60 && <p className="text-gray-400 mt-4">Showing the first 60 results. Choose a category or use a more specific search.</p>}
    </section>
  );
}
