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
import { EquipamentosService } from './equipamentos.service.js';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto.js';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';

@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Get()
  list(
    @CurrentUser() user: AuthUser,
    @Query('clienteId') clienteId?: string,
    @Query('search') search?: string,
  ) {
    return this.equipamentosService.list(user.id, { clienteId, search });
  }

  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.equipamentosService.getById(user.id, id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateEquipamentoDto) {
    return this.equipamentosService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateEquipamentoDto,
  ) {
    return this.equipamentosService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.equipamentosService.remove(user.id, id);
  }
}
