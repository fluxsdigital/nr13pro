import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.cliente.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { equipamentos: true } } },
    });
  }

  async getById(userId: string, id: string) {
    const cliente = await this.prisma.cliente.findFirst({
      where: { id, userId },
      include: { equipamentos: true },
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return cliente;
  }

  create(userId: string, dto: CreateClienteDto) {
    return this.prisma.cliente.create({
      data: { ...dto, userId },
    });
  }

  async update(userId: string, id: string, dto: UpdateClienteDto) {
    await this.ensureOwned(userId, id);
    return this.prisma.cliente.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.prisma.cliente.delete({ where: { id } });
  }

  private async ensureOwned(userId: string, id: string) {
    const cliente = await this.prisma.cliente.findFirst({
      where: { id, userId },
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
  }
}
