import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}
