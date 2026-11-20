import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';

export default function GoogleAnalytics() {
  useEffect(() => {
    const id = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'G-JX6LMBFL2Q';
    if (!/^G-[A-Z0-9]+$/.test(id || '')) return;

    if (!document.getElementById('aiworldnext-ga')) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (..._args: unknown[]) {
        window.dataLayer!.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', id);
      const script = document.createElement('script');
      script.id = 'aiworldnext-ga';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }

    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      const placement = link.closest('section')?.id || 'content';
      if (link.dataset.newsletter) {
        trackEvent('newsletter_signup_click', {
          method: 'brevo',
          placement: link.dataset.newsletter,
          link_url: url.href,
          page_path: window.location.pathname,
        });
      }

      if (url.protocol !== 'https:' || url.origin === window.location.origin) return;

      const isAffiliate = link.relList.contains('sponsored') || link.dataset.affiliate === 'true';
      trackEvent(isAffiliate ? 'affiliate_click' : 'outbound_click', {
        link_domain: url.hostname,
        link_url: url.href,
        link_text: (link.textContent || '').trim().slice(0, 100),
        page_path: window.location.pathname,
        placement,
      });
    };

    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);

  return null;
}
