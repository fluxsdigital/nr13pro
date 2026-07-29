export type TipoEquipamento = "vaso" | "caldeira" | "tubulacao" | "tanque"

export type ClasseFluido = "A" | "B" | "C" | "D"
export type CategoriaVaso = "I" | "II" | "III" | "IV" | "V"
export type CategoriaCaldeira = "A" | "B"
export type GrupoPotencialRisco = 1 | 2 | 3 | 4 | 5
export type TipoInspecao = "inicial" | "periodica" | "extraordinaria" | "extraordinaria_especial" | "vida_remanescente"

export interface CreateClienteDTO {
  nome: string
  cnpj: string
  contato: string
  email: string
  telefone: string
  endereco: string
}

export interface UpdateClienteDTO extends Partial<CreateClienteDTO> {}

export interface Cliente extends CreateClienteDTO {
  id: string
  createdAt: string
}

export interface CreateEquipamentoDTO {
  clienteId: string
  tag: string
  descricao: string
  fabricante: string
  numeroSerie: string
  anoFabricacao: number
  pressaoProjeto: number
  pressaoOperacao: number
  pressaoTesteHidrostatico: number | null
  volume: number
  pmta: number
  temperaturaProjeto: number | null
  temperaturaOperacao: number | null
  diametroInterno: number | null
  alturaComprimento: number | null
  materialConstrucao: string
  codigoProjeto: string
  fluido: string
  classeFluido: ClasseFluido
  localizacao: string
  tipo: TipoEquipamento
}

export interface UpdateEquipamentoDTO extends Partial<CreateEquipamentoDTO> {}

export interface Equipamento extends CreateEquipamentoDTO {
  id: string
  categoria: CategoriaVaso | CategoriaCaldeira | null
  grupoPotencialRisco: GrupoPotencialRisco | null
  createdAt: string
}

export interface CreateInspecaoDTO {
  equipamentoId: string
  tipo: TipoInspecao
  dataInicio: string
  dataTermino: string
  examesExternos: boolean
  examesInternos: boolean
  testeHidrostatico: boolean
  temSPIE: boolean
  parametrosUltrassom: ParametrosUltrassom | null
  checklist: Omit<ChecklistItem, "id">[]
  medicoes: Omit<Medicao, "id">[]
  anomalias: Omit<Anomalia, "id" | "foto">[]
  dispositivosSeguranca: Omit<DispositivoSeguranca, "id">[]
  parecer: string
  concluida: boolean
}

export interface UpdateInspecaoDTO extends Partial<CreateInspecaoDTO> {
  laudoId?: string | null
}

export interface Inspecao {
  id: string
  equipamentoId: string
  tipo: TipoInspecao
  dataInicio: string
  dataTermino: string
  examesExternos: boolean
  examesInternos: boolean
  testeHidrostatico: boolean
  temSPIE: boolean
  parametrosUltrassom: ParametrosUltrassom | null
  checklist: ChecklistItem[]
  medicoes: Medicao[]
  anomalias: Anomalia[]
  dispositivosSeguranca: DispositivoSeguranca[]
  parecer: string
  concluida: boolean
  laudoId: string | null
}

export interface Medicao {
  id: string
  ponto: string
  espessura: number
  espessuraAnterior: number | null
  espessuraConstrucao: number | null
  tempoOperacao: number | null
  dataMedicao: string
  observacao: string
}

export interface ParametrosUltrassom {
  aparelho: string
  transdutor: string
  velocidadeSonica: number
  tecnica: string
  blocoCalibracao: string
}

export interface Anomalia {
  id: string
  descricao: string
  gravidade: "baixa" | "media" | "alta" | "critica"
  foto: string | null
  planoAcao: string
  resolvida: boolean
}

export interface ChecklistItem {
  secao: string
  item: string
  ok: boolean | null
  observacao: string
}

export interface DispositivoSeguranca {
  id: string
  tipo: "valvula_seguranca" | "disco_ruptura" | "manometro" | "termometro" | "visor_nivel"
  tag: string
  fabricante?: string
  modelo?: string
  numeroSerie?: string
  inspecaoOk: boolean
  pressaoAbertura?: number
  pressaoVedacao?: number
  conexaoEntrada?: string
  conexaoSaida?: string
  ultimaCalibracao?: string
  proximaCalibracao?: string
  numeroCertificado?: string
  observacao: string
}

export interface CreateLaudoDTO {
  inspecaoId: string
  equipamentoId: string
  numeroLaudo: string
  dataEmissao: string
  plhNome: string
  plhCrea: string
  dataProximaInspecao: string
  observacoes: string
}

export interface UpdateLaudoDTO extends Partial<CreateLaudoDTO> {}

export interface Laudo extends CreateLaudoDTO {
  id: string
  pdfUrl: string | null
}
