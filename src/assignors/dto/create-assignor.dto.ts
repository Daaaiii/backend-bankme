import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAssignorDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos.' })
  @MaxLength(30)
  @IsString()
  @IsNumberString()
  document: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos.' })
  @IsEmail({}, { message: 'Deve se informar o email' })
  @IsString()
  @MaxLength(140)
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos.' })
  @IsString()
  @MaxLength(20)
  @IsNumberString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Todos os campos precisam ser preenchidos.' })
  @IsString()
  @MaxLength(140)
  name: string;
}
