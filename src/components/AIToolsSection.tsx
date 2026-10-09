import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Card from './Card';
import productsData from '../data/products.json';

export default function AIToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = selectedCategory === 'all'
    ? productsData
    : productsData.filter(product => product.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(productsData.map(product => product.category)))];

  const displayTools = filteredTools.slice(0, 12);

  return (
    <section id="tools" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Tools & Products
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the best AI tools and products to supercharge your productivity
          </p>
        </div>

        <div className="mb-8 bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Sparkles className="w-6 h-6 text-neon-blue mr-2" />
            AI Products ({displayTools.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTools.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
                link={product.link}
                price={product.price}
                category={product.category}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#submit"
            className="inline-block px-8 py-4 bg-gray-800 text-white rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all duration-300 border-2 border-gray-700 hover:border-neon-blue"
          >
            Submit Your AI Tool
          </a>
        </div>
      </div>
    </section>
  );
}
