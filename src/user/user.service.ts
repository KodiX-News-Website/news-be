import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/types';

@Injectable()
export class UserService {
  private users: User[] = [];
  private id = 1;

  constructor(private readonly jwtService: JwtService) {}

  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<User> {
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: this.id++,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    this.users.push(newUser);

    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async generateJwt(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
