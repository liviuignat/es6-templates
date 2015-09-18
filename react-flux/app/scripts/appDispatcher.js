import { Dispatcher } from 'flux';

class DispatcherPayload {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

class AppDispatcher extends Dispatcher {
  constructor() {
    super();
  }

  dispatch(type, payload) {
    const data = new DispatcherPayload(type, payload);
    super.dispatch(data);
  }
}

export default {
  DispatcherPayload,
  appDispatcher: new AppDispatcher()
};
