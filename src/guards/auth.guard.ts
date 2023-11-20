
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      request.user = await this.prisma.user.findFirst(data.id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
