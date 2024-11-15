import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    const user = await this.userService.createUser(
      email,
      firstName,
      lastName,
      password,
    );

    return this.login(user);
  }

  async login(user: any): Promise<{ access_token: string; user: any }> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (user && (await this.userService.validatePassword(user, password))) {
      const { password: _, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid email or password');
  }

  verifyToken(token: string): any {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
