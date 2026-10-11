declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; }
}
export function trackEvent(name: string, parameters: Record<string, string | number> = {}) {
  window.gtag?.('event', name, parameters);
}
