# NR-13 Pro — API REST

API REST em **NestJS + Prisma** que atende o frontend NR-13 Pro (Next.js).
Espelha exatamente a superfície dos serviços mock do frontend (`src/lib/services/`).

## Stack

- **NestJS 11** (ESM, `"type": "module"`)
- **Prisma 7** com driver adapter `@prisma/adapter-better-sqlite3`
- **SQLite** (dev) — troque o `provider` no schema para Postgres/MySQL em produção
- **JWT** (`@nestjs/jwt`) + **bcrypt** para autenticação
- **class-validator / class-transformer** para validação de DTOs

## Estrutura

```
api/
├── prisma/schema.prisma        ← modelo de dados (10 tabelas)
├── src/
│   ├── main.ts                 ← bootstrap, CORS, prefixo /api, ValidationPipe global
│   ├── app.module.ts           ← módulo raiz + guard JWT global
│   ├── prisma/                 ← PrismaService (adapter SQLite)
│   ├── common/                 ← @Public(), @CurrentUser(), JwtAuthGuard
│   ├── nr13/                   ← classificação NR-13 (portado de src/lib/nr13.ts)
│   ├── auth/                   ← signup, login, me, plan
│   ├── clientes/               ← CRUD
│   ├── equipamentos/           ← CRUD + auto-classificação NR-13
│   ├── inspecoes/              ← CRUD com nested create/update
│   ├── laudos/                 ← CRUD + vínculo com inspeção
│   └── notifications/          ← list, read, read-all, delete, unread-count
```

## Como rodar

```bash
cd api
npm install
npx prisma migrate dev --name init   # cria o banco SQLite
npm run start:dev                    # http://localhost:3333/api
```

## Autenticação

Todas as rotas exigem `Authorization: Bearer <token>` exceto `POST /api/auth/signup` e `POST /api/auth/login`.
O token expira em 30 dias. Cada usuário só enxerga os próprios dados (multi-tenant por `userId`).

## Endpoints

### Auth
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/signup` | Cria usuário `{name, email, password, crea}` |
| POST | `/api/auth/login` | Login `{email, password}` → `{user, token, expiresAt}` |
| GET | `/api/auth/me` | Usuário autenticado |
| PATCH | `/api/auth/me` | Atualiza perfil |
| POST | `/api/auth/plan` | Define plano `{plan: "Mensal" \| "Anual"}` |

### NR-13 (utilitários de classificação)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/nr13/classificar-vaso` | `{classeFluido, pressaoKpa, volumeM3}` → P.V, grupo, categoria |
| POST | `/api/nr13/classificar-caldeira` | `{pressaoKpa}` → categoria A/B (≥ 1960 kPa) |
| POST | `/api/nr13/periodicidade` | `{categoria, temSPIE}` → prazos externo/interno |
| POST | `/api/nr13/pmta-casco` | PMTA casco cilíndrico `(S·E·e)/(R+0.6e)` |
| POST | `/api/nr13/pmta-tampo` | PMTA tampo elíptico `(S·E·e)/(R·K+0.1e)` |

### Clientes
`GET /api/clientes` · `GET /api/clientes/:id` · `POST /api/clientes` · `PATCH /api/clientes/:id` · `DELETE /api/clientes/:id`

### Equipamentos
`GET /api/equipamentos?clienteId=&search=` · `GET /api/equipamentos/:id` · `POST /api/equipamentos` · `PATCH /api/equipamentos/:id` · `DELETE /api/equipamentos/:id`

> No **create/update**, a categoria e o grupo de risco são calculados automaticamente pela lógica NR-13 (espelha o `autoClassificar()` do frontend).

### Inspeções
`GET /api/inspecoes?equipamentoId=` · `GET /api/inspecoes/:id` · `POST /api/inspecoes` · `PATCH /api/inspecoes/:id` · `DELETE /api/inspecoes/:id`

> O `POST` aceita dados aninhados: `parametrosUltrassom`, `checklist[]`, `medicoes[]`, `anomalias[]`, `dispositivosSeguranca[]`.
> No `PATCH`, sub-entidades enviadas substituem as existentes (deleteMany + create).

### Laudos
`GET /api/laudos` · `GET /api/laudos/inspecao/:inspecaoId` · `GET /api/laudos/:id` · `POST /api/laudos` · `PATCH /api/laudos/:id` · `DELETE /api/laudos/:id`

### Notificações
`GET /api/notifications` · `GET /api/notifications/unread-count` · `POST /api/notifications` · `POST /api/notifications/:id/read` · `POST /api/notifications/read-all` · `DELETE /api/notifications/:id`

## Modelo de dados (Prisma)

`User`, `Cliente`, `Equipamento`, `Inspecao`, `ParametrosUltrassom`, `ChecklistItem`, `Medicao`, `Anomalia`, `DispositivoSeguranca`, `Laudo`, `Notification` — espelham `src/lib/types.ts` do frontend.

## Variáveis de ambiente (`.env`)

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="troque_em_producao"
CORS_ORIGIN="http://localhost:3000"
PORT=3333
```

## Produção

- Troque o datasource para Postgres (`provider = "postgresql"` + `@prisma/adapter-pg`)
- Defina `JWT_SECRET` forte
- Ajuste `CORS_ORIGIN` para o domínio do frontend
