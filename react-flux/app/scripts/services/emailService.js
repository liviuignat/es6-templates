import { config } from './../config';

const APP_CONFIG = config.APP_CONFIG;

class EmailService {
  getUrl(start, limit) {
    return `${APP_CONFIG.apiUrl}/mails/Inbox/?start=${start}&limit=${limit}`;
  }

  getEmails() {
    const url = this.getUrl(0, 10);

    return Promise.resolve([{
      from: {
        name: 'Liviu Ignat'
      },
      subject: 'Message from admin',
      date: new Date()
    }, {
      from: {
        name: 'Alina Staicu'
      },
      subject: 'From your girlfriend',
      date: new Date()
    }, {
      from: {
        name: 'Lau'
      },
      subject: 'I am a contribuitor',
      date: new Date()
    }]);
  }
}

export default {
  emailService: new EmailService()
};
