import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    name,
    username,
    email,
    password,
    password_confirmation,
    security_question,
    security_answer,
  }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new Error('Email already exists');
    }
    if (user.username === username) {
      throw new Error('Username already exists');
    }

    if (password !== password_confirmation) {
      throw new Error("Password doesn't matched");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.usersService.create({
      name,
      username,
      email,
      password_digest: hashedPassword,
      security_question,
      security_answer,
    });

    return {
      message: 'User created successfully',
    };
  }

  async login({ username, email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailOrUsername(
      email ? email : username,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      user.password_digest,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { user_id: user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      user: user,
    };
  }
}
