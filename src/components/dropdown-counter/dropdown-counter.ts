import { store } from '../counter/counter';

const dropdowns = Array(...document.getElementsByClassName('dropdown-counter') as unknown as Array<HTMLElement>);

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-counter__btn');

  store.subscribe((state: any) => {
    const sumOfCounters = Object.keys(state).filter(key => {
      return key.startsWith(dropdown.id);
    }).map(key => state[key]).reduce((prev, cur) => prev + cur, 0);

    if (sumOfCounters !== 0) {
      dropdown.classList.add('dropdown-counter_dirty');
    } else {
      dropdown.classList.remove('dropdown-counter_dirty');
    }
  });

  store.dispatch({name: '@COLD_START'});

  button?.addEventListener('click', () => {
    const className = 'dropdown-counter_closed';
    if (dropdown.classList.contains(className)) {
      dropdown.classList.remove(className);
    } else {
      dropdown.classList.add(className);
    }
  });
});
