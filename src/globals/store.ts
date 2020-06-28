export type Listener = (value: any) => void;

export type Action = {
  name: (string|number),
  value?: any,
};

export type Reducer = (action: Action, state: any) => any;

export type Store = {
  subscribe: (listener: Listener) => () => any,
  dispatch: (action: Action) => void,
  getState: () => any;
};


export const createStore = (initState: any, reducer: Reducer): Store => {
  let listeners: Array<Listener> = [];
  let _state = initState;

  const setNextState = (nextState: any) => {
    _state = nextState;
  };

  const getState = () => {
    return _state;
  };

  const dispatch = (action: Action) => {
    setNextState(reducer(action, getState()));
    listeners.forEach(listener => listener(getState()));
  }

  const subscribe = (listener: Listener) => {
    const index = listeners.push(listener) - 1;
    // unsubscribe
    return () => listeners.splice(index, 1);
  }

  return { subscribe, dispatch, getState };
};
