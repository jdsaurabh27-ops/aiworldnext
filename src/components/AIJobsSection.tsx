import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import Card from './Card';
import jobsData from '../data/jobs.json';

export default function AIJobsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredJobs = selectedCategory === 'all' ? jobsData : jobsData.filter(job => job.category === selectedCategory);
  const categories = ['all', ...Array.from(new Set(jobsData.map(job => job.category)))];
  const displayJobs = filteredJobs.slice(0, 4);

  return (
    <section id="jobs" className="bg-gray-950 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">Career opportunities</p><h2 className="text-3xl font-bold text-white">A few AI roles to explore</h2><p className="mt-2 text-gray-400">Check the employer's original listing for current status and requirements.</p></div>
          <a href="/jobs/" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">Browse all jobs →</a>
        </div>
        <div className="mb-6 max-w-xs"><label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="job-category">Filter by category</label><select id="job-category" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white"><option value="all">All categories</option>{categories.filter(cat=>cat!=='all').map(cat=><option key={cat} value={cat}>{cat}</option>)}</select></div>
        <h3 className="mb-5 flex items-center text-lg font-semibold text-white"><Briefcase className="mr-2 h-5 w-5 text-cyan-400" />Recent listings ({displayJobs.length})</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">{displayJobs.map(job=><Card key={job.id} title={job.title} description={job.description} image={job.image} imageKind={(job as {imageKind?:string}).imageKind} link={job.link} company={job.company} location={job.location} salary={job.salary} date={job.date} category={job.category}/>)}</div>
      </div>
    </section>
  );
}
