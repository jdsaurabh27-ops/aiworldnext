import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Section from './components/Section';
import Card from './components/Card';
import AdBanner from './components/AdBanner';
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
  Briefcase,
  ShoppingBag,
  BookOpen,
  Rocket,
  Bot,
  Mic,
  Users,
  Globe,
} from 'lucide-react';

import newsData from './data/news.json';
import blogsData from './data/blogs.json';
import jobsData from './data/jobs.json';
import productsData from './data/products.json';
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

      {/* Vision & Mission */}
      <Suspense fallback={<LoadingFallback />}>
        <VisionSection />
      </Suspense>

      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner
          adSlot="1234567890"
          adFormat="horizontal"
          className="bg-gray-900 rounded-lg p-4"
        />
      </div>

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
            link={item.link}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner
          adSlot="2345678901"
          adFormat="horizontal"
          className="bg-gray-900 rounded-lg p-4"
        />
      </div>

      {/* AI Tools Directory */}
      <Suspense fallback={<LoadingFallback />}>
        <AIToolsSection />
      </Suspense>

      {/* Middle Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner
          adSlot="2345678902"
          adFormat="horizontal"
          className="bg-gray-900 rounded-lg p-4"
        />
      </div>

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
            link={item.link}
            category={item.category}
          />
        ))}
      </Section>

      {/* Middle Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner
          adSlot="3456789012"
          adFormat="horizontal"
          className="bg-gray-900 rounded-lg p-4"
        />
      </div>

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner
          adSlot="3456789013"
          adFormat="horizontal"
          className="bg-gray-900 rounded-lg p-4"
        />
      </div>

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner
          adSlot="4567890123"
          adFormat="horizontal"
          className="bg-gray-900 rounded-lg p-4"
        />
      </div>

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner
          adSlot="5678901234"
          adFormat="horizontal"
          className="bg-gray-900 rounded-lg p-4"
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
