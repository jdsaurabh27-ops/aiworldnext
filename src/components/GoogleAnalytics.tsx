import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
export default function GoogleAnalytics() {
  useEffect(() => {
    const id = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'G-JX6LMBFL2Q';
    if (!/^G-[A-Z0-9]+$/.test(id || '')) return;
    if (!document.getElementById('aiworldnext-ga')) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (..._args: unknown[]) { window.dataLayer!.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', id);
      const script = document.createElement('script');
      script.id = 'aiworldnext-ga'; script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }
    const click = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.('a');
      if (!link) return;
      const url = new URL(link.href, location.href);
      if (url.protocol === 'https:' && url.origin !== location.origin)
        trackEvent(link.rel.includes('sponsored') ? 'affiliate_click' : 'outbound_click', { link_domain: url.hostname, content_type: link.closest('section')?.id || 'navigation' });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  return null;
}
