import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module.js';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard.js';
import { AuthModule } from './auth/auth.module.js';
import { Nr13Module } from './nr13/nr13.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { EquipamentosModule } from './equipamentos/equipamentos.module.js';
import { InspecoesModule } from './inspecoes/inspecoes.module.js';
import { LaudosModule } from './laudos/laudos.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { LeadsModule } from './leads/leads.module.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    Nr13Module,
    ClientesModule,
    EquipamentosModule,
    InspecoesModule,
    LaudosModule,
    NotificationsModule,
    LeadsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
