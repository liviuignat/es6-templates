import * as Parse from 'parse';

const LOAD = 'es6-templates/auth/LOAD';
const LOAD_SUCCESS = 'es6-templates/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'es6-templates/auth/LOAD_FAIL';

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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      if (__SERVER__) {
        return client.get('/user/me');
      }

      const user = Parse.User.current();
      console.log('<===== load user action', user);
      return Promise.resolve();
    }
  };
}
