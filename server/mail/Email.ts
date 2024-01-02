import dotenv from 'dotenv';
import path from 'path';
import { htmlToText } from 'html-to-text';
dotenv.config({ path: path.resolve('../.env') });

export default class Email {
  sender: string;
  to: string;
  maxTries: number;
  emailService: any;
  constructor({ emailService, email }: { emailService: any; email: string }) {
    this.sender = '<info@testing.com>';
    this.to = email;
    this.maxTries = 3;
    this.emailService = emailService;
  }

  async sendMail({ subject, html }: { subject: any; html: any }) {
    const mailOptions = {
      from: this.sender,
      to: this.to,
      subject: subject.title,
      text: htmlToText(html),
      html,
    };
    await this.emailService.sendMail(mailOptions);
  }
}
