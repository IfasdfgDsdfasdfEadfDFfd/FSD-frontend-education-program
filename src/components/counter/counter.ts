import {
  createStore,
  Action,
  saveToLocalStoragePlugin,
  saveToLocalStorageMiddlewareFabric
} from '../../store/store';


const counters = Array(...document.getElementsByClassName('counter') as unknown as Array<Element>);

const initState = counters.reduce((state, counter) => {
  return {...state, [counter.id]: parseInt((counter.querySelector('.counter__count')?.textContent || '0'))}
}, {});

export enum actions {
  INC,
  DEC,
  RESET,
};

// controller
const counterStorageName = 'counter-data';
export const store = createStore(initState,
  (action: Action, state: any) => {
    let newCount: Number, nextCount: Number;
    switch (action.name) {

      case actions.INC:
        newCount = state[action.value] + 1;
        nextCount = (newCount > 10) ? 10 : newCount;
        return {...state, [action.value]: nextCount}

      case actions.DEC:
        newCount = state[action.value] - 1;
        nextCount = (newCount < 0) ? 0 : newCount;
        return {...state, [action.value]: nextCount}

      case actions.RESET:
        return {...state, ...action.value.reduce((prev: any, id: string) => {
          return {...prev, [id]: 0};
        }, {})};

      default:
        return state;
    };
  },
  [saveToLocalStoragePlugin(counterStorageName, counters, 0)],
  {post: [saveToLocalStorageMiddlewareFabric(counterStorageName)]},
);

// view
counters.forEach(counter => {

  const minusButton = counter.querySelector('.counter__minus');
  minusButton?.addEventListener('click', () => {
    store.dispatch({
      name: actions.DEC,
      value: counter.id,
    })
  });

  const plusButton = counter.querySelector('.counter__plus');
  plusButton?.addEventListener('click', () => {
    store.dispatch({
      name: actions.INC,
      value: counter.id,
    })
  });

  store.subscribe((state: any) => {
    const countElement = counter.querySelector('.counter__count') as Element;
    const newCount = state[counter.id];

    if (Number(countElement.textContent) !== newCount) {
      countElement.textContent = String(newCount);
    }

    if (newCount === 0) {
      minusButton?.setAttribute('disabled', 'true');
    } else {
      minusButton?.removeAttribute('disabled');
    }

    if (newCount === 10) {
      plusButton?.setAttribute('disabled', 'true');
    } else {
      plusButton?.removeAttribute('disabled');
    }
  });

  store.dispatch({
    name: 'COLD_START',
  });
});
