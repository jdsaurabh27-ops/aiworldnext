import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import Card from './Card';
import jobsData from '../data/jobs.json';

export default function AIJobsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredJobs = selectedCategory === 'all'
    ? jobsData
    : jobsData.filter(job => job.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(jobsData.map(job => job.category)))];

  const displayJobs = filteredJobs.slice(0, 12);

  return (
    <section id="jobs" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Job Opportunities
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover cutting-edge AI and machine learning positions at top companies worldwide
          </p>
        </div>

        <div className="mb-8 bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 items-center">
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
            <Briefcase className="w-6 h-6 text-neon-blue mr-2" />
            AI Jobs ({displayJobs.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayJobs.map((job) => (
              <Card
                key={job.id}
                title={job.title}
                description={job.description}
                image={job.image}
                link={job.link}
                company={job.company}
                location={job.location}
                salary={job.salary}
                date={job.date}
                category={job.category}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#submit"
            className="inline-block px-8 py-4 bg-gray-800 text-white rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all duration-300 border-2 border-gray-700 hover:border-neon-blue"
          >
            Post a Job
          </a>
        </div>
      </div>
    </section>
  );
}
