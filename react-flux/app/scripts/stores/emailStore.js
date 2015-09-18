import { EventEmitter } from 'events';
import { appDispatcher } from './../appDispatcher';
import { CHANGE_EVENT, actionTypes } from './../constants';

class EmailStore extends EventEmitter {
  constructor() {
    super();
    this.emails = [];

    appDispatcher.register(this.onAppDispatch.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAll() {
    return this.emails;
  }

  onAppDispatch(data) {
    if (data.type === actionTypes.LOAD_EMAILS_SUCCESS) {
      this.emails = data.payload.emails;
      this.emit(CHANGE_EVENT);
    }
  }
}

export default {
  emailStore: new EmailStore()
};
