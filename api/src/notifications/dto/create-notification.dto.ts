import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsIn(['inspecao_vencendo', 'laudo_emitido', 'certificado_vencendo', 'anomalia_critica', 'sistema'])
  type: 'inspecao_vencendo' | 'laudo_emitido' | 'certificado_vencendo' | 'anomalia_critica' | 'sistema';

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  link?: string;
}
