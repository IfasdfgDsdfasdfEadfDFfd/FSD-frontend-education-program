import { createStore, Store, Action } from '../globals/store';

describe('store', () => {
  let store: Store;
  const value = 'some value';
  const action = {
    name: 'new',
    value,
  };
  const INIT_STATE: Array<any> = [];

  beforeEach(() => {

    store = createStore(INIT_STATE, (action: Action, state: typeof INIT_STATE) => {
      switch (action.name) {
        case 'new':
          return [...state, action.value];
        default:
          return state;
      }
    });

  });

  it('should should return current state', () => {
    expect(store.getState()).toStrictEqual(INIT_STATE);
  });

  it('should dispatch next state', () => {
    store.dispatch(action);
    expect(store.getState()).toStrictEqual([value]);
  });

  it('should subscribe listeners', () => {
    store.subscribe(newValue => {
      expect(newValue).toStrictEqual([value]);
    });

    store.dispatch(action);
  });
});
