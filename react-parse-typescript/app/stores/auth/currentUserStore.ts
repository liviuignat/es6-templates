import { Parse } from 'parse';
import { EventEmitter } from 'events';
import { appDispatcher } from './../../appDispatcher';
import { EVENT_TYPES } from './../eventTypes.constant';
import { AUTH_ACTION_TYPES } from './../../actions';

class CurrentUserStore extends EventEmitter {
  private isLoggedIn = false;
  private parseUser: any = null;

  constructor() {
    super();
    appDispatcher.register(this.onAppDispatch.bind(this));
  }

  init() {
    this.parseUser = Parse.User.current();
    this.isLoggedIn = this.parseUser && this.parseUser.authenticated();
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  addLoginListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGIN, callback);
    return this;
  }
  removeLLoginListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGIN, callback);
    return this;
  }

  addLogoutListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGOUT, callback);
    return this;
  }
  removeLLogoutListener(callback) {
    this.on(EVENT_TYPES.AUTH_LOGOUT, callback);
    return this;
  }

  onAppDispatch(data) {
    switch (data.type) {
      case AUTH_ACTION_TYPES.LOG_IN_SUCCESS:
      case AUTH_ACTION_TYPES.SIGN_UP_SUCCESS:
        this.isLoggedIn = true;
        this.emit(EVENT_TYPES.AUTH_LOGIN);
        break;

      case AUTH_ACTION_TYPES.LOG_OUT_SUCCESS:
        this.isLoggedIn = false;
        this.emit(EVENT_TYPES.AUTH_LOGOUT);
        break;

      case AUTH_ACTION_TYPES.RESET_PASSWORD_SUCCESS:
        break;

      default:
        break;
    }
  }
}

export const currentUserStore = new CurrentUserStore();