# AIWorldNext - Setup Instructions

## Overview

AIWorldNext is monetized through two channels:
1. **Google AdSense** - Display advertising
2. **Donation/Support System** - Community contributions to advance AI education

## Google AdSense & Analytics Configuration

### 1. Configure Environment Variables

Open the `.env` file and replace the placeholder values with your actual IDs:

```env
# Google AdSense - Replace with your actual publisher ID
VITE_GOOGLE_ADSENSE_ID=ca-pub-YOUR_PUBLISHER_ID

# Google Analytics - Replace with your actual measurement ID
VITE_GOOGLE_ANALYTICS_ID=G-YOUR_MEASUREMENT_ID
```

### 2. Update AdSense Client ID in index.html

Open `index.html` and replace `ca-pub-YOUR_PUBLISHER_ID` with your actual AdSense publisher ID:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
 crossorigin="anonymous"></script>
```

### 3. Configure Ad Slots

In `src/App.tsx`, you'll find 5 ad placements. Update the `adSlot` values with your actual ad unit IDs from Google AdSense:

**Current Ad Placements:**
- **Top Banner** (after Vision) - adSlot: "1234567890"
- **Mid-page Banner** (after Jobs) - adSlot: "2345678901"
- **Middle Banner** (after Resources) - adSlot: "3456789012"
- **Lower Banner** (after Support section) - adSlot: "4567890123"
- **Bottom Banner** (before Footer) - adSlot: "5678901234"

Example:
```tsx
<AdBanner
  adSlot="YOUR_ACTUAL_AD_UNIT_ID"
  adFormat="horizontal"
  className="bg-gray-900 rounded-lg p-4"
/>
```

### 4. Getting Your Google IDs

#### Google AdSense:
1. Go to [Google AdSense](https://www.google.com/adsense)
2. Sign in or create an account
3. Navigate to **Account** → **Account information**
4. Copy your **Publisher ID** (format: ca-pub-XXXXXXXXXXXXXXXX)
5. Create ad units and copy their **Ad unit IDs**

#### Google Analytics:
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property or select existing one
3. Navigate to **Admin** → **Data Streams**
4. Select or create a Web stream
5. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

### 5. Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify:
   - Go to **Site settings** → **Environment variables**
   - Add `VITE_GOOGLE_ADSENSE_ID` and `VITE_GOOGLE_ANALYTICS_ID`
4. Deploy!

### 6. Verify Setup

After deployment:
- Check browser console for any AdSense errors
- Verify Google Analytics is tracking by checking Real-time reports
- Test ad placements (ads may take 24-48 hours to appear initially)

## Ad Placement Strategy

The site includes 5 strategic ad placements:
- **High visibility**: Top banner catches immediate attention
- **Content breaks**: Ads between major sections don't disrupt user flow
- **Engagement zones**: Placed after compelling content sections
- **Exit intent**: Bottom banner before footer

All ads are:
- Responsive and mobile-friendly
- Styled to match the dark theme
- Non-intrusive with proper spacing

## Donation & Support System Configuration

### Overview

The platform includes a comprehensive donation/support system with:
- **3 Monthly Tiers**: Supporter ($5), Contributor ($25), Champion ($100)
- **One-time Donations**: Pre-set amounts ($10, $25, $50, $100) and custom
- **Impact Metrics**: Community stats and supporter benefits

### Setup Required

**IMPORTANT**: Update the donation URLs in `src/components/SupportSection.tsx` with your actual payment processing links.

1. **Set up Stripe or payment processor** of your choice
2. **Create payment links** for each tier and amount
3. **Replace placeholder URLs** in the component:

```tsx
// Monthly tiers (line ~108)
href={`https://donate.stripe.com/aiworldnext/${tier.name.toLowerCase()}`}

// One-time donations (line ~127-140)
href={`https://donate.stripe.com/aiworldnext/custom?amount=${amount}00`}
```

### Customization

You can customize:
- **Tier prices and benefits** - Edit the `supportTiers` array
- **Impact stats** - Update the stats grid with your actual numbers
- **One-time amounts** - Modify the preset donation amounts
- **Messaging** - Adjust the mission and impact statements

## Site Structure

**New Sections Added:**

1. **Vision Section** (Top) - Mission, vision, values, and partnerships
2. **Podcasts Section** (High priority) - AI podcast directory
3. **Support Section** (Mid-page) - Donation and community support
4. **All existing sections** - News, Blogs, Jobs, Products, Resources, Startups, Robotics, Community, Websites

The navigation has been updated to include Vision, Podcasts, and Support links.

## Support

For issues or questions:
- Email: business@aiworldnext.com
- Check Google AdSense help center
- Review Google Analytics documentation

---

© 2025 AIWorldNext. All rights reserved.
