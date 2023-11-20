import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('integrations/auth')
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
