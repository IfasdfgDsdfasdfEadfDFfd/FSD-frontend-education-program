import { store, actions } from '../counter/counter';

const dropdownElements = Array(
  ...((document.getElementsByClassName(
    'js-dropdown-counter',
  ) as unknown) as Array<HTMLElement>),
);

dropdownElements.forEach(dropdown => {
  const button = dropdown.querySelector('.js-dropdown') as HTMLElement;

  store.subscribe((state: any) => {
    const countersData = Object.keys(state)
      .filter(key => {
        return key.startsWith(dropdown.id);
      })
      .map(key => state[key]);

    const sumOfCounters = countersData.reduce((prev, cur) => prev + cur, 0);

    const placeholder = <string>button?.getAttribute('data-placeholder');
    const countingWay = <string>button?.getAttribute('data-counting-way');
    const declensions = JSON.parse(
      <string>button?.getAttribute('data-declensions'),
    );

    const defineDeclension = (number: string): string => {
      if (String(number).endsWith('1')) {
        return 'singular';
      } else if (['2', '3', '4'].includes(String(number).slice(-1))) {
        return 'genitive';
      } else {
        return 'plural';
      }
    };

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
        text = countersData
          .map((counterValue, index) => {
            if (counterValue === 0) return '';
            return `${counterValue} ${
              declensions[index][defineDeclension(String(counterValue))]
            }`;
          })
          .filter(v => v)
          .join(', ');
      }
    }

    button?.firstChild?.replaceChild(
      document.createTextNode(text),
      button.firstChild.firstChild as Node,
    );

    dropdown
      .querySelector('.js-form-action-buttons')
      ?.classList.toggle('form-action-buttons--dirty', sumOfCounters !== 0);
  });

  store.dispatch({ name: '@COLD_START' });

  const cancelButton = dropdown?.querySelector('.js-action-button-cancel');

  const applyButton = dropdown?.querySelector('.js-action-button-apply');

  const counters = dropdown?.querySelectorAll('.js-counter');

  applyButton?.addEventListener('click', () => {
    dropdown.click();
  });

  cancelButton?.addEventListener('click', () => {
    store.dispatch({
      name: actions.RESET,
      value: Array.from(counters).map(counter => counter.id),
    });
    dropdown.click();
  });
});
