import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Public } from '../common/decorators/public.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return this.authService.me(user.id);
  }

  @Patch('me')
  updateMe(@CurrentUser() user: AuthUser, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(user.id, dto);
  }

  @Post('plan')
  setPlan(@CurrentUser() user: AuthUser, @Body('plan') plan: 'Mensal' | 'Anual') {
    return this.authService.setPlan(user.id, plan);
  }

  @Post('degustacao')
  criarUsuarioDegustacao(
    @CurrentUser() user: AuthUser,
    @Body() body: { nome: string; email: string; senha: string; expiraEm: string },
  ) {
    return this.authService.criarUsuarioDegustacao({
      nome: body.nome,
      email: body.email,
      senha: body.senha,
      expiraEm: new Date(body.expiraEm),
    });
  }

  @Public()
  @Post('request-reset')
  requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}
