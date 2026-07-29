# NR-13 Pro — Agent Guide

## Stack & Commands
- **Stack**: Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui (base-nova), lucide-react, recharts, sonner, @base-ui/react
- **Animation**: Framer Motion, Embla Carousel, Lenis (smooth scroll)
- **Build**: `npm run build` (no `typecheck` script — TS check is part of build)
- **Dev**: `npm run dev` → `localhost:3000`
- **Lint**: `npm run lint`
- **Deploy**: Vercel auto-deploys from `fluxsdigital/nr13pro` main branch

## Architecture

```
src/lib/store.ts        ← mutable arrays as single source of truth
src/lib/seed-data.ts    ← seed data (6 clients, 20 equip, 13 insp, 8 laudos)
src/lib/types.ts        ← all TS interfaces
src/lib/services/       ← CRUD layer, imports from store
src/lib/utils.ts        ← cn() helper (clsx + tailwind-merge)
src/lib/nr13.ts         ← NR-13 classification logic
src/app/layout.tsx      ← root layout: Sidebar via AppShell + Toaster
src/app/vendas/         ← landing page (separate layout, no sidebar)
src/app/checkout/       ← subscription checkout (mock payment)
src/components/sections/  ← 12 landing sections + SafariMockup + carousel + motion-provider
src/components/ui/      ← primitives: Button/Container/Section/FadeIn/Floating/...
```

- App pages: `"use client"`, data via `useEffect` → services, filtering via `useMemo`
- Every `useEffect` async chain **must** have `.catch()` so `setLoading(false)` always runs
- Services mutate shared arrays directly (mock layer)

## Landing Page (`/vendas`)
- **Separate layout** at `vendas/layout.tsx` (server component) with SEO metadata + JSON‑LD. Root layout conditionally renders sidebar via `AppShell` — no sidebar on `/vendas`.
- **12 sections**: navbar, hero, logos, benefits, problem, timeline, dashboard, features, testimonials, faq, cta, footer — all in `src/components/sections/`.
- **Composition**: `vendas/page.tsx` imports all sections, initializes Lenis, wraps in `MotionProvider` + `ScrollProgress` + `GlowBackground`.
- **Conversion flow**: Hero → "Assinar agora — R$197/mês" → `/checkout` (name/email/password) → mock payment → localStorage persist → platform link. No free trial, no demo request.

### Hero (current design)
- Two-column grid (text left, mockup right)
- **Left**: pill badge, headline ("Gerencie inspeções de válvulas com a velocidade de um software moderno"), subtitle, CTA pair (primary + secondary ghost), inline stats (350+/12000+/98%), 6 feature badges
- **Right**: SafariMockup component + 6 floating glass cards (`backdrop-blur-xl bg-white/80`) positioned absolutely around it + SVG connection lines
- **Mouse parallax**: `onMouseMove` on section drives `MotionValue → spring → useTransform` for cards drift, background blobs, and background grid
- **Background**: repeating grid lines (60px, 3% opacity), 2 radial orange glow blobs, gradient `#F7F5F2 → white`
- **SafariMockup**: 3D tilt on mouse, scroll parallax (`y: [20, -20]`), infinite float via `Floating` component
- **Carousel inside Safari**: Embla with 14 real-system-matching slides, autoplay 5s, pause on hover, scale/opacity transitions

### Timeline ("Como funciona")
- **Scroll-driven line**: vertical line (left side) fills with gradient (`#C56A2D → #2E7D32 → #C56A2D`) via `useScroll` + `useTransform` mapping `scrollYProgress → scaleY`
- **Each step** is a `StepItem` component using `useInView({ once: false })` — badge scales up + glows, content fades/slides in, label color changes to step color when visible

## Palette (Landing Page — Anthropic-inspired, zero blue)
- Background: `#F7F5F2`, Surface: `#FFFFFF`
- Primary: `#C56A2D` (burnt orange), hover: `#B35C24`, accent: `#E8A96B`
- Text primary: `#171717`, secondary: `#676767`
- Borders: `#EDE9E3`, `#E7E2DB`, hover: `#F1ECE6`
- Success green: `#2E7D32`
- Defined in `globals.css` CSS custom properties

## Animation Primitives (`src/components/ui/`)
- **FadeIn**: opacity + y + blur on viewport enter
- **Reveal**: scale + opacity reveal
- **Floating**: infinite y + rotate float cycle
- **HoverCard**: 3D tilt per card on mouse
- **GlowBackground**: 3 animated blobs (<4% opacity, 35–45s drift)
- **ScrollProgress**: 2px fixed bar at top, `#C56A2D`
- **MotionProvider**: reads `prefers-reduced-motion` media query, provides context
- **AnimatedCounter**: IntersectionObserver + rAF with cubic ease-out

## Motion Design (Landing)
- All animations respect `prefers-reduced-motion` via `MotionProvider`
- Hero entrance chain (with blur): pill → title → subtitle → CTAs (scale .96→1) → badges stagger → Safari (y60+rotateX4+scale.96)
- Section entrances: title (fade + y24 + blur8) + content (fade + y30 + scale.98 + blur6) via viewport once
- Hero Safari: infinite float y(0→-4→0) + rotateZ(0→0.2°→0) 8s cycle + 3D tilt + scroll parallax
- Carousel: active slide scale1/opacity1, lateral slides scale0.96/opacity0.35
- CTA: pulsing glow radial gradient (4s cycle), button hover scale 1.02 / active 0.98
- Features: stagger 0.04s, 3D tilt per card, hover -4px lift + icon bounce + color transitions

## UI Conventions
- Full-width pages (no max-width constraint), padding `p-4 sm:p-6` (list) or `p-4 sm:p-8` (detail/form)
- Landing: `Container` wrapper with `max-w-6xl`
- Loading/empty states: `<div className="p-4 sm:p-8 text-text-secondary">...</div>`
- Select triggers: `w-full` (override), wrapper `min-w-[280px]`
- Filter values: `""` means "all"
- Card spacing: `mb-6 last:mb-0`
- `.no-print` for PDF-hideable elements
- Laudo PDF export via `window.print()`

## NR-13 Domain (src/lib/nr13.ts)
- Vaso categoria = f(classe fluido, grupo PV) per NR-13 matrix table
- Caldeira categoria: A ≥ 1960 kPa, B otherwise
- Periodicidade vaso = f(categoria, temSPIE)
- Fluido classes A/B/C/D with escalation rules

## Button (src/components/ui/button.tsx)
- CVA-based with variants: primary/secondary/ghost/outline/default/destructive
- Sizes: sm/md/lg/default/icon/icon-sm

## NR-13 Domain Knowledge (from real PDFs in `/pdf/`)

### Inspeção de Vaso de Pressão — Estrutura do Relatório
- **Dados Iniciais**: razão social, endereço, CNPJ, CREA do PLH, ART vinculada
- **Características do Vaso**: diâmetro, altura/comprimento, material de construção, pintura
- **Dados Operacionais**: fluido de trabalho, volume, pressão de projeto, PMTA, pressão de operação, pressão de teste hidrostático, temperatura de projeto/operação
- **Categorização NR-13**: P.V (MPa.m³), classe de fluido (A/B/C/D), grupo de risco (1-5), categoria (I-V)
  - Produto P.V > 8 → aplica-se NR-13
  - Exemplo real: P.V = 5,95 MPa.m³, Classe C, Grupo 3, Categoria III (VITAMEDIC)
  - Exemplo real: P.V = 0,64 MPa.m³ → 639,30 > 8, Classe B, Grupo 2, Categoria IV (João Ricioli)
- **Documentação**: prontuário (original ou reconstituído), relatório de inspeção, livro de registro de segurança, certificados de calibração, PAR (Projeto de Alteração ou Reparo)
- **Identificação**: placa de identificação indelével (fabricante, nº identificação, ano fabricação, PMTA, código de projeto), adesivo auxiliar com categoria
- **Exames**: Exame Externo (3 anos), Exame Interno (6 anos), Medição de espessura por ultrassom
  - Quando não há acesso visual, exame interno pode ser substituído por ultrassom (item 13.5.4.6)
- **Teste Hidrostático**: obrigatório para vasos fabricados a partir de 02/05/2014; anteriores a critério do PLH
- **Dispositivos de Segurança**: válvula de segurança deve ser desmontada, inspecionada e calibrada com prazo ≤ inspeção periódica interna (13.5.4.9)

### Documentos Gerados pelo Sistema
1. **Relatório Técnico de Inspeção** — documento principal com todas as seções acima
2. **Certificado de Inspeção e Teste de Válvula de Segurança** — dados da válvula (tag, fabricante, pressão abertura/vedação, altura do regulador), resultados em 3 ciclos, condições ambientais, padrões utilizados
3. **Certificado de Calibração** — para manômetros e outros instrumentos: dados do instrumento, padrões utilizados, resultados com erro de indicação, histerese, repetitividade, incerteza expandida (k=2, 95% confiança), curva de erro, próxima calibração
4. **Laudo/Termo de Inspeção** — conclusão final liberando ou não o equipamento

### Medição de Espessura por Ultrassom
- Aparelho: GE KRAUTKRAMER DMS2, transdutor TC560 / 5 MHz
- Velocidade sônica: 5920 m/s (aço carbono)
- Técnica: pontual A-SCAN
- Bloco de calibração: 5,00 / 25,00 mm
- Pontos medidos: tampo superior (3+ pontos), costado (6+ pontos), tampo inferior (3+ pontos)
- Dados registrados: espessura mensurada, espessura de construção, tempo de operação, perda total, taxa de corrosão, menor espessura para PMTA

### Cálculo de PMTA (casco cilíndrico)
```
PMTA = (S * E * e) / (R + 0.6 * e)
Onde:
  S = Tensão Admissível Básica do Material (kgf/cm²)
  E = Coeficiente de eficiência de solda
  e = espessura medida (menor ponto)
  R = Raio interno do cilindro (cm)
```
- Exemplo real: S=1203.3, E=0.65, e=4.5mm, R=25.9cm → PMTA = 13.43 kgf/cm²
- PMTA calculada deve ser ≥ PMTA atual do vaso

### Cálculo de PMTA (tampo elíptico)
```
PMTA = (S * E * e) / (R * K + 0.1 * e)
Onde:
  K = Fator de relação de semi eixos (tipicamente 1.00)
```
- Exemplo real: S=1203.3, E=0.7, e=4.7mm, R=25.9cm, K=1.00 → PMTA = 15.29 kgf/cm²

### Prazos de Inspeção (NR-13)
- **Exame Externo**: até 3 anos (categoria mais baixa) ou 1 ano (categorias mais altas)
- **Exame Interno**: até 6 anos (categoria mais baixa) ou 2 anos (categorias mais altas)
- **Válvula de Segurança**: calibração ≤ prazo da inspeção interna
- **Manômetros**: calibração anual (típico)

### Fluxo de Inspeção (real)
1. Dados do equipamento e cliente
2. Tipo de inspeção (inicial/periódica/extraordinária)
3. Exames (externo, interno, ultrassom, hidrostático)
4. Medições de espessura
5. Anomalias encontradas (com gravidade: baixa/média/alta/crítica)
6. Dispositivos de segurança (válvulas, manômetros)
7. Parecer técnico conclusivo
8. Recomendações e não conformidades
9. Próximas inspeções (datas)

### Campos Comuns em Relatórios Reais
- Número do relatório + ART (Anotação de Responsabilidade Técnica)
- PLH (Profissional Legalmente Habilitado) com CREA
- Data início / data término
- Condições ambientais (temperatura, umidade)
- Padrões utilizados na calibração com nº certificado e validade
- Incerteza expandida (k=2, 95%)
- Observações e notas técnicas
