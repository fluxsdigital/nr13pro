import { Module } from '@nestjs/common';
import { LaudosService } from './laudos.service.js';
import { LaudosController } from './laudos.controller.js';

@Module({
  providers: [LaudosService],
  controllers: [LaudosController],
})
export class LaudosModule {}
