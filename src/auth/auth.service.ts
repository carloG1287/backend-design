import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

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
    // Verificar si el correo ya existe
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new Error('Email already exists');
    }

    // Verificar si el nombre de usuario ya existe
    const existingUserByUsername = await this.usersService.findOneByUsername(username);
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    // Verificar que las contraseñas coincidan
    if (password !== password_confirmation) {
      throw new Error("Password doesn't match");
    }

    // Hashear la contraseña y crear el usuario
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

  async login({ identifier, password }: LoginDto) {
    // Busca el usuario usando `identifier`, que puede ser email o username
    const user = identifier.includes('@')
      ? await this.usersService.findOneByEmail(identifier)
      : await this.usersService.findOneByUsername(identifier);

    if (!user) {
      throw new UnauthorizedException('Invalid email or username');
    }

    // Validación de la contraseña
    const isPasswordValid = await bcryptjs.compare(
      password,
      user.password_digest,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Genera el token JWT con los detalles del usuario
    const payload = {
      user_id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user,
    };
  }
}
