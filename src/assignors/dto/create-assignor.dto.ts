import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCpfOrCnpjValid } from '../../utils/validateCPForCNPJ';

export class CreateAssignorDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(30)
  @IsNumberString()
  @IsCpfOrCnpjValid()
  document: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(140)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(11)
  @IsNumberString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  @MinLength(3)
  name: string;
}
