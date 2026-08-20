import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LeadsService } from './leads.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadDto } from './dto/update-lead.dto.js';
import { Public } from '../common/decorators/public.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // Lista da carteira — apenas closer
  @Get()
  list(@CurrentUser() user: AuthUser, @Query('status') status?: string) {
    return this.leadsService.list(user, { status });
  }

  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.leadsService.getById(user, id);
  }

  // Captura pública (landing/checkout) — visitante informa nome + WhatsApp
  @Public()
  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateLeadDto,
  ) {
    return this.leadsService.update(user, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.leadsService.remove(user, id);
  }

  // Automação WhatsApp
  @Post(':id/whatsapp')
  enviarWhatsApp(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.leadsService.enviarMensagemAutomatizada(user, id);
  }

  // Transferência para consultor humano
  @Post(':id/consultor')
  transferirConsultor(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.leadsService.transferirParaConsultor(user, id);
  }

  // Closer libera acesso de degustação (7 dias)
  @Post(':id/degustacao')
  liberarDegustacao(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.leadsService.liberarAcessoDegustacao(user, id);
  }
}
