import news from '../data/news.json';
import blogs from '../data/blogs.json';
import jobs from '../data/jobs.json';
import tools from '../data/products.json';
import events from '../data/events.json';
import companies from '../data/companies.json';
import startups from '../data/startups.json';
import robotics from '../data/robotics.json';
import resources from '../data/resources.json';
import podcasts from '../data/podcasts.json';
import community from '../data/community.json';
import websites from '../data/websites.json';

export interface SearchItem {
  title: string;
  description: string;
  link: string;
  section: string;
  keywords: string;
}

const sources: [string, object[]][] = [
  ['News', news], ['Blogs', blogs], ['Jobs', jobs], ['Tools', tools],
  ['Events', events], ['Companies', companies], ['Startups', startups],
  ['Robotics', robotics], ['Resources', resources], ['Podcasts', podcasts],
  ['Community', community], ['Directories', websites],
];

export const searchItems: SearchItem[] = sources.flatMap(([section, items]) =>
  items.map(item => {
    const value = item as Record<string, unknown>;
    return {
      title: String(value.title || value.name || ''),
      description: String(value.description || ''),
      link: String(value.link || value.url || ''),
      section,
      keywords: (section + ' ' + (section === 'Directories' ? 'directory websites ' : section === 'Companies' ? 'company ' : section === 'Community' ? 'communities ' : '') + Object.values(value).filter(v => typeof v === 'string').join(' ')).toLowerCase(),
    };
  }).filter(item => item.title && item.link.startsWith('https://'))
);

export function searchContent(query: string, section = 'All'): SearchItem[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return searchItems.filter(item =>
    (section === 'All' || item.section === section) &&
    words.every(word => item.keywords.includes(word))
  ).sort((a, b) => Number(b.title.toLowerCase().includes(query.toLowerCase().trim())) -
    Number(a.title.toLowerCase().includes(query.toLowerCase().trim())));
}

export function startSearch(query: string) {
  if (!query.trim()) return;
  window.dispatchEvent(new CustomEvent('aiworldnext:search', { detail: query.trim() }));
  window.location.hash = 'search-results';
}
