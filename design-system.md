# NR-13 Pro — Design System

> **Filosofia**: Um sistema de inspeção industrial que parece ter sido construído por uma empresa de tecnologia de alto nível. Nada de ERP antigo. Nada de excessos. Precisão cirúrgica em cada pixel.

---

## 1. Identidade & Posicionamento

### Conceito
NR-13 Pro não é um "sistema de inspeção". É uma **plataforma de engenharia de precisão**. Cada elemento visual comunica confiabilidade, clareza e sofisticação técnica — como o painel de controle de uma planta industrial moderna, projetado por uma empresa de tecnologia.

### Inspiração Filosófica
- **Anthropic/Claude**: Clareza cristalina, hierarquia visual impecável, confiança transmitida por simplicidade
- **Linear**: UI cirúrgica, espaçamento generoso, ausência total de ruído visual
- **Stripe Dashboard**: Dados financeiros com elegância, tipografia como elemento central
- **Raycast**: Velocidade e precisão, densidade de informação sem poluição
- **Notion**: Flexibilidade com consistência, blocos visuais claros

### O que NÃO somos
- ❌ ERP antigo com tabelas cinzentas e botões genéricos
- ❌ Dashboard genérico com gráficos chamativos
- ❌ Sistema corporativo "seguro" que parece ter sido feito em 2010
- ❌ Produto com excesso de cores, bordas, sombras e gradientes

---

## 2. Paleta de Cores

### Filosofia
Cores frias, contidas, elegantes. O azul petróleo remete à indústria sem ser óbvio. O fundo aquecido (#FAFAF8) reduz fadiga visual em longas jornadas. Status colors são suaves — nada de vermelhos berrantes ou verdes fluorescentes.

### Light Theme

#### Primary — Azul Petróleo
| Token | Hex | Uso |
|-------|-----|-----|
| 50 | #F0F6F8 | Fundo sutil |
| 100 | #DCEAEF | Badges sutis |
| 200 | #B9D5DE | Bordas leves |
| 300 | #8CBDCC | |
| 400 | #5A9CB3 | |
| **500** | **#1A4D5C** | **Primary — botões, links, elementos focais** |
| 600 | #15424F | Hover primary |
| 700 | #0F3641 | Active primary |
| 800 | #0A2A33 | |
| 900 | #061D24 | |

#### Neutral — Slate
| Token | Hex | Uso |
|-------|-----|-----|
| 50 | #F8F9FA | Fundo de tabela |
| 100 | #F1F3F5 | Hover de linha |
| 200 | #E2E5EA | Borders |
| 300 | #CBD0D8 | Divider |
| 400 | #9CA3AF | Placeholder |
| **500** | **#6B7280** | **Texto secundário** |
| 600 | #4B5563 | |
| **700** | **#374151** | **Texto body** |
| 800 | #1F2937 | |
| **900** | **#111827** | **Texto primary (quase preto)** |

#### Accent — Azul Claro
| Token | Hex |
|-------|-----|
| 500 | #3B82F6 |

Usado apenas em elementos de destaque muito específicos (links em contextos informativos).

#### Semantic Colors
| Token | Hex | Uso |
|-------|-----|-----|
| **Success** | #0D9488 | Concluído, aprovado, apto |
| Success Subtle | #F0FDFA | Fundo de badge success |
| **Warning** | #B45309 | Por vencer, atenção |
| Warning Subtle | #FFFBEB | Fundo de badge warning |
| **Danger** | #BE123C | Vencido, crítico, não conforme |
| Danger Subtle | #FFF1F2 | Fundo de badge danger |
| **Info** | #0369A1 | Informativo |
| Info Subtle | #F0F9FF | Fundo de badge info |

> Nota: Success é um verde-teal (não verde grama). Danger é um vermelho cereja escuro (não vermelho sangue). Ambos são mais sofisticados e menos agressivos visualmente.

#### Background & Surface
| Token | Hex | Uso |
|-------|-----|-----|
| **Page Background** | #FAFAF8 | Fundo da página — warm white, reduz fadiga |
| **Surface** | #FFFFFF | Cards, modais, sidebars |
| **Card** | #FFFFFF | Background de card |
| **Card Hover** | #F8F9FA | Hover sutil |
| **Border** | #E2E5EA | Bordas padrão |
| **Divider** | #EFF1F3 | Separadores |

#### Sidebar (Light)
| Token | Hex |
|-------|-----|
| Sidebar BG | #0F172A |
| Sidebar Hover | #1E293B |
| Sidebar Text | #F1F5F9 |
| Sidebar Text Muted | #64748B |
| Sidebar Border | #1E293B |

---

### Dark Theme

Inspirado no tema escuro da Anthropic. Fundo não é preto puro — é um carvão quente (#171717). Cards levemente mais claros (#1F1F1F). Texto nunca é branco puro.

| Token | Hex | Nota |
|-------|-----|------|
| **Page Background** | #171717 | Carvão quente, não preto — reduz cansaço |
| **Surface** | #1F1F1F | Cards e modais |
| **Card** | #1F1F1F | |
| **Card Hover** | #272727 | |
| **Border** | #2E2E2E | |
| **Divider** | #2A2A2A | |
| **Text Primary** | #EDEDED | Off-white |
| **Text Secondary** | #A3A3A3 | |
| **Text Muted** | #737373 | |
| **Primary 500** | #58A6C4 | Azul mais claro para contraste em fundo escuro |
| **Primary Hover** | #6FBAD8 | |
| **Sidebar BG** | #111111 | Ligeiramente mais escuro que o fundo |
| **Sidebar Hover** | #1F1F1F | |
| **Sidebar Text** | #EDEDED | |
| **Sidebar Border** | #2E2E2E | |
| **Success** | #2DD4BF | |
| **Warning** | #F59E0B | |
| **Danger** | #FB7185 | |
| **Info** | #38BDF8 | |

---

## 3. Tipografia

### Escolha da Fonte

**Primary: Inter** (Google Fonts)

**Razão da escolha:**
Inter foi projetada especificamente para interfaces de tela por Rasmus Andersson (ex-Designer do Facebook/Instagram). É a escolha correta para este produto por 5 razões:

1. **Legibilidade extrema em tamanhos pequenos** — essencial para um sistema usado 8h+ por dia por inspetores e engenheiros
2. **Eixo "industrial/preciso"** — o design da Inter tem influência de tipografia de sinalização e displays técnicos, combinando perfeitamente com o tema de engenharia
3. **Vasta gama de pesos (100-900)** — permite hierarquia tipográfica rica sem usar múltiplas fontes
4. **Abertura generosa (x-height alta)** — reduz fadiga visual em leitura prolongada
5. **Adotada por empresas de tecnologia de alto nível** — Figma, GitHub, Mozilla, Linear, Notion, Raycast

**Monospace**: JetBrains Mono (para tags, medições, dados técnicos)

### Escala Tipográfica

| Style | Size | Weight | Line Height | Letter Spacing | Uso |
|-------|------|--------|-------------|----------------|-----|
| **Display** | 30px / 1.875rem | 600 | 1.2 | -0.03em | Título de página |
| **H1** | 22px / 1.375rem | 600 | 1.3 | -0.02em | Título de seção |
| **H2** | 18px / 1.125rem | 600 | 1.35 | -0.015em | Subtítulo |
| **H3** | 15px / 0.9375rem | 600 | 1.4 | -0.01em | Título de card |
| **Body** | 14px / 0.875rem | 400 | 1.6 | 0 | Texto padrão |
| **Small** | 13px / 0.8125rem | 400 | 1.5 | 0 | Texto auxiliar |
| **Caption** | 12px / 0.75rem | 400 | 1.4 | 0 | Metadados |
| **Overline** | 11px / 0.6875rem | 500 | 1.2 | +0.06em | Rótulos (uppercase) |
| **Button** | 14px / 0.875rem | 500 | 1 | 0 | Botões |
| **Table Head** | 11px / 0.6875rem | 600 | 1 | +0.05em | Header de tabela (uppercase) |
| **Code** | 13px / 0.8125rem | 400 | 1.5 | 0 | Tags, medições (JetBrains Mono) |

> Escala mais enxuta que o design system anterior. Removemos H4 e reduzimos tamanhos de display/h1/h2 para maior refinamento. Texto 14px no body (não 16px) porque Inter tem x-height alta e 14px é mais eficiente para telas densas de informação.

---

## 4. Grid & Espaçamento

Sistema baseado em 8px.

| Token | px | rem | Uso |
|-------|----|-----|-----|
| space-0.5 | 4 | 0.25 | Micro-ajustes |
| **space-1** | **8** | 0.5 | Gap entre elementos próximos |
| space-1.5 | 12 | 0.75 | Gap entre label e input |
| **space-2** | **16** | 1 | Padding dentro de cards |
| space-2.5 | 20 | 1.25 | |
| **space-3** | **24** | 1.5 | Padding de página, entre seções |
| space-4 | 32 | 2 | Entre seções grandes |
| space-5 | 40 | 2.5 | |
| space-6 | 48 | 3 | |
| space-8 | 64 | 4 | |
| space-10 | 80 | 5 | |
| space-12 | 96 | 6 | |

---

## 5. Border Radius

| Token | px | Uso |
|-------|----|-----|
| **sm** | 4 | Badges, avatares |
| **md** | 6 | Inputs, selects, tooltips |
| **lg** | 8 | Cards, botões, modais, dropdowns |
| **xl** | 12 | Dialogs grandes, sheets |
| **full** | 9999 | Avatares, pills |

> Cards com 8px — suficiente para parecer moderno sem ser "infantil" (arredondamentos muito grandes tiram a seriedade). Inputs com 6px — mais precisos.

---

## 6. Sombras

Mínimas. Inspiradas na Anthropic — quase imperceptíveis, apenas para sugerir elevação.

| Token | Valor |
|-------|-------|
| **shadow-xs** | `0 1px 2px rgba(0,0,0,0.03)` |
| **shadow-sm** | `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` |
| **shadow-md** | `0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)` |
| **shadow-lg** | `0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.02)` |
| **shadow-xl** | `0 20px 25px rgba(0,0,0,0.06), 0 8px 10px rgba(0,0,0,0.02)` |

> Opacidades muito baixas. A sombra não deve ser notada conscientemente — apenas criar uma sensação sutil de camadas.

Para dark theme: mesma lógica, opacidade ligeiramente maior.

---

## 7. Componentes

### Button

| Propriedade | Primary | Secondary | Outline | Ghost | Danger |
|-------------|---------|-----------|---------|-------|--------|
| **BG** | Primary 500 | Slate 100 | transparent | transparent | Danger |
| **Text** | white | Slate 700 | Slate 700 | Slate 500 | white |
| **Border** | none | none | Slate 200 | none | none |
| **Hover BG** | Primary 600 | Slate 200 | Slate 50 | Slate 100 | Danger darker |
| **Padding** | 10px 18px | 10px 18px | 10px 18px | 8px 14px | 10px 18px |
| **Radius** | 8px | 8px | 8px | 6px | 8px |
| **Font** | 14px/500 | 14px/500 | 14px/500 | 14px/500 | 14px/500 |
| **Shadow** | none | none | none | none | none |

- Sm: 8px padding Y, 13px font
- Icon button: 32x32, ghost, 16px icon
- Transição: 150ms ease

### Input

- **BG**: white
- **Border**: Slate 200, 1px solid
- **Radius**: 6px
- **Padding**: 10px 12px
- **Font**: 14px/400
- **Placeholder**: Slate 400
- **Focus**: Ring azul petróleo (2px, 25% opacity) + border transparent
- **Disabled**: Slate 50 bg + Slate 300 text, cursor-not-allowed

### Select

- Mesmo estilo do input
- Dropdown: shadow-md, radius 8px, padding 4px
- Option hover: Slate 100 bg
- Selected: Primary 50 bg + Primary 600 text

### Card

- **BG**: Surface (white)
- **Border**: 1px solid Border
- **Radius**: 8px
- **Padding**: 16px (space-2)
- **Shadow**: shadow-xs (quase imperceptível)
- **Hover**: shadow-sm + border subtle change (200ms ease)

### Stats Card (KPI)

- Mesmo estilo do card
- Ícone minimalista de 20px
- Valor: 24px/600
- Label: 12px/400/Slate 500
- Padding: 16px (ícone incluso)
- Sem bordas internas — tudo com espaçamento

### Table

- **Header**: Slate 50 bg, 11px/600 uppercase, 0.05em tracking, Slate 500
- **Rows**: border-bottom Slate 100
- **Cells**: padding 10px 16px, 14px/400
- **Hover**: Slate 50 bg (200ms)
- **Stripes**: Slate 50/50 em even (opcional, apenas em tabelas densas)
- **Font**: Inter body

### Badge

- **Padding**: 2px 8px
- **Radius**: 4px
- **Font**: 12px/500
- Cores conforme semantic colors (subtle bg + dark text)
- Sem borda (apenas bg + texto)

### Modal/Dialog

- **Overlay**: rgba(0,0,0,0.25)
- **Content**: Surface, radius 12px, shadow-xl
- **Padding**: 24px
- **Width**: 480px (default)
- **Animation**: scale 0.97→1 + fade, 200ms ease-out

### Sidebar

- **BG**: #0F172A (light) / #111111 (dark)
- **Width**: 240px expanded, 60px collapsed
- **Item height**: 36px
- **Item active**: Primary 500 text + left bar 2px
- **Item hover**: Sidebar hover bg
- **Font**: 14px/500
- **Ícones**: 16px

### Tabs

- **List**: border-bottom 1px Border
- **Tab**: padding 8px 14px, 13px/500
- **Active**: Primary 500 text + border-bottom 2px Primary
- **Hover**: Slate 50 bg
- Sem sombras ou bg no active — apenas texto + linha

### Toast

- Sonner com richColors
- Radius 8px
- Font 14px/400
- Shadow-md
- Icon discreto

### Alert

- **Padding**: 12px 16px
- **Radius**: 8px
- **BG**: subtle cor correspondente (sem borda esquerda grossa)
- **Icon**: 16px
- **Font**: 14px/400

### Skeleton

- **BG**: Slate 100
- **Animation**: pulse (opacity fade, 1500ms)
- **Radius**: 4px

### Empty State

- **Icon**: 48px, Slate 300
- **Title**: 16px/600 Slate 700
- **Description**: 14px/400 Slate 400
- **Action**: Button opcional

---

## 8. Dashboard Layout

```
┌────────────────────────────────────────────────────────┐
│  Dashboard                              [Filtro]        │
│  Visão geral das inspeções                              │
├────────────┬────────────┬────────────┬──────────────────┤
│            │            │            │                  │
│ 12         │ 8          │ 3          │ 1                │
│ Inspeções  │ Concluídas │ Andamento  │ Vencidas         │
│            │            │            │                  │
├────────────┴────────────┴────────────┴──────────────────┤
│                                                          │
│  ┌─────────────────────────────┐ ┌─────────────────────┐│
│  │ Próximas Inspeções          │ │ Status NR-13        ││
│  │                             │ │                     ││
│  │ V-101 — 15/06/2026   ⏰ 30d │ │ ● Categoria I   3   ││
│  │ CAL-201 — 22/08/2026  🔴 7d │ │ ● Categoria II  5  ││
│  │ V-301 — 10/09/2026   🟡 60d│ │ ● Categoria III 7  ││
│  │                             │ │                     ││
│  └─────────────────────────────┘ └─────────────────────┘│
│                                                          │
│  ┌──────────────────────────────────────────────────────┐│
│  │ Válvulas Críticas (próximas 30 dias)                ││
│  │                                                     ││
│  │ TAG      │ Equip.          │ Cliente   │ Status     ││
│  │ V-101    │ Separador       │ PetroVale │ 🔴 Vence 7d││
│  │ CAL-201  │ Caldeira        │ Aços Forte│ 🔴 Vence 7d││
│  │ V-301    │ Acumulador      │ Aços Forte│ 🟡 30 dias ││
│  └──────────────────────────────────────────────────────┘│
│                                                          │
│  ┌──────────────────────────────────────┐               │
│  │ Atividade Recente                    │               │
│  │                                      │               │
│  │ ○ Inspeção V-101 concluída — ontem   │               │
│  │ ○ Laudo CAL-201 emitido — 3 dias     │               │
│  │ ○ Nova inspeção V-301 iniciada — 5d  │               │
│  └──────────────────────────────────────┘               │
└──────────────────────────────────────────────────────────┘
```

---

## 9. Ícones

**Lucide React** — já instalada, open source, linha fina (1.5px stroke), elegante.

- **Tamanho padrão**: 16px (em botões, labels)
- **Tamanho médio**: 20px (em cards, KPIs)
- **Tamanho grande**: 24px (estados vazios)
- **Tamanho KPI**: 20px em container 36px
- **Stroke**: 1.5px (padrão do Lucide)
- **Cor**: inherit ou Slate 400

Nunca usar ícones filled. Apenas outline.

---

## 10. Motion & Animação

| Situação | Propriedade | Duração | Timing |
|----------|-------------|---------|--------|
| Hover (card, button) | transform, shadow, border | 150ms | ease-out |
| Focus (input) | ring, border | 150ms | ease-out |
| Modal open | opacity + scale (0.96→1) | 200ms | ease-out |
| Modal close | opacity + scale (1→0.96) | 150ms | ease-in |
| Sidebar expand | width | 300ms | ease-out |
| Dropdown open | opacity + translateY(-4→0) | 150ms | ease-out |
| Page transition | opacity 0→1 | 200ms | ease-out |
| Skeleton | opacity pulse | 1500ms | ease-in-out |
| Toast enter | translateY + opacity | 300ms | ease-out |

**Princípio**: Animações curtas (150-300ms). Nada de 500ms+. Nada de bounce. Nada de stagger. Apenas transições funcionais que não chamam atenção.

---

## 11. Estados

| Estado | Aparência |
|--------|-----------|
| **Hover** | Elevação sutil (shadow-sm), cor 1 shade mais escura |
| **Focus** | Ring azul petróleo 2px, ~25% opacity |
| **Pressed** | Transform scale(0.98) em botões, cor active |
| **Disabled** | Opacity 50%, cursor not-allowed, sem sombra |
| **Loading** | Spinner/Shimmer, opacidade 70% no conteúdo |
| **Selected** | Primary 50 bg, Primary 600 text |
| **Error** | Danger subtle bg, Danger text, border Danger |
| **Success** | Success subtle bg, Success text |
| **Warning** | Warning subtle bg, Warning text |
| **Empty** | Ícone grande muted + texto descritivo |

---

## 12. UX — Princípios

### Redução de Fadiga Visual (objetivo #1)

1. **Background warm white** (#FAFAF8) ao invés de branco puro (#FFFFFF) — reduz o contraste agressivo do branco absoluto, especialmente em ambientes com luz mista
2. **Dark theme disponível** — para uso em campo (ambientes externos) ou salas com pouca luz
3. **Texto nunca preto puro** (#000 → #111827) — o contraste máximo cansa; um tom de preto muito escuro mas não absoluto é mais confortável
4. **Sem cores saturadas** — vermelhos, verdes e amarelos são moderados (teal, cereja, âmbar)
5. **Contraste suficiente mas não excessivo** — diferença de 3-4 shades entre bg e border, não 6-7

### Facilidade de Leitura

1. **Inter em 14px** — tamanho ideal para leitura de dados técnicos; grande o suficiente para legibilidade, pequeno o suficiente para densidade de informação
2. **Line-height 1.6 no body** — espaçamento generoso entre linhas reduz fadiga
3. **Hierarquia clara** — apenas 4 níveis de heading (Display, H1, H2, H3), sem confusão
4. **Uppercase apenas em overlines e table headers** — nunca em body text
5. **Tracking (letter-spacing)** — negativo em headings (aproxima letras), positivo em overlines (afasta)

### Produtividade

1. **Ações primárias sempre visíveis** — sem hover-reveal para botões de ação
2. **Filtros persistentes** — não somem ao recarregar
3. **Sticky bottom em wizards** — botões nunca ficam abaixo do fold
4. **Empty states com call-to-action** — o usuário nunca fica perdido
5. **Feedback imediato** — toast para toda ação, sem exceção

### Hierarquia de Informação Crítica

1. **O equipamento (TAG) é o centro** — sempre visível, em destaque
2. **Cliente/Empresa** — segundo nível hierárquico
3. **Categoria de risco** — sempre visível como badge
4. **Datas de próxima inspeção** — nunca escondidas
5. **Status color como indicador primário** — cor primeiro, texto segundo

---

## 13. Design Tokens (JSON)

```json
{
  "nr13pro": {
    "colors": {
      "primary": {
        "50": "#F0F6F8",
        "100": "#DCEAEF",
        "200": "#B9D5DE",
        "300": "#8CBDCC",
        "400": "#5A9CB3",
        "500": "#1A4D5C",
        "600": "#15424F",
        "700": "#0F3641",
        "800": "#0A2A33",
        "900": "#061D24"
      },
      "neutral": {
        "50": "#F8F9FA",
        "100": "#F1F3F5",
        "200": "#E2E5EA",
        "300": "#CBD0D8",
        "400": "#9CA3AF",
        "500": "#6B7280",
        "600": "#4B5563",
        "700": "#374151",
        "800": "#1F2937",
        "900": "#111827"
      },
      "accent": "#3B82F6",
      "success": "#0D9488",
      "success-subtle": "#F0FDFA",
      "warning": "#B45309",
      "warning-subtle": "#FFFBEB",
      "danger": "#BE123C",
      "danger-subtle": "#FFF1F2",
      "info": "#0369A1",
      "info-subtle": "#F0F9FF",
      "background": "#FAFAF8",
      "surface": "#FFFFFF",
      "card": "#FFFFFF",
      "card-hover": "#F8F9FA",
      "border": "#E2E5EA",
      "divider": "#EFF1F3",
      "text-primary": "#111827",
      "text-secondary": "#6B7280",
      "text-muted": "#9CA3AF",
      "text-disabled": "#CBD5E1",
      "sidebar": "#0F172A",
      "sidebar-hover": "#1E293B",
      "sidebar-text": "#F1F5F9",
      "sidebar-text-muted": "#64748B",
      "sidebar-border": "#1E293B"
    },
    "colors-dark": {
      "primary": {
        "500": "#58A6C4",
        "600": "#6FBAD8"
      },
      "background": "#171717",
      "surface": "#1F1F1F",
      "card": "#1F1F1F",
      "card-hover": "#272727",
      "border": "#2E2E2E",
      "divider": "#2A2A2A",
      "text-primary": "#EDEDED",
      "text-secondary": "#A3A3A3",
      "text-muted": "#737373",
      "sidebar": "#111111",
      "sidebar-hover": "#1F1F1F",
      "sidebar-text": "#EDEDED",
      "sidebar-text-muted": "#737373",
      "sidebar-border": "#2E2E2E",
      "success": "#2DD4BF",
      "warning": "#F59E0B",
      "danger": "#FB7185",
      "info": "#38BDF8"
    },
    "spacing": {
      "0.5": "4px",
      "1": "8px",
      "1.5": "12px",
      "2": "16px",
      "2.5": "20px",
      "3": "24px",
      "4": "32px",
      "5": "40px",
      "6": "48px",
      "8": "64px",
      "10": "80px",
      "12": "96px"
    },
    "radius": {
      "sm": "4px",
      "md": "6px",
      "lg": "8px",
      "xl": "12px",
      "full": "9999px"
    },
    "shadow": {
      "xs": "0 1px 2px rgba(0,0,0,0.03)",
      "sm": "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
      "md": "0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)",
      "lg": "0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.02)",
      "xl": "0 20px 25px rgba(0,0,0,0.06), 0 8px 10px rgba(0,0,0,0.02)"
    },
    "typography": {
      "font-family": "\"Inter\", ui-sans-serif, system-ui, sans-serif",
      "font-mono": "\"JetBrains Mono\", ui-monospace, monospace",
      "display": { "size": "30px", "weight": "600", "lineHeight": "1.2", "letterSpacing": "-0.03em" },
      "h1": { "size": "22px", "weight": "600", "lineHeight": "1.3", "letterSpacing": "-0.02em" },
      "h2": { "size": "18px", "weight": "600", "lineHeight": "1.35", "letterSpacing": "-0.015em" },
      "h3": { "size": "15px", "weight": "600", "lineHeight": "1.4", "letterSpacing": "-0.01em" },
      "body": { "size": "14px", "weight": "400", "lineHeight": "1.6", "letterSpacing": "0" },
      "small": { "size": "13px", "weight": "400", "lineHeight": "1.5", "letterSpacing": "0" },
      "caption": { "size": "12px", "weight": "400", "lineHeight": "1.4", "letterSpacing": "0" },
      "overline": { "size": "11px", "weight": "500", "lineHeight": "1.2", "letterSpacing": "0.06em" },
      "button": { "size": "14px", "weight": "500", "lineHeight": "1", "letterSpacing": "0" },
      "table-header": { "size": "11px", "weight": "600", "lineHeight": "1", "letterSpacing": "0.05em" },
      "code": { "size": "13px", "weight": "400", "lineHeight": "1.5", "letterSpacing": "0" }
    },
    "animation": {
      "duration": {
        "hover": "150ms",
        "focus": "150ms",
        "modal": "200ms",
        "sidebar": "300ms",
        "dropdown": "150ms",
        "page": "200ms",
        "skeleton": "1500ms",
        "toast": "300ms"
      },
      "easing": {
        "default": "ease-out",
        "enter": "ease-out",
        "exit": "ease-in"
      }
    },
    "opacity": {
      "disabled": "0.5",
      "loading": "0.7",
      "hover": "0.08",
      "active": "0.12",
      "overlay": "0.25"
    },
    "z-index": {
      "dropdown": "50",
      "sticky": "100",
      "drawer": "200",
      "modal": "300",
      "toast": "400"
    }
  }
}
```

---

## 14. CSS Variables

```css
:root {
  /* Primary - Petroleum Blue */
  --primary-50: #F0F6F8;
  --primary-100: #DCEAEF;
  --primary-200: #B9D5DE;
  --primary-300: #8CBDCC;
  --primary-400: #5A9CB3;
  --primary-500: #1A4D5C;
  --primary-600: #15424F;
  --primary-700: #0F3641;
  --primary-800: #0A2A33;
  --primary-900: #061D24;

  /* Neutral - Slate */
  --neutral-50: #F8F9FA;
  --neutral-100: #F1F3F5;
  --neutral-200: #E2E5EA;
  --neutral-300: #CBD0D8;
  --neutral-400: #9CA3AF;
  --neutral-500: #6B7280;
  --neutral-600: #4B5563;
  --neutral-700: #374151;
  --neutral-800: #1F2937;
  --neutral-900: #111827;

  /* Semantic */
  --accent: #3B82F6;
  --success: #0D9488;
  --success-subtle: #F0FDFA;
  --warning: #B45309;
  --warning-subtle: #FFFBEB;
  --danger: #BE123C;
  --danger-subtle: #FFF1F2;
  --info: #0369A1;
  --info-subtle: #F0F9FF;

  /* Background & Surface */
  --background: #FAFAF8;
  --surface: #FFFFFF;
  --card: #FFFFFF;
  --card-hover: #F8F9FA;
  --border: #E2E5EA;
  --divider: #EFF1F3;

  /* Text */
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --text-disabled: #CBD5E1;

  /* Sidebar */
  --sidebar: #0F172A;
  --sidebar-hover: #1E293B;
  --sidebar-text: #F1F5F9;
  --sidebar-text-muted: #64748B;
  --sidebar-border: #1E293B;

  /* Components */
  --input-bg: #FFFFFF;
  --input-border: #CBD0D8;
  --input-focus: #1A4D5C;
  --input-placeholder: #9CA3AF;
  --table-header: #F8F9FA;
  --table-hover: #FAFAF8;
  --table-stripe: #F8F9FA;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.03);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.02);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.06), 0 8px 10px rgba(0,0,0,0.02);

  /* Z-index */
  --z-dropdown: 50;
  --z-sticky: 100;
  --z-drawer: 200;
  --z-modal: 300;
  --z-toast: 400;
}

[data-theme="dark"] {
  --primary-50: #1A2A30;
  --primary-100: #1E3640;
  --primary-200: #254A58;
  --primary-300: #2E6174;
  --primary-400: #3F7E94;
  --primary-500: #58A6C4;
  --primary-600: #6FBAD8;

  --neutral-50: #1F1F1F;
  --neutral-100: #272727;
  --neutral-200: #2E2E2E;
  --neutral-300: #404040;
  --neutral-400: #525252;
  --neutral-500: #737373;
  --neutral-600: #A3A3A3;
  --neutral-700: #D4D4D4;
  --neutral-800: #E5E5E5;
  --neutral-900: #EDEDED;

  --accent: #60A5FA;
  --success: #2DD4BF;
  --success-subtle: #134E4A;
  --warning: #F59E0B;
  --warning-subtle: #451A03;
  --danger: #FB7185;
  --danger-subtle: #4C0519;
  --info: #38BDF8;
  --info-subtle: #0C4A6E;

  --background: #171717;
  --surface: #1F1F1F;
  --card: #1F1F1F;
  --card-hover: #272727;
  --border: #2E2E2E;
  --divider: #2A2A2A;

  --text-primary: #EDEDED;
  --text-secondary: #A3A3A3;
  --text-muted: #737373;
  --text-disabled: #525252;

  --sidebar: #111111;
  --sidebar-hover: #1F1F1F;
  --sidebar-text: #EDEDED;
  --sidebar-text-muted: #737373;
  --sidebar-border: #2E2E2E;

  --input-bg: #1F1F1F;
  --input-border: #404040;
  --input-focus: #58A6C4;
  --input-placeholder: #525252;
  --table-header: #1F1F1F;
  --table-hover: #1F1F1F;
  --table-stripe: #1A1A1A;

  --shadow-xs: 0 1px 2px rgba(0,0,0,0.12);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.10);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.10);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.18), 0 4px 6px rgba(0,0,0,0.10);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.20), 0 8px 10px rgba(0,0,0,0.10);
}
```

---

## 15. Tailwind v4 + shadcn/ui

```css
/* globals.css — @theme inline block */

@theme inline {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Primary */
  --color-primary-50: var(--primary-50);
  --color-primary-100: var(--primary-100);
  --color-primary-200: var(--primary-200);
  --color-primary-300: var(--primary-300);
  --color-primary-400: var(--primary-400);
  --color-primary-500: var(--primary-500);
  --color-primary-600: var(--primary-600);
  --color-primary-700: var(--primary-700);
  --color-primary-800: var(--primary-800);
  --color-primary-900: var(--primary-900);

  /* Neutral */
  --color-neutral-50: var(--neutral-50);
  --color-neutral-100: var(--neutral-100);
  --color-neutral-200: var(--neutral-200);
  --color-neutral-300: var(--neutral-300);
  --color-neutral-400: var(--neutral-400);
  --color-neutral-500: var(--neutral-500);
  --color-neutral-600: var(--neutral-600);
  --color-neutral-700: var(--neutral-700);
  --color-neutral-800: var(--neutral-800);
  --color-neutral-900: var(--neutral-900);

  /* shadcn mappings */
  --color-background: var(--background);
  --color-foreground: var(--text-primary);
  --color-card: var(--card);
  --color-card-foreground: var(--text-primary);
  --color-card-hover: var(--card-hover);
  --color-popover: var(--surface);
  --color-popover-foreground: var(--text-primary);
  --color-primary: var(--primary-500);
  --color-primary-hover: var(--primary-600);
  --color-primary-foreground: #FFFFFF;
  --color-secondary: var(--neutral-100);
  --color-secondary-foreground: var(--text-primary);
  --color-muted: var(--neutral-50);
  --color-muted-foreground: var(--text-secondary);
  --color-accent: var(--accent);
  --color-accent-foreground: #FFFFFF;
  --color-destructive: var(--danger);
  --color-destructive-foreground: #FFFFFF;
  --color-border: var(--border);
  --color-input: var(--input-border);
  --color-input-bg: var(--input-bg);
  --color-ring: var(--input-focus);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-text);
  --color-sidebar-primary: var(--primary-500);
  --color-sidebar-primary-foreground: #FFFFFF;
  --color-sidebar-accent: var(--sidebar-hover);
  --color-sidebar-accent-foreground: var(--sidebar-text);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-text-muted);
  --color-success: var(--success);
  --color-success-subtle: var(--success-subtle);
  --color-warning: var(--warning);
  --color-warning-subtle: var(--warning-subtle);
  --color-danger-subtle: var(--danger-subtle);
  --color-info: var(--info);
  --color-info-subtle: var(--info-subtle);
  --color-surface: var(--surface);
  --color-divider: var(--divider);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-text-disabled: var(--text-disabled);
  --color-table-header: var(--table-header);
  --color-table-hover: var(--table-hover);
  --color-table-stripe: var(--table-stripe);

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.03);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.02);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.06), 0 8px 10px rgba(0,0,0,0.02);
}
```

---

## 16. Princípios de Implementação

### Como aplicar este Design System

1. **Substituir `globals.css`** — usar as CSS variables + `@theme inline` block acima
2. **Substituir cores em páginas** — `text-slate-600` → `text-neutral-600`, `bg-blue-50` → `bg-primary-50`
3. **JetBrains Mono** — adicionar ao layout (Google Fonts) para tags e dados técnicos
4. **Background** — mudar de `#F6F8FA` para `#FAFAF8`
5. **Card shadows** — remover `shadow-sm` genérico, usar os tokens customizados ou o utility `.card-hover`
6. **Dark theme** — toggle com `data-theme="dark"` no `<html>`
7. **Tipografia** — Inter já configurada; ajustar scale (30/22/18/15/14/13/12)

### O que este sistema resolve

- ❌ **Sistema antigo parecia ERP 2010** → Agora parece ferramenta de engenharia moderna
- ❌ **Cansativo visualmente** → Background warm white, contraste reduzido, font otimizada
- ❌ **Excesso de bordas e sombras** → Sombras quase imperceptíveis, bordas mínimas
- ❌ **Cores genéricas** → Azul petróleo exclusivo, status colors sofisticados
- ❌ **Sem personalidade** → Identidade clara de software de engenharia de precisão
- ❌ **Fonte genérica** → Inter com escala refinada para leitura prolongada

---

> **NR-13 Pro — Design System v2.0**
> Última atualização: Julho 2026
