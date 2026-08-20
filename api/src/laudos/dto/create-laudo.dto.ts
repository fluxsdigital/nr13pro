import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLaudoDto {
  @IsString()
  inspecaoId: string;

  @IsString()
  equipamentoId: string;

  @IsString()
  @MinLength(1)
  numeroLaudo: string;

  @IsDateString()
  dataEmissao: string;

  @IsString()
  plhNome: string;

  @IsString()
  plhCrea: string;

  @IsOptional()
  @IsString()
  plhAssinatura: string | null;

  @IsDateString()
  dataProximaInspecao: string;

  @IsString()
  observacoes: string;
}
