// import sgMail from ' @sendgrid/mail';
const sgMail = require(' @sendgrid/mail');

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('.env') });

export default class SendGridService {
  apiKey: string | undefined;
  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(this.apiKey);
  }

  async sendMail(payload: any) {
    return sgMail.send(payload);
  }
}
