import { store, actions } from '../counter/counter';

const dropdowns = Array(...document.getElementsByClassName('dropdown-counter') as unknown as Array<HTMLElement>);

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-counter__btn');

  store.subscribe((state: any) => {
    const sumOfCounters = Object.keys(state).filter(key => {
      return key.startsWith(dropdown.id);
    }).map(key => state[key]).reduce((prev, cur) => prev + cur, 0);

    if (sumOfCounters !== 0) {
      dropdown.classList.add('dropdown-counter--dirty');
    } else {
      dropdown.classList.remove('dropdown-counter--dirty');
    }
  });

  store.dispatch({name: '@COLD_START'});

  button?.addEventListener('click', () => {
    const className = 'dropdown-counter--closed';
    if (dropdown.classList.contains(className)) {
      dropdown.classList.remove(className);
    } else {
      dropdown.classList.add(className);
    }
  });

  const cancelButton = dropdown?.querySelector('.dropdown-counter__buttons-cancel');
  const applyButton = dropdown?.querySelector('.dropdown-counter__buttons-apply');
  const counters = dropdown?.querySelectorAll('.counter');

  applyButton?.addEventListener('click', () => {

  });

  cancelButton?.addEventListener('click', () => {
    console.log(store.getState())
    store.dispatch({
      name: actions.RESET,
      value: Array(...counters as unknown as Array<HTMLElement>).map(counter => counter.id)
    });
  });
});
