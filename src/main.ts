import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  function setupSwagger(app: INestApplication) {
    const configService = app.get<ConfigService>(ConfigService);
    const appName = configService.get('npm_package_name');
    const appVersion = configService.get('npm_package_version');

    const config = new DocumentBuilder()
      .setTitle(appName)
      .setDescription('API de recebíveis do BankMe')
      .setVersion(appVersion)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);
  }
  setupSwagger(app);
  await app.listen(3000, () => {
    Logger.log('--Server running on port 3000--');
  });
}
bootstrap();
