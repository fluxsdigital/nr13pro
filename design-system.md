# NR-13 Pro — Design System

## 1. Conceito da Marca

### Naming
**"Precision Control"** — o sistema deve parecer o painel de controle de uma planta industrial moderna. Cada elemento comunica exatidão, como instrumentos calibrados.

### Metáfora Visual
Sala de controle de refinaria / cockpit de aeronave executiva.
- Fundo limpo como painel de aço escovado
- Cores funcionais como luzes indicadoras de instrumentos
- Tipografia de alta legibilidade como displays de equipamentos
- Espaçamento generoso como equipamentos bem organizados em uma bancada

### Posicionamento
Não somos um "sistema de inspeção genérico". Somos a ferramenta que engenheiros de verdade escolhem porque é precisa, confiável e bem projetada.

### O que NÃO fazer
- Nada de gradientes chamativos
- Nada de texturas falsas (skeumorphism)
- Nada de cores extremamente saturadas
- Nada de sombras dramáticas
- Nada de ícones cartoon

---

## 2. Paleta de Cores

### Filosofia
Cores frias e controladas. Azul como autoridade técnica (não azul genérico de banco). Tons neutros lembram aço escovado. Status colors são como luzes de painel: verdes suaves, âmbares precisos, vermelhos cirúrgicos.

### Light Theme

| Token | HEX | Uso |
|---|---|---|
| **Primary** | `#2059D1` | Botões principais, links, elementos focais |
| Primary Hover | `#1A4AB8` | Hover de primary |
| Primary Active | `#153C9E` | Active/pressed |
| Primary Subtle | `#EFF4FF` | Fundo sutil de badges/alertas primary |
| | | |
| **Secondary** | `#4F5B6A` | Ações secundárias, textos de botão outline |
| Secondary Hover | `#3A4553` | |
| | | |
| **Accent** | `#7C3AED` | Detalhes especiais, selo de certificação |
| | | |
| **Success** | `#16A34A` | Status "apto", concluído |
| Success Subtle | `#F0FDF4` | Fundo de badge success |
| | | |
| **Warning** | `#D97706` | Próximo ao vencimento, alertas médios |
| Warning Subtle | `#FFFBEB` | Fundo de badge warning |
| | | |
| **Danger** | `#DC2626` | Vencido, crítico, não conforme |
| Danger Subtle | `#FEF2F2` | Fundo de badge danger |
| | | |
| **Info** | `#0284C7` | Informativo |
| Info Subtle | `#F0F9FF` | Fundo de badge info |
| | | |
| **Background** | `#F6F8FA` | Fundo da página (cool gray levíssimo) |
| **Surface** | `#FFFFFF` | Fundo de cards, modais, sidebars |
| **Card** | `#FFFFFF` | Background de card |
| **Card Hover** | `#FAFBFC` | |
| | | |
| **Border** | `#E2E5EA` | Borders padrão |
| **Divider** | `#EFF1F3` | Divisores entre seções |
| | | |
| **Text Primary** | `#0F1729` | Títulos, body principal |
| **Text Secondary** | `#475569` | Textos de suporte |
| **Text Muted** | `#94A3B8` | Placeholders, metadados |
| **Text Disabled** | `#CBD5E1` | Estados desabilitados |
| | | |
| **Sidebar** | `#0E162B` | Sidebar dark premium |
| **Sidebar Hover** | `#1A2341` | Hover em items da sidebar |
| **Sidebar Text** | `#E2E8F0` | Texto na sidebar |
| **Sidebar Text Muted** | `#64748B` | Texto secundário na sidebar |
| | | |
| **Header** | `#FFFFFF` | Topbar/header |
| | | |
| **Table Header** | `#F1F5F9` | Cabeçalho de tabela |
| **Table Hover** | `#F8FAFC` | Hover row |
| **Table Stripe** | `#FAFBFC` | Zebra stripe |
| | | |
| **Input BG** | `#FFFFFF` | Background de input |
| **Input Border** | `#D1D5DB` | Borda de input |
| **Input Focus** | `#2059D1` | Ring de foco |
| **Input Placeholder** | `#94A3B8` | Placeholder text |
| | | |
| **Overlay** | `#000000` @ 20% | Modal/Sheet overlay |

### Status Colors (Badges)

| Status | BG | Text | Border |
|---|---|---|---|
| Apto / Concluído | `#F0FDF4` | `#166534` | `#BBF7D0` |
| Em andamento | `#EFF6FF` | `#1E40AF` | `#BFDBFE` |
| Por vencer (30d) | `#FFFBEB` | `#92400E` | `#FDE68A` |
| Vencido | `#FEF2F2` | `#991B1B` | `#FECACA` |
| Inativo | `#F1F5F9` | `#475569` | `#E2E8F0` |

---

### Dark Theme

| Token | HEX |
|---|---|
| **Primary** | `#4880FF` |
| Primary Hover | `#5F92FF` |
| Primary Active | `#3A6FE6` |
| Primary Subtle | `#1E2A4A` |
| | |
| **Secondary** | `#8896A9` |
| | |
| **Accent** | `#A78BFA` |
| | |
| **Success** | `#22C55E` |
| Success Subtle | `#132E1A` |
| | |
| **Warning** | `#F59E0B` |
| Warning Subtle | `#2E2410` |
| | |
| **Danger** | `#EF4444` |
| Danger Subtle | `#2E1313` |
| | |
| **Info** | `#38BDF8` |
| Info Subtle | `#0C2330` |
| | |
| **Background** | `#0B1120` | Fundo da página — nota: não preto puro |
| **Surface** | `#111B2E` | Cards e modais |
| **Card** | `#111B2E` |
| **Card Hover** | `#162240` |
| | | |
| **Border** | `#1E2A3D` |
| **Divider** | `#1A2640` |
| | | |
| **Text Primary** | `#F1F5F9` |
| **Text Secondary** | `#94A3B8` |
| **Text Muted** | `#64748B` |
| **Text Disabled** | `#334155` |
| | | |
| **Sidebar** | `#070C18` | Mais escuro que o background para profundidade |
| **Sidebar Hover** | `#0F1A2E` |
| **Sidebar Text** | `#E2E8F0` |
| **Sidebar Text Muted** | `#475569` |
| | | |
| **Header** | `#0F1928` |
| | | |
| **Table Header** | `#162240` |
| **Table Hover** | `#141F35` |
| **Table Stripe** | `#131E33` |
| | | |
| **Input BG** | `#0F1928` |
| **Input Border** | `#1E2A3D` |
| **Input Focus** | `#4880FF` |
| **Input Placeholder** | `#475569` |
| | | |
| **Overlay** | `#000000` @ 50% |

---

## 3. Tipografia

### Escolha

| Uso | Fonte | Razão |
|---|---|---|
| **UI geral** | **Inter** (sans) | Projetada para telas. Excelente legibilidade em tamanhos pequenos. Eixo "industrial/preciso" combinado com a estética. Pesos de 100 a 900. Já está no projeto. |
| **Display / Títulos** | Inter (mesma) | Manter uma só fonte evita ruído visual. Inter nos pesos 700 e 600 já entrega hierarquia suficiente. |

Caso queira contraste adicional no futuro: **Instrument Sans** (Google Fonts) para displays — tem esse nome sugestivo e funciona lindamente em headings. Mas para este projeto, **Inter pura é a decisão correta** por consistência e performance.

### Escala Tipográfica

| Style | Size | Weight | Line Height | Letter Spacing | Uso |
|---|---|---|---|---|---|
| **Display** | 32px / 2rem | 700 (Bold) | 1.2 | -0.025em | Título da página |
| **H1** | 24px / 1.5rem | 600 (Semibold) | 1.3 | -0.02em | Título de seção |
| **H2** | 20px / 1.25rem | 600 | 1.35 | -0.015em | Subtítulo de seção |
| **H3** | 16px / 1rem | 600 | 1.4 | -0.01em | Título de card |
| **H4** | 14px / 0.875rem | 600 | 1.4 | 0 | Título de grupo |
| **Body** | 14px / 0.875rem | 400 (Regular) | 1.5 | 0 | Texto padrão |
| **Small** | 13px / 0.8125rem | 400 | 1.5 | 0 | Texto auxiliar |
| **Caption** | 12px / 0.75rem | 400 | 1.4 | 0 | Metadados, timestamps |
| **Button** | 14px / 0.875rem | 500 (Medium) | 1 | 0 | Botões |
| **Table Header** | 12px / 0.75rem | 600 | 1 | +0.03em | Cabeçalho de tabela (uppercase) |
| **Overline** | 11px / 0.6875rem | 600 | 1 | +0.05em | Rótulos pequenos (uppercase) |

---

## 4. Sistema de Espaçamento

| Token | px | rem | Uso |
|---|---|---|---|
| **space-1** | 4 | 0.25 | Ícones pequenos |
| **space-2** | 8 | 0.5 | Gap entre elementos próximos |
| **space-3** | 12 | 0.75 | Gap entre label e input |
| **space-4** | 16 | 1 | Padding dentro de cards |
| **space-5** | 20 | 1.25 | Gap entre cards |
| **space-6** | 24 | 1.5 | Padding de página, entre seções |
| **space-8** | 32 | 2 | Entre seções grandes |
| **space-10** | 40 | 2.5 | Margem de página |
| **space-12** | 48 | 3 | Espaço hero |
| **space-16** | 64 | 4 | Entre blocos principais |

Regra: sempre múltiplos de 4. Nunca valores quebrados.

---

## 5. Border Radius

| Token | Valor | Uso |
|---|---|---|
| **radius-sm** | 4px | Badges, tabelas |
| **radius-md** | 6px | Inputs, selects, botões pequenos |
| **radius-lg** | 8px | Cards, botões primários, modais |
| **radius-xl** | 12px | Drawers, sheets |
| **radius-full** | 9999px | Avatares, pills |

Cards e botões com **8px** — moderno sem ser infantil. Inputs com **6px** para ainda parecerem precisos.

---

## 6. Sombras

Nada dramático. Sombras sutis que sugerem elevação sem chamar atenção.

| Token | Valor |
|---|---|
| **shadow-xs** | `0 1px 2px rgba(15,23,41,0.04)` |
| **shadow-sm** | `0 1px 3px rgba(15,23,41,0.05), 0 1px 2px rgba(15,23,41,0.04)` |
| **shadow-md** | `0 4px 6px rgba(15,23,41,0.05), 0 2px 4px rgba(15,23,41,0.04)` |
| **shadow-lg** | `0 10px 15px rgba(15,23,41,0.06), 0 4px 6px rgba(15,23,41,0.04)` |
| **shadow-xl** | `0 20px 25px rgba(15,23,41,0.08), 0 8px 10px rgba(15,23,41,0.04)` |

Para dark theme: mesma lógica mas com cor `#000000` e opacidade maior.

---

## 7. Ícones

| Decisão | Escolha | Justificativa |
|---|---|---|
| **Biblioteca** | **Lucide** | Já instalada. Open source, consistente, linha fina elegante. |
| **Stroke** | `2px` (default do Lucide) | Suficiente para contraste sem pesar. |
| **Tamanho padrão** | `16px` (h-4 w-4) | Em botões e labels |
| **Tamanho médio** | `20px` (h-5 w-5) | Em cards e KPIs |
| **Tamanho grande** | `24px` (h-6 w-6) | Em estados vazios |
| **Cor** | Inherit ou `text-muted` | Ícones decorativos nunca chamam mais atenção que o texto |

Regra: ícone sempre **apoia** o texto, nunca substitui sem legenda. Em botões, ícone + label.

---

## 8. Componentes

### Botões

| Propriedade | Primary | Secondary | Outline | Ghost | Danger |
|---|---|---|---|---|---|
| **BG** | `var(--primary)` | `var(--secondary)` | transparent | transparent | `var(--danger)` |
| **Texto** | white | white | `var(--text-primary)` | `var(--text-secondary)` | white |
| **Border** | none | none | `var(--border)` | none | none |
| **Hover BG** | primary-hover | secondary-hover | `var(--surface)` | `var(--table-hover)` | danger dark |
| **Padding** | 10px 18px | 10px 18px | 10px 18px | 8px 14px | 10px 18px |
| **Radius** | `8px` | `8px` | `8px` | `6px` | `8px` |
| **Font** | 14px / 500 | 14px / 500 | 14px / 500 | 14px / 500 | 14px / 500 |
| **Shadow** | none | none | none | none | none |
| **Icon size** | 16px | 16px | 16px | 16px | 16px |

Variações: `size="sm"` → 8px padding, 13px font. `size="lg"` → 14px padding, 16px font.

### Cards

- **BG**: `var(--card)`
- **Border**: `var(--border)` com `1px solid`
- **Radius**: `8px`
- **Shadow**: `shadow-sm` (padrão), `shadow-md` (elevado)
- **Padding**: `var(--space-4)` ou `var(--space-6)`
- **Hover**: `var(--card-hover)` bg + `shadow-md` transition 200ms

### Inputs

- **BG**: `var(--input-bg)`
- **Border**: `1px solid var(--input-border)`
- **Radius**: `6px`
- **Padding**: 10px 12px
- **Font**: 14px / 400
- **Placeholder**: `var(--text-muted)`
- **Focus**: `ring-2 ring-[var(--input-focus)]` + border transparent
- **Disabled**: `opacity-50` + `cursor-not-allowed`

### Select

- Mesmo estilo de input
- Dropdown com `shadow-lg`, `radius-lg`, border sutil
- Option hover: `var(--table-hover)`
- Selected: `var(--primary-subtle)` + primary text

### Modais

- **Overlay**: `var(--overlay)` (backdrop-blur-sm support)
- **Content**: `var(--surface)`, `radius-xl`, `shadow-xl`
- **Padding**: 24px
- **Header**: divider abaixo, título H3
- **Footer**: divider acima, botões alinhados à direita

### Drawer (Sheet)

- **BG**: `var(--surface)`
- **Width**: 320px (small), 400px (default), 640px (large)
- **Radius**: `radius-xl` no lado oposto
- **Shadow**: `shadow-xl`
- **Padding**: 24px

### Sidebar

- **BG**: `var(--sidebar)` — dark, não preto puro
- **Width**: 256px (64 rem)
- **Item height**: 40px
- **Item active**: bg sutil + primary text
- **Item hover**: `var(--sidebar-hover)`
- **Divider**: menos contraste
- **Font**: 14px / 500 inactive, 14px / 600 active
- **Ícones**: 16px, muted quando inativo

### Tabela

- **Header**: bg `var(--table-header)`, font 12px/600 uppercase tracking-wide, color `var(--text-secondary)`
- **Rows**: border-bottom com `var(--border)`, hover com `var(--table-hover)`
- **Cells**: padding 12px 16px
- **Font**: 14px / 400
- **Striped**: `var(--table-stripe)` em even rows (opcional)

### Badges

- **Padding**: 2px 10px
- **Radius**: `radius-sm` (4px) — cantos retos combinam com o tema industrial
- **Font**: 12px / 500
- **Cor**: conforme tabela de status colors

### Alerts

- **Padding**: 12px 16px
- **Radius**: `8px`
- **Border**: left-4 solid na cor correspondente
- **Icon**: 16px, cor do alerta

### Toast (Sonner)

- **Style**: Moderno, richColors
- **Radius**: `8px`
- **Shadow**: `shadow-lg`

### Progress Bar

- **BG**: `var(--border)`
- **Fill**: `var(--primary)` ou cor de status
- **Radius**: `full`
- **Height**: 6px
- **Animação**: smooth transition

### Tabs

- **List**: border-bottom `var(--border)`
- **Tab**: padding 10px 16px, font 14px/500
- **Active**: color `var(--primary)` + border-bottom 2px
- **Hover**: `var(--table-hover)` bg

### Calendário / DatePicker

- Clean, sem bordas agressivas
- Day hover: `var(--table-hover)`, selected: `var(--primary)` with white text
- Today: ring sutil
- Fora do mês: `var(--text-muted)`

### Pagination

- Previous/Next: ghost buttons
- Page numbers: 32px squares, radius 6px
- Active page: `var(--primary)` white text
- Hover: `var(--table-hover)`

### Stepper

- Horizontal, números em círculos
- Active step: primary fill
- Completed: success fill + check icon
- Pending: border + muted text
- Connector line: `var(--border)`, completed: `var(--primary)`

---

## 9. Dashboard

### Princípios
- **Hierarquia clara**: KPIs no topo, gráficos abaixo, detalhes depois
- **Espaço em branco generoso**: sem sensação de "grid lotado"
- **Dados primeiro**: gráficos limpos, sem decoração

### Layout

```
┌──────────────────────────────────────────┐
│  Dashboard                  [Filtro]     │  ← Header com título + filtro período
├──────────┬──────────┬──────────┬─────────┤
│   Total   │  Ativos   │  Críticos │  Venc.  │  ← KPI cards (4 colunas)
│   142     │  118      │  12       │  8      │
├──────────┴──────────┴──────────┴─────────┤
│                                           │
│  ┌──────────────────┐ ┌────────────────┐  │  ← Gráficos lado a lado
│  │ Inspeções/mês    │ │ Cat. Risco     │  │
│  │ (bar chart)      │ │ (donut chart)  │  │
│  └──────────────────┘ └────────────────┘  │
│                                           │
│  ┌──────────────────────────────────────┐ │
│  │ Equipamentos Próximos ao Vencimento │ │  ← Tabela compacta
│  │ Tag  │ Equip.   │ Data   │ Status  │ │
│  └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

### KPI Cards
- **Ícone**: 20px, cor do tema, fundo subtle circular (32px)
- **Valor**: 24px / 700
- **Label**: 13px / 500 / text-secondary
- **Trend**: opcional, mini badge com +X%
- **Padding**: 16px
- **Radius**: 8px
- **Border**: 1px solid border
- **Shadow**: shadow-sm

### Gráficos (Recharts)
- **Cores**: usar chart-1 a chart-5 do tema
- **Grid**: none ou linhas tracejadas sutis
- **Axis**: font 12px, text-muted
- **Tooltip**: radius 6px, shadow-lg
- **Legend**: font 12px, layout horizontal
- **Bar chart**: radius 4px nos topos, gap entre barras
- **Donut**: inner radius 60%, stroke none

### Filtros
- Selects e DatePicker em flex-row, alinhados à direita do título
- "Aplicar" apenas se necessário; preferir onChange automático

---

## 10. Tema Claro (descritivo)

O fundo da página é um cinza azulado muito claro (`#F6F8FA`) que lembra uma superfície de aço escovado limpo. Cards brancos (`#FFFFFF`) flutuam com sombras mínimas e bordas sutis. A tipografia é predominantemente escura (`#0F1729`) com hierarquia clara.

Os inputs têm fundo branco e borda cinza que muda para o anel azul no foco. A sidebar é escura (`#0E162B`) criando contraste forte e delimitando a navegação do conteúdo.

Badges usam cantos levemente retos (4px) e cores suaves nos fundos, passando uma sensação de indicadores de painel.

Gráficos usam cores pastel-saturadas (chart-1 a 5) que se destacam sem gritar.

A sensação geral é de uma ferramenta profissional, assinável, limpa.

---

## 11. Tema Escuro

Não é uma inversão do claro.

O background é azul marinho profundo (`#0B1120`) — não preto puro, que cansa menos. Cards são ligeiramente mais claros (`#111B2E`) com bordas sutis (`#1E2A3D`). A sidebar é ainda mais escura (`#070C18`) criando três camadas de profundidade.

O primary azul no escuro é mais claro (`#4880FF`) para manter contraste WCAG AA em fundos escuros. Textos nunca são branco puro — uso `#F1F5F9` para primary, `#94A3B8` para secondary.

Inputs têm fundo `#0F1928` (quase o background) com borda `#1E2A3D`. No foco, o ring primary brilha.

Status colors são mais vibrantes que no claro para compensar o fundo escuro, mas ainda controladas.

A sensação é de um cockpit noturno — instrumentos iluminados com precisão, sem ofuscamento.

---

## 12. Design Tokens (JSON)

```json
{
  "nr13pro": {
    "colors": {
      "primary": "#2059D1",
      "primary-hover": "#1A4AB8",
      "primary-active": "#153C9E",
      "primary-subtle": "#EFF4FF",
      "secondary": "#4F5B6A",
      "secondary-hover": "#3A4553",
      "accent": "#7C3AED",
      "success": "#16A34A",
      "success-subtle": "#F0FDF4",
      "warning": "#D97706",
      "warning-subtle": "#FFFBEB",
      "danger": "#DC2626",
      "danger-subtle": "#FEF2F2",
      "info": "#0284C7",
      "info-subtle": "#F0F9FF",
      "background": "#F6F8FA",
      "surface": "#FFFFFF",
      "card": "#FFFFFF",
      "card-hover": "#FAFBFC",
      "border": "#E2E5EA",
      "divider": "#EFF1F3",
      "text-primary": "#0F1729",
      "text-secondary": "#475569",
      "text-muted": "#94A3B8",
      "text-disabled": "#CBD5E1",
      "sidebar": "#0E162B",
      "sidebar-hover": "#1A2341",
      "sidebar-text": "#E2E8F0",
      "sidebar-text-muted": "#64748B",
      "header": "#FFFFFF",
      "table-header": "#F1F5F9",
      "table-hover": "#F8FAFC",
      "table-stripe": "#FAFBFC",
      "input-bg": "#FFFFFF",
      "input-border": "#D1D5DB",
      "input-focus": "#2059D1",
      "input-placeholder": "#94A3B8",
      "overlay": "rgba(0,0,0,0.2)",
      "chart-1": "#2059D1",
      "chart-2": "#16A34A",
      "chart-3": "#D97706",
      "chart-4": "#7C3AED",
      "chart-5": "#DC2626"
    },
    "colors-dark": {
      "primary": "#4880FF",
      "primary-hover": "#5F92FF",
      "primary-active": "#3A6FE6",
      "primary-subtle": "#1E2A4A",
      "secondary": "#8896A9",
      "accent": "#A78BFA",
      "success": "#22C55E",
      "success-subtle": "#132E1A",
      "warning": "#F59E0B",
      "warning-subtle": "#2E2410",
      "danger": "#EF4444",
      "danger-subtle": "#2E1313",
      "info": "#38BDF8",
      "info-subtle": "#0C2330",
      "background": "#0B1120",
      "surface": "#111B2E",
      "card": "#111B2E",
      "card-hover": "#162240",
      "border": "#1E2A3D",
      "divider": "#1A2640",
      "text-primary": "#F1F5F9",
      "text-secondary": "#94A3B8",
      "text-muted": "#64748B",
      "text-disabled": "#334155",
      "sidebar": "#070C18",
      "sidebar-hover": "#0F1A2E",
      "sidebar-text": "#E2E8F0",
      "sidebar-text-muted": "#475569",
      "header": "#0F1928",
      "table-header": "#162240",
      "table-hover": "#141F35",
      "table-stripe": "#131E33",
      "input-bg": "#0F1928",
      "input-border": "#1E2A3D",
      "input-focus": "#4880FF",
      "input-placeholder": "#475569",
      "overlay": "rgba(0,0,0,0.5)",
      "chart-1": "#4880FF",
      "chart-2": "#22C55E",
      "chart-3": "#F59E0B",
      "chart-4": "#A78BFA",
      "chart-5": "#EF4444"
    },
    "spacing": {
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "8": "32px",
      "10": "40px",
      "12": "48px",
      "16": "64px"
    },
    "radius": {
      "sm": "4px",
      "md": "6px",
      "lg": "8px",
      "xl": "12px",
      "full": "9999px"
    },
    "shadow": {
      "xs": "0 1px 2px rgba(15,23,41,0.04)",
      "sm": "0 1px 3px rgba(15,23,41,0.05), 0 1px 2px rgba(15,23,41,0.04)",
      "md": "0 4px 6px rgba(15,23,41,0.05), 0 2px 4px rgba(15,23,41,0.04)",
      "lg": "0 10px 15px rgba(15,23,41,0.06), 0 4px 6px rgba(15,23,41,0.04)",
      "xl": "0 20px 25px rgba(15,23,41,0.08), 0 8px 10px rgba(15,23,41,0.04)"
    },
    "typography": {
      "font-family": "Inter, ui-sans-serif, system-ui, sans-serif",
      "display": { "size": "32px", "weight": "700", "lineHeight": "1.2", "letterSpacing": "-0.025em" },
      "h1": { "size": "24px", "weight": "600", "lineHeight": "1.3", "letterSpacing": "-0.02em" },
      "h2": { "size": "20px", "weight": "600", "lineHeight": "1.35", "letterSpacing": "-0.015em" },
      "h3": { "size": "16px", "weight": "600", "lineHeight": "1.4", "letterSpacing": "-0.01em" },
      "h4": { "size": "14px", "weight": "600", "lineHeight": "1.4", "letterSpacing": "0" },
      "body": { "size": "14px", "weight": "400", "lineHeight": "1.5", "letterSpacing": "0" },
      "small": { "size": "13px", "weight": "400", "lineHeight": "1.5", "letterSpacing": "0" },
      "caption": { "size": "12px", "weight": "400", "lineHeight": "1.4", "letterSpacing": "0" },
      "button": { "size": "14px", "weight": "500", "lineHeight": "1", "letterSpacing": "0" },
      "table-header": { "size": "12px", "weight": "600", "lineHeight": "1", "letterSpacing": "0.03em" },
      "overline": { "size": "11px", "weight": "600", "lineHeight": "1", "letterSpacing": "0.05em" }
    }
  }
}
```

---

## 13. CSS Variables

```css
:root {
  /* Colors */
  --primary: #2059D1;
  --primary-hover: #1A4AB8;
  --primary-active: #153C9E;
  --primary-subtle: #EFF4FF;
  --secondary: #4F5B6A;
  --secondary-hover: #3A4553;
  --accent: #7C3AED;
  --success: #16A34A;
  --success-subtle: #F0FDF4;
  --warning: #D97706;
  --warning-subtle: #FFFBEB;
  --danger: #DC2626;
  --danger-subtle: #FEF2F2;
  --info: #0284C7;
  --info-subtle: #F0F9FF;
  --background: #F6F8FA;
  --surface: #FFFFFF;
  --card: #FFFFFF;
  --card-hover: #FAFBFC;
  --border: #E2E5EA;
  --divider: #EFF1F3;
  --text-primary: #0F1729;
  --text-secondary: #475569;
  --text-muted: #94A3B8;
  --text-disabled: #CBD5E1;
  --sidebar: #0E162B;
  --sidebar-hover: #1A2341;
  --sidebar-text: #E2E8F0;
  --sidebar-text-muted: #64748B;
  --header: #FFFFFF;
  --table-header: #F1F5F9;
  --table-hover: #F8FAFC;
  --table-stripe: #FAFBFC;
  --input-bg: #FFFFFF;
  --input-border: #D1D5DB;
  --input-focus: #2059D1;
  --input-placeholder: #94A3B8;
  --overlay: rgba(0, 0, 0, 0.2);

  /* Chart */
  --chart-1: #2059D1;
  --chart-2: #16A34A;
  --chart-3: #D97706;
  --chart-4: #7C3AED;
  --chart-5: #DC2626;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(15, 23, 41, 0.04);
  --shadow-sm: 0 1px 3px rgba(15, 23, 41, 0.05), 0 1px 2px rgba(15, 23, 41, 0.04);
  --shadow-md: 0 4px 6px rgba(15, 23, 41, 0.05), 0 2px 4px rgba(15, 23, 41, 0.04);
  --shadow-lg: 0 10px 15px rgba(15, 23, 41, 0.06), 0 4px 6px rgba(15, 23, 41, 0.04);
  --shadow-xl: 0 20px 25px rgba(15, 23, 41, 0.08), 0 8px 10px rgba(15, 23, 41, 0.04);

  /* Typography tokens (for reference — applied via Tailwind) */

  /* Status badges */
  --badge-apto-bg: #F0FDF4;
  --badge-apto-text: #166534;
  --badge-apto-border: #BBF7D0;
  --badge-andamento-bg: #EFF6FF;
  --badge-andamento-text: #1E40AF;
  --badge-andamento-border: #BFDBFE;
  --badge-vencer-bg: #FFFBEB;
  --badge-vencer-text: #92400E;
  --badge-vencer-border: #FDE68A;
  --badge-vencido-bg: #FEF2F2;
  --badge-vencido-text: #991B1B;
  --badge-vencido-border: #FECACA;
  --badge-inativo-bg: #F1F5F9;
  --badge-inativo-text: #475569;
  --badge-inativo-border: #E2E8F0;
}

[data-theme="dark"] {
  --primary: #4880FF;
  --primary-hover: #5F92FF;
  --primary-active: #3A6FE6;
  --primary-subtle: #1E2A4A;
  --secondary: #8896A9;
  --secondary-hover: #6A7A8E;
  --accent: #A78BFA;
  --success: #22C55E;
  --success-subtle: #132E1A;
  --warning: #F59E0B;
  --warning-subtle: #2E2410;
  --danger: #EF4444;
  --danger-subtle: #2E1313;
  --info: #38BDF8;
  --info-subtle: #0C2330;
  --background: #0B1120;
  --surface: #111B2E;
  --card: #111B2E;
  --card-hover: #162240;
  --border: #1E2A3D;
  --divider: #1A2640;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --text-disabled: #334155;
  --sidebar: #070C18;
  --sidebar-hover: #0F1A2E;
  --sidebar-text: #E2E8F0;
  --sidebar-text-muted: #475569;
  --header: #0F1928;
  --table-header: #162240;
  --table-hover: #141F35;
  --table-stripe: #131E33;
  --input-bg: #0F1928;
  --input-border: #1E2A3D;
  --input-focus: #4880FF;
  --input-placeholder: #475569;
  --overlay: rgba(0, 0, 0, 0.5);

  --chart-1: #4880FF;
  --chart-2: #22C55E;
  --chart-3: #F59E0B;
  --chart-4: #A78BFA;
  --chart-5: #EF4444;

  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.35), 0 4px 6px rgba(0, 0, 0, 0.25);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.4), 0 8px 10px rgba(0, 0, 0, 0.3);

  --badge-apto-bg: #132E1A;
  --badge-apto-text: #86EFAC;
  --badge-apto-border: #166534;
  --badge-andamento-bg: #1E2A4A;
  --badge-andamento-text: #93C5FD;
  --badge-andamento-border: #1E40AF;
  --badge-vencer-bg: #2E2410;
  --badge-vencer-text: #FDE68A;
  --badge-vencer-border: #92400E;
  --badge-vencido-bg: #2E1313;
  --badge-vencido-text: #FCA5A5;
  --badge-vencido-border: #991B1B;
  --badge-inativo-bg: #1E293B;
  --badge-inativo-text: #94A3B8;
  --badge-inativo-border: #334155;
}
```

---

## 14. Tailwind Config

Já que o projeto usa **Tailwind CSS v4** com o CSS‑first config (não um `tailwind.config.ts`), o caminho correto é estender o tema via CSS. Adicione ao `globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Colors */
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-primary-subtle: var(--primary-subtle);
  --color-secondary: var(--secondary);
  --color-accent: var(--accent);
  --color-success: var(--success);
  --color-success-subtle: var(--success-subtle);
  --color-warning: var(--warning);
  --color-warning-subtle: var(--warning-subtle);
  --color-danger: var(--danger);
  --color-danger-subtle: var(--danger-subtle);
  --color-info: var(--info);
  --color-info-subtle: var(--info-subtle);
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-card: var(--card);
  --color-card-hover: var(--card-hover);
  --color-border: var(--border);
  --color-divider: var(--divider);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-text-disabled: var(--text-disabled);
  --color-sidebar: var(--sidebar);
  --color-sidebar-hover: var(--sidebar-hover);
  --color-sidebar-text: var(--sidebar-text);
  --color-sidebar-text-muted: var(--sidebar-text-muted);
  --color-header: var(--header);
  --color-table-header: var(--table-header);
  --color-table-hover: var(--table-hover);
  --color-table-stripe: var(--table-stripe);
  --color-input-bg: var(--input-bg);
  --color-input-border: var(--input-border);
  --color-input-focus: var(--input-focus);
  --color-input-placeholder: var(--input-placeholder);
  --color-overlay: var(--overlay);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  /* Spacing — Tailwind v4 already covers the scale via arbitrary values.
     The CSS variables are for reference; use Tailwind's built-in spacing. */

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(15, 23, 41, 0.04);
  --shadow-sm: 0 1px 3px rgba(15, 23, 41, 0.05), 0 1px 2px rgba(15, 23, 41, 0.04);
  --shadow-md: 0 4px 6px rgba(15, 23, 41, 0.05), 0 2px 4px rgba(15, 23, 41, 0.04);
  --shadow-lg: 0 10px 15px rgba(15, 23, 41, 0.06), 0 4px 6px rgba(15, 23, 41, 0.04);
  --shadow-xl: 0 20px 25px rgba(15, 23, 41, 0.08), 0 8px 10px rgba(15, 23, 41, 0.04);

  /* Font family */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

---

## 15. Experiência do Usuário

### Princípios de UX para uso industrial prolongado

1. **Redução de fadiga visual**
   - Background levemente off-white (não branco puro `#FFFFFF`) → `#F6F8FA`
   - Texto primary com contraste alto mas não preto puro → `#0F1729` (muito próximo do preto mas mais macio)
   - Sem animações desnecessárias
   - Transitions curtas (150-200ms) e only onde útil
   - Dark theme disponível para ambientes com pouca luz

2. **Produtividade**
   - Ações primárias sempre visíveis, sem hover-reveal
   - Tabelas com informação densa mas bem espaçada
   - Filtros persistentes (não somem ao recarregar)
   - Atalhos de teclado para ações frequentes (N = nova inspeção, F = foco no filtro)
   - Estado vazio com call-to-action claro

3. **Confiança**
   - Datas sempre visíveis
   - Status colors semanticamente corretos
   - Loading states com skeleton (não spinner genérico)
   - Feedback visual imediato em ações (toast)
   - Nenhum estado "congelado" sem explicação

4. **Hierarquia industrial**
   - O equipamento é o centro — sempre identificável por TAG
   - Cliente/Empresa é o segundo nível hierárquico
   - Categoria de risco sempre visível como badge
   - Datas de próxima inspeção nunca escondidas

---

## 16. Estilo Industrial (diretrizes visuais)

| Diretriz | Como aplicar |
|---|---|
| **Aço escovado** | Background `#F6F8FA` + bordas frias `#E2E5EA` |
| **Precisão** | Alinhamento de grade estrito, padding consistente |
| **Instrumentação** | Badges retos (4px), cores de status como indicadores LED |
| **Engenharia** | Monospace em dados técnicos (tags, medições) via `font-mono` |
| **Organização** | Grid limpo, seções bem divididas, whitespace generoso |

O que NÃO usar:
- ❌ Gradientes
- ❌ Texturas de metal falsas
- ❌ Skeumorphism
- ❌ Sombras dramáticas
- ❌ Cores excessivamente saturadas
- ❌ Ícones preenchidos (filled)

---

## 17. Resumo das Mudanças para Implementação

1. **Substituir `globals.css`** — usar os novos tokens com `@theme inline`
2. **Substituir cores shadcn** — `:root` com os novos valores de `--background`, `--foreground`, etc.
3. **Atualizar sidebar** — já usa `bg-sidebar`, manter
4. **Badges** — criar classes utilitárias ou usar `style="base-nova"` com as variáveis
5. **Gráficos** — usar `var(--chart-1)` etc no Recharts
6. **Dark mode** — adicionar toggle com `data-theme="dark"` no `<html>`
7. **Tipografia** — Inter já configurada, ajustar escala de tamanhos no Tailwind
