import { PartialType } from '@nestjs/mapped-types';
import { CreateInspecaoDto } from './create-inspecao.dto.js';

export class UpdateInspecaoDto extends PartialType(CreateInspecaoDto) {}
