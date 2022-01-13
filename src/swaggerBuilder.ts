import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Итернет магазин Safari')
  .setDescription('Документация REST API')
  .setVersion('1.0.0')
  .addTag('')
  .addCookieAuth('authCookie', {
    description: 'RefreshToken from client cookie',
    type: 'http',
    in: 'Header',
    scheme: 'Bearer',
  })
  .build();
