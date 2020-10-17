import {
  createStore, Action,
  saveToLocalStorageMiddlewareFabric, saveToLocalStoragePlugin
} from '../../store/store';


const maskedTextFields = new Array(...document.getElementsByClassName('text-field--masked') as unknown as HTMLInputElement[]);

enum actions {
  INIT,
  CHANGE_VALUE,
}

const applyMask = (text: string): string => {
  const day = new Array(2).fill('_').reduce((prev, curr, index) => {
    return prev + (text.slice(0, 2)[index] || curr);
  }, '');

  const month = new Array(2).fill('_').reduce((prev, curr, index) => {
    return prev + (text.slice(2, 4)[index] || curr);
  }, '');

  const year = new Array(4).fill('_').reduce((prev, curr, index) => {
    return prev + (text.slice(4)[index] || curr);
  }, '');

  return [day, month, year].join('.');
};

const storageName = 'maskes-text-field-data';
const store = createStore({}, (action: Action, state: any) => {
  switch (action.name) {

    case actions.INIT:
      if (state[action.value].text !== '') return state;
      return {...state, [action.value]: {
        displayedText: applyMask(''),
        text: '',
        caretPosition: 0,
      }};

    case actions.CHANGE_VALUE:
        const text = applyMask(action.value.text);

        const regexp = /([0-3]|_)([0-9]|_)\.([0-1]|_)([0-9]|_)\.([1-2]|_)(0|9|_)([0-9]|_)([0-9]|_)/;
        if (!(regexp.test(text))) {
          return state;
        }

        const [day, month, year] = text.split('.').map(Number);

        if (day > 31 || day < 1) {
          return state;
        }

        if (month == 2 && day > 29) {
          return state;
        }

        if (year > new Date().getFullYear() || year < 1900) {
          return state;
        }

        return {...state, [action.value.id]: {
          displayedText: text,
          text: action.value.text,
          caretPosition: action.value.caretPosition,
        }};

      default:
        return state;
    }
  },
    [saveToLocalStoragePlugin(storageName, maskedTextFields, {displayedText:'', text: '', caretPosition: 0})],
    {post: [saveToLocalStorageMiddlewareFabric(storageName)]},
);

maskedTextFields.forEach((input: HTMLInputElement) => {
  input.addEventListener('focusin', (event: any) => {
    store.dispatch({
      name: actions.INIT,
      value: event?.target.id,
    });
  });

  input.addEventListener('input', (event: any) => {
    let text = event.target.value
      .slice(0, input.selectionStart)
      .split('')
      .filter((s: string) => s !== '.')
      .join('');


    let caretPosition = text.length;
    if (text.length >= 4) {
      caretPosition += 2;
    } else if (text.length >= 2) {
      caretPosition += 1;
    }

    if (event.inputType === 'deleteContentBackward') {
      if (text.length === 2 || text.length === 4) {
        caretPosition -= 1;
      }
    }

    store.dispatch({
      name: actions.CHANGE_VALUE,
      value: {
        id: input.id,
        text,
        caretPosition,
      }
    })
  });

  store.subscribe(state => {
    const {caretPosition, displayedText} = state[input.id];

    input.value = displayedText;
    input.setSelectionRange(caretPosition, caretPosition);
  });

  store.dispatch({
    name: '@COLD_START',
  });
});
