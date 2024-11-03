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

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneByEmailOrUsername(value: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: value, username: value },
    });
  }

  async searchQuestion(value: string): Promise<string> {
    return (await this.findOneByEmailOrUsername(value)).security_question;
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
    await this.userRepository.update(username, updateUserDto);
    return this.findOneByEmail(username);
  }

  async changePassword(username: string, changePasswordDto: ChangePasswordDto) {
    await this.updateByUsername(username, changePasswordDto);
    return this.findOneByEmail(username);
  }

  async remove(username: string): Promise<void> {
    await this.userRepository.delete(username);
  }
}
