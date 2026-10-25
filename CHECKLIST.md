# VetIQ Launch Checklist — VeRaFIED Studios

**CEO / Owner:** Tiffaney Latorre (tiffaneylatorre@gmail.com)  
**Repo:** https://github.com/latorre0825-creator/verafied-vetiq-ai-virtual-vet

## 1. Stripe Account
- [ ] Create or log into Stripe at https://dashboard.stripe.com with **tiffaneylatorre@gmail.com**
- [ ] Confirm you have Owner access on the account
- [ ] Switch to Live mode when ready (test mode is fine for first checks)

## 2. Create Products & Prices
- [ ] Create product: **VetIQ Plus**
  - Price: $9.00 / month (recurring)
  - Copy the Price ID (`price_...`)
- [ ] Create product: **VetIQ Pro**
  - Price: $19.00 / month (recurring)
  - Copy the Price ID (`price_...`)

## 3. Environment Variables
Add these in Vercel (Project → Settings → Environment Variables) or `.env.local`:

- [ ] `STRIPE_SECRET_KEY` = `sk_live_...` (or `sk_test_...` while testing)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
- [ ] `STRIPE_PLUS_PRICE_ID` = the Plus price ID
- [ ] `STRIPE_PRO_PRICE_ID` = the Pro price ID
- [ ] `DATABASE_URL` = your Postgres connection string (Neon / Vercel Postgres / Supabase)
- [ ] (Optional) `NEXT_PUBLIC_APP_URL` = your live Vercel URL

## 4. Deploy
- [ ] Go to https://vercel.com and import the GitHub repo
- [ ] Select the VeRaFIED Music team if prompted
- [ ] Add the environment variables above
- [ ] Deploy
- [ ] Confirm the site loads and the Premium page opens

## 5. Test the Payment Flow
- [ ] Use Stripe test mode first
- [ ] On the Premium page, pick a plan and enter a test email
- [ ] Complete checkout with Stripe test card `4242 4242 4242 4242`
- [ ] Confirm you are redirected back and see the “Welcome to Plus/Pro” banner
- [ ] Switch to live keys when ready for real money

## 6. App Store & Android (Capacitor)
- [ ] Run locally:
  ```bash
  npm install
  npx cap add ios
  npx cap add android
  npx cap sync
  ```
- [ ] Generate icons/splash:
  ```bash
  npm install -D @capacitor/assets
  npx @capacitor/assets generate --iconBackgroundColor '#0E3D37' --splashBackgroundColor '#0E3D37'
  ```
- [ ] `npx cap open ios` → Archive in Xcode for App Store
- [ ] `npx cap open android` → Generate signed bundle in Android Studio for Play Store
- [ ] App ID: `com.verafied.vetiq`

## 7. Optional but Recommended
- [ ] Set up Stripe webhook pointing to `https://your-domain.vercel.app/api/stripe/webhook`
- [ ] Add `STRIPE_WEBHOOK_SECRET` to env vars
- [ ] Custom domain (optional)
- [ ] Share the live URL for marketing

---

Once the Stripe keys and database are set and the app is deployed, the full flow works and payments go to Tiffaney’s Stripe account.

VeRaFIED Studios
