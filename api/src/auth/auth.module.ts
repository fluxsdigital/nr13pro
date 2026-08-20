import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { jwtConstants } from './constants.js';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresInSeconds },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    // Garante os usuários demo (engenheiro + closer) no banco
    await this.authService.seedDemoUsers();
  }
}
