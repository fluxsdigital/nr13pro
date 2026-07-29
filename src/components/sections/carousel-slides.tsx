export type SlideData = {
  id: string
  name: string
  content: React.ReactNode
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
          <h3 className="text-sm font-medium text-[#171717]">Dashboard</h3>
          <span className="text-xs text-[#9E9E9E]">Atualizado agora</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <KPI label="Válvulas" value="1.247" color="#C56A2D" />
          <KPI label="Inspeções" value="89" color="#2E7D32" />
          <KPI label="Vencidas" value="12" color="#C0392B" />
        </div>
        <div className="h-16 sm:h-20 bg-[#F7F5F2] rounded-lg flex items-end gap-1 sm:gap-2 p-2 sm:p-3">
          {[40, 65, 45, 80, 55, 70, 60, 85, 50, 75].map((h, i) => (
            <div key={i} className="flex-1 bg-[#C56A2D]/30 rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-[#676767]">
          <span>Meta: 95%</span>
          <span className="font-medium text-[#2E7D32]">92% conforme</span>
        </div>
      </div>
    ),
  },
  {
    id: "valvulas",
    name: "Lista de Válvulas",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Válvulas</h3>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-[#F7F5F2] flex items-center justify-center text-xs text-[#676767]">+</div>
          </div>
        </div>
        {[
          { tag: "PSV-1001", local: "Reator A", status: "OK", statusColor: "#2E7D32" },
          { tag: "PSV-1002", local: "Caldeira 2", status: "Vence hoje", statusColor: "#D18A00" },
          { tag: "PSV-1003", local: "Vaso B", status: "Atrasada", statusColor: "#C0392B" },
          { tag: "PSV-1004", local: "Torre C", status: "OK", statusColor: "#2E7D32" },
          { tag: "PSV-1005", local: "Trocador E", status: "OK", statusColor: "#2E7D32" },
        ].map((v) => (
          <div key={v.tag} className="flex items-center justify-between py-1.5 border-b border-[#EDE9E3] last:border-0">
            <div>
              <div className="text-sm font-medium text-[#171717]">{v.tag}</div>
              <div className="text-xs text-[#676767]">{v.local}</div>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: v.statusColor, backgroundColor: `${v.statusColor}10` }}>
              {v.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "detalhes",
    name: "Detalhes da Válvula",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">PSV-1001</h3>
          <span className="text-xs bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded-full font-medium">Ativo</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Tipo", value: "Segurança" },
            { label: "Fluido", value: "Vapor" },
            { label: "Pressão", value: "12,5 kgf/cm²" },
            { label: "Diâmetro", value: "8 polegadas" },
            { label: "Material", value: "Aço Carbono" },
            { label: "Fabricante", value: "Spirax" },
          ].map((f) => (
            <div key={f.label} className="bg-[#F7F5F2] rounded-lg p-2.5">
              <div className="text-xs text-[#676767]">{f.label}</div>
              <div className="text-sm font-medium text-[#171717]">{f.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#FFF8F0] border border-[#E8A96B]/30 rounded-lg p-3">
          <div className="text-xs font-medium text-[#C56A2D]">Próxima inspeção</div>
          <div className="text-sm text-[#171717]">15 de agosto de 2026</div>
        </div>
      </div>
    ),
  },
  {
    id: "checklist",
    name: "Checklist",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Checklist de Inspeção</h3>
        {[
          { text: "Identificação da válvula conferida", done: true },
          { text: "Condições da placa de identificação", done: true },
          { text: "Vazamentos aparentes", done: true },
          { text: "Condições do atuador", done: false },
          { text: "Teste de funcionalidade", done: false },
          { text: "Condições da tubulação", done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-1">
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${item.done ? "bg-[#2E7D32] border-[#2E7D32]" : "border-[#D4CFC8]"}`}>
              {item.done && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className={`text-sm ${item.done ? "text-[#171717]" : "text-[#676767]"}`}>{item.text}</span>
          </div>
        ))}
        <div className="text-xs text-[#676767]">3 de 6 itens concluídos</div>
      </div>
    ),
  },
  {
    id: "inspecao",
    name: "Inspeção",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Nova Inspeção</h3>
          <span className="text-xs text-[#676767]">Passo 2 de 4</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= 1 ? "bg-[#C56A2D]" : "bg-[#EDE9E3]"}`} />
          ))}
        </div>
        <div className="bg-[#F7F5F2] rounded-lg p-3">
          <div className="text-xs text-[#676767] mb-2">Dados da Inspeção</div>
          {[
            { label: "Inspetor", value: "Carlos Mendes" },
            { label: "Data", value: "28/07/2026" },
            { label: "Tipo", value: "Periódica" },
          ].map((f) => (
            <div key={f.label} className="flex justify-between py-1.5 text-sm border-b border-[#EDE9E3] last:border-0">
              <span className="text-[#676767]">{f.label}</span>
              <span className="text-[#171717] font-medium">{f.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-9 rounded-lg bg-[#F7F5F2] flex items-center justify-center text-xs text-[#676767]">Anterior</div>
          <div className="flex-1 h-9 rounded-lg bg-[#C56A2D] flex items-center justify-center text-xs text-white font-medium">Próximo</div>
        </div>
      </div>
    ),
  },
  {
    id: "fotos",
    name: "Fotos",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Fotos da Inspeção</h3>
          <div className="w-6 h-6 rounded bg-[#F7F5F2] flex items-center justify-center text-xs text-[#676767]">+</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["placa", "corpo", "atuador"].map((img) => (
            <div key={img} className="aspect-[4/3] rounded-lg bg-[#F1ECE6] flex flex-col items-center justify-center gap-1 text-[#676767]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span className="text-[10px] capitalize">{img}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-[#676767]">3 fotos anexadas</div>
      </div>
    ),
  },
  {
    id: "qr",
    name: "QR Code",
    content: (
      <div className="p-4 sm:p-6 flex flex-col items-center gap-4">
        <h3 className="text-sm font-medium text-[#171717]">QR Code da Válvula</h3>
        <div className="w-32 h-32 bg-white border-2 border-[#EDE9E3] rounded-lg flex items-center justify-center p-2">
          <div className="w-full h-full relative">
            <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-[#171717]" />
            <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-[#171717]" />
            <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-[#171717]" />
            <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-[#171717]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#171717] rounded" />
            </div>
          </div>
        </div>
        <div className="text-xs text-[#676767]">PSV-1001</div>
        <div className="bg-[#F7F5F2] rounded-lg px-4 py-2 text-xs text-[#676767]">Escaneie para acessar o histórico</div>
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
          <div className="bg-[#C0392B]/10 text-[#C0392B] text-xs px-2 py-0.5 rounded-full font-medium">PDF</div>
        </div>
        <div className="bg-white border border-[#EDE9E3] rounded-lg p-3">
          <div className="text-xs text-[#676767] mb-2">NR-13 - Laudo de Inspeção</div>
          <div className="text-[10px] text-[#9E9E9E] leading-relaxed">
            <p>Cliente: Indústria ABC Ltda.</p>
            <p>Válvula: PSV-1001 - Segurança</p>
            <p>Data: 28/07/2026</p>
            <p>Inspetor: Carlos Mendes - CREA: 12345</p>
          </div>
          <div className="mt-2 pt-2 border-t border-[#EDE9E3] flex items-center justify-between text-xs">
            <span className="text-[#676767]">Assinatura digital ✓</span>
            <span className="text-[#2E7D32] font-medium">Conforme</span>
          </div>
        </div>
        <div className="h-9 rounded-lg bg-[#C56A2D] flex items-center justify-center text-xs text-white font-medium">Baixar PDF</div>
      </div>
    ),
  },
  {
    id: "agenda",
    name: "Agenda",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Agenda</h3>
          <span className="text-xs text-[#676767]">Julho 2026</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
            <div key={d} className="text-[#9E9E9E] py-1">{d}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i} className={`py-1 rounded-full text-xs ${i + 1 === 15 ? "bg-[#C56A2D] text-white" : i + 1 === 28 ? "bg-[#F7F5F2] text-[#C56A2D]" : "text-[#171717]"}`}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="bg-[#F7F5F2] rounded-lg p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#C56A2D]" />
            <span className="text-xs text-[#171717]">Inspeção - PSV-1002</span>
            <span className="text-xs text-[#676767] ml-auto">15 jul</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-1 h-1 rounded-full bg-[#D18A00]" />
            <span className="text-xs text-[#171717]">Inspeção - PSV-1005</span>
            <span className="text-xs text-[#676767] ml-auto">28 jul</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "clientes",
    name: "Clientes",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">Clientes</h3>
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded bg-[#F7F5F2] flex items-center justify-center text-xs text-[#676767]">+</div>
          </div>
        </div>
        {[
          { name: "PetroChem S.A.", valvulas: 342, cidade: "Cubatão" },
          { name: "Indústria ABC Ltda.", valvulas: 156, cidade: "São Paulo" },
          { name: "Refinaria Nova Era", valvulas: 289, cidade: "Campos" },
          { name: "Papel e Celulose XPTO", valvulas: 98, cidade: "Curitiba" },
          { name: "Alimentos Bom Sabor", valvulas: 45, cidade: "Campinas" },
        ].map((c) => (
          <div key={c.name} className="flex items-center justify-between py-1.5 border-b border-[#EDE9E3] last:border-0">
            <div>
              <div className="text-sm font-medium text-[#171717]">{c.name}</div>
              <div className="text-xs text-[#676767]">{c.cidade} - {c.valvulas} válvulas</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#2E7D32]" />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "empresas",
    name: "Empresas",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Unidades</h3>
        {[
          { name: "Matriz", endereco: "Av. Paulista, 1000", stats: "22 insp. este mês" },
          { name: "Filial Campinas", endereco: "Rod. D. Pedro, km 120", stats: "15 insp. este mês" },
          { name: "Filial Santos", endereco: "Av. Conselheiro, 500", stats: "8 insp. este mês" },
        ].map((u) => (
          <div key={u.name} className="bg-[#F7F5F2] rounded-lg p-3">
            <div className="text-sm font-medium text-[#171717]">{u.name}</div>
            <div className="text-xs text-[#676767]">{u.endereco}</div>
            <div className="text-xs text-[#2E7D32] mt-1">{u.stats}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "historico",
    name: "Histórico",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Histórico - PSV-1001</h3>
        {[
          { data: "15/01/2026", tipo: "Periódica", responsavel: "Carlos M.", resultado: "Conforme", color: "#2E7D32" },
          { data: "12/07/2025", tipo: "Periódica", responsavel: "Ana S.", resultado: "Conforme", color: "#2E7D32" },
          { data: "03/02/2025", tipo: "Extraordinária", responsavel: "Carlos M.", resultado: "Conforme", color: "#2E7D32" },
          { data: "18/09/2024", tipo: "Periódica", responsavel: "Pedro L.", resultado: "Não conforme", color: "#C0392B" },
          { data: "10/03/2024", tipo: "Periódica", responsavel: "Ana S.", resultado: "Conforme", color: "#2E7D32" },
        ].map((h) => (
          <div key={`${h.data}-${h.tipo}`} className="flex items-center justify-between py-1.5 border-b border-[#EDE9E3] last:border-0">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: h.color }} />
                <span className="text-sm text-[#171717]">{h.data}</span>
              </div>
              <div className="text-xs text-[#676767] ml-3.5">{h.tipo} - {h.responsavel}</div>
            </div>
            <span className="text-xs font-medium" style={{ color: h.color }}>{h.resultado}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "relatorios",
    name: "Relatórios",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#171717]">Relatórios</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Inspeções do Mês", icon: "📊", value: "22" },
            { name: "Válvulas por Cliente", icon: "📋", value: "6" },
            { name: "Não Conformidades", icon: "⚠️", value: "3" },
            { name: "Vencimentos", icon: "📅", value: "12" },
          ].map((r) => (
            <div key={r.name} className="bg-[#F7F5F2] rounded-lg p-3">
              <div className="text-lg mb-1">{r.icon}</div>
              <div className="text-xs text-[#676767]">{r.name}</div>
              <div className="text-sm font-semibold text-[#171717]">{r.value}</div>
            </div>
          ))}
        </div>
        <div className="h-8 rounded-lg bg-[#C56A2D] flex items-center justify-center text-xs text-white font-medium">Gerar Relatório Completo</div>
      </div>
    ),
  },
  {
    id: "mobile",
    name: "Dashboard Mobile",
    content: (
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#171717]">NR-13 Pro</h3>
          <div className="w-6 h-6 rounded-full bg-[#C56A2D] flex items-center justify-center text-xs text-white font-medium">C</div>
        </div>
        <div className="bg-[#F7F5F2] rounded-lg p-3">
          <div className="text-xs text-[#676767]">Próxima inspeção</div>
          <div className="text-sm font-medium text-[#171717]">PSV-1002 - Hoje 14:00</div>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-[#C56A2D]/10 text-[#C56A2D] px-2 py-0.5 rounded-full">Iniciar</span>
            <span className="text-xs bg-[#F7F5F2] text-[#676767] px-2 py-0.5 rounded-full">Adiar</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-white border border-[#EDE9E3] rounded-lg p-2.5 text-center">
            <div className="text-lg font-semibold text-[#C56A2D]">12</div>
            <div className="text-[10px] text-[#676767]">Vencidas</div>
          </div>
          <div className="flex-1 bg-white border border-[#EDE9E3] rounded-lg p-2.5 text-center">
            <div className="text-lg font-semibold text-[#2E7D32]">89</div>
            <div className="text-[10px] text-[#676767]">OK</div>
          </div>
        </div>
        <div className="bg-[#FFF8F0] border border-[#E8A96B]/30 rounded-lg p-3">
          <div className="text-xs text-[#C56A2D]">3 válvulas vencem esta semana</div>
        </div>
      </div>
    ),
  },
]

export { slides }
