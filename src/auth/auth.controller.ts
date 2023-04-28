import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getHello() {
    return 'Hello World! App Auth';
  }
  @Post('register')
  async register(@Body() auth: Auth): Promise<Auth> {
    return this.authService.register(auth);
  }
  @Post('login')
  async login(
    @Body() auth: Auth,
  ): Promise<{ acessToken: string; refreshToken: string }> {
    return this.authService.login(auth);
  }
  @Post('refresh')
  async refresh(@Body() auth: Auth): Promise<{ acessToken: any }> {
    return this.authService.refresh(auth);
  }
  @Post('validate')
  async validate(@Body() auth: Auth): Promise<{ acessToken: any }> {
    return this.authService.validate(auth);
  }
}
