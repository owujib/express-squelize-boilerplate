import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('../.env') });
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class NodemailerService {
  transporter: nodemailer.Transporter;

  constructor() {
    let options: SMTPTransport.Options = {
      host: <string>process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    };
    this.transporter = nodemailer.createTransport<any>(options);
  }

  async sendMail(payload: any) {
    return this.transporter.sendMail(payload);
  }
}
