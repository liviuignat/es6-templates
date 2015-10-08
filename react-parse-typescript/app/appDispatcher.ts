import { Dispatcher } from 'flux';

class DispatcherPayload<T> implements IDispatcherPayload<T> {
  constructor(public type: string, public payload: T) {
  }
}

class AppDispatcher extends Dispatcher {
  constructor() {
    super();
  }

  dispatch<T>(type: string, payload?: T) {
    const data = new DispatcherPayload<T>(type, payload);
    super.dispatch(data);
  }
}

export default {
  appDispatcher: new AppDispatcher()
};
