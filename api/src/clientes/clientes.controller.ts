import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientesService } from './clientes.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.clientesService.list(user.id);
  }

  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.clientesService.getById(user.id, id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateClienteDto) {
    return this.clientesService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateClienteDto,
  ) {
    return this.clientesService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.clientesService.remove(user.id, id);
  }
}
