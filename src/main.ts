import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Итернет магазин Safari')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
