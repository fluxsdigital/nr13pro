import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLaudoDto } from './dto/create-laudo.dto.js';
import { UpdateLaudoDto } from './dto/update-laudo.dto.js';

const LAUDO_INCLUDE = {
  inspecao: true,
  equipamento: { include: { cliente: true } },
} as const;

@Injectable()
export class LaudosService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.laudo.findMany({
      where: { userId },
      orderBy: { dataEmissao: 'desc' },
      include: LAUDO_INCLUDE,
    });
  }

  async getById(userId: string, id: string) {
    const laudo = await this.prisma.laudo.findFirst({
      where: { id, userId },
      include: LAUDO_INCLUDE,
    });
    if (!laudo) throw new NotFoundException('Laudo não encontrado');
    return laudo;
  }

  async getByInspecaoId(userId: string, inspecaoId: string) {
    const laudo = await this.prisma.laudo.findFirst({
      where: { inspecaoId, userId },
      include: LAUDO_INCLUDE,
    });
    if (!laudo) throw new NotFoundException('Laudo não encontrado');
    return laudo;
  }

  async create(userId: string, dto: CreateLaudoDto) {
    const inspecao = await this.prisma.inspecao.findFirst({
      where: { id: dto.inspecaoId, userId },
    });
    if (!inspecao) throw new NotFoundException('Inspeção não encontrada');

    const equipamento = await this.prisma.equipamento.findFirst({
      where: { id: dto.equipamentoId, userId },
    });
    if (!equipamento) throw new NotFoundException('Equipamento não encontrado');

    return this.prisma.laudo.create({
      data: {
        ...dto,
        userId,
        dataEmissao: new Date(dto.dataEmissao),
        dataProximaInspecao: new Date(dto.dataProximaInspecao),
      },
      include: LAUDO_INCLUDE,
    });
  }

  async update(userId: string, id: string, dto: UpdateLaudoDto) {
    await this.ensureOwned(userId, id);
    const data: any = { ...dto };
    if (dto.dataEmissao) data.dataEmissao = new Date(dto.dataEmissao);
    if (dto.dataProximaInspecao) data.dataProximaInspecao = new Date(dto.dataProximaInspecao);
    return this.prisma.laudo.update({
      where: { id },
      data,
      include: LAUDO_INCLUDE,
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.prisma.laudo.delete({ where: { id } });
  }

  private async ensureOwned(userId: string, id: string) {
    const laudo = await this.prisma.laudo.findFirst({
      where: { id, userId },
    });
    if (!laudo) throw new NotFoundException('Laudo não encontrado');
    return laudo;
  }
}
