"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useReducedMotion } from "./motion-provider"

export function DashboardPreview() {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <Section
      id="dashboard"
      title="Dashboard em tempo real"
      subtitle="Visualize KPIs, gráficos e alertas em um painel limpo e objetivo."
      className="bg-white"
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white border border-[#EDE9E3] rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(23,23,23,0.06)]"
      >
        <div className="p-4 sm:p-6 border-b border-[#EDE9E3]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#171717]">Resumo do Mês</h3>
            <span className="text-xs text-[#676767]">Julho 2026</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Válvulas", value: "1.247", change: "+12 este mês", color: "#C56A2D" },
              { label: "Inspeções realizadas", value: "89", change: "+8% vs. mês anterior", color: "#2E7D32" },
              { label: "A vencer (30 dias)", value: "34", change: "Próximas 2 semanas: 12", color: "#D18A00" },
              { label: "Vencidas", value: "12", change: "Críticas: 3", color: "#C0392B" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-[#F7F5F2] rounded-lg p-3 sm:p-4">
                <div className="text-xs text-[#676767] mb-1">{kpi.label}</div>
                <div className="text-xl sm:text-2xl font-semibold" style={{ color: kpi.color }}>{kpi.value}</div>
                <div className="text-xs text-[#676767] mt-1">{kpi.change}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F7F5F2] rounded-lg p-4">
              <div className="text-xs font-medium text-[#676767] mb-3">Inspeções por mês</div>
              <div className="h-24 flex items-end gap-2">
                {[55, 70, 62, 85, 78, 89].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm transition-all"
                      style={{
                        height: `${v}%`,
                        backgroundColor: i === 5 ? "#C56A2D" : "#C56A2D/30",
                      }}
                    />
                    <span className="text-[10px] text-[#676767]">
                      {["Fev", "Mar", "Abr", "Mai", "Jun", "Jul"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F7F5F2] rounded-lg p-4">
              <div className="text-xs font-medium text-[#676767] mb-3">Status das válvulas</div>
              <div className="space-y-2">
                {[
                  { label: "Conforme", value: 83, color: "#2E7D32" },
                  { label: "A vencer", value: 10, color: "#D18A00" },
                  { label: "Vencida", value: 7, color: "#C0392B" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs text-[#676767] w-16">{item.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-[#EDE9E3] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#171717]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#FFF8F0] border border-[#E8A96B]/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C56A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span className="text-xs font-medium text-[#C56A2D]">Atenção</span>
            </div>
            <p className="text-xs text-[#676767]">3 válvulas críticas vencem esta semana. PSV-1002, PSV-1010 e PSV-1023 precisam de inspeção urgente.</p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
