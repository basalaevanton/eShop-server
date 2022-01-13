/*
https://docs.nestjs.com/providers#services
*/

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/users.model';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationMail(to: User['email'], link: string) {
    await this.mailerService.sendMail({
      to,
      from: process.env.SMTP_USER,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html: `
      <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
      </div>
  `,
    });
  }
}
