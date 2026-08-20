import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LaudosService } from './laudos.service.js';
import { CreateLaudoDto } from './dto/create-laudo.dto.js';
import { UpdateLaudoDto } from './dto/update-laudo.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';

@Controller('laudos')
export class LaudosController {
  constructor(private readonly laudosService: LaudosService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.laudosService.list(user.id);
  }

  @Get('inspecao/:inspecaoId')
  getByInspecaoId(
    @CurrentUser() user: AuthUser,
    @Param('inspecaoId') inspecaoId: string,
  ) {
    return this.laudosService.getByInspecaoId(user.id, inspecaoId);
  }

  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.laudosService.getById(user.id, id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateLaudoDto) {
    return this.laudosService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateLaudoDto,
  ) {
    return this.laudosService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.laudosService.remove(user.id, id);
  }
}
