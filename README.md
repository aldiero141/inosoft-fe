# Inosoft FE

This project is created using Next 16 with React 19.
---

## 📋 Project Overview

Inosoft FE is a Next.js-based frontend application designed to streamline the inspection management process. It provides:

- A **list view** of all inspections with collapsible detail rows
- An **add inspection** flow with multi-step form validation (general information, order items, scope, notes)
- A **detail inspection** view for reviewing inspection records
- Dynamic **order item management** with auto-filled lot, allocation, and owner fields based on item and lot selection
- Form validation powered by Zod schemas and React Hook Form

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) |
| Server State | [TanStack Query v5](https://tanstack.com/query/latest) |
| Forms | [React Hook Form v7](https://react-hook-form.com/) + [Zod v4](https://zod.dev/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Table | [TanStack Table v8](https://tanstack.com/table/latest) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Date Utilities | [date-fns v4](https://date-fns.org/) |
| Date Picker | [React Day Picker v10](https://react-day-picker.js.org/) |

---

## ⚙️ Requirements

| Tool | Version |
|---|---|
| Node.js | `v22.22.0` |
| pnpm | `v10.22.0` |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd inosoft-fe
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example env file and fill in the required values:

```bash
cp .env.example .env
```

Open `.env` and set:

```env
NEXT_PUBLIC_API_URL=<your-backend-api-base-url>
```

### 4. Run the development server

```bash
pnpm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 5. Other scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Start the local development server |
| `pnpm run build` | Build the production bundle |
| `pnpm run start` | Start the production server |
| `pnpm run lint` | Run ESLint |

---

## 📁 File Tree Structure

```
inosoft-fe/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Dashboard route group (shared layout)
│   │   └── inspection/
│   │       ├── page.tsx          # Inspection list page
│   │       ├── add/              # Add inspection page
│   │       └── [id]/             # Inspection detail page
│   ├── api/                      # Next.js API Route Handlers (mock/proxy)
│   │   ├── inspection/
│   │   │   └── create/route.ts
│   │   └── options/
│   │       ├── items/route.ts
│   │       └── .../
│   ├── globals.css               # Global styles & Tailwind config
│   ├── layout.tsx                # Root layout (fonts, providers, toaster)
│   └── page.tsx                  # Root redirect
│
├── components/
│   ├── api/                      # TanStack Query hooks
│   │   ├── inspections/          # useInspectionByID, useCreateInspection, ...
│   │   └── options/              # useItemsOptions, useLocationOptions, ...
│   ├── inspection/
│   │   ├── add-inspection/       # Add inspection form components
│   │   │   ├── body-inspection-create/
│   │   │   │   ├── general-information/  # service-type, sow, location, ecd, etc.
│   │   │   │   ├── order-information.tsx # Dynamic order item rows
│   │   │   │   ├── footer.tsx            # Submit / draft buttons
│   │   │   │   └── note.tsx
│   │   │   └── ...
│   │   ├── detail-inspection/    # Inspection detail view components
│   │   └── list-inspection/      # Inspection table/list components
│   └── ui/                       # shadcn/ui primitives (button, input, select, ...)
│
├── lib/
│   ├── api.ts                    # Axios instance configuration
│   ├── utils.ts                  # Shared utility functions (cn, etc.)
│   ├── dummy/                    # Mock/dummy data for development
│   │   ├── responseItems.ts
│   │   └── responseInspections.ts
│   └── types/                    # Shared TypeScript interfaces
│       ├── api.ts
│       └── inspection.ts
│
├── providers/
│   ├── inspection/
│   │   ├── inspection-provider.tsx        # Table inspection data providers
│   │   └── draft-inspection-provider.tsx  # Form context + Zod schema for inspection creation
│   ├── query-provider.tsx                 # TanStack Query client provider
│   └── redux-provider.tsx                 # Redux store provider
│
├── store/
│   ├── store.ts                  # Redux store configuration
│   └── slices/                   # Redux slices
│
├── public/                       # Static assets
├── .env                          # Environment variables (not committed)
├── .env.example                  # Environment variable template
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config    (inline)   # Tailwind v4 config via CSS
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

---

## 🧩 Key Libraries

| Library | Purpose |
|---|---|
| `react-hook-form` | Performant, flexible form state management |
| `zod` | Schema-based form validation (type-safe) |
| `@hookform/resolvers` | Connects Zod schemas to React Hook Form |
| `@tanstack/react-query` | Server state, caching, and async data fetching |
| `@tanstack/react-table` | Headless table with sorting, grouping, and collapsible rows |
| `@reduxjs/toolkit` + `react-redux` | Global client-side state management |
| `react-context-api` | State management for pages |
| `axios` | HTTP client with interceptors |
| `shadcn/ui` + `radix-ui` | Accessible, unstyled UI primitives |
| `sonner` | Toast notification system |
| `lucide-react` | Icon library |
| `date-fns` | Date formatting and manipulation |
| `react-day-picker` | Calendar / date picker component |
| `tailwindcss v4` | Utility-first CSS framework |
| `next-themes` | Dark/light theme support |
| `clsx` + `tailwind-merge` | Conditional class name utilities |
