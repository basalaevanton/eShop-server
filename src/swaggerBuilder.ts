import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Итернет магазин Safari')
  .setDescription('Документация REST API')
  .setVersion('1.0.0')
  .addTag('')
  .addCookieAuth('authCookie', {
    type: 'http',
    in: 'Header',
    scheme: 'Bearer',
  })
  .build();
