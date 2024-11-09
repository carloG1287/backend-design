import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  [x: string]: any;
  @IsString()
  @MinLength(10)
  security_answer: string;

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  oldPassword: string;

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  newPassword: string;
}
