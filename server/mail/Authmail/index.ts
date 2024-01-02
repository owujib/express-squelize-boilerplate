import ejs from 'ejs';
import path from 'path';
import Email from '../Email';
import NodemialerService from '../NodemailerService';

class AuthMail {
  to: string;

  send: (subject: any, html: any) => Promise<void>;

  constructor(user: any) {
    this.to = user.email;
    this.send = async (subject: any, html: any) => {
      return new Email({
        emailService: new NodemialerService(),
        email: this.to,
      }).sendMail({ subject, html });
    };
  }

  async sendWelcome(subject: any) {
    const html = await ejs.renderFile(
      path.resolve('views/mail/welcome.ejs'),
      {},
    );

    return this.send(subject, html);
  }
}

export default AuthMail;
