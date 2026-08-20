import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  nome: string;

  @IsString()
  whatsapp: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsIn(['landing', 'checkout', 'plataforma'])
  origem: 'landing' | 'checkout' | 'plataforma';

  @IsIn([
    'novo',
    'abandonou_checkout',
    'contatado',
    'em_negociacao',
    'consultor',
    'convertido',
    'perdido',
  ])
  status:
    | 'novo'
    | 'abandonou_checkout'
    | 'contatado'
    | 'em_negociacao'
    | 'consultor'
    | 'convertido'
    | 'perdido';

  @IsOptional()
  @IsString()
  mensagemAutomatizada?: string | null;
}
