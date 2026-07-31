import { clientes, equipamentos, inspecoes, laudos } from "@/lib/store"
import {
  seedClientes, seedEquipamentos, seedInspecoes, seedLaudos,
  CHECKS_PADRAO, seedMedicoes, seedAnomalias, seedDispositivos,
} from "@/lib/seed-data"
import type { Cliente, Equipamento, Inspecao, Laudo } from "@/lib/types"

let nextClienteId = 200
let nextEquipamentoId = 200
let nextInspecaoId = 200
let nextLaudoId = 200
let nextMedicaoId = 200
let nextAnomaliaId = 200
let nextDispositivoId = 200

function gerarId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export const seedService = {
  async seedForUser(userId: string): Promise<void> {
    // Verifica se os dados de seed estão disponíveis
    if (!seedClientes || !seedClientes.length) {
      console.warn("[seed-service] seedClientes vazio ou indisponível")
      return
    }
    if (!seedEquipamentos || !seedEquipamentos.length) {
      console.warn("[seed-service] seedEquipamentos vazio ou indisponível")
      return
    }

    try {
      // Clone clientes
      const novosClientes: Cliente[] = seedClientes.map((c) => ({
        ...c,
        id: gerarId("c"),
        userId,
      }))
      clientes.push(...novosClientes)

      // Mapa de IDs antigos -> novos
      const clienteMap = new Map<string, string>()
      seedClientes.forEach((c, i) => {
        if (c && novosClientes[i]) {
          clienteMap.set(c.id, novosClientes[i].id)
        }
      })

      // Clone equipamentos
      const novosEquipamentos: Equipamento[] = seedEquipamentos.map((eq) => ({
        ...eq,
        id: gerarId("eq"),
        userId,
        clienteId: clienteMap.get(eq.clienteId) || eq.clienteId,
      }))
      equipamentos.push(...novosEquipamentos)

      const equipMap = new Map<string, string>()
      seedEquipamentos.forEach((eq, i) => {
        if (eq && novosEquipamentos[i]) {
          equipMap.set(eq.id, novosEquipamentos[i].id)
        }
      })

      // Clone inspeções
      const novasInspecoes: Inspecao[] = seedInspecoes.map((ins) => {
        const oldId = ins.id
        const newId = gerarId("i")

        // Clone medições
        const oldMedicoes = (seedMedicoes && seedMedicoes[oldId]) || []
        const novasMedicoes = oldMedicoes.map((m) => ({
          ...m,
          id: gerarId("m"),
        }))

        // Clone anomalias
        const oldAnomalias = (seedAnomalias && seedAnomalias[oldId]) || []
        const novasAnomalias = oldAnomalias.map((a) => ({
          ...a,
          id: gerarId("a"),
        }))

        // Clone dispositivos
        const oldDispositivos = (seedDispositivos && seedDispositivos[oldId]) || []
        const novosDispositivos = oldDispositivos.map((d) => ({
          ...d,
          id: gerarId("d"),
        }))

        return {
          ...ins,
          id: newId,
          userId,
          equipamentoId: equipMap.get(ins.equipamentoId) || ins.equipamentoId,
          checklist: CHECKS_PADRAO ? CHECKS_PADRAO.map((ck) => ({ ...ck })) : [],
          medicoes: novasMedicoes,
          anomalias: novasAnomalias,
          dispositivosSeguranca: novosDispositivos,
          laudoId: null,
        }
      })
      inspecoes.push(...novasInspecoes)

      const inspecMap = new Map<string, string>()
      seedInspecoes.forEach((ins, i) => {
        if (ins && novasInspecoes[i]) {
          inspecMap.set(ins.id, novasInspecoes[i].id)
        }
      })

      // Clone laudos vinculados às novas inspeções
      if (seedLaudos && seedLaudos.length) {
        const novosLaudos: Laudo[] = seedLaudos.map((l) => ({
          ...l,
          id: gerarId("l"),
          userId,
          inspecaoId: inspecMap.get(l.inspecaoId) || l.inspecaoId,
          equipamentoId: equipMap.get(l.equipamentoId) || l.equipamentoId,
        }))
        laudos.push(...novosLaudos)

        // Atualizar laudoId nas inspeções
        for (const novoLaudo of novosLaudos) {
          const inspec = novasInspecoes.find((i) => i && i.id === novoLaudo.inspecaoId)
          if (inspec) {
            inspec.laudoId = novoLaudo.id
          }
        }
      }

      console.log(`[seed-service] Dados seed criados para usuário ${userId}: ${novosClientes.length} clientes, ${novosEquipamentos.length} equipamentos, ${novasInspecoes.length} inspeções`)
    } catch (err) {
      console.error("[seed-service] Erro ao criar seed para usuário:", err)
      // Não propaga o erro - o cadastro não deve quebrar por causa do seed
    }
  },
}
