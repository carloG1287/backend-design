/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmailOrUsername(
    email?: string,
    username?: string,
  ): Promise<User | undefined> {
    if (email) {
      return await this.findOneByEmail(email);
    } else if (username) {
      return await this.findOneByUsername(username);
    } else {
      throw new BadRequestException('Email or username must be provided');
    }
  }  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Renombrado para claridad
  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });
  }
  

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async searchQuestion(value: string): Promise<User | null> {
    console.log("Valor de búsqueda recibido:", value);
    const user = await this.findOneByEmailOrUsername(undefined, value);
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    console.log("Usuario encontrado:", user);
    return user;  // Devuelve el objeto completo del usuario
  }
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async updateByUsername(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.userRepository.update({ username }, updateUserDto);
    return this.findOneByUsername(username);
  }

  async changePassword(username: string, changePasswordDto: ChangePasswordDto) {
    // Encuentra al usuario por nombre de usuario
    const user = await this.findOneByUsername(username);

    // Verifica que el usuario exista
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Valida la respuesta de seguridad
    if (user.security_answer !== changePasswordDto.security_answer) {
      throw new BadRequestException('Incorrect security answer');
    }

    // Verifica que la nueva contraseña no sea igual a la anterior
    const isSamePassword = await bcryptjs.compare(
      changePasswordDto.password,
      user.password_digest,
    );
    if (isSamePassword) {
      throw new BadRequestException(
        'La nueva contraseña no puede ser igual a la anterior',
      );
    }

    // Hashea la nueva contraseña
    const hashedPassword = await bcryptjs.hash(changePasswordDto.password, 10);

    // Actualiza la contraseña
    await this.userRepository.update(
      { username },
      { password_digest: hashedPassword },
    );

    return { message: 'Password updated successfully' };
  }

  async remove(username: string): Promise<void> {
    await this.userRepository.delete({ username });
  }
}
