import { BarChart3, Bell, Calendar, CheckCircle, ClipboardList, FileText, QrCode, Users } from "lucide-react"

function SlideFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-w-0 flex-[0_0_100%] select-none">
      {children}
    </div>
  )
}

export function DashboardSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Dashboard</p>
            <h2 className="text-sm font-semibold text-text-primary">Visão Geral</h2>
          </div>
          <Bell className="h-3.5 w-3.5 text-text-muted" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Válvulas", value: "247", color: "text-primary" },
            { label: "Inspeções", value: "18", color: "text-success" },
            { label: "Vencidas", value: "3", color: "text-danger" },
          ].map((k) => (
            <div key={k.label} className="rounded-lg bg-card-hover p-2.5">
              <p className="text-[18px] font-semibold tracking-tight text-text-primary">{k.value}</p>
              <p className="text-[9px] text-text-muted">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-lg border border-border p-3">
          <p className="text-[9px] font-medium text-text-muted uppercase tracking-wider mb-2">Próximas Inspeções</p>
          {["V-204 — 7 dias", "V-089 — 15 dias", "V-156 — 30 dias"].map((item) => (
            <div key={item} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[10px] text-text-secondary">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}

export function ValvesSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Equipamentos</p>
            <h2 className="text-sm font-semibold text-text-primary">Cadastro de Válvulas</h2>
          </div>
          <QrCode className="h-3.5 w-3.5 text-text-muted" />
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">V</span>
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">V-204</p>
              <p className="text-[9px] text-text-muted">Separador de Gás</p>
            </div>
            <span className="ml-auto text-[9px] font-medium text-success px-2 py-0.5 rounded-full bg-success-subtle">Ativa</span>
          </div>
          {[
            { label: "Tipo", value: "Vaso de Pressão" },
            { label: "Fluido", value: "Classe B" },
            { label: "Categoria", value: "III" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between py-1 border-b border-border last:border-0">
              <span className="text-[9px] text-text-muted">{row.label}</span>
              <span className="text-[10px] font-medium text-text-primary">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px] text-text-muted">
          <div className="h-6 w-6 rounded border border-border flex items-center justify-center">
            <span className="text-[8px]">+</span>
          </div>
          Adicionar válvula
        </div>
      </div>
    </SlideFrame>
  )
}

export function InspectionsSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Inspeções</p>
            <h2 className="text-sm font-semibold text-text-primary">Lista de Inspeções</h2>
          </div>
          <ClipboardList className="h-3.5 w-3.5 text-text-muted" />
        </div>
        {[
          { valve: "V-204", date: "15/08/2026", status: "Concluída", color: "text-success" },
          { valve: "V-089", date: "22/08/2026", status: "Em andamento", color: "text-warning" },
          { valve: "V-156", date: "10/09/2026", status: "Agendada", color: "text-text-muted" },
        ].map((ins) => (
          <div key={ins.valve} className="rounded-lg border border-border p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-card-hover flex items-center justify-center text-xs font-semibold text-text-primary">
              {ins.valve}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-text-primary">{ins.valve}</p>
              <p className="text-[9px] text-text-muted">Vence: {ins.date}</p>
            </div>
            <span className={`text-[9px] font-medium ${ins.color} px-2 py-0.5 rounded-full bg-card-hover`}>
              {ins.status}
            </span>
          </div>
        ))}
      </div>
    </SlideFrame>
  )
}

export function InspectionDetailSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Detalhes</p>
            <h2 className="text-sm font-semibold text-text-primary">Inspeção V-204</h2>
          </div>
          <CheckCircle className="h-3.5 w-3.5 text-success" />
        </div>
        <div className="rounded-lg border border-border p-3 space-y-2">
          {[
            { item: "Pressão de teste", value: "12,5 kgf/cm²", ok: true },
            { item: "Espessura mínima", value: "4,2 mm", ok: true },
            { item: "Integridade", value: "Visual ok", ok: true },
            { item: "Válv. segurança", value: "Inspecionada", ok: true },
          ].map((row) => (
            <div key={row.item} className="flex items-center justify-between py-1 border-b border-border last:border-0">
              <span className="text-[10px] text-text-secondary">{row.item}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-text-primary">{row.value}</span>
                {row.ok && <CheckCircle className="h-3 w-3 text-success" />}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-text-muted">Assinatura digital pendente</p>
      </div>
    </SlideFrame>
  )
}

export function ReportsSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Relatórios</p>
            <h2 className="text-sm font-semibold text-text-primary">Relatórios Gerenciais</h2>
          </div>
          <BarChart3 className="h-3.5 w-3.5 text-text-muted" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Por Cliente", value: "12 empresas" },
            { label: "Por Unidade", value: "8 plantas" },
            { label: "Por Status", value: "3 críticas" },
            { label: "Por Período", value: "Jan-Jun" },
          ].map((r) => (
            <div key={r.label} className="rounded-lg border border-border p-2.5">
              <p className="text-[9px] text-text-muted">{r.label}</p>
              <p className="text-xs font-semibold text-text-primary mt-0.5">{r.value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-card-hover p-3 text-center">
          <p className="text-[9px] text-text-muted">Exportar relatório completo</p>
        </div>
      </div>
    </SlideFrame>
  )
}

export function PdfSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Laudo</p>
            <h2 className="text-sm font-semibold text-text-primary">Laudo V-204</h2>
          </div>
          <FileText className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex-1 rounded-lg border border-border p-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-6 rounded bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-text-primary">Laudo_V-204_2026.pdf</p>
              <p className="text-[8px] text-text-muted">245 KB · PDF/A</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {["Dados do equipamento", "Checklist técnico", "Registro fotográfico", "Assinatura digital"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[9px] text-text-secondary">
                <CheckCircle className="h-2.5 w-2.5 text-success" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}

export function AgendaSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Agenda</p>
            <h2 className="text-sm font-semibold text-text-primary">Próximas Inspeções</h2>
          </div>
          <Calendar className="h-3.5 w-3.5 text-text-muted" />
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
              <span key={d} className="text-[8px] text-text-muted text-center font-medium">{d}</span>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <span key={i} className={`text-[8px] text-center rounded-full w-5 h-5 flex items-center justify-center ${i + 1 === 15 ? "bg-primary text-white" : "text-text-secondary"}`}>
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-card-hover p-2.5 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-danger" />
          <span className="text-[9px] text-text-secondary">V-204 — Vence em 7 dias</span>
        </div>
      </div>
    </SlideFrame>
  )
}

export function ConfigSlide() {
  return (
    <SlideFrame>
      <div className="h-full p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Sistema</p>
            <h2 className="text-sm font-semibold text-text-primary">Configurações</h2>
          </div>
          <Users className="h-3.5 w-3.5 text-text-muted" />
        </div>
        <div className="space-y-2">
          {[
            { label: "Perfil da Empresa", desc: "Dados e logo" },
            { label: "Equipe", desc: "3 usuários ativos" },
            { label: "Notificações", desc: "Alertas ativados" },
            { label: "Assinatura Digital", desc: "Certificado válido" },
            { label: "Template de Laudo", desc: "Personalizado" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border p-2.5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-text-primary">{item.label}</p>
                <p className="text-[8px] text-text-muted">{item.desc}</p>
              </div>
              <div className="h-5 w-5 rounded border border-border flex items-center justify-center">
                <span className="text-[8px] text-text-muted">&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}
