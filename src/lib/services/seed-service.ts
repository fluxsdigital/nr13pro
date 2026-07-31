import { clientes, equipamentos, inspecoes, laudos } from "@/lib/store"
import {
  seedClientes, seedEquipamentos, seedInspecoes, seedLaudos,
  CHECKS_PADRAO, seedMedicoes, seedAnomalias, seedDispositivos,
} from "@/lib/seed-data"
import type { Cliente, Equipamento, Inspecao, Laudo } from "@/lib/types"

let nextClienteId = 100
let nextEquipamentoId = 100
let nextInspecaoId = 100
let nextLaudoId = 100
let nextMedicaoId = 100
let nextAnomaliaId = 100
let nextDispositivoId = 100

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export const seedService = {
  async seedForUser(userId: string): Promise<void> {
    // Clone clientes
    const novosClientes: Cliente[] = seedClientes.map((c) => ({
      ...c,
      id: `c_${nextClienteId++}`,
      userId,
    }))
    clientes.push(...novosClientes)

    // Mapa de IDs antigos -> novos para relacionamentos
    const clienteMap = new Map<string, string>()
    seedClientes.forEach((c, i) => clienteMap.set(c.id, novosClientes[i].id))

    // Clone equipamentos
    const novosEquipamentos: Equipamento[] = seedEquipamentos.map((eq) => ({
      ...eq,
      id: `eq_${nextEquipamentoId++}`,
      userId,
      clienteId: clienteMap.get(eq.clienteId) || eq.clienteId,
    }))
    equipamentos.push(...novosEquipamentos)

    const equipMap = new Map<string, string>()
    seedEquipamentos.forEach((eq, i) => equipMap.set(eq.id, novosEquipamentos[i].id))

    // Clone inspeções
    const novasInspecoes: Inspecao[] = seedInspecoes.map((ins) => {
      const oldId = ins.id
      const newId = `i_${nextInspecaoId++}`

      // Clone medições
      const oldMedicoes = seedMedicoes[oldId] || []
      const novasMedicoes = oldMedicoes.map((m) => ({
        ...m,
        id: `m_${nextMedicaoId++}`,
      }))

      // Clone anomalias
      const oldAnomalias = seedAnomalias[oldId] || []
      const novasAnomalias = oldAnomalias.map((a) => ({
        ...a,
        id: `a_${nextAnomaliaId++}`,
      }))

      // Clone dispositivos
      const oldDispositivos = seedDispositivos[oldId] || []
      const novosDispositivos = oldDispositivos.map((d) => ({
        ...d,
        id: `d_${nextDispositivoId++}`,
      }))

      return {
        ...ins,
        id: newId,
        userId,
        equipamentoId: equipMap.get(ins.equipamentoId) || ins.equipamentoId,
        checklist: CHECKS_PADRAO.map((ck) => ({ ...ck })),
        medicoes: novasMedicoes,
        anomalias: novasAnomalias,
        dispositivosSeguranca: novosDispositivos,
        laudoId: null,
      }
    })
    inspecoes.push(...novasInspecoes)

    const inspecMap = new Map<string, string>()
    seedInspecoes.forEach((ins, i) => inspecMap.set(ins.id, novasInspecoes[i].id))

    // Clone laudos (apenas os que existem, vinculados às novas inspeções)
    const novosLaudos: Laudo[] = seedLaudos.map((l) => ({
      ...l,
      id: `l_${nextLaudoId++}`,
      userId,
      inspecaoId: inspecMap.get(l.inspecaoId) || l.inspecaoId,
      equipamentoId: equipMap.get(l.equipamentoId) || l.equipamentoId,
    }))
    laudos.push(...novosLaudos)

    // Atualizar os laudoId nas novas inspeções
    for (const novoLaudo of novosLaudos) {
      const inspec = novasInspecoes.find((i) => i.id === novoLaudo.inspecaoId)
      if (inspec) {
        inspec.laudoId = novoLaudo.id
      }
    }
  },
}
