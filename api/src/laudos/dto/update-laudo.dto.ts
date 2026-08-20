import { PartialType } from '@nestjs/mapped-types';
import { CreateLaudoDto } from './create-laudo.dto.js';

export class UpdateLaudoDto extends PartialType(CreateLaudoDto) {}
