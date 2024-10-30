import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(10)
  security_answer: string;

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  password: string;
}
