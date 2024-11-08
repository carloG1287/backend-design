import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Método que busca un usuario por email o nombre de usuario
  async findOneByEmailOrUsername(email?: string, username?: string): Promise<User | undefined> {
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
    await this.updateByUsername(username, changePasswordDto);
    return this.findOneByUsername(username);
  }

  async remove(username: string): Promise<void> {
    await this.userRepository.delete({ username });
  }
}
