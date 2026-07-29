export type SlideData = {
  id: string
  name: string
  content: React.ReactNode
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color, backgroundColor: `${color}15` }}>
      {label}
    </span>
  )
}

function KPI({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#F7F5F2] rounded-lg p-3 sm:p-4">
      <div className="text-xs text-[#676767] mb-1">{label}</div>
      <div className="text-lg sm:text-xl font-semibold" style={{ color }}>{value}</div>
    </div>
  )
}

const slides: SlideData[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#171717] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-[#171717]">Dashboard</span>
          </div>
          <span className="text-xs text-[#9E9E9E]">NR-13 Pro</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <KPI label="Equipamentos" value="247" color="#C56A2D" />
          <KPI label="Inspeções" value="89" color="#2E7D32" />
          <KPI label="Pendentes" value="12" color="#C0392B" />
        </div>
        <div className="bg-[#F7F5F2] rounded-lg p-3">
          <div className="text-xs text-[#676767] mb-2">Progresso por Cliente</div>
          {[
            { name: "PetroVale Indústria", total: 45, pct: 82 },
            { name: "Química Nacional S.A.", total: 32, pct: 65 },
            { name: "Aços Forte Metalurgia", total: 28, pct: 90 },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-3 py-1.5">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-[#171717] truncate">{c.name}</span>
                  <span className="text-[#676767]">{c.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#EDE9E3] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C56A2D]" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
              <span className="text-xs text-[#676767]">{c.total} eq.</span>
            </div>
          ))}
        </div>
        <div className="bg-[#FFF8F0] border border-[#E8A96B]/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C56A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="text-xs text-[#C56A2D]">3 certificados disponíveis para emissão</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "equipamentos",
    name: "Equipamentos",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Equipamentos</h3>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-[#F7F5F2] flex items-center justify-center">+</div>
          </div>
        </div>
        {[
          { tag: "V-101", tipo: "Vaso", desc: "Reservatório de Ar Comprimido", cat: "IV", cliente: "PetroVale" },
          { tag: "CAL-101", tipo: "Caldeira", desc: "Caldeira de Recuperação", cat: "B", cliente: "Química Nacional" },
          { tag: "R-201", tipo: "Vaso", desc: "Reator Químico de Síntese", cat: "I", cliente: "Aços Forte" },
          { tag: "TQ-501", tipo: "Tanque", desc: "Tanque de Maturação", cat: "V", cliente: "Cervejaria do Vale" },
          { tag: "V-102", tipo: "Vaso", desc: "Separador de Gás Natural", cat: "I", cliente: "PetroVale" },
        ].map((e) => (
          <div key={e.tag} className="flex items-center justify-between py-1.5 border-b border-[#EDE9E3] last:border-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F8F0E8] flex items-center justify-center text-xs text-[#C56A2D] font-medium">{e.tipo[0]}</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-[#171717]">{e.tag}</span>
                  <Pill label={e.tipo} color="#676767" />
                  <Pill label={e.cat} color="#C56A2D" />
                </div>
                <div className="text-xs text-[#676767]">{e.desc} • {e.cliente}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "equipamento-detail",
    name: "Detalhes do Equipamento",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">V-101</h3>
          <Pill label="Vaso • Cat IV" color="#C56A2D" />
        </div>
        <p className="text-xs text-[#676767]">Reservatório de Ar Comprimido</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Fabricante", value: "Spirax Sarco" },
            { label: "Nº Série", value: "SS-2024-8912" },
            { label: "Pressão Op.", value: "12,5 kPa" },
            { label: "Volume", value: "8,4 m³" },
            { label: "PMTA", value: "15,0 kPa" },
            { label: "Fluido", value: "Ar Comprimido (C)" },
          ].map((f) => (
            <div key={f.label} className="bg-[#F7F5F2] rounded-lg p-2.5">
              <div className="text-xs text-[#676767]">{f.label}</div>
              <div className="text-sm font-medium text-[#171717]">{f.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#F8F0E8] border border-[#E8A96B]/30 rounded-lg p-3">
          <div className="text-xs font-medium text-[#C56A2D]">Classificação NR-13</div>
          <div className="text-xs text-[#676767] mt-0.5">Categoria IV — Risco baixo. PLH com CREA ativo.</div>
          <div className="text-xs text-[#676767]">Periodicidade: Ext. 3 ano(s) • Int. 4 ano(s)</div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-8 rounded-lg bg-[#C56A2D] flex items-center justify-center text-xs text-white font-medium">Nova Inspeção</div>
        </div>
      </div>
    ),
  },
  {
    id: "inspecoes",
    name: "Inspeções",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Inspeções</h3>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-[#F7F5F2] flex items-center justify-center">+</div>
          </div>
        </div>
        {[
          { tipo: "Periódica", eq: "CAL-101", data: "15 jun a 28 jul 2026", status: "Concluída", statusColor: "#2E7D32" },
          { tipo: "Periódica", eq: "V-101", data: "20 jul a 30 jul 2026", status: "Em andamento", statusColor: "#D18A00" },
          { tipo: "Extraordinária", eq: "R-201", data: "10 jul a 25 jul 2026", status: "Concluída", statusColor: "#2E7D32" },
          { tipo: "Inicial", eq: "TQ-501", data: "01 ago a 05 ago 2026", status: "Agendada", statusColor: "#676767" },
        ].map((ins, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-[#EDE9E3] last:border-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ins.statusColor }} />
              <div>
                <div className="text-sm text-[#171717]">{ins.tipo}</div>
                <div className="text-xs text-[#676767]">{ins.eq} • {ins.data}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Pill label={ins.status} color={ins.statusColor} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "inspecao-detail",
    name: "Detalhes da Inspeção",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Inspeção Periódica</h3>
          <Pill label="Concluída" color="#2E7D32" />
        </div>
        <p className="text-xs text-[#676767]">CAL-101 — Caldeira de Recuperação</p>
        <div className="flex gap-1">
          {["Resumo", "Medições", "Anomalias", "Dispositivos"].map((tab, i) => (
            <div key={tab} className={`flex-1 text-center py-1.5 text-xs rounded-lg ${i === 0 ? "bg-[#F7F5F2] text-[#171717] font-medium" : "text-[#676767]"}`}>
              {tab}
            </div>
          ))}
        </div>
        <div className="bg-[#F7F5F2] rounded-lg p-3">
          <div className="text-xs text-[#676767] mb-2">Exames Realizados</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Exame Externo", done: true },
              { label: "Exame Interno", done: true },
              { label: "Teste Hidrost.", done: false },
            ].map((ex) => (
              <div key={ex.label} className={`text-xs text-center py-1.5 rounded-lg ${ex.done ? "bg-[#EDF5ED] text-[#2E7D32]" : "bg-[#EDE9E3] text-[#676767]"}`}>
                {ex.done ? "✓" : "—"} {ex.label}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#EDF5ED] border border-[#2E7D32]/20 rounded-lg p-3">
          <div className="text-xs font-medium text-[#2E7D32]">Parecer Técnico</div>
          <p className="text-xs text-[#676767] mt-1">Equipamento em condições operacionais. Recomenda-se nova inspeção em 12 meses.</p>
        </div>
      </div>
    ),
  },
  {
    id: "medicoes",
    name: "Medições",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Medições de Espessura (Ultrassom)</h3>
        <div className="space-y-2">
          {[
            { ponto: "P01", atual: "12,4", anterior: "12,6", variacao: "-0,2", cor: "#C0392B" },
            { ponto: "P02", atual: "15,8", anterior: "15,7", variacao: "+0,1", cor: "#2E7D32" },
            { ponto: "P03", atual: "11,2", anterior: "11,2", variacao: "0,0", cor: "#2E7D32" },
            { ponto: "P04", atual: "14,5", anterior: "14,8", variacao: "-0,3", cor: "#C0392B" },
            { ponto: "P05", atual: "10,9", anterior: "10,8", variacao: "+0,1", cor: "#2E7D32" },
          ].map((m) => (
            <div key={m.ponto} className="flex items-center justify-between py-1.5 border-b border-[#EDE9E3] last:border-0 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#171717] w-8">{m.ponto}</span>
                <span className="text-xs text-[#171717]">{m.atual} mm</span>
                <span className="text-xs text-[#676767]">ant. {m.anterior}</span>
              </div>
              <span className="text-xs font-medium" style={{ color: m.cor }}>{m.variacao} mm</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "anomalias",
    name: "Anomalias",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Anomalias Encontradas</h3>
        {[
          { desc: "Corrosão localizada na base do costado", grav: "Média", resolvida: true, cor: "#C56A2D" },
          { desc: "Válvula de segurança com vazamento", grav: "Crítica", resolvida: false, cor: "#C0392B" },
          { desc: "Isolamento térmico danificado", grav: "Baixa", resolvida: true, cor: "#676767" },
        ].map((a, i) => (
          <div key={i} className="bg-[#F7F5F2] rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <Pill label={a.grav} color={a.cor} />
              <Pill label={a.resolvida ? "Resolvida" : "Pendente"} color={a.resolvida ? "#2E7D32" : "#D18A00"} />
            </div>
            <p className="text-xs text-[#171717]">{a.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "laudo",
    name: "Laudo PDF",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Laudo Técnico</h3>
          <Pill label="NR-13" color="#C0392B" />
        </div>
        <div className="bg-white border border-[#EDE9E3] rounded-lg p-3 text-xs leading-relaxed">
          <div className="font-medium text-[#171717] mb-2">RELATÓRIO DE INSPEÇÃO DE SEGURANÇA</div>
          <div className="text-[#676767] space-y-1">
            <p>Laudo: NR13-LD-2026-0001</p>
            <p>Cliente: PetroVale Indústria Ltda. — 11.345.678/0001-90</p>
            <p>Equipamento: V-101 — Reservatório de Ar Comprimido</p>
            <p>Inspeção: Periódica — 15/06/2026 a 28/07/2026</p>
            <p>PLH: Eng. Carlos Alberto Santos — CREA-SP 123.456</p>
          </div>
          <div className="mt-2 pt-2 border-t border-[#EDE9E3] flex items-center justify-between">
            <span className="text-[#2E7D32] flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Assinatura digital
            </span>
            <span className="font-medium text-[#2E7D32]">Conforme</span>
          </div>
        </div>
        <div className="bg-[#FFF8F0] border border-[#E8A96B]/30 rounded-lg p-2.5">
          <div className="text-xs text-[#C56A2D] font-medium">Próxima inspeção</div>
          <div className="text-xs text-[#171717]">15 de junho de 2027</div>
        </div>
      </div>
    ),
  },
  {
    id: "clientes",
    name: "Empresas",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Empresas Clientes</h3>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-[#F7F5F2] flex items-center justify-center">+</div>
          </div>
        </div>
        {[
          { name: "PetroVale Indústria Ltda.", equip: 45, status: "2 vencidas", statusColor: "#C0392B" },
          { name: "Química Nacional S.A.", equip: 32, status: "Em dia", statusColor: "#2E7D32" },
          { name: "Aços Forte Metalurgia", equip: 28, status: "Em dia", statusColor: "#2E7D32" },
          { name: "Cervejaria do Vale S.A.", equip: 18, status: "1 próxima", statusColor: "#D18A00" },
          { name: "Usina de Açúcar DoceRio", equip: 22, status: "Em dia", statusColor: "#2E7D32" },
        ].map((c) => (
          <div key={c.name} className="flex items-center justify-between py-1.5 border-b border-[#EDE9E3] last:border-0">
            <div>
              <div className="text-sm text-[#171717]">{c.name}</div>
              <div className="text-xs text-[#676767]">{c.equip} equipamentos</div>
            </div>
            <Pill label={c.status} color={c.statusColor} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "agenda",
    name: "Agenda",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Inspeções do Mês</h3>
          <span className="text-xs text-[#676767]">Julho 2026</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
            <div key={d} className="text-[#9E9E9E] py-1">{d}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i} className={`py-1 rounded-full text-xs ${[15, 20, 25].includes(i + 1) ? "bg-[#C56A2D] text-white" : [10, 28].includes(i + 1) ? "bg-[#F8F0E8] text-[#C56A2D]" : "text-[#171717]"}`}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="space-y-2 bg-[#F7F5F2] rounded-lg p-3">
          {[
            { date: "15 jul", eq: "V-102", tipo: "Periódica", color: "#C56A2D" },
            { date: "20 jul", eq: "CAL-101", tipo: "Periódica", color: "#C56A2D" },
            { date: "25 jul", eq: "R-201", tipo: "Extraordinária", color: "#D18A00" },
            { date: "28 jul", eq: "TQ-501", tipo: "Inicial", color: "#2E7D32" },
          ].map((ev) => (
            <div key={`${ev.date}-${ev.eq}`} className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ev.color }} />
              <span className="text-[#676767]">{ev.date}</span>
              <span className="text-[#171717]">{ev.eq}</span>
              <span className="text-[#676767]">— {ev.tipo}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "nova-inspecao",
    name: "Nova Inspeção",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Nova Inspeção</h3>
          <span className="text-xs text-[#676767]">Passo 2 de 6</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= 1 ? "bg-[#C56A2D]" : "bg-[#EDE9E3]"}`} />
          ))}
        </div>
        <div className="text-xs font-medium text-[#171717]">Dados da Inspeção</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#F7F5F2] rounded-lg p-3">
            <div className="text-xs text-[#676767] mb-1">Data Início</div>
            <div className="text-sm text-[#171717]">28/07/2026</div>
          </div>
          <div className="bg-[#F7F5F2] rounded-lg p-3">
            <div className="text-xs text-[#676767] mb-1">Data Término</div>
            <div className="text-sm text-[#171717]">28/07/2026</div>
          </div>
        </div>
        <div className="bg-[#F7F5F2] rounded-lg p-3">
          <div className="text-xs text-[#676767] mb-1">Tipo de Inspeção</div>
          <div className="text-sm font-medium text-[#171717]">Periódica</div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-8 rounded-lg bg-[#F7F5F2] flex items-center justify-center text-xs text-[#676767]">Voltar</div>
          <div className="flex-1 h-8 rounded-lg bg-[#C56A2D] flex items-center justify-center text-xs text-white font-medium">Avançar</div>
        </div>
      </div>
    ),
  },
  {
    id: "economia",
    name: "Economia",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Economia</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#EDF5ED] border border-[#2E7D32]/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-semibold text-[#2E7D32]">R$ 47.500</div>
            <div className="text-xs text-[#676767] mt-1">Economia em multas evitadas</div>
          </div>
          <div className="bg-[#F8F0E8] border border-[#E8A96B]/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-semibold text-[#C56A2D]">320 h</div>
            <div className="text-xs text-[#676767] mt-1">Horas economizadas</div>
          </div>
        </div>
        <div className="bg-[#F7F5F2] rounded-lg p-3">
          <div className="text-xs text-[#676767] mb-2">Custos com inspeções</div>
          <div className="h-16 flex items-end gap-2">
            {[60, 75, 55, 80, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm bg-[#C56A2D]" style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.4 }} />
                <span className="text-[10px] text-[#676767]">{["Fev","Mar","Abr","Mai","Jun","Jul"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "dispositivos",
    name: "Dispositivos",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Dispositivos de Segurança</h3>
        {[
          { tipo: "Válvula de Segurança", tag: "PSV-101", ok: true },
          { tipo: "Disco de Ruptura", tag: "DR-201", ok: true },
          { tipo: "Manômetro", tag: "MAN-301", ok: false },
          { tipo: "Termômetro", tag: "TER-401", ok: true },
          { tipo: "Visor de Nível", tag: "VN-501", ok: false },
        ].map((d) => (
          <div key={d.tag} className="flex items-center justify-between py-1.5 border-b border-[#EDE9E3] last:border-0">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${d.ok ? "bg-[#2E7D32]" : "bg-[#C0392B]"}`} />
              <div>
                <div className="text-sm text-[#171717]">{d.tipo}</div>
                <div className="text-xs text-[#676767]">{d.tag}</div>
              </div>
            </div>
            <Pill label={d.ok ? "Aprovado" : "Reprovado"} color={d.ok ? "#2E7D32" : "#C0392B"} />
          </div>
        ))}
      </div>
    ),
  },
]

export { slides }
