import { store, actions } from '../counter/counter';

const dropdowns = Array(...document.getElementsByClassName('dropdown-counter') as unknown as Array<HTMLElement>);

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-counter__btn');

  store.subscribe((state: any) => {
    const sumOfCounters = Object.keys(state).filter(key => {
      return key.startsWith(dropdown.id);
    }).map(key => state[key]).reduce((prev, cur) => prev + cur, 0);

    const placeholder = <string>button?.getAttribute('data-placeholder');
    let text = '';

    if (sumOfCounters === 0) {
      text = placeholder;
    } else if (String(sumOfCounters).endsWith('1')) {
      text = `${sumOfCounters} гость`;
    } else if (['2', '3', '4'].includes(String(sumOfCounters).slice(-1))) {
      text = `${sumOfCounters} гостя`;
    } else {
      text = `${sumOfCounters} гостей`;
    }

    button?.replaceChild(document.createTextNode(text), button.firstChild as Node);

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
    dropdown.classList.add('dropdown-counter--closed');
  });

  cancelButton?.addEventListener('click', () => {
    store.dispatch({
      name: actions.RESET,
      value: Array(...counters as unknown as Array<HTMLElement>).map(counter => counter.id)
    });
  });
});
