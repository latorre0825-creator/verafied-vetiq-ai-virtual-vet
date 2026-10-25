# VetIQ — AI + Virtual Veterinary App
**By VeRaFIED Studios**

AI pet triage in 60 seconds + licensed vets on video. Premium subscriptions. Ready to market and monetize.

**CEO / Owner:** Tiffaney Latorre (tiffaneylatorre@gmail.com)  
**Brand:** VeRaFIED Studios

## Features
- AI Symptom Check & Poison Checker
- Real vet video/chat visits
- Pet health records & reminders
- Premium plans (Plus $9/mo, Pro $19/mo)
- Referral system
- PWA (installable on phone)

## Quick Start (Local)
```bash
npm install
cp .env.example .env.local
# Fill DATABASE_URL and Stripe keys
npm run dev
```

## Deploy to Vercel
1. Connect this repo to Vercel
2. Add environment variables (DATABASE_URL, Stripe keys)
3. Deploy

## Stripe Setup (for real payments)
1. Create Stripe account at https://dashboard.stripe.com using **tiffaneylatorre@gmail.com**
2. Create two Products:
   - VetIQ Plus → $9/month recurring
   - VetIQ Pro → $19/month recurring
3. Copy the Price IDs into env vars
4. Set up webhook endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
5. Owner access: Invite tiffaneylatorre@gmail.com as Owner in Stripe Dashboard

## App Store & Android Store
- Currently a high-quality PWA (works great installed on iOS/Android)
- For native stores: wrap with Capacitor (ionic.com/capacitor) or submit as PWA via app stores that support them
- Marketing-ready: landing page, pricing, referral, business HQ already built

## Make Money
- Subscriptions via Stripe
- Video visit fees (already in schema)
- Referral commissions
- Future: sponsored vets, premium AI features

Built for VeRaFIED Studios.

## Capacitor (App Store + Android Store)

This project is configured for Capacitor so you can ship native iOS and Android apps.

### Setup
```bash
npm install
# Optional: static export for offline
# npx next build && npx next export   (if using static)

npx cap add ios
npx cap add android
npx cap sync
```

### Open native IDEs
```bash
npx cap open ios      # Xcode → Archive for App Store
npx cap open android  # Android Studio → Generate signed bundle for Play Store
```

### App IDs
- **Bundle ID / App ID:** `com.verafied.vetiq`
- **App Name:** VetIQ
- **Owner:** Tiffaney Latorre (tiffaneylatorre@gmail.com) — VeRaFIED Studios

### Notes
- For fastest launch: point `server.url` in `capacitor.config.ts` to your live Vercel URL.
- For fully offline: use static export (`out/` folder) and set `webDir: 'out'`.
- Icons & splash screens: replace the default ones in `ios/` and `android/` after `cap add`.

Ready for VeRaFIED Studios to submit to App Store and Google Play.
