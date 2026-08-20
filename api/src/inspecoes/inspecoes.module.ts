import { Module } from '@nestjs/common';
import { InspecoesService } from './inspecoes.service.js';
import { InspecoesController } from './inspecoes.controller.js';

@Module({
  providers: [InspecoesService],
  controllers: [InspecoesController],
})
export class InspecoesModule {}
