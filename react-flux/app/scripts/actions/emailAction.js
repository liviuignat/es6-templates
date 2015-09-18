import { appDispatcher } from './../appDispatcher';
import { emailService } from './../services/emailService';
import { actionTypes } from './../constants';

class EmailAction {
  loadEmails() {
    appDispatcher.dispatch(actionTypes.LOAD_EMAILS);

    emailService.getEmails().then((emails) => {
      appDispatcher.dispatch(actionTypes.LOAD_EMAILS_SUCCESS, {
        emails: emails
      });
    }, (error) => {
      appDispatcher.dispatch(actionTypes.LOAD_EMAILS_FAIL, {
        error: error
      });
    });
  }
}

export default {
  emailAction: new EmailAction()
};
