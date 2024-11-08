import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  identifier: string; // Puede ser un correo o nombre de usuario

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  password: string;
}
