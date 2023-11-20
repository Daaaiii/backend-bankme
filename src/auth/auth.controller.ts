import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  login(@Body() { login, password }: CreateAuthDto) {
    return this.authService.login(login, password);
  }
}
