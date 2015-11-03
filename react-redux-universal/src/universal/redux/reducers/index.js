import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';
import {reducer as form} from 'redux-form';

import auth from './auth';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form
});
