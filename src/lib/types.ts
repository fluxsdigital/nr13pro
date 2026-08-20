export type TipoEquipamento = "vaso" | "caldeira" | "tubulacao" | "tanque"

export type UnidadePressao = "kPa" | "kgf/cm²" | "bar" | "PSI"

export type TipoTampo = "eliptico" | "torisferico" | "plano" | "conico" | "sem_tampo"

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
  userId: string
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
  unidadePressao: UnidadePressao
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
  userId: string
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
  thVazamentosVisiveis: boolean | null
  thDeformacao: boolean | null
  thAprovado: boolean | null
  thMotivo: string
  plhResponsavel: string
  plhCrea: string
  temSPIE: boolean
  parametrosUltrassom: ParametrosUltrassom | null
  checklist: Omit<ChecklistItem, "id">[]
  medicoes: Omit<Medicao, "id">[]
  anomalias: Omit<Anomalia, "id">[]
  dispositivosSeguranca: Omit<DispositivoSeguranca, "id">[]
  parecer: string
  concluida: boolean
}

export interface UpdateInspecaoDTO extends Partial<CreateInspecaoDTO> {
  laudoId?: string | null
}

export interface Inspecao {
  id: string
  userId: string
  equipamentoId: string
  tipo: TipoInspecao
  dataInicio: string
  dataTermino: string
  examesExternos: boolean
  examesInternos: boolean
  testeHidrostatico: boolean
  thVazamentosVisiveis: boolean | null
  thDeformacao: boolean | null
  thAprovado: boolean | null
  thMotivo: string
  plhResponsavel: string
  plhCrea: string
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
  tipoTampo: TipoTampo | null
  foto: string | null
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
  id: string
  secao: string
  item: string
  ok: boolean | null
  naoAplicavel: boolean
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
  plhAssinatura: string | null
  dataProximaInspecao: string
  observacoes: string
}

export interface UpdateLaudoDTO extends Partial<CreateLaudoDTO> {}

export interface Laudo extends CreateLaudoDTO {
  id: string
  userId: string
  pdfUrl: string | null
}

// Auth types
export type UserRole = "closer" | "engenheiro"

export interface User {
  id: string
  name: string
  email: string
  crea: string
  role: UserRole
  plan: "Mensal" | "Anual" | "Degustação" | null
  degustacaoExpiraEm: string | null
  createdAt: string
}

export interface SignupDTO {
  name: string
  email: string
  password: string
  crea: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// Notification types
export type NotificationType = "inspecao_vencendo" | "laudo_emitido" | "certificado_vencendo" | "anomalia_critica" | "sistema"

export interface AppNotification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: string
}

// ── Lead (WhatsApp / carteira de possíveis compradores) ──
export type LeadStatus = "novo" | "abandonou_checkout" | "contatado" | "em_negociacao" | "consultor" | "convertido" | "perdido"

export interface CreateLeadDTO {
  nome: string
  whatsapp: string
  email: string
  origem: "landing" | "checkout" | "plataforma"
  status: LeadStatus
  mensagemAutomatizada: string | null
}

export interface UpdateLeadDTO extends Partial<CreateLeadDTO> {
  transferidoConsultor?: boolean
  ultimoContato?: string
}

export interface CredenciaisDegustacao {
  email: string
  senha: string
  expiraEm: string
}

export interface Lead extends CreateLeadDTO {
  id: string
  userId: string
  criadoEm: string
  ultimoContato: string | null
  transferidoConsultor: boolean
  acessoDegustacaoLiberado: boolean
  dataLiberacaoAcesso: string | null
  credenciaisDegustacao: CredenciaisDegustacao | null
}
