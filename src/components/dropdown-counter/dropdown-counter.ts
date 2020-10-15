import { store, actions } from '../counter/counter';

const dropdowns = Array(...document.getElementsByClassName('dropdown-counter') as unknown as Array<HTMLElement>);

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-counter__btn');

  store.subscribe((state: any) => {
    const countersData = Object.keys(state).filter(key => {
      return key.startsWith(dropdown.id);
    }).map(key => state[key]);

    const sumOfCounters = countersData.reduce((prev, cur) => prev + cur, 0)

    const placeholder = <string>button?.getAttribute('data-placeholder');
    const countingWay = <string>button?.getAttribute('data-counting-way');
    const declensions = JSON.parse(<string>button?.getAttribute('data-declensions'));

    const defineDeclension = (number: string): string => {
      if (String(number).endsWith('1')) {
        return 'singular';
      } else if (['2', '3', '4'].includes(String(number).slice(-1))) {
        return 'genitive';
      } else {
        return 'plural';
      }
    }

    let text = '';

    if (countingWay === 'sum') {

      if (sumOfCounters === 0) {
        text = placeholder;
      } else {
        const label = declensions[defineDeclension(String(sumOfCounters))];
        text = `${sumOfCounters} ${label}`;
      }
    } else if (countingWay === 'apart') {

      if (sumOfCounters === 0) {
        text = placeholder;
      } else {
        text = countersData.map((counterValue, index) => {
          if (counterValue === 0) return '';
          return `${counterValue} ${declensions[index][defineDeclension(String(counterValue))]}`;
        }).filter(v => v).join(', ');
      }
    }

    button?.firstChild?.replaceChild(document.createTextNode(text), button.firstChild.firstChild as Node);

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
