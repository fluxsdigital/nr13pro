import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator.js';
import { PrismaService } from './prisma/prisma.service.js';

const ROTAS = [
  'POST  /api/auth/signup',
  'POST  /api/auth/login',
  'GET   /api/auth/me',
  'PATCH /api/auth/me',
  'POST  /api/auth/plan',
  'GET   /api/nr13/classificar-vaso',
  'POST  /api/nr13/classificar-vaso',
  'POST  /api/nr13/classificar-caldeira',
  'POST  /api/nr13/periodicidade',
  'POST  /api/nr13/pmta-casco',
  'POST  /api/nr13/pmta-tampo',
  'GET   /api/clientes',
  'GET   /api/clientes/:id',
  'POST  /api/clientes',
  'PATCH /api/clientes/:id',
  'DELETE /api/clientes/:id',
  'GET   /api/equipamentos?clienteId=&search=',
  'GET   /api/equipamentos/:id',
  'POST  /api/equipamentos',
  'PATCH /api/equipamentos/:id',
  'DELETE /api/equipamentos/:id',
  'GET   /api/inspecoes?equipamentoId=',
  'GET   /api/inspecoes/:id',
  'POST  /api/inspecoes',
  'PATCH /api/inspecoes/:id',
  'DELETE /api/inspecoes/:id',
  'GET   /api/laudos',
  'GET   /api/laudos/inspecao/:inspecaoId',
  'GET   /api/laudos/:id',
  'POST  /api/laudos',
  'PATCH /api/laudos/:id',
  'DELETE /api/laudos/:id',
  'GET   /api/notifications',
  'GET   /api/notifications/unread-count',
  'POST  /api/notifications',
  'POST  /api/notifications/:id/read',
  'POST  /api/notifications/read-all',
  'DELETE /api/notifications/:id',
  'GET   /api/leads?status=',
  'GET   /api/leads/:id',
  'POST  /api/leads',
  'PATCH /api/leads/:id',
  'DELETE /api/leads/:id',
  'POST  /api/leads/:id/whatsapp',
  'POST  /api/leads/:id/consultor',
  'POST  /api/leads/:id/degustacao',
];

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  async root() {
    return {
      nome: 'NR-13 Pro API',
      status: 'online',
      rotas: ROTAS,
    };
  }

  @Public()
  @Get('health')
  async health() {
    let database = 'offline';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      database = 'online';
    } catch {
      database = 'offline';
    }
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database,
    };
  }
}
