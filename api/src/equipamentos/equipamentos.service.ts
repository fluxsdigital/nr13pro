import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Nr13Service } from '../nr13/nr13.service.js';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto.js';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto.js';

@Injectable()
export class EquipamentosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly nr13: Nr13Service,
  ) {}

  list(userId: string, filters?: { clienteId?: string; search?: string }) {
    return this.prisma.equipamento.findMany({
      where: {
        userId,
        ...(filters?.clienteId ? { clienteId: filters.clienteId } : {}),
        ...(filters?.search
          ? {
              OR: [
                { tag: { contains: filters.search } },
                { descricao: { contains: filters.search } },
                { localizacao: { contains: filters.search } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { cliente: true },
    });
  }

  async getById(userId: string, id: string) {
    const equipamento = await this.prisma.equipamento.findFirst({
      where: { id, userId },
      include: { cliente: true, inspecoes: true },
    });
    if (!equipamento) throw new NotFoundException('Equipamento não encontrado');
    return equipamento;
  }

  async create(userId: string, dto: CreateEquipamentoDto) {
    await this.ensureClienteOwned(userId, dto.clienteId);
    const classificacao = this.autoClassificar(dto);
    return this.prisma.equipamento.create({
      data: {
        ...dto,
        userId,
        categoria: classificacao.categoria,
        grupoPotencialRisco: classificacao.grupoPotencialRisco,
      },
      include: { cliente: true },
    });
  }

  async update(userId: string, id: string, dto: UpdateEquipamentoDto) {
    const current = await this.ensureOwned(userId, id);
    if (dto.clienteId) {
      await this.ensureClienteOwned(userId, dto.clienteId);
    }

    const merged = { ...current, ...dto };
    const reclassify =
      dto.pressaoOperacao !== undefined ||
      dto.volume !== undefined ||
      dto.classeFluido !== undefined ||
      dto.tipo !== undefined;

    const data: any = { ...dto };
    if (reclassify) {
      const classificacao = this.autoClassificar(merged as CreateEquipamentoDto);
      data.categoria = classificacao.categoria;
      data.grupoPotencialRisco = classificacao.grupoPotencialRisco;
    }

    return this.prisma.equipamento.update({
      where: { id },
      data,
      include: { cliente: true },
    });
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.prisma.equipamento.delete({ where: { id } });
  }

  /** Espelha o autoClassificar() do frontend (src/lib/services/equipamento-service.ts) */
  private autoClassificar(data: CreateEquipamentoDto) {
    if (data.tipo === 'caldeira') {
      return {
        categoria: this.nr13.classificarCaldeira(data.pressaoOperacao),
        grupoPotencialRisco: null,
      };
    }
    const pv = this.nr13.calcularPV(data.pressaoOperacao, data.volume);
    const grupo = this.nr13.obterGrupoPotencialRisco(pv);
    if (!grupo && data.classeFluido !== 'A') {
      return { categoria: null, grupoPotencialRisco: null };
    }
    const result = this.nr13.classificarVaso(
      data.classeFluido,
      data.pressaoOperacao,
      data.volume,
    );
    if (!result) {
      return { categoria: null, grupoPotencialRisco: grupo };
    }
    return { categoria: result.categoria, grupoPotencialRisco: result.grupo };
  }

  private async ensureOwned(userId: string, id: string) {
    const equipamento = await this.prisma.equipamento.findFirst({
      where: { id, userId },
    });
    if (!equipamento) throw new NotFoundException('Equipamento não encontrado');
    return equipamento;
  }

  private async ensureClienteOwned(userId: string, clienteId: string) {
    const cliente = await this.prisma.cliente.findFirst({
      where: { id: clienteId, userId },
    });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
  }
}
