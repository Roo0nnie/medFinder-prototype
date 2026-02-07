# Product Finder (MedFinder)

A role-based web-based **Centralized Medical Product Finder** (medicine & medical supplies) built with Next.js, React, and Tailwind. **No login required** to search products, view availability, or find pharmacies—these features are fully guest-accessible. Aligned with the Sorsogon State University study document. Uses client-side full-text search to simulate PostgreSQL FTS. **Frontend prototype only**—all data is static and in-memory.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind v4 |
| Styling | Tailwind only—no separate CSS files |
| Full-Text Search | minisearch |
| Auth | React Context + localStorage |
| Language | TypeScript |

---

## Commands

```bash
# Install dependencies
pnpm install

# Run development server (http://localhost:3000)
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run lint
pnpm run lint
```

---

## Static Login Credentials

Use these credentials to log in for dashboard access (prototype only):

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@productfinder.com | Admin@123 |
| Owner | owner@pharmacy.com | Owner@123 |
| Staff | staff@pharmacy.com | Staff@123 |

**No login for product finder.** Anyone can search products, view availability, and find pharmacies at `/`, `/pharmacies`, and `/contact` without signing in. Only Admin, Owner, and Staff need to log in for dashboard access. Only pharmacy owners can register at `/register`.

---

## Routes

**Guest routes** (no login required): `/`, `/pharmacies`, `/contact`, `/login`, `/register`. Anyone can use the product finder without signing in. **Protected routes** (`/admin`, `/owner`, `/staff`, `/profile`) require login.

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Guest | Product finder—search, sort, filter, location |
| `/pharmacies` | Guest | Pharmacy locations by city/municipality |
| `/contact` | Guest | Contact & Feedback |
| `/login` | Public | Login page |
| `/register` | Public | Pharmacy owner registration only |
| `/admin` | Admin | Admin dashboard |
| `/admin/owners` | Admin | CRUD owners |
| `/admin/analytics` | Admin | Product analytics |
| `/admin/stores` | Admin | Stores registry (add, edit, delete pharmacies) |
| `/admin/products` | Admin | System-wide product catalog |
| `/admin/activity` | Admin | Activity/audit log |
| `/owner` | Owner | Owner dashboard |
| `/owner/products` | Owner | CRUD products, set prices |
| `/owner/staff` | Owner | CRUD staff |
| `/owner/inventory` | Owner | Inventory overview |
| `/owner/reports` | Owner | Sales report |
| `/owner/settings` | Owner | Store settings (add pharmacies) |
| `/staff` | Staff | Staff dashboard |
| `/staff/inventory` | Staff | Manage stock, restock |
| `/staff/restock` | Staff | Need-to-buy list |
| `/profile` | Admin, Owner, Staff | Profile & password (requires login) |

---

## Folder Structure

```
app/
├── (auth)/                    # Login, register
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── layout.tsx
├── (dashboard)/               # Protected dashboards
│   ├── admin/                 # Admin pages
│   ├── owner/                 # Owner pages
│   ├── staff/                 # Staff pages
│   ├── profile/               # Profile (Admin, Owner, Staff only)
│   └── layout.tsx
├── (customer)/                # Guest product finder (no login required)
│   ├── page.tsx               # Find Products
│   ├── pharmacies/page.tsx
│   ├── contact/page.tsx
│   └── layout.tsx             # Header + GuestTabs + main
├── layout.tsx
└── globals.css

components/
├── ui/                        # Button, Input, Card, Badge, Table
├── layout/                    # Sidebar, Header, GuestTabs, Breadcrumbs
├── auth/                      # LoginForm, RegisterForm
├── products/                  # ProductCard, ProductSearch, SortControls, ProductFormModal, QuantityEditModal
├── stores/                    # StoreFormModal
├── dashboard/                 # StatsCard
├── feedback/                  # Toast
└── users/                     # UserFormModal, DeleteConfirmDialog

assets/
├── theme/                     # colors.ts — Tailwind palette (muted, near-white)
└── images/                    # logo, products, icons

lib/
├── data/                      # users, products, stores (10 locations), sales, activity
├── search/                    # fullTextSearch.ts (minisearch)
├── auth/                      # authUtils.ts
├── constants/                 # credentials.ts
└── types/                     # index.ts

context/
├── AuthContext.tsx
├── UsersContext.tsx
├── ProductsContext.tsx
├── StoresContext.tsx          # Stores CRUD (pharmacy locations)
├── ToastContext.tsx
├── SearchHistoryContext.tsx   # User search history (localStorage)
└── ActivityContext.tsx

hooks/
├── useAuth.ts
└── useProductSearch.ts        # FTS + sort + filters

middleware.ts                  # Route protection by role
```

---

## Role-Based Features

| Feature | Admin | Owner | Staff | Guest |
|---------|-------|-------|-------|-------|
| Login required | Yes | Yes | Yes | **No** |
| Register | No | Yes | No | No |
| Profile & password | Yes | Yes | Yes | N/A |
| CRUD Owners | Yes | No | No | No |
| CRUD Staff | No | Yes | No | No |
| CRUD Products | View | Full | Qty only | No |
| Analytics | Yes | No | No | No |
| Stores CRUD | Yes | Add only | No | No |
| Activity log | Yes | No | No | No |
| Reports | No | Yes | No | No |
| Inventory / restock | No | Overview | Full | No |
| Search (FTS) | Yes | Yes | Yes | Yes |
| Browse products | No | No | No | Yes |
| Sort & filter | No | Yes | Yes | Yes |

---

## Document Alignment

This project implements the **Centralized Medical Product Finder Using PostgreSQL** (MedFinder) described in the Sorsogon State University study. Features include:

- **Product finder is guest-only** — no login, no registration. Search products, view availability, and locate pharmacies without signing in
- Search by name, brand, category (PostgreSQL FTS simulated with minisearch)
- Real-time availability display (In stock / Low stock / Out of stock)
- **Product units and variants** — quantity shown with unit (e.g., "5 bottles left"); size dropdown for products with variants (e.g., 30ml, 15ml, 5ml)
- Location-based filtering (pharmacies by city/municipality)
- **Tabbed navigation** — Find Products, Pharmacies, Contact (quick section switching)
- **10 sample pharmacy locations** across the Philippines (Bulan, Manila, Cebu, Davao, etc.)
- **Pharmacy population** — Admin adds/edits/deletes stores; Owner adds pharmacies in Settings
- Supplier/Pharmacy dashboards (Owner, Staff) require login
- User accounts, search history (profile), feedback form
- ISO 25010–ready design for evaluation

---

## Styling

Use **Tailwind only** for styling. No separate CSS files or modules; all styles via Tailwind utility classes. `globals.css` is used only for the Tailwind import and theme variables.

**Color palette**: Muted, near-white, shade-based. Avoid bright colors. Use `zinc`, `stone`, `slate` for backgrounds and text. Accents: muted `slate-600`, `emerald-600`, `rose-600`. Palette constants live in `assets/theme/colors.ts`.

---

## Prototype Notes

- **No backend**: All data is static and stored in React context (ProductsContext, StoresContext).
- **In-memory CRUD**: Create, update, delete affect only in-memory state (resets on refresh).
- **Full-text search**: Client-side minisearch simulates PostgreSQL FTS; search is available across admin, owner, staff, and guest product views.
- **Search history**: Stored in localStorage; shown in profile for logged-in users.
- **OTP, Gmail/Facebook login**: Deferred until backend is added.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Deploy on Vercel](https://vercel.com/new)
