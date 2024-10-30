import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(username: string) {
    return `This action returns a #${username} user`;
  }

  findOneByEmail(email: string) {
    return {
      id: 1,
      username: 'johnDoe',
      email: email,
      password_digest: '',
    };
  }

  findOneByEmailOrUsername(value: string) {
    return {
      id: 1,
      username: 'johnDoe',
      email: value,
      password_digest: '',
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    return `This action changes the password of a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
