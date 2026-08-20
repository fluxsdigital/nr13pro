import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { jwtConstants } from './constants.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password,
        crea: dto.crea,
        role: 'engenheiro',
        plan: null,
      },
    });

    return this.buildSession(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('E-mail não encontrado.');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    // Acesso de degustação expirado? Bloqueia o login
    if (user.plan === 'Degustação' && user.degustacaoExpiraEm) {
      if (new Date(user.degustacaoExpiraEm) < new Date()) {
        throw new UnauthorizedException(
          'Seu acesso de degustação expirou. Fale com o time de vendas da NR-13 Pro para renovar.',
        );
      }
    }

    return this.buildSession(user);
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado.');
    return this.sanitize(user);
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado.');

    if (dto.email && dto.email !== user.email) {
      const conflict = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (conflict) {
        throw new ConflictException('Este e-mail já está cadastrado.');
      }
    }

    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    return this.sanitize(updated);
  }

  async setPlan(userId: string, plan: 'Mensal' | 'Anual') {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { plan },
    });
    return this.sanitize(updated);
  }

  private buildSession(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      crea: user.crea,
      role: user.role,
      plan: user.plan,
    };
    return {
      user: this.sanitize(user),
      token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expiresInSeconds,
      }),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  private sanitize(user: any) {
    const { password, ...safe } = user;
    return safe;
  }

  /**
   * Cria (ou re-libera) um usuário de degustação.
   * Usado pelo closer ao liberar acesso — o lead consegue logar no sistema
   * com as credenciais geradas, até a data de expiração (7 dias).
   */
  async criarUsuarioDegustacao(data: {
    nome: string;
    email: string;
    senha: string;
    expiraEm: Date;
  }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      const updated = await this.prisma.user.update({
        where: { id: existing.id },
        data: {
          name: data.nome,
          plan: 'Degustação',
          degustacaoExpiraEm: data.expiraEm,
        },
      });
      return this.sanitize(updated);
    }

    const password = await bcrypt.hash(data.senha, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.nome,
        email: data.email,
        password,
        crea: '—',
        role: 'engenheiro',
        plan: 'Degustação',
        degustacaoExpiraEm: data.expiraEm,
      },
    });
    return this.sanitize(user);
  }

  /**
   * Garante os usuários de demonstração (idempotente):
   * engenheiro demo + closer (vendas NR-13 Pro).
   */
  async seedDemoUsers() {
    const senha = await bcrypt.hash('123456', 10);

    const demo = await this.prisma.user.findUnique({
      where: { email: 'demo@nr13pro.com.br' },
    });
    if (!demo) {
      await this.prisma.user.create({
        data: {
          name: 'Eng. Carlos Alberto Santos',
          email: 'demo@nr13pro.com.br',
          password: senha,
          crea: 'CREA-SP 123.456',
          role: 'engenheiro',
          plan: 'Mensal',
        },
      });
    }

    const closer = await this.prisma.user.findUnique({
      where: { email: 'closer@nr13pro.com.br' },
    });
    if (!closer) {
      await this.prisma.user.create({
        data: {
          name: 'Vendas NR-13 Pro',
          email: 'closer@nr13pro.com.br',
          password: senha,
          crea: '—',
          role: 'closer',
          plan: null,
        },
      });
    }
  }
}
