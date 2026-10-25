# VetIQ — Simple Setup Guide
**For Tiffaney (CEO) and anyone who isn’t a developer**

This guide walks you through getting the VetIQ app ready to take real payments.  
No coding required.

---

## What You Need
- The email: **tiffaneylatorre@gmail.com**
- A computer with a web browser
- About 20–30 minutes

---

## Step 1: Create Your Stripe Account
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Sign up using **tiffaneylatorre@gmail.com**
3. Finish the short setup (business name can be “VeRaFIED Studios” or “VetIQ”)
4. Once you’re inside Stripe, look for the switch that says **Test mode** / **Live mode** in the top left.  
   - Start in **Test mode** while you’re learning.  
   - Switch to **Live mode** only when you’re ready for real money.

---

## Step 2: Create the Two Monthly Plans
1. In Stripe, click **Products** in the left menu.
2. Click **+ Add product**.

### Plan 1 — VetIQ Plus
- Name: `VetIQ Plus`
- Price: `$9.00`  
- Billing period: **Monthly**
- Click **Save product**
- Copy the long code that starts with `price_` (you’ll need it later)

### Plan 2 — VetIQ Pro
- Repeat the same steps
- Name: `VetIQ Pro`
- Price: `$19.00` monthly
- Save and copy its `price_` code too

---

## Step 3: Get Your Stripe Keys
1. In Stripe, go to **Developers → API keys**
2. Copy these two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`) — click “Reveal”

Keep them somewhere safe (Notes app is fine for now).

---

## Step 4: Put the App Online (Vercel)
1. Go to [https://vercel.com](https://vercel.com) and sign in (use the same GitHub account that owns the repo if possible).
2. Click **Add New → Project**.
3. Find and import:  
   **verafied-vetiq-ai-virtual-vet**
4. When it asks for Environment Variables, add these one by one:

| Name | Value |
|------|-------|
| `STRIPE_SECRET_KEY` | the secret key you copied |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | the publishable key |
| `STRIPE_PLUS_PRICE_ID` | the `price_...` for Plus |
| `STRIPE_PRO_PRICE_ID` | the `price_...` for Pro |
| `DATABASE_URL` | (ask for help with this one if you don’t have a database yet) |

5. Click **Deploy**.
6. Wait until it finishes — you’ll get a link like `https://something.vercel.app`

---

## Step 5: Test It
1. Open the link Vercel gave you.
2. Go to the **Premium** page.
3. Click a plan and enter any email.
4. Use Stripe’s test card:  
   **4242 4242 4242 4242**  
   Any future date, any 3-digit code.
5. Finish payment — you should come back to the site and see a “Welcome” message.

---

## Step 6: Go Live (When You’re Ready)
1. In Stripe, switch from **Test mode** to **Live mode**.
2. Create the same two products again in Live mode and copy the new `price_` codes.
3. In Vercel, replace the test keys with the live keys.
4. Redeploy (or it may redeploy automatically).

---

## Need Help?
- Stripe support is very good — use the chat inside the Stripe dashboard.
- The full technical checklist is in `CHECKLIST.md` in the same folder if someone technical needs it.

You’re the CEO — this guide is written so you can do the money part yourself.

VeRaFIED Studios
