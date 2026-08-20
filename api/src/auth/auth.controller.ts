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
}
