import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.userService.createUser(username, password);
    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      return {
        message: 'Invalid username or password',
      };
    }

    const isPasswordValid = await this.userService.validatePassword(
      user,
      password,
    );

    if (!isPasswordValid) {
      return {
        message: 'Invalid username or password',
      };
    }

    const token = await this.userService.generateJwt(user);

    return {
      message: 'Login successful',
      token,
    };
  }
}
