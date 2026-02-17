# 🌿 Matté: Matcha & Coffee, for your day

**Matté** is a high-performance, real-time e-commerce platform engineered for the modern web. Built with a focus on speed, scalability, and seamless user experience, it handles the complexities of inventory synchronization and transaction management in a reactive environment.

---

## 🚀 The Tech Stack

- **Framework:** [Next.js 15 (App Router)]()
- **Database & Auth:** [Supabase]() (PostgreSQL)
- **Styling:** [Tailwind CSS]() + [Shadcn/UI]()
- **State Management:** [Zustand]()
- **Realtime:** PostgreSQL Change Data Capture (CDC) via Supabase Realtime
- **Email:** [Resend]()
- **Payments:** [Midtrans]() (Integrated via Webhooks)

---

## ✨ Key Features & Technical Highlights

### 🏎️ Real-time Engine

Unlike traditional e-commerce sites, Matté utilizes **PostgreSQL CDC**. When an order is placed or a payment is confirmed via webhook, the inventory and order status update across all connected clients instantly without a page refresh.

### 🛡️ Secure Transactions & Inventory

- **Atomic Stock Updates:** Prevents overselling by using database-level increments/decrements.
- **Webhook Security:** Midtrans payment verification using HMAC SHA512 signature validation.
- **Role-Based Access Control (RBAC):** Strict Row Level Security (RLS) policies ensuring customers only see their data while admins have a high-level overview.

### 📊 Admin Intelligence (Bento UI)

A clean, "Bento-box" inspired dashboard providing at-a-glance metrics:

- Real-time Revenue tracking.
- Top-selling product analytics.
- Instant order fulfillment workflow.

---

## 📸 Visuals

### User Experience

> [INSERT_SCREENSHOT: Homepage and Product Grid]
> _A clean, minimalist UI focused on the product-first experience._

### Admin Dashboard

> [INSERT_SCREENSHOT: Admin Dashboard Bento Layout]
> _Real-time metrics and order management interface._

### Inventory Management

> [INSERT_SCREENSHOT: Inventory Table with Stock Alerts]
> _Granular control over products and real-time stock status._

---

## 🛠️ Architecture Overview

Matté follows a server-first architecture using Next.js Server Components to minimize client-side JavaScript bundle sizes while leveraging the Supabase SSR package for secure session handling.

---

## 🏗️ Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/matte-ecommerce.git

```

2. **Install dependencies:**

```bash
npm install

```

3. **Environment Variables:**
   Create a `.env.local` file and add your Supabase, Midtrans, and Resend credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_secret
MIDTRANS_SERVER_KEY=your_key
RESEND_API_KEY=your_key

```

4. **Run the development server:**

```bash
npm run dev

```

---

## 👨‍💻 Engineering Challenges Overcome

- **The Redirect Loop:** Implemented a robust Next.js Middleware to handle edge cases between `getClaims()` and server-side cookie synchronization.
- **Real-time Enrichment:** Solved the "Guest User" race condition by implementing a reactive enrichment fetch when new orders appear via Supabase channels.
- **Responsive Layouts:** Engineered a strict Bento-grid system that handles text truncation and icon alignment gracefully across all breakpoints.

---
