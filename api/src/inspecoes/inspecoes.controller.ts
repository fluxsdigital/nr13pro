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
import { InspecoesService } from './inspecoes.service.js';
import { CreateInspecaoDto } from './dto/create-inspecao.dto.js';
import { UpdateInspecaoDto } from './dto/update-inspecao.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';

@Controller('inspecoes')
export class InspecoesController {
  constructor(private readonly inspecoesService: InspecoesService) {}

  @Get()
  list(
    @CurrentUser() user: AuthUser,
    @Query('equipamentoId') equipamentoId?: string,
  ) {
    return this.inspecoesService.list(user.id, { equipamentoId });
  }

  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.inspecoesService.getById(user.id, id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateInspecaoDto) {
    return this.inspecoesService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateInspecaoDto,
  ) {
    return this.inspecoesService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.inspecoesService.remove(user.id, id);
  }
}
