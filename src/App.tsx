import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import SearchResults from './components/SearchResults';
import Section from './components/Section';
import Card from './components/Card';
import GoogleAnalytics from './components/GoogleAnalytics';

const VisionSection = lazy(() => import('./components/VisionSection'));
const SupportSection = lazy(() => import('./components/SupportSection'));
const Newsletter = lazy(() => import('./components/Newsletter'));
const EventsCalendar = lazy(() => import('./components/EventsCalendar'));
const TopCompanies = lazy(() => import('./components/TopCompanies'));
const AIJobsSection = lazy(() => import('./components/AIJobsSection'));
const AIToolsSection = lazy(() => import('./components/AIToolsSection'));
const SubmitSection = lazy(() => import('./components/SubmitSection'));
import {
  Newspaper,
  PenTool,
  BookOpen,
  Rocket,
  Bot,
  Mic,
  Users,
  Globe,
} from 'lucide-react';

import newsData from './data/news.json';
import blogsData from './data/blogs.json';
import resourcesData from './data/resources.json';
import startupsData from './data/startups.json';
import roboticsData from './data/robotics.json';
import podcastsData from './data/podcasts.json';
import communityData from './data/community.json';
import websitesData from './data/websites.json';

function App() {
  const LoadingFallback = () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <GoogleAnalytics />
      <Navbar />
      <Hero />
      <SearchResults />
      <div className="max-w-7xl mx-auto px-6 py-5 text-center text-gray-300">Browse complete categories: {['news','blogs','jobs','tools','events','companies','startups','robotics','podcasts','community','directories','resources'].map(name => <a key={name} href={`/${name}/`} className="inline-block mx-2 my-1 text-neon-blue underline capitalize">{name}</a>)}<p className="mt-3"><a href="/guides/" className="text-neon-blue underline">Practical AI guides</a> · <a href="/updates/" className="text-neon-blue underline">Weekly update status</a></p></div>

      {/* Vision & Mission */}
      <Suspense fallback={<LoadingFallback />}>
        <VisionSection />
      </Suspense>

      {/* Top Banner Ad */}

      <Section
        id="news"
        title="Latest AI News"
        subtitle="Stay updated with the newest developments in artificial intelligence and robotics"
        icon={Newspaper}
      >
        {newsData.slice(0, 6).map((item) => (
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

      <Section
        id="blogs"
        title="Featured Blogs"
        subtitle="In-depth articles and insights from AI experts and thought leaders"
        icon={PenTool}
      >
        {blogsData.slice(0, 6).map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
                imageKind={(item as { imageKind?: string }).imageKind}
            link={`/blogs/entry-${item.id}/`}
            date={item.date}
            author={item.author}
            authorImage={item.authorImage}
            category={item.category}
          />
        ))}
      </Section>

      <Section
        id="podcasts"
        title="AI Podcasts"
        subtitle="Listen to conversations with leading AI researchers and practitioners"
        icon={Mic}
      >
        {podcastsData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
                imageKind={(item as { imageKind?: string }).imageKind}
            link={item.link}
            host={item.host}
            category={item.category}
          />
        ))}
      </Section>

      {/* AI Jobs Section with Filters */}
      <Suspense fallback={<LoadingFallback />}>
        <AIJobsSection />
      </Suspense>

      {/* Mid-page Banner Ad */}

      {/* AI Tools Directory */}
      <Suspense fallback={<LoadingFallback />}>
        <AIToolsSection />
      </Suspense>

      {/* Middle Banner Ad */}

      <Section
        id="resources"
        title="AI Resources & Learning"
        subtitle="Educational materials, courses, and resources for AI development"
        icon={BookOpen}
      >
        {resourcesData.slice(0, 6).map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
                imageKind={(item as { imageKind?: string }).imageKind}
            link={item.link}
            category={item.category}
          />
        ))}
      </Section>

      {/* Middle Banner Ad */}

      <Section
        id="robotics"
        title="Robotics Updates"
        subtitle="Latest developments in robotics and autonomous systems"
        icon={Bot}
      >
        {roboticsData.map((item) => (
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

      {/* AI Events Calendar 2026 */}
      <Suspense fallback={<LoadingFallback />}>
        <EventsCalendar />
      </Suspense>

      {/* Middle Banner Ad */}

      <Section
        id="startups"
        title="AI Startups to Watch"
        subtitle="Innovative companies shaping the future of artificial intelligence"
        icon={Rocket}
      >
        {startupsData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
                imageKind={(item as { imageKind?: string }).imageKind}
            link={item.link}
            funding={item.funding}
            founded={item.founded}
            category={item.category}
          />
        ))}
      </Section>

      {/* Top AI Companies 2026 */}
      <Suspense fallback={<LoadingFallback />}>
        <TopCompanies />
      </Suspense>

      {/* Newsletter Subscription */}
      <Suspense fallback={<LoadingFallback />}>
        <Newsletter />
      </Suspense>

      {/* Support & Donation Section */}
      <Suspense fallback={<LoadingFallback />}>
        <SupportSection />
      </Suspense>

      {/* Lower Banner Ad */}

      <Section
        id="community"
        title="AI Community"
        subtitle="Join forums, groups, and events connecting AI enthusiasts worldwide"
        icon={Users}
      >
        {communityData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
                imageKind={(item as { imageKind?: string }).imageKind}
            link={item.link}
            members={item.members}
            category={item.category}
          />
        ))}
      </Section>

      <Section
        id="websites"
        title="AI Directories & Resources"
        subtitle="Curated collection of the best AI websites and platforms"
        icon={Globe}
      >
        {websitesData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
                imageKind={(item as { imageKind?: string }).imageKind}
            link={item.link}
            category={item.category}
          />
        ))}
      </Section>

      {/* Submit Content Section */}
      <Suspense fallback={<LoadingFallback />}>
        <SubmitSection />
      </Suspense>

      {/* Bottom Banner Ad */}

      <Footer />
    </div>
  );
}

export default App;
