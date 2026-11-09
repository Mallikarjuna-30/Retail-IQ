# RetailIQ 🛒

> **AI-Powered Retail Intelligence & Hyperlocal Stock Recovery**  
> *Predict Expiry Risk. Protect Margins. Zero Food & Stock Waste.*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=flat&logo=react)](https://react.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-English%20%7C%20%E0%B2%95%E0%B2%A8%E0%B3%8D%E0%B2%A8%E0%B2%A1%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80-emerald)](https://next-intl-docs.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Overview

Traditional billing systems only record historical sales—they don't forecast upcoming risk. **RetailIQ** is an AI-native retail intelligence platform built specifically for Indian neighbourhood grocery stores (Kirana stores & local marts). 

RetailIQ accurately forecasts demand, predicts unsold inventory in **rupees** before expiration, suggests **margin-protected smart discounts**, and powers a **Hyperlocal Stock Rescue Marketplace** where neighbourhood shoppers can reserve near-expiry essentials at discounted prices for in-store pickup.

---

## ✨ Key Features

### 1. 📦 Batch & FEFO Tracking
- First-Expired, First-Out (FEFO) automated batch deduction.
- Track manufacturing dates, batch numbers, and expiry windows without inventory discrepancies.
- Fast intake via barcode scanning and **"Add by Sentence"** natural language processing (e.g., *"Add 5 packets of Parle-G at ₹5 each"*).

### 2. ⚠️ Rupee-Denominated Expiry Risk Analysis
- Know financial exposure days ahead.
- Calculates projected unsold stock and displays estimated loss directly in **₹ (INR)**.
- Color-coded risk status (Critical, High, Moderate, Healthy).

### 3. 🏷️ Smart Discounts with Price-Floor Protection
- Automated price reductions to clear slow-moving inventory before expiry.
- **Price-Floor Guarantee**: Selling price is strictly bounded (`sellingPrice >= purchasePrice`) so shopkeepers never sell at a loss.
- 1-click generation of WhatsApp campaign flyers and printable promotional QR codes.

### 4. 🛍️ Hyperlocal Stock Rescue Marketplace
- Connects local neighbourhood customers directly with retail stores.
- Shoppers can discover fresh, heavily discounted daily essentials nearing expiry.
- Reserve online, pick up and pay in-store.

### 5. 🌐 Vernacular Multilingual Support
- Built-in internationalization (`next-intl`) with complete translation parity across:
  - **English (`en`)**
  - **Kannada (`kn`)** (ಕನ್ನಡ)
  - **Hindi (`hi`)** (हिन्दी)
- Includes automated translation key verification script (`npm run i18n:check`).

### 6. 🌓 Dark / Light Mode & Responsive Design
- Seamless theme switching persisted in `localStorage` and system theme sync.
- Mobile-responsive navigation with dedicated side drawer and topbar controls.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/), [Lucide React Icons](https://lucide.dev/) |
| **Internationalization** | [next-intl](https://next-intl-docs.vercel.app/) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) validation |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) |
| **Database ORM** | [Prisma](https://www.prisma.io/) (SQLite local, MySQL production ready) |
| **AI Integration** | Google Gemini API (via FastAPI / AI Service) |

---

## 📁 Project Structure

```text
RetailIQ/
├── messages/                   # Translation dictionaries (i18n)
│   ├── en.json                 # English translations
│   ├── hi.json                 # Hindi translations
│   └── kn.json                 # Kannada translations
├── scripts/
│   └── check-i18n.js           # Translation synchronization validation script
├── src/
│   ├── app/
│   │   └── [locale]/           # Dynamic locale routing ([locale] = en | hi | kn)
│   │       ├── (auth)/         # Authentication routes (login, demo login)
│   │       ├── (shopkeeper)/   # Shop owner portal & management dashboard
│   │       ├── layout.tsx      # Root localized layout (theme & font providers)
│   │       └── page.tsx        # Public landing & showcase page
│   ├── components/
│   │   ├── layout/             # Topbar, Sidebar, Mobile Drawer, Language Switcher
│   │   ├── theme/              # ThemeContext & ThemeToggle buttons
│   │   └── ui/                 # Reusable UI primitives (Button, Badge, etc.)
│   ├── lib/
│   │   └── utils.ts            # Classnames helper (cn)
│   ├── styles/
│   │   └── globals.css         # CSS Variables and Tailwind base styles
│   ├── i18n.ts                 # next-intl configuration
│   ├── middleware.ts           # Locale routing & negotiation middleware
│   └── navigation.ts           # Localized routing wrappers (Link, useRouter, usePathname)
├── .env.example                # Sanitized environment template for deployment
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and npm scripts
├── tailwind.config.ts          # Tailwind theme and plugin configuration
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or higher recommended; v20+ supported)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aishwaryakm900-gif/RetailIQ.git
   cd RetailIQ
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the provided `.env.example` file to create your local `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(Note: `.env.local` is automatically ignored by Git to protect your local secrets).*

4. **Verify Translations:**
   Ensure all translation keys are synchronized across English, Hindi, and Kannada:
   ```bash
   npm run i18n:check
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

6. **Open in Browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server on `http://localhost:3000` |
| `npm run build` | Builds the production-ready bundle |
| `npm run start` | Runs the production server after building |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |
| `npm run i18n:check` | Validates translation key parity across `en.json`, `hi.json`, and `kn.json` |

---

## 🗺️ Roadmap & Modules

- [x] **Core Landing Page**: Value proposition, feature highlights, and interactive persona showcase.
- [x] **Authentication Shell**: Demo credentials for Shop Owner, Customer, and Admin personas.
- [x] **Multilingual Experience**: English, Kannada, and Hindi language selector.
- [x] **Shopkeeper Dashboard**: Store health score, sales overview, and expiry alert summaries.
- [ ] **Inventory Management (`/inventory`)**: Stock level tracking, barcode input, and natural language batch intake.
- [ ] **Expiry Risk Analysis (`/expiry`)**: Predicted waste calculations in rupees and batch lifecycle timelines.
- [ ] **Demand Forecasting (`/forecast`)**: Predictive weekly demand graphs and recommended reorder quantities.
- [ ] **Smart Discounts (`/discounts`)**: Dynamic price reduction engine with strict purchase price floor safeguards.
- [ ] **Stock Rescue Marketplace (`/rescue`)**: Hyperlocal consumer deal discovery and pickup reservation.
- [ ] **Store Assistant**: Natural-language conversational AI assistant for querying sales and stock.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/aishwaryakm900-gif/RetailIQ/issues).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

