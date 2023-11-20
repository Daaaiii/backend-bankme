import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos' })
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos' })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
