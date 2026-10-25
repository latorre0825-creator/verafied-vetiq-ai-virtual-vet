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
