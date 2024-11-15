import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    return this.authService.login(user);
  }
}
