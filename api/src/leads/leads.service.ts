import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthService } from '../auth/auth.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadDto } from './dto/update-lead.dto.js';

// Duração da degustação liberada pelo closer (7 dias)
export const DIAS_DEGUSTACAO = 7;

// Dono da carteira de leads (empresa NR-13 Pro)
export const EMPRESA_USER_ID = 'nr13pro_empresa';

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Lista os leads da carteira. Apenas o closer (vendas NR-13 Pro) tem acesso.
   */
  async list(user: { id: string; role: string }, filters?: { status?: string }) {
    this.ensureCloser(user);
    return this.prisma.lead.findMany({
      where: {
        ...(filters?.status ? { status: filters.status } : {}),
      },
      orderBy: { criadoEm: 'desc' },
    });
  }

  async getById(user: { id: string; role: string }, id: string) {
    this.ensureCloser(user);
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado');
    return lead;
  }

  /**
   * Cria um lead (captura via landing/checkout/plataforma).
   * Público — qualquer visitante pode informar nome + WhatsApp.
   */
  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        userId: EMPRESA_USER_ID,
        nome: dto.nome,
        whatsapp: dto.whatsapp,
        email: dto.email ?? '',
        origem: dto.origem,
        status: dto.status,
        mensagemAutomatizada: dto.mensagemAutomatizada ?? null,
      },
    });
  }

  async update(user: { id: string; role: string }, id: string, dto: UpdateLeadDto) {
    this.ensureCloser(user);
    await this.ensureExists(id);
    const { ultimoContato, ...rest } = dto;
    return this.prisma.lead.update({
      where: { id },
      data: {
        ...rest,
        ...(ultimoContato ? { ultimoContato: new Date(ultimoContato) } : {}),
      },
    });
  }

  async remove(user: { id: string; role: string }, id: string) {
    this.ensureCloser(user);
    await this.ensureExists(id);
    await this.prisma.lead.delete({ where: { id } });
    return { deleted: true };
  }

  /**
   * Automação WhatsApp: marca como contatado e registra o último contato.
   */
  async enviarMensagemAutomatizada(user: { id: string; role: string }, id: string) {
    this.ensureCloser(user);
    const lead = await this.ensureExists(id);
    return this.prisma.lead.update({
      where: { id },
      data: {
        status:
          lead.status === 'novo' || lead.status === 'abandonou_checkout'
            ? 'contatado'
            : lead.status,
        ultimoContato: new Date(),
      },
    });
  }

  /**
   * Transfere o lead para um consultor humano.
   */
  async transferirParaConsultor(user: { id: string; role: string }, id: string) {
    this.ensureCloser(user);
    await this.ensureExists(id);
    return this.prisma.lead.update({
      where: { id },
      data: {
        status: 'consultor',
        transferidoConsultor: true,
        ultimoContato: new Date(),
      },
    });
  }

  /**
   * Closer libera o acesso de degustação (7 dias):
   * gera credenciais, cria o usuário real no mock de autenticação
   * e marca o lead como "em negociação".
   */
  async liberarAcessoDegustacao(user: { id: string; role: string }, id: string) {
    this.ensureCloser(user);
    const lead = await this.ensureExists(id);
    if (lead.acessoDegustacaoLiberado) return lead;

    // Gera credenciais com validade de 7 dias (remove acentos do nome)
    const base = lead.email
      ? lead.email.split('@')[0]
      : lead.nome
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]/g, '.');
    const email = `${base}@degustacao.nr13pro.com.br`;
    const senha = '123456';
    const expiraEm = new Date(Date.now() + DIAS_DEGUSTACAO * 24 * 60 * 60 * 1000);

    // Cria o usuário REAL no banco — o lead poderá logar no sistema
    await this.authService.criarUsuarioDegustacao({
      nome: lead.nome,
      email,
      senha,
      expiraEm,
    });

    return this.prisma.lead.update({
      where: { id },
      data: {
        status: 'em_negociacao',
        acessoDegustacaoLiberado: true,
        dataLiberacaoAcesso: new Date(),
        credencialEmail: email,
        credencialSenha: senha,
        credencialExpiraEm: expiraEm,
        ultimoContato: new Date(),
      },
    });
  }

  private ensureCloser(user: { id: string; role: string }) {
    if (user.role !== 'closer') {
      throw new ForbiddenException(
        'A carteira de leads é exclusiva do time de vendas (closer) da NR-13 Pro.',
      );
    }
  }

  private async ensureExists(id: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException('Lead não encontrado');
    return lead;
  }
}
