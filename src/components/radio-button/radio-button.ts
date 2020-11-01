import {
  createStore,
  Action,
  saveToLocalStoragePlugin,
  saveToLocalStorageMiddlewareFabric,
} from '../../store/store';

const radioButtons = Array(
  ...((document.getElementsByClassName(
    'radio-button__element',
  ) as unknown) as Array<Element>),
);

const initState = radioButtons.reduce((state, radioButton) => {
  return {
    ...state,
    [radioButton.id]: radioButton.hasAttribute('checked') || false,
  };
}, {});

enum actions {
  TOGGLE,
}

// controller
const radioButtonStorageName = 'radio-button-data';
const store = createStore(
  initState,
  (action: Action, state: any) => {
    switch (action.name) {
      case actions.TOGGLE:
        state[action.value] = !state[action.value];
        return state;
      default:
        return state;
    }
  },
  [saveToLocalStoragePlugin(radioButtonStorageName, radioButtons, false)],
  { post: [saveToLocalStorageMiddlewareFabric(radioButtonStorageName)] },
);

// view
radioButtons.forEach(radioButton => {
  store.subscribe((state: any) => {
    const isChecked = state[radioButton.id];

    if (isChecked) {
      radioButton.setAttribute('checked', 'true');
      radioButton.classList.add('radio-button_checked');
    } else {
      radioButton.removeAttribute('checked');
      radioButton.classList.remove('radio-button_checked');
    }
  });

  store.dispatch({
    name: 'COLD_START',
  });

  radioButton.addEventListener('click', (event: any) => {
    store.dispatch({ name: actions.TOGGLE, value: event.target.id });
  });
});
