import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    },
  ): Promise<any> {
    const { email, firstName, lastName, password } = body;

    return this.authService.register(email, firstName, lastName, password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    return this.authService.login(user);
  }
}
