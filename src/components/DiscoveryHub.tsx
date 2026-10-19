import topics from '../data/discovery-topics.json';
import { trackEvent } from '../lib/analytics';
export default function DiscoveryHub() {
  return <section aria-labelledby="discover-title" className="bg-gray-950 py-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="mb-2 text-sm font-semibold text-cyan-400">Find your next useful step</p>
      <h2 id="discover-title" className="text-3xl font-bold text-white">Explore AI news, careers and ideas</h2>
      <p className="mt-3 max-w-3xl text-gray-300">Choose a topic, explore the source-linked directory, and use a practical guide to decide what to do next.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{topics.map(t => <article key={t.slug} className="rounded-xl border border-gray-700 bg-gray-900 p-6">
        <p className="text-sm font-semibold text-cyan-400">{t.label}</p><h3 className="mt-2 text-xl font-semibold text-white">{t.title}</h3><p className="mt-3 text-gray-300">{t.description}</p>
        <a className="mt-4 inline-block rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-gray-950 hover:bg-cyan-200" href={`/${t.slug}/`} onClick={() => trackEvent('discovery_click', {topic:t.slug, destination:'directory'})}>Explore {t.label} →</a>
        <a className="mt-4 block text-sm text-cyan-300 underline underline-offset-4" href={`/guides/${t.guide}/`} onClick={() => trackEvent('discovery_click', {topic:t.slug, destination:'guide'})}>{t.guideLabel}</a>
      </article>)}</div>
      <div className="mt-6 flex flex-wrap gap-5 text-cyan-300"><a href="/discover/">All topics and guides →</a><a href="/#newsletter">Get the newsletter →</a></div>
    </div>
  </section>;
}
