import { config } from './../config';

const APP_CONFIG = config.APP_CONFIG;

class EmailService {
  getUrl(start, limit) {
    return `${APP_CONFIG.apiUrl}/mails/Inbox/?start=${start}&limit=${limit}`;
  }

  getEmails() {
    const url = this.getUrl(0, 10);

    return new Promise((resolve) => {
      return fetch(url).then((response) => {
        if (response.status !== 200) {
          throw new Error('Error fetching the emails');
        }

        response.json().then((data) => {
          return resolve(data);
        });
      });
    });
  }
}

export default {
  emailService: new EmailService()
};
