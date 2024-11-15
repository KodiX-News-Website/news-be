import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/types';

@Injectable()
export class UserService {
  private users: User[] = [];
  private id = 1;

  constructor(private readonly jwtService: JwtService) {}

  async createUser(username: string, password: string): Promise<User> {
    const existingUser = this.users.find((user) => user.username === username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: this.id++, username, password: hashedPassword };
    this.users.push(newUser);

    return newUser;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async generateJwt(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
