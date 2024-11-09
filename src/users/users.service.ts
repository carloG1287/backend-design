import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  // Método que busca un usuario por email o nombre de usuario
  async findOneByEmailOrUsername(
    email?: string,
    username?: string,
  ): Promise<User | undefined> {
    if (email) {
      return this.findOneByEmail(email);
    } else if (username) {
      return this.findOneByUsername(username);
    }
    return undefined;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Renombrado para claridad
  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async searchQuestion(value: string): Promise<string> {
    const user = await this.findOneByEmailOrUsername(value);
    return user?.security_question || '';
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
      throw new Error('User not found');
    }

    // Valida la respuesta de seguridad
    if (user.security_answer !== changePasswordDto.security_answer) {
      throw new Error('Incorrect security answer');
    }

    // Verifica que la nueva contraseña no sea igual a la anterior
    const isSamePassword = await bcryptjs.compare(
      changePasswordDto.password,
      user.password_digest,
    );
    if (isSamePassword) {
      throw new Error('New password cannot be the same as the old password');
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
