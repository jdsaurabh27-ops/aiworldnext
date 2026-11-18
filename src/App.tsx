import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PracticalGuides from './components/PracticalGuides';
import SearchResults from './components/SearchResults';
import Section from './components/Section';
import Card from './components/Card';
import { Newspaper } from 'lucide-react';
import GoogleAnalytics from './components/GoogleAnalytics';
import AIToolsSection from './components/AIToolsSection';
import AIJobsSection from './components/AIJobsSection';
import newsData from './data/news.json';

const Newsletter = lazy(() => import('./components/Newsletter'));
const SubmitSection = lazy(() => import('./components/SubmitSection'));
const SupportSection = lazy(() => import('./components/SupportSection'));

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <GoogleAnalytics />
      <Navbar />
      <main>
        <Hero />
        <PracticalGuides />
        <AIToolsSection />
        <Section
          id="news"
          title="Latest AI News"
          subtitle="A short selection of source-linked developments. Visit the news page for the full feed."
          icon={Newspaper}
        >
          {newsData.slice(0, 3).map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              imageKind={(item as { imageKind?: string }).imageKind}
              link={item.link}
              date={item.date}
              category={item.category}
            />
          ))}
        </Section>
        <div className="mx-auto max-w-7xl px-4 pb-10 text-center">
          <a href="/news/" className="inline-flex rounded-lg border border-gray-700 px-5 py-3 font-semibold text-cyan-300 hover:border-cyan-400">View all AI news</a>
        </div>
        <AIJobsSection />
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Explore more</p>
              <h2 className="mt-1 text-xl font-bold text-white">More from the AI ecosystem</h2>
              <p className="mt-2 text-sm text-gray-300">Robotics, startups, companies, events, podcasts, directories and learning resources.</p>
            </div>
            <a href="/discover/" className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-gray-950 hover:bg-cyan-300">Browse all categories</a>
          </div>
        </section>
        <Suspense fallback={null}><Newsletter /></Suspense>
        <Suspense fallback={null}><SubmitSection /></Suspense>
        <Suspense fallback={null}><SupportSection /></Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
