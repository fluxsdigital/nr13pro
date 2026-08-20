import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInspecaoDto } from './dto/create-inspecao.dto.js';
import { UpdateInspecaoDto } from './dto/update-inspecao.dto.js';

const INSPECAO_INCLUDE = {
  parametrosUltrassom: true,
  checklist: true,
  medicoes: true,
  anomalias: true,
  dispositivosSeguranca: true,
  equipamento: { include: { cliente: true } },
  laudo: true,
} as const;

@Injectable()
export class InspecoesService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string, filters?: { equipamentoId?: string }) {
    return this.prisma.inspecao.findMany({
      where: {
        userId,
        ...(filters?.equipamentoId ? { equipamentoId: filters.equipamentoId } : {}),
      },
      orderBy: { dataInicio: 'desc' },
      include: INSPECAO_INCLUDE,
    });
  }

  async getById(userId: string, id: string) {
    const inspecao = await this.prisma.inspecao.findFirst({
      where: { id, userId },
      include: INSPECAO_INCLUDE,
    });
    if (!inspecao) throw new NotFoundException('Inspeção não encontrada');
    return inspecao;
  }

  async create(userId: string, dto: CreateInspecaoDto) {
    const equipamento = await this.prisma.equipamento.findFirst({
      where: { id: dto.equipamentoId, userId },
    });
    if (!equipamento) throw new NotFoundException('Equipamento não encontrado');

    const { parametrosUltrassom, checklist, medicoes, anomalias, dispositivosSeguranca, ...rest } = dto;

    return this.prisma.inspecao.create({
      data: {
        ...rest,
        userId,
        dataInicio: new Date(dto.dataInicio),
        dataTermino: new Date(dto.dataTermino),
        ...(parametrosUltrassom
          ? { parametrosUltrassom: { create: parametrosUltrassom } }
          : {}),
        checklist: { create: checklist },
        medicoes: {
          create: medicoes.map((m) => ({
            ...m,
            dataMedicao: m.dataMedicao ? new Date(m.dataMedicao) : new Date(dto.dataInicio),
          })),
        },
        anomalias: { create: anomalias },
        dispositivosSeguranca: {
          create: dispositivosSeguranca.map((d) => ({
            ...d,
            ultimaCalibracao: d.ultimaCalibracao ? new Date(d.ultimaCalibracao) : null,
            proximaCalibracao: d.proximaCalibracao ? new Date(d.proximaCalibracao) : null,
          })),
        },
      },
      include: INSPECAO_INCLUDE,
    });
  }

  async update(userId: string, id: string, dto: UpdateInspecaoDto) {
    await this.ensureOwned(userId, id);

    const { parametrosUltrassom, checklist, medicoes, anomalias, dispositivosSeguranca, ...rest } = dto;

    const data: any = { ...rest };
    if (rest.dataInicio) data.dataInicio = new Date(rest.dataInicio);
    if (rest.dataTermino) data.dataTermino = new Date(rest.dataTermino);

    // Substituição atômica das sub-entidades quando enviadas
    if (parametrosUltrassom !== undefined) {
      data.parametrosUltrassom = {
        deleteMany: {},
        create: parametrosUltrassom,
      };
    }
    if (checklist !== undefined) {
      data.checklist = { deleteMany: {}, create: checklist };
    }
    if (medicoes !== undefined) {
      data.medicoes = {
        deleteMany: {},
        create: medicoes.map((m) => ({
          ...m,
          dataMedicao: m.dataMedicao ? new Date(m.dataMedicao) : new Date(),
        })),
      };
    }
    if (anomalias !== undefined) {
      data.anomalias = { deleteMany: {}, create: anomalias };
    }
    if (dispositivosSeguranca !== undefined) {
      data.dispositivosSeguranca = {
        deleteMany: {},
        create: dispositivosSeguranca.map((d) => ({
          ...d,
          ultimaCalibracao: d.ultimaCalibracao ? new Date(d.ultimaCalibracao) : null,
          proximaCalibracao: d.proximaCalibracao ? new Date(d.proximaCalibracao) : null,
        })),
      };
    }

    return this.prisma.inspecao.update({
      where: { id },
      data,
      include: INSPECAO_INCLUDE,
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.prisma.inspecao.delete({ where: { id } });
  }

  private async ensureOwned(userId: string, id: string) {
    const inspecao = await this.prisma.inspecao.findFirst({
      where: { id, userId },
    });
    if (!inspecao) throw new NotFoundException('Inspeção não encontrada');
    return inspecao;
  }
}
