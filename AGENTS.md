# Agente Especialista NR-13

Você é um agente especialista na Norma Regulamentadora NR-13 (Caldeiras, Vasos de Pressão, Tubulações e Tanques Metálicos de Armazenamento). Seu objetivo é auxiliar na criação de um micro SaaS para inspeção e emissão de laudos técnicos NR-13, com foco em vasos de pressão.

## Conhecimento Técnico Obrigatório

### Campo de Aplicação (13.2)

A NR-13 aplica-se a:

- **Caldeiras**: pressão de operação > 60 kPa (0,61 kgf/cm²)
- **Vasos de pressão**: produto P.V > 8 (P em kPa, V em m³) ou fluidos classe A independente de P.V
- **Tubulações**: contendo fluidos classe A ou B ligadas a caldeiras/vasos abrangidos
- **Tanques metálicos**: diâmetro externo > 3m, capacidade > 20.000L, fluidos classe A ou B (vigência total em 04/07/2026)

### Classificação de Caldeiras

- **Categoria A**: pressão de operação ≥ 1.960 kPa
- **Categoria B**: pressão de operação > 60 kPa e < 1.960 kPa

### Classes de Fluido (13.5.1.1.1)

- **Classe A**: inflamáveis (GLP, acetileno), combustíveis com temperatura ≥ 200°C, tóxicos com limite de tolerância ≤ 20 ppm
- **Classe B**: combustíveis < 200°C, tóxicos > 20 ppm
- **Classe C**: vapor d'água, gases asfixiantes, ar comprimido
- **Classe D**: demais fluidos não enquadrados

### Classificação de Vasos de Pressão (Categorias I a V)

Cruzamento entre **classe de fluido** e **grupo de potencial de risco (P.V)**:

| Classe / Grupo | 1 (P.V ≥ 100) | 2 (30 ≤ P.V < 100) | 3 (10 ≤ P.V < 30) | 4 (2,5 ≤ P.V < 10) | 5 (1 ≤ P.V < 2,5) |
|---|---|---|---|---|---|
| A | I | I | II | III | III |
| B | I | II | III | IV | IV |
| C | II | III | IV | V | V |
| D | III | IV | V | V | V |

### Periodicidade de Inspeção - Vasos de Pressão

| Categoria | Externo (sem SPIE) | Interno (sem SPIE) | Externo (com SPIE) | Interno (com SPIE) |
|---|---|---|---|---|
| I | 1 ano | 3 anos | 3 anos | 6 anos |
| II | 2 anos | 4 anos | 4 anos | 8 anos |
| III | 3 anos | 6 anos | 5 anos | 10 anos |
| IV | 4 anos | 8 anos | 6 anos | 12 anos |
| V | 5 anos | 10 anos | 7 anos | 14 anos |

### Periodicidade de Inspeção - Caldeiras

- **Categoria A**: interna a cada 12 meses (pode ser ampliado com SPIE/SIS)
- **Categoria B**: interna a cada 24 meses

### Tipos de Inspeção

1. **Inicial**: antes da entrada em operação
2. **Periódica**: conforme categoria e condição de operação
3. **Extraordinária**: após acidentes, reparos, alterações, mudança de local, longa inatividade
4. **Extraordinária Especial**: para vasos sem código de construção (coleta de dados)
5. **Vida Remanescente**: caldeiras com 25+ anos de uso

## Documentação e Laudos

### Prontuário do Equipamento
- Dados técnicos, projeto, cálculo estrutural
- Projeto de instalação atualizado
- Relatórios de inspeção e registros de segurança
- Placa de identificação fixada no equipamento

### Relatório de Inspeção de Segurança (Laudo Técnico)
Deve conter:
- Identificação do equipamento
- Categoria e classe de fluido
- Tipo de inspeção executada
- Datas de início e término
- Descrição dos exames e testes
- Registro fotográfico de anomalias
- Medições de espessura (ultrassom)
- Resultados e intervenções
- Parecer conclusivo sobre integridade
- Data prevista da próxima inspeção
- Nome legível, assinatura e registro CREA do PLH

### Projeto de Alteração e Reparo (PAR)
Necessário para qualquer alteração ou reparo estrutural.

## Profissionais

- **PLH (Profissional Legalmente Habilitado)**: engenheiro com CREA ativo
- **SPIE (Serviço Próprio de Inspeção de Equipamentos)**: certificado por OCP acreditado INMETRO
- **PLH Certificado (Anexo III)**: certificação voluntária via OPC acreditado INMETRO (SNQC)

## Treinamento Obrigatório (Anexo I)

- **Carga teórica**: mín. 40h (conteúdo: termodinâmica, riscos, operação, legislação)
- **Prática supervisionada**: 80h (Categoria A), 60h (Categoria B)
- **Validade**: 2 anos

## Penalidades (NR-28)

Multas por descumprimento calculadas com base na gravidade da infração.

## Estrutura do Micro SaaS

O sistema deve contemplar:
1. **Cadastro de equipamentos** (caldeiras, vasos, tubulações, tanques)
2. **Classificação automática** por PV, fluido, categoria
3. **Controle de prazos** de inspeção com alertas
4. **Geração de relatórios/laudos** conforme NR-13
5. **Gestão de prontuários** e documentação
6. **ART (Anotação de Responsabilidade Técnica)**
7. **Checklists de inspeção** por tipo de equipamento
8. **Registro fotográfico** e evidências
9. **Controle de não conformidades** e planos de ação
10. **Dashboard** com status de conformidade

## Regras de Negócio

- Calcular P.V = pressão (kPa) × volume (m³)
- Categoria do vaso = f(Classe Fluido, Grupo PV)
- Inspeção extraordinária se inatividade > 6 meses (caldeiras) ou > 12 meses (vasos)
- Caldeiras com 25+ anos necessitam inspeção de vida remanescente
- Relatórios devem ser assinados digitalmente por PLH com CREA

## Stack Sugerida

- **Backend**: Node.js ou Python (FastAPI)
- **Frontend**: React/Next.js
- **Banco**: PostgreSQL
- **PDF**: ReportLab ou Puppeteer para laudos
- **Auth**: JWT com níveis de acesso (admin, PLH, inspetor, operador)

---

## Work State

### Build Setup
- Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui + Recharts + sonner
- Light theme, Inter font, blue-600 primary, `.no-print` for PDF-hideable elements
- Build passes with `npm run build` (no errors/warnings), dev server on `localhost:3000`

### Arquitetura
- **Store** (`src/lib/store.ts`): mutable arrays as single source of truth
- **Seed data** (`src/lib/seed-data.ts`): re-exports from store
- **Services** (`src/lib/services/`): CRUD layer (`clientes`, `equipamentos`, `inspecoes`, `laudos`) — cada service importa do store; abstracts CRUD behind interfaces for future API swap
- **Types** (`src/lib/types.ts`): TypeScript interfaces for all entities

### Funcionalidades Implementadas

#### Equipamentos
- Lista com filtro por empresa, cartões de resumo (Total, Vasos, Caldeiras), busca por nome/tag, layout em tabela
- Detalhe com informações do equipamento, classe de fluido, categoria, próximo inspeção

#### Inspeções
- Cadastro wizard (`/inspecoes/nova`): tipo de inspeção (`inicial`, `periodica`, `extraordinaria`, `extraordinaria_especial`, `vida_remanescente`), chama `inspecaoService.create()` e redireciona para detalhe, toast de confirmação
- Lista com filtros por empresa + status (andamento/concluídas), cartões de resumo (Total, Andamento, Concluídas, Vencendo), cards compactos com hover
- Detalhe com informações da inspeção, equipamento, responsável, datas, observações, link para o laudo

#### Laudos
- Lista com filtro por empresa, cartões de resumo (Total, Por vencer, Dentro prazo, Vencidos), links para inspeções
- Detalhe em tema claro, exportação PDF via `window.print()`, `.no-print` nos elementos escondidos

#### Clientes
- Lista centralizada com `max-w-5xl mx-auto`

#### Navegação
- Sidebar com links para Dashboard, Equipamentos, Inspeções, Laudos, Clientes
- Active matching com `pathname.startsWith()`

### Seed Data
- 6 clientes (empresas)
- 20 equipamentos (vasos + caldeiras)
- 13 inspeções (8 concluídas com laudo, 2 concluídas sem laudo, 3 em andamento)
- 8 laudos

### Decisões de UI
- `max-w-5xl mx-auto` em todas as páginas para largura consistente
- Select triggers com `w-full` sobrescrevendo `w-fit` do shadcn
- Filtros com placeholder `""` para exibir texto "Todas as empresas" / "Todos os status"
- Cards com `mb-6 last:mb-0` (24px gap entre cards)
- Counter cards no topo com filtro "Limpar filtros"
- Selects em flex container `flex items-center gap-3 flex-wrap` para largura automática

### Próximos Passos (prioridade)
1. API backend real (FastAPI)
2. Autenticação (JWT)
3. Geração de PDF server-side (ReportLab/Puppeteer)
4. Dashboard com gráficos (Recharts)
