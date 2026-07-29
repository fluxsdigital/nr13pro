# NR-13 Pro — Agent Guide

## Stack & Commands
- **Stack**: Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui (base-nova), lucide-react, recharts, sonner, @base-ui/react
- **Build**: `npm run build` (no `typecheck` script — TS check is part of build)
- **Dev**: `npm run dev` → `localhost:3000`
- **Lint**: `npm run lint`
- **Deploy**: Vercel auto-deploys from `fluxsdigital/nr13pro` main branch

## Architecture

```
src/lib/store.ts        ← mutable arrays as single source of truth
src/lib/seed-data.ts    ← seed data (6 clients, 20 equip, 13 insp, 8 laudos)
src/lib/types.ts        ← all TS interfaces (Cliente, Equipamento, Inspecao, Laudo, etc.)
src/lib/services/       ← CRUD layer, imports from store, interfaces for future API swap
src/lib/nr13.ts         ← NR-13 classification logic (PV, categoria, periodicidade)
src/lib/utils.ts        ← cn() helper (clsx + tailwind-merge)
src/app/layout.tsx      ← root layout: Sidebar + main + Toaster
src/components/layout/sidebar.tsx  ← responsive: fixed desktop, Sheet drawer mobile
```

- `"use client"` on all pages; data loaded via `useEffect` → services, filtering via `useMemo`
- Every `useEffect` async chain **must** have `.catch()` so `setLoading(false)` always runs
- Services mutate the shared arrays directly (mock layer — swap for real API later)

## Sidebar
- File: `src/components/layout/sidebar.tsx`, context: `src/lib/sidebar-context.tsx`, main wrapper: `src/components/layout/main-content.tsx`
- **Desktop**: collapsible via chevron button — expands to `w-64` or collapses to `w-16` (icons only). State persisted in `localStorage("sidebar-expanded")`.
- **Mobile**: Sheet drawer triggered by hamburger button (`fixed top-3 left-3 z-50`, hidden on `md:`).
- Main content margin adjusts automatically via `md:ml-64` / `md:ml-16` using `useSidebar()` context.

## UI Conventions
- `max-w-5xl mx-auto` on all page containers, padding: `p-4 sm:p-6` (list pages) or `p-4 sm:p-8` (detail/form pages)
- Loading/empty states: `<div className="p-4 sm:p-8 text-slate-500">...</div>`
- Select triggers: `w-full` (overrides shadcn's `w-fit`), wrapper `min-w-[280px]` in `flex items-center gap-3 flex-wrap`
- Filter values: `""` means "all" (not `"todas"`)
- Card spacing: `mb-6 last:mb-0`
- KPI counter grids: `grid-cols-1 sm:grid-cols-3` or `grid-cols-2 sm:grid-cols-4`
- **Design System**: see `design-system.md` for full palette, typography, spacing, shadows
- Light theme (default): cool steel-grey bg (`#F6F8FA`), dark sidebar (`#0E162B`), blue-700 primary
- Dark theme available via `<html data-theme="dark">` — deep navy bg (`#0B1120`), lighter primary (`#4880FF`)
- `.no-print` for PDF-hideable elements
- Laudo PDF export via `window.print()`

## NR-13 Domain (implemented in `src/lib/nr13.ts`)
Key rules if you need to add/modify classification:
- Vaso categoria = f(classe fluido, grupo PV) per NR-13 matrix table
- Caldeira categoria: A ≥ 1960 kPa, B otherwise
- Periodicidade vaso = f(categoria, temSPIE)
- Fluido classes A/B/C/D with escalation rules
- See the matrix constants and function signatures in `nr13.ts` — the code is the source of truth
