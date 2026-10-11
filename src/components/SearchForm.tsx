import { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import { startSearch } from '../lib/search';

export default function SearchForm({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    startSearch(query);
  };
  return (
    <form role="search" onSubmit={submit} className="flex items-center gap-2 w-full">
      <div className="relative flex-1 min-w-0">
        <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          autoFocus={autoFocus} aria-label="Search AIWorldNext content" required maxLength={200}
          placeholder="Search news, jobs, tools and more..."
          className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue" />
      </div>
      <button type="submit" disabled={!query.trim()}
        className="px-4 py-3 bg-neon-blue text-black rounded-lg font-semibold disabled:opacity-50">Search</button>
    </form>
  );
}
