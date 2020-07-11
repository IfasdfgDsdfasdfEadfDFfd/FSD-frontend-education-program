import { Serializable } from "child_process";

export type Listener = (value: any) => void;

export type Action = {
  name: (string|number),
  value?: any,
};

export type StateModifier = (initState: any) => any;
export type Middleware = (args: {action: any, state: any}) => {action: Action, state: any};

export type Reducer = (action: Action, state: any) => any;

export type Store = {
  subscribe: (listener: Listener) => () => any,
  dispatch: (action: Action) => void,
  getState: () => any;
};


export const createStore = (
  initState: any,
  reducer: Reducer,
  mods: StateModifier[] = [],
  middlewares: Middleware[] = [],
): Store => {
  let listeners: Array<Listener> = [];
  let _state = mods?.reduce((state, mod) => mod(state), initState);

  const setNextState = (nextState: any) => {
    _state = nextState;
  };

  const getState = () => {
    return _state;
  };

  const dispatch = (action: Action) => {
    const result = middlewares.reduce((args, mid) => mid(args), {action, state: getState()});
    setNextState(reducer(result.action, result.state));
    listeners.forEach(listener => listener(getState()));
  }

  const subscribe = (listener: Listener) => {
    const index = listeners.push(listener) - 1;
    // unsubscribe
    return () => listeners.splice(index, 1);
  }

  return { subscribe, dispatch, getState };
};


export const saveToLocalStoragePlugin = (
  storageName: string,
  elements: Array<Element>,
  defaultValue: any = ''
): StateModifier => (initState) => {
  const data = JSON.parse(window.localStorage.getItem(storageName) || JSON.stringify(initState));

  elements.forEach((elem) => {
    data[elem.id] = data[elem.id] || defaultValue;
  });

  return data;
};

export const saveToLocalStorageMiddlewareFabric = (storageName: string, dataToSave: Serializable): Middleware => {
  return ({action, state}) => {

    window.localStorage.setItem(storageName, JSON.stringify(dataToSave));

    return {action, state};
  };
};
