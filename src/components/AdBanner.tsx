import { useEffect } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
}

export default function AdBanner({
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = ''
}: AdBannerProps) {
  const enabled = /^ca-pub-\d{16}$/.test(import.meta.env.VITE_GOOGLE_ADSENSE_ID || '') && /^\d{10}$/.test(adSlot) && !['1234567890','2345678901','2345678902','3456789012','3456789013','4567890123','5678901234'].includes(adSlot);
  useEffect(() => {
    if (!enabled) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={import.meta.env.VITE_GOOGLE_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
