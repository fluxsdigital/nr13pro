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
import 'dotenv/config';

const resetTokens = new Map<string, { userId: string; expiresAt: Date }>();

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

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { success: true };
    }

    const codigo = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

    resetTokens.set(codigo, { userId: user.id, expiresAt });

    // Tenta enviar e-mail via MailerSend; se não houver chave configurada,
    // apenas logar aviso e continuar (o código fica armazenado para uso local)
    try {
      await this.sendPasswordResetEmail(user.email, codigo);
    } catch (err) {
      console.warn(`[auth] Could not send password reset email (no MailerSend key?): ${err.message}`);
    }

    return { success: true };
  }

  async resetPassword(codigo: string, newPassword: string) {
    const resetData = resetTokens.get(codigo);
    if (!resetData) {
      throw new UnauthorizedException('Código inválido ou expirado.');
    }

    if (new Date(resetData.expiresAt) < new Date()) {
      resetTokens.delete(codigo);
      throw new UnauthorizedException('Código expirado. Solicite um novo.');
    }

    const password = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: resetData.userId },
      data: { password },
    });

    resetTokens.delete(codigo);
    return { success: true };
  }

  private async sendPasswordResetEmail(email: string, codigo: string) {
    // Se não houver chave da MailerSend, apenas registrar aviso e retornar
    // (o código já está armazenado no resetTokens map para uso local)
    if (!process.env.MAILERSEND_API_KEY) {
      console.warn('[auth] MAILERSEND_API_KEY not configured; skipping email send. Code stored locally.');
      return;
    }

    const payload = {
      from: {
        email: process.env.MAILERSEND_FROM ?? 'no-reply@nr13pro.com',
        name: 'NR-13 Pro',
      },
      to: [{ email }],
      subject: `Código de recuperação — NR-13 Pro`,
      text: `Seu código de recuperação é: ${codigo}\n\nEle expira em 1 hora. Se você não solicitou a redefinição, ignore este e-mail.`,
      html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
  <h2 style="color:#171717;">Recuperação de senha</h2>
  <p style="color:#676767;font-size:14px;">Use o código abaixo para redefinir sua senha na NR-13 Pro:</p>
  <p style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#C56A2D;background:#F7F5F2;padding:16px;text-align:center;border-radius:8px;">${codigo}</p>
  <p style="color:#676767;font-size:12px;">O código expira em 1 hora. Se você não solicitou a redefinição, ignore este e-mail.</p>
</div>`,
    };

    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha ao enviar e-mail da MailerSend: ${response.status} ${errorText}`);
    }
  }
}
