import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users/{username}
  @Get(':_username')
  @UseGuards(AuthGuard)
  findOne(@Param('_username') username: string) {
    return this.usersService.findOne(username);
  }

  // GET /users/question/?_username={username}
  @Get('question/:_username')
  getQuestion(@Param('_username') username: string) {
    return { question: this.usersService.searchQuestion(username) };
  }

  // POST /users
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PUT /users/change_password
  @Put('change_password')
  changePassword(
    @Param('_username') username: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(username, changePasswordDto);
  }

  // PUT /users/{username}
  @Put(':_username')
  @UseGuards(AuthGuard)
  update(
    @Param('_username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateByUsername(username, updateUserDto);
  }

  // DELETE /users/{username}
  @Delete(':_username')
  @UseGuards(AuthGuard)
  remove(@Param('_username') username: string) {
    return this.usersService.remove(username);
  }
}
