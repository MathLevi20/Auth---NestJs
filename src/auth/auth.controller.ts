import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('gethello')
  async getHello() {
    return 'Hello World! App Auth';
  }
  @Post()
  async register(@Body() auth: Auth): Promise<Auth> {
    return this.authService.register(auth);
  }
  @Post('Login')
  async login(@Body() auth: Auth): Promise<{ acessToken: string }> {
    return this.authService.login(auth);
  }
}
