import { createStore, Action } from '../../globals/store';


const checkboxes = Array(...document.getElementsByClassName('checkbox__element') as unknown as Array<Element>);

const data = JSON.parse(window.localStorage.getItem('checkbox-data') || '{}');

checkboxes.forEach((checkbox) => {
  data[checkbox.id] = data[checkbox.id] || false;
});


enum actions {
  TOGGLE,
};

const store = createStore(data, (action: Action, state: any) => {
  switch (action.name) {
    case actions.TOGGLE:
      state[action.value] = !state[action.value];
      window.localStorage.setItem('checkbox-data', JSON.stringify(state));
      return state;
    default:
      return state;
  };
});

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
