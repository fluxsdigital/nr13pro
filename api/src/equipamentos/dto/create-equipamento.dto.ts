import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEquipamentoDto {
  @IsString()
  clienteId: string;

  @IsString()
  @MinLength(1)
  tag: string;

  @IsString()
  descricao: string;

  @IsString()
  fabricante: string;

  @IsString()
  numeroSerie: string;

  @IsInt()
  @Min(1900)
  anoFabricacao: number;

  @IsNumber()
  @Min(0)
  pressaoProjeto: number;

  @IsNumber()
  @Min(0)
  pressaoOperacao: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pressaoTesteHidrostatico: number | null;

  @IsNumber()
  @Min(0)
  volume: number;

  @IsNumber()
  @Min(0)
  pmta: number;

  @IsOptional()
  @IsNumber()
  temperaturaProjeto: number | null;

  @IsOptional()
  @IsNumber()
  temperaturaOperacao: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  diametroInterno: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  alturaComprimento: number | null;

  @IsString()
  materialConstrucao: string;

  @IsString()
  codigoProjeto: string;

  @IsString()
  fluido: string;

  @IsIn(['A', 'B', 'C', 'D'])
  classeFluido: 'A' | 'B' | 'C' | 'D';

  @IsString()
  localizacao: string;

  @IsIn(['vaso', 'caldeira', 'tubulacao', 'tanque'])
  tipo: 'vaso' | 'caldeira' | 'tubulacao' | 'tanque';
}
