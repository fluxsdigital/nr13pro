import { ChecklistItem } from "./types"

export interface CheckSecao {
  secao: string
  itens: { item: string; naoAplicavelVaso?: boolean }[]
}

export const CHECKLIST_INSPECAO: CheckSecao[] = [
  {
    secao: "Identificação",
    itens: [
      { item: "Placa de identificação indelével (fabricante, nº identificação, ano, PMTA, código de projeto)" },
      { item: "Adesivo auxiliar com categoria NR-13 visível" },
      { item: "Número de série confere com documentação" },
    ],
  },
  {
    secao: "Documentação",
    itens: [
      { item: "Prontuário do vaso (original ou reconstituído)" },
      { item: "Relatório de inspeção anterior disponível" },
      { item: "Livro de registro de segurança atualizado" },
      { item: "Certificados de calibração dos instrumentos válidos" },
      { item: "PAR (Projeto de Alteração ou Reparo) se aplicável" },
    ],
  },
  {
    secao: "Instalação do Vaso",
    itens: [
      { item: "Ambiente limpo e sem obstruções ao acesso" },
      { item: "Saídas de emergência desobstruídas" },
      { item: "Ventilação adequada ao redor do equipamento" },
      { item: "Iluminação suficiente para inspeção visual" },
      { item: "Sinalização de segurança conforme NR-26" },
    ],
  },
  {
    secao: "Exame Externo",
    itens: [
      { item: "Fundações e estruturas de apoio íntegras" },
      { item: "Pintura e revestimento térmico em bom estado" },
      { item: "Aterramento elétrico adequado" },
      { item: "Sem corrosão externa significativa" },
      { item: "Suportes e fixações sem deformações" },
    ],
  },
  {
    secao: "Equipamentos e Acessórios",
    itens: [
      { item: "Manômetros com faixa de operação adequada" },
      { item: "Manômetros com selo de calibração válido" },
      { item: "Válvula de segurança com lacre intacto" },
      { item: "Visor de nível transparente e sem vazamentos", naoAplicavelVaso: true },
      { item: "Termômetros e pressostatos operacionais", naoAplicavelVaso: true },
    ],
  },
  {
    secao: "Segurança na Operação",
    itens: [
      { item: "Procedimentos operacionais disponíveis", naoAplicavelVaso: true },
      { item: "Treinamento da equipe registrado", naoAplicavelVaso: true },
      { item: "Equipamentos de proteção individual disponíveis", naoAplicavelVaso: true },
      { item: "Sistemas de intertravamento funcionais", naoAplicavelVaso: true },
      { item: "Válvulas de bloqueio em bom estado", naoAplicavelVaso: true },
    ],
  },
  {
    secao: "Exame Interno",
    itens: [
      { item: "Acesso interno seguro e permitido" },
      { item: "Sem trincas ou deformações na superfície interna" },
      { item: "Sem corrosão interna significativa" },
      { item: "Sem depósitos ou incrustações anormais" },
      { item: "Sem indícios de sobreaquecimento localizado" },
    ],
  },
  {
    secao: "Teste Hidrostático",
    itens: [
      { item: "Pressão de teste conforme calculada" },
      { item: "Tempo de estabilização adequado" },
      { item: "Sem vazamentos durante o teste" },
      { item: "Sem deformações permanentes" },
    ],
  },
]
