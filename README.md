# AURA — Luxury Restaurant Website Template
### A Premium Digital Product by **NovaPixelWorks**

[![Template Version](https://img.shields.io/badge/Version-1.1.0-gold.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-172B23.svg)](#)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla)-success.svg)](#)
[![License](https://img.shields.io/badge/License-NovaPixelWorks%20Commercial%20License-C2A06E.svg)](LICENSE.md)

---

## 🌟 Overview

**AURA** is a masterfully crafted, mobile-first restaurant website template engineered specifically for high-end dining establishments, bistros, steakhouses, cocktail lounges, and boutique culinary brands. Designed with a warm editorial aesthetic—featuring rich cream backgrounds, deep forest green accents, charcoal typography, and subtle metallic gold highlights—AURA gives food businesses a world-class digital presence without the bloat, maintenance headaches, or security vulnerabilities of heavy CMS platforms.

This template is built **exclusively with semantic HTML5, modern CSS3, and pure Vanilla JavaScript (ES6+)**. It requires **zero build steps, zero node_modules, zero framework dependencies, and zero paid APIs**. Double-click `index.html` and it works instantly in any web browser.

---

## ⚠️ Important Notice: Table Reservation & Contact Form (Demo Mode)

> [!IMPORTANT]
> **Why is the reservation form in demonstration mode?**
> This template is distributed as a **pure client-side frontend digital product**. To protect buyers from recurring server bills, unwanted database setup, or vendor lock-in, the reservation form operates in **Interactive Simulation Mode**:
> 1. It validates all inputs (name, email, phone, guest count, time, and future dates).
> 2. It restricts past dates dynamically.
> 3. Upon submission, it displays an **Itemized Confirmation Receipt Modal** with a booking reference ID (`#AURA-XXXXXX`), table hold policy, and quick actions (Copy ID, Print/Save PDF, Add to Google Calendar, and WhatsApp booking demo).
> 4. **No booking is transmitted to a live restaurant database** out of the box.

### Connecting Live Reservations (Production Setup)
Depending on your restaurant's operational model, choose one of the 4 easy integration methods below:

#### Option 1: OpenTable / Resy / SevenRooms (Recommended for Restaurants)
If your restaurant already uses an industry reservation management system, replace the form button with your direct booking link or embed their official widget:
```html
<!-- OpenTable Direct Booking Button -->
<a href="https://www.opentable.com/restref/client/?restref=YOUR_RESTAURANT_ID" 
   class="btn btn-gold" target="_blank" rel="noopener noreferrer">
  Book a Table on OpenTable ↗
</a>

<!-- Or Resy Widget -->
<a href="https://resy.com/cities/your-city/your-restaurant" 
   class="btn btn-gold" target="_blank" rel="noopener noreferrer">
  Reserve on Resy ↗
</a>
```

#### Option 2: Free Email Alerts via Formspree or Web3Forms (Zero Backend Code)
Receive guest booking requests straight to your email inbox without hosting any backend:
1. Create a free account at [Formspree.io](https://formspree.io) or [Web3Forms.com](https://web3forms.com).
2. Create a form and copy your form ID (e.g. `https://formspree.io/f/xyzabcde`).
3. In `index.html`, set the form action and method on `<form id="reservationForm">`:
```html
<form id="reservationForm" action="https://formspree.io/f/xyzabcde" method="POST">
```

#### Option 3: Direct WhatsApp Reservation (Popular for Bistros & Lounges)
Allow guests to send a pre-formatted reservation message directly to your restaurant's WhatsApp Business phone:
```html
<a href="https://wa.me/15552348900?text=Hello%20AURA%20Restaurant,%20I%20would%20like%20to%20reserve%20a%20table" 
   class="btn btn-gold" target="_blank" rel="noopener noreferrer">
  Book via WhatsApp Concierge 💬
</a>
```

#### Option 4: Custom Server Endpoint (PHP / Node.js)
If you operate a custom backend, listen for POST submissions:
```javascript
// In js/main.js, replace the setTimeout simulation with fetch:
fetch('/api/reservations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, phone, date, time, guests, seating, notes })
})
.then(res => res.json())
.then(data => showConfirmationModal(data));
```

---

## 📱 Mobile-First Responsive Design & Testing Guide

AURA was built from the ground up for mobile devices and has been rigorously verified across all standard screen widths:

| Screen Width | Target Device | Layout Behavior |
| :--- | :--- | :--- |
| **320px – 360px** | iPhone SE (1st gen), Galaxy Mini | Compact single-column, touch buttons, wrapped dish titles, zero horizontal overflow. |
| **375px – 414px** | iPhone SE (2nd/3rd gen), iPhone 13/14/15, Pixel | Full mobile drawer, comfortable touch targets (48px+), optimized reservation card. |
| **768px – 820px** | iPad Portrait, Tablets | 2-column menu layout, 2-column gallery, tablet-adapted hero. |
| **1024px+** | Laptops & Desktops | Full editorial split grids, sticky header navigation, 4-column gallery. |

### How to Test on Mobile Devices Locally
1. Open `index.html` in **Google Chrome** or **Firefox**.
2. Press `F12` (or right-click anywhere and select **Inspect**).
3. Click the **Toggle Device Toolbar** icon (shortcut: `Ctrl + Shift + M` on Windows or `Cmd + Shift + M` on Mac).
4. Select **iPhone SE (375px)** or enter **320px** manually in the width input.
5. Test the following:
   - Tap the hamburger icon (`☰`) to open the drawer; verify that clicking links, backdrop, or the `✕` close button smoothly closes the menu.
   - Tap on the reservation form fields: notice that text does not trigger unwanted iOS auto-zoom (enforced by `font-size: 16px !important;`).
   - Scroll through all sections and confirm **zero horizontal scrolling or cut-off content**.

---

## 🖼️ Images & Offline Reliability

### What Happens Without an Internet Connection?
This template includes high-resolution photography from Unsplash for demonstration. If the template is opened **offline** (e.g. without internet access or on a private network):
- AURA features an automated **Offline Image Fallback Controller** in `js/main.js`.
- If an external image fails to load, JavaScript immediately catches the event and generates an **elegant inline SVG card** with the restaurant's deep forest green palette, gold emblem, and the dish's title.
- Ready-to-use local vector placeholders are also provided in the `assets/` directory:
  - `assets/hero-placeholder.svg`
  - `assets/dish-placeholder.svg`
  - `assets/chef-placeholder.svg`
- **Result:** The layout never breaks, and no ugly browser broken-image icons are ever displayed.

### Commercial Image Licensing (Unsplash License)
All preview photos used in this template are licensed under the **Unsplash Free License**:
- Free for both **commercial and non-commercial use**.
- No permission or attribution required.
- You are free to use these demo images for client presentations.
- **Buyer Tip:** For a live restaurant, replace the URLs with your authentic food and dining room photography.

### How to Replace Images with Your Own Local Photos
1. Place your photos in the `assets/` folder (e.g., `assets/hero.jpg`, `assets/dish-1.jpg`).
2. Open `index.html` and update the `src` attribute:
```html
<!-- Example: updating the hero background -->
<img src="assets/hero.jpg" alt="Dining Room" class="hero-bg-img">
```

---

## ⚙️ Centralized Customization: Restaurant Details & Colors

### 1. Centralized Restaurant Details (in `js/main.js`)
At the very top of `js/main.js`, you will find `RESTAURANT_CONFIG`. Change your details in one convenient location:

```javascript
const RESTAURANT_CONFIG = {
  brandName: 'AURA',
  tagline: 'Fine Dining & Botanicals',
  phone: '+1 (555) 234-8900',
  phoneRaw: '+15552348900',
  email: 'concierge@aurarestaurant.com',
  address: '428 Kensington Boulevard, Culinary Arts Quarter, London, W8 4PQ, UK',
  currency: '$',
  social: {
    instagram: 'https://instagram.com/yourhandle',
    facebook: 'https://facebook.com/yourpage',
    tripadvisor: 'https://tripadvisor.com'
  }
};
```

### 2. Updating Operating Hours & Live Status
In `js/main.js`, customize the `RESTAURANT_HOURS` object (hours in 24h format):
```javascript
const RESTAURANT_HOURS = {
  0: { name: 'Sunday', open: 12, openMin: 0, close: 22, closeMin: 0, formatted: '12:00 PM – 10:00 PM' },
  1: { name: 'Monday', closed: true, formatted: 'Closed (Private Dining by Request)' },
  2: { name: 'Tuesday', open: 17, openMin: 0, close: 23, closeMin: 0, formatted: '5:00 PM – 11:00 PM' },
  // ...
};
```
The script automatically displays a live **Open Now** or **Closed Now** badge and highlights the current day of the week with a **"Today"** badge in the schedule table.

### 3. Customizing Colors via CSS Variables
In `css/style.css`, edit the `:root` block to re-theme the entire website in seconds:
```css
:root {
  --color-cream-bg: #FAF7F2;       /* Page background */
  --color-cream-surface: #FFFFFF;  /* Cards and modals */
  --color-forest: #172B23;         /* Primary brand color */
  --color-forest-dark: #0D1A14;    /* Deep dark contrast */
  --color-gold: #C2A06E;           /* Accent buttons & icons */
  --color-charcoal: #1D2321;       /* Typography */
}
```

---

## 📁 File Structure

```text
restaurant-website/
├── index.html            # Complete, semantic HTML5 page structure
├── css/
│   └── style.css         # Theme design tokens, components, responsive layout
├── js/
│   └── main.js           # Vanilla JS (live hours, menu filter, lightbox, reservation receipt)
├── assets/
│   ├── hero-placeholder.svg     # Offline hero fallback asset
│   ├── dish-placeholder.svg     # Offline menu dish fallback asset
│   └── chef-placeholder.svg     # Offline chef portrait fallback asset
├── LICENSE.md            # NovaPixelWorks end-user digital product license
└── README.md             # Comprehensive buyer customization guide (this file)
```

---

## 🌐 Deployment Instructions

### GitHub Pages (100% Free Hosting)
1. Push this folder to a GitHub repository.
2. Go to **Settings** → **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/root`, then click **Save**.
4. Your site will be published at `https://your-username.github.io/repository-name/`.

### Netlify / Vercel (Instant Drag-and-Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the folder. Your site is live with free SSL in 10 seconds.

### Shared Hosting (cPanel / Hostinger / GoDaddy)
1. Compress all files into a `.zip`.
2. Upload and extract directly into `public_html`.

---

---

## 💬 Support & Author Credits

Crafted with dedication by **NovaPixelWorks** — UI/UX & Frontend Digital Products Studio.
For inquiries, feature suggestions, or custom development, contact us via our Gumroad store profile.
