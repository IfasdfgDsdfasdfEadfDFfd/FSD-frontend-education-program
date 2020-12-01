import { store, actions } from '../counter/counter';

const dropdownElements = Array(
  ...((document.getElementsByClassName(
    'dropdown-counter',
  ) as unknown) as Array<HTMLElement>),
);

dropdownElements.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown') as HTMLElement;

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
      .querySelector('.form-action-buttons')
      ?.classList.toggle('form-action-buttons_dirty', sumOfCounters !== 0);
  });

  store.dispatch({ name: '@COLD_START' });

  const cancelButton = dropdown?.querySelector(
    '.form-action-buttons__cancel-button',
  );

  const applyButton = dropdown?.querySelector(
    '.form-action-buttons__apply-button',
  );

  const counters = dropdown?.querySelectorAll('.counter');

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
