# 🐼 PandaStudioX — Complete Website v4.0

> High CTR Custom YouTube Thumbnail E-commerce Platform
> Built with React + Vite · Zero bugs · Production-ready architecture

---

## 📁 File Structure (17 files)

```
PandaStudioX/
│
├── 📄 PandaStudioX-v4.jsx     ← ✅ SINGLE-FILE — paste into Claude to run instantly
│
├── 📄 index.html              ← HTML entry, SEO meta, loading screen, OG tags
├── 📄 main.jsx                ← Vite React entry point
├── 📄 App.jsx                 ← Root app — all sections assembled
├── 📄 global.css              ← Full design system (variables, animations, utilities)
├── 📄 data.js                 ← All site data (thumbs, packages, FAQs, reviews)
├── 📄 hooks.js                ← Custom hooks (useNotif, useCountdown, useSlots, useScrolled)
├── 📄 integrations.js         ← Razorpay + EmailJS + Firebase ready-to-use code
├── 📄 vite.config.js          ← Vite build config
├── 📄 package.json            ← Dependencies
│
└── components/
    ├── 📄 Navbar.jsx          ← Sticky navbar, mobile menu
    ├── 📄 Hero.jsx            ← Hero section with countdown + visuals
    ├── 📄 OrderModal.jsx      ← 5-step order flow, validated, coupons
    ├── 📄 AdminPanel.jsx      ← Full admin: orders, analytics, audit, settings
    └── 📄 UI.jsx              ← All other components:
                                  OrderSuccess, ThumbCard, PkgCard, StyleCard,
                                  ReviewCard, FaqItem, SectionHead, Footer,
                                  BeforeAfter, LeadMagnet, ContactSection,
                                  ScarcityBanner, CountdownDisplay, NotifList
```

---

## 🚀 Quick Start (3 options)

### Option A — Run in Claude (Instant, no setup)
1. Open Claude → New conversation
2. Paste contents of `PandaStudioX-v4.jsx`
3. Runs immediately — no install needed

### Option B — Vite Dev Server (Recommended)
```bash
# 1. Create project
npm create vite@latest pandastudiox -- --template react
cd pandastudiox

# 2. Install dependencies
npm install @emailjs/browser firebase

# 3. Copy files
# Replace src/App.jsx with App.jsx
# Replace src/main.jsx with main.jsx
# Replace src/index.css with global.css
# Copy: data.js, hooks.js, integrations.js → /src
# Copy: components/ folder → /src/components/
# Replace index.html (project root)
# Replace vite.config.js (project root)

# 4. Update main.jsx import
# Change: import './index.css'
# To:     import './global.css'

# 5. Run
npm run dev
# Opens at http://localhost:3000
```

### Option C — Deploy to Vercel (Free, live in 60 seconds)
```bash
npm run build
npm install -g vercel
vercel --prod
```

---

## 🔐 Admin Panel

| Setting | Value |
|---------|-------|
| URL | Click ⚙ ADMIN in navbar |
| Password | `admin123` |
| **Change before launch** | Edit `adminPass` in `data.js` |

**Admin features:**
- 📊 Overview — revenue chart, stats, recent orders
- 📦 Orders — search, filter by status, update, delete, upload file
- 📈 Analytics — niches, styles, platforms, delivery speed
- ✅ Pre-launch audit checklist (frontend done / integration todo)
- ⚙️ Settings — brand details, coupons, accept/pause orders

---

## 💳 Real Payment (Razorpay) — Replace setTimeout

In `components/OrderModal.jsx`, replace the `submit` function:

```javascript
import { processOrder } from "../integrations.js";

const submit = async () => {
  setBusy(true);
  await processOrder({
    form, pkg, addons, total, applied,
    onSuccess: (data) => { setBusy(false); onSuccess(data); },
    onError:   (msg)  => { setBusy(false); push(msg, "err"); },
  });
};
```

**Razorpay setup:**
1. Create account at razorpay.com
2. Go to Settings → API Keys → Generate Key
3. Replace `rzp_live_XXXXXXXXXXXXXXXX` in `integrations.js`
4. Add `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>` to `index.html`

---

## 📧 EmailJS (Order confirmation + delivery emails)

```bash
npm install @emailjs/browser
```

1. Sign up at emailjs.com (free tier: 200 emails/month)
2. Create a service (Gmail recommended)
3. Create 3 email templates:
   - `template_order_confirm` — sent to customer on order
   - `template_admin_notify` — sent to you on new order
   - `template_deliver` — sent when delivering Drive link
4. Update IDs in `integrations.js`

**Template variables available:**
```
{{to_name}}, {{to_email}}, {{order_id}},
{{package}}, {{total}}, {{delivery}},
{{whatsapp}}, {{upi}}, {{drive_link}}
```

---

## 🗄️ Firebase (Store orders permanently)

```bash
npm install firebase
```

1. Create project at console.firebase.google.com
2. Enable Firestore Database
3. Copy config to `integrations.js` → `firebaseConfig`
4. Firestore rules (allow writes from authenticated users or use server-side):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if true;  // Anyone can create an order
      allow read, update: if request.auth != null;  // Admin only
    }
  }
}
```

---

## 📊 Google Analytics 4

Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Track events from code:
```javascript
import { trackEvent } from "./integrations.js";
trackEvent("order_completed", { package: "standard", value: 249, currency: "INR" });
```

---

## 🎨 Customise Design

All design tokens in `global.css` under `:root`:

```css
:root {
  --red:  #FF1F4E;   /* Brand colour — change to match your brand  */
  --gold: #FFBA00;   /* Accent colour */
  --ink:  #060610;   /* Background */
  --fd:   'Black Han Sans'; /* Display font */
}
```

Change fonts by updating the Google Fonts `@import` at the top of `global.css`.

---

## 💰 Change Prices

In `data.js`, edit the `PKGS` array:
```javascript
{ id:"m", n:"STANDARD", p:249, ... }
//                           ^^^  change this
```

---

## 🎟️ Manage Coupons

In `data.js`, edit `COUPONS`:
```javascript
export const COUPONS = {
  "MYCODE10": { pct:10, label:"10% OFF" },
  // add more...
};
```

Also manageable from Admin → Settings panel.

---

## 📱 Add New Thumbnails

In `data.js`, add to the `THUMBS` array:
```javascript
{
  id:   21,
  cat:  "minecraft",               // Must match a CATS entry
  text: "MAIN HEADLINE",           // Displayed on thumbnail
  sub:  "Sub text",
  e:    "⚡",                       // Emoji character
  v:    "2.1M",                    // Views (display only)
  bg:   ["#0a0a0a", "#1a1a1a"],    // Gradient start + end
  ac:   "#FFB700",                  // Accent colour (glow + text)
}
```

---

## 🧪 Testing Checklist

Before going live, test every one of these:

### Order Flow
- [ ] Select each package (4 packages)
- [ ] Toggle each add-on
- [ ] Apply each coupon code
- [ ] Fill step 2 — check validation (empty fields, bad email, short phone)
- [ ] Fill step 3 — check validation (empty title, empty text)
- [ ] Select style + emotion + audience on step 4
- [ ] Review summary on step 5 — verify total is correct
- [ ] Place order — verify success screen shows

### Admin Panel
- [ ] Login with admin123
- [ ] Change order status — verify toast notification
- [ ] Search orders — verify filter works
- [ ] Analytics tab loads
- [ ] Audit checklist visible
- [ ] Settings save shows toast

### Responsiveness
- [ ] Test on phone (375px)
- [ ] Test on tablet (768px)
- [ ] Test hero, navbar, packages, order form
- [ ] FAB and WhatsApp buttons visible

### Performance
- [ ] No console errors
- [ ] Thumbnails load visually
- [ ] Countdown ticking correctly
- [ ] Slot counter real (check localStorage)
- [ ] Live activity toasts appear after ~7 seconds

---

## 🎯 First 10 Customers Strategy

Don't wait for organic traffic. Do this manually:

1. **Find** small YouTube creators (100–10K subs) in gaming/Minecraft/BGMI
2. **Improve** their worst-performing thumbnail in your style
3. **Send** them: _"Hey, I redesigned your thumbnail. Want to see it?"_
4. **Share** the preview image
5. **Link** your site with a first-order coupon: `FIRST20`

This approach converts at 15–30%. 10 DMs can get you 2–3 paying customers.

---

## ⚠️ Security Checklist Before Launch

- [ ] Change `adminPass` from `admin123` to something strong
- [ ] Move Firebase config to environment variables (`.env`)
- [ ] Move Razorpay key to backend — never expose live secret on frontend
- [ ] Add Firebase security rules
- [ ] Enable HTTPS (automatic with Vercel/Netlify)
- [ ] Remove all `console.log` statements

---

## 📞 Support

| Channel | Contact |
|---------|---------|
| Email | pandaankit2007@gmail.com |
| WhatsApp | +91 8082646863 |
| Instagram | @pandastudiox |

---

*Built with 🔥 — PandaStudioX · Turn Views Into Clicks*
