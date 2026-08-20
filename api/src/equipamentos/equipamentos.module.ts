import { Module } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service.js';
import { EquipamentosController } from './equipamentos.controller.js';
import { Nr13Module } from '../nr13/nr13.module.js';

@Module({
  imports: [Nr13Module],
  providers: [EquipamentosService],
  controllers: [EquipamentosController],
})
export class EquipamentosModule {}
