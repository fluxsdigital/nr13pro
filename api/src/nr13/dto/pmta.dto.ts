import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PmtaCascoDto {
  @IsString()
  material: string;

  @IsString()
  codigoProjeto: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  diametroInternoMm: number | null;

  @IsNumber()
  @Min(0)
  espessuraMedidaMm: number;
}

export class PmtaTampoDto extends PmtaCascoDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  alturaTampoMm: number | null;
}
