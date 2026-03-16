import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  age!: number;

  @IsString()
  @IsNotEmpty()
  designation!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
