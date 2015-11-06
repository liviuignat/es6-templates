import { currentUserService } from './../../../client';

const LOAD = 'es6-templates/auth/LOAD';
const LOAD_SUCCESS = 'es6-templates/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'es6-templates/auth/LOAD_FAIL';
const LOGIN = 'es6-templates/auth/LOGIN';
const LOGIN_SUCCESS = 'es6-templates/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'es6-templates/auth/LOGIN_FAIL';
const LOGOUT = 'es6-templates/auth/LOGOUT';
const LOGOUT_SUCCESS = 'es6-templates/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'es6-templates/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    default:
      return state;
  }
}

export function isUserLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function loadUserAction() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      if (__SERVER__) {
        return client.get('/user/me');
      }

      return Promise.resolve(currentUserService.getCurrentUser());
    }
  };
}

export function loginAction(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => {
      if (__SERVER__) {
        return client.post('/auth/login', {
          data: { email, password }
        });
      }
      return currentUserService.logIn(email, password);
    }
  };
}

export function logoutAction() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => {
      if (__SERVER__) {
        return Promise.resolve();
      }

      return currentUserService.logOut();
    }
  };
}


