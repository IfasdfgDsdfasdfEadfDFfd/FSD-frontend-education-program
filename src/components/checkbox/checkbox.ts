import { createStore, Action, saveToLocalStoragePlugin, saveToLocalStorageMiddlewareFabric } from '../../globals/store';


const checkboxes = Array(...document.getElementsByClassName('checkbox__element') as unknown as Array<Element>);


const initState = checkboxes.reduce((state, checkbox) => {
  return {...state, [checkbox.id]: checkbox.hasAttribute('checked') || false};
}, {});

enum actions {
  TOGGLE,
};

// controller
const checkboxStorageName = 'checkbox-data';
const store = createStore(initState,
  (action: Action, state: any) => {
    switch (action.name) {
      case actions.TOGGLE:
        state[action.value] = !state[action.value];
        return state;
      default:
        return state;
    };
  },
  [saveToLocalStoragePlugin(checkboxStorageName, checkboxes, false)],
  {post: [saveToLocalStorageMiddlewareFabric(checkboxStorageName)]},
);

// view
checkboxes.forEach(checkbox => {
  store.subscribe((state: any) => {
    const isChecked = state[checkbox.id];

    if (isChecked) {
      checkbox.setAttribute('checked', 'true');
      checkbox.classList.add('checkbox_checked');
    } else {
      checkbox.removeAttribute('checked');
      checkbox.classList.remove('checkbox_checked');
    }
  });

  store.dispatch({
    name: 'COLD_START',
  });

  checkbox.addEventListener('click', (event: any) => {
    store.dispatch({ name: actions.TOGGLE, value: event.target.id });
  });
});
