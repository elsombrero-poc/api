import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get<ConfigService>(ConfigService)
  const openapi = new DocumentBuilder()
    .setTitle('Delivery Application example')
    .setDescription('The Delivery Application API description')
    .setVersion('1.0')
    .addTag('delivery')
    .build();
  const document = SwaggerModule.createDocument(app, openapi);
  SwaggerModule.setup('api', app, document);
  await app.listen(config.get('PORT'));
}
bootstrap();
