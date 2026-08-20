import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class ParametrosUltrassomDto {
  @IsString()
  aparelho: string;

  @IsString()
  transdutor: string;

  @IsNumber()
  velocidadeSonica: number;

  @IsString()
  tecnica: string;

  @IsString()
  blocoCalibracao: string;
}

export class ChecklistItemDto {
  @IsString()
  secao: string;

  @IsString()
  item: string;

  @IsOptional()
  @IsBoolean()
  ok: boolean | null;

  @IsString()
  observacao: string;
}

export class MedicaoDto {
  @IsString()
  ponto: string;

  @IsNumber()
  @Min(0)
  espessura: number;

  @IsOptional()
  @IsNumber()
  espessuraAnterior: number | null;

  @IsOptional()
  @IsNumber()
  espessuraConstrucao: number | null;

  @IsOptional()
  @IsNumber()
  tempoOperacao: number | null;

  @IsOptional()
  @IsDateString()
  dataMedicao?: string;

  @IsString()
  observacao: string;
}

export class AnomaliaDto {
  @IsString()
  descricao: string;

  @IsIn(['baixa', 'media', 'alta', 'critica'])
  gravidade: 'baixa' | 'media' | 'alta' | 'critica';

  @IsOptional()
  @IsString()
  foto: string | null;

  @IsString()
  planoAcao: string;

  @IsOptional()
  @IsBoolean()
  resolvida?: boolean;
}

export class DispositivoSegurancaDto {
  @IsIn(['valvula_seguranca', 'disco_ruptura', 'manometro', 'termometro', 'visor_nivel'])
  tipo: 'valvula_seguranca' | 'disco_ruptura' | 'manometro' | 'termometro' | 'visor_nivel';

  @IsString()
  tag: string;

  @IsOptional()
  @IsString()
  fabricante?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsString()
  numeroSerie?: string;

  @IsBoolean()
  inspecaoOk: boolean;

  @IsOptional()
  @IsNumber()
  pressaoAbertura?: number;

  @IsOptional()
  @IsNumber()
  pressaoVedacao?: number;

  @IsOptional()
  @IsString()
  conexaoEntrada?: string;

  @IsOptional()
  @IsString()
  conexaoSaida?: string;

  @IsOptional()
  @IsDateString()
  ultimaCalibracao?: string;

  @IsOptional()
  @IsDateString()
  proximaCalibracao?: string;

  @IsOptional()
  @IsString()
  numeroCertificado?: string;

  @IsString()
  observacao: string;
}

export class CreateInspecaoDto {
  @IsString()
  equipamentoId: string;

  @IsIn(['inicial', 'periodica', 'extraordinaria', 'extraordinaria_especial', 'vida_remanescente'])
  tipo: 'inicial' | 'periodica' | 'extraordinaria' | 'extraordinaria_especial' | 'vida_remanescente';

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataTermino: string;

  @IsBoolean()
  examesExternos: boolean;

  @IsBoolean()
  examesInternos: boolean;

  @IsBoolean()
  testeHidrostatico: boolean;

  @IsBoolean()
  temSPIE: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => ParametrosUltrassomDto)
  parametrosUltrassom: ParametrosUltrassomDto | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  checklist: ChecklistItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicaoDto)
  medicoes: MedicaoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnomaliaDto)
  anomalias: AnomaliaDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DispositivoSegurancaDto)
  dispositivosSeguranca: DispositivoSegurancaDto[];

  @IsString()
  parecer: string;

  @IsBoolean()
  concluida: boolean;
}
