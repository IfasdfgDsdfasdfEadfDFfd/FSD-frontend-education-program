import {
  createStore,
  Action,
  saveToLocalStoragePlugin,
  saveToLocalStorageMiddlewareFabric,
} from '../../store/store';

const toggles = Array(
  ...((document.getElementsByClassName('toggle__element') as unknown) as Array<
    Element
  >),
);

const initState = toggles.reduce((state, toggle) => {
  return { ...state, [toggle.id]: toggle.hasAttribute('checked') || false };
}, {});

enum actions {
  TOGGLE,
}

// controller
const toggleStorageName = 'toggle-data';
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
  [saveToLocalStoragePlugin(toggleStorageName, toggles, false)],
  { post: [saveToLocalStorageMiddlewareFabric(toggleStorageName)] },
);

// view
toggles.forEach(toggle => {
  store.subscribe((state: any) => {
    const isChecked = state[toggle.id];

    if (isChecked) {
      toggle.setAttribute('checked', 'true');
      toggle.classList.add('toggle_checked');
    } else {
      toggle.removeAttribute('checked');
      toggle.classList.remove('toggle_checked');
    }
  });

  store.dispatch({
    name: 'COLD_START',
  });

  toggle.addEventListener('click', (event: any) => {
    store.dispatch({ name: actions.TOGGLE, value: event.target.id });
  });
});
