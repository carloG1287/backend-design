import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  NotFoundException,
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
    return this.usersService.findOneByUsername(username); // Cambiado a findOneByUsername
  }

  @Get('question/:_username')
  async getQuestion(@Param('_username') username: string) {
    const user = await this.usersService.searchQuestion(username);

    // Extrae la propiedad de seguridad si existe
    if (!user || !user.security_question) {
      throw new NotFoundException('Pregunta de seguridad no encontrada');
    }

    // Devuelve la pregunta de seguridad como un objeto
    return { question: user.security_question };
  }

  // POST /users
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put('change_password/:_username')
  changePassword(
    @Param('_username') username: string,
    @Body() changePasswordDto: ChangePasswordDto,
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
