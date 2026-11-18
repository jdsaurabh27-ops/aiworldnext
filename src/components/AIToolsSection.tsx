import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Card from './Card';
import productsData from '../data/products.json';

export default function AIToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredTools = selectedCategory === 'all' ? productsData : productsData.filter(product => product.category === selectedCategory);
  const categories = ['all', ...Array.from(new Set(productsData.map(product => product.category)))];
  const displayTools = filteredTools.slice(0, 6);

  return (
    <section id="tools" className="border-y border-gray-800 bg-black py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">Choose by task</p><h2 className="text-3xl font-bold text-white">Useful AI tools</h2><p className="mt-2 max-w-2xl text-gray-400">A small starting selection. Compare features and visit each provider before choosing.</p></div>
          <a href="/tools/" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">Explore all tools →</a>
        </div>
        <div className="mb-6 max-w-xs">
          <label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="tool-category">Filter by category</label>
          <select id="tool-category" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white focus:border-cyan-400">
            <option value="all">All categories</option>
            {categories.filter(cat => cat !== 'all').map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <h3 className="mb-5 flex items-center text-lg font-semibold text-white"><Sparkles className="mr-2 h-5 w-5 text-cyan-400" />Featured tools ({displayTools.length})</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{displayTools.map(product => <Card key={product.id} title={product.title} description={product.description} image={product.image} imageKind={(product as {imageKind?:string}).imageKind} link={`/tools/#entry-${product.id}`} affiliateUrl={(product as {affiliateUrl?:string}).affiliateUrl} price={product.price} category={product.category} />)}</div>
      </div>
    </section>
  );
}
