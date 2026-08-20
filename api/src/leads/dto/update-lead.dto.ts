import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { CreateLeadDto } from './create-lead.dto.js';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {
  @IsOptional()
  @IsBoolean()
  transferidoConsultor?: boolean;

  @IsOptional()
  @IsDateString()
  ultimoContato?: string;
}
