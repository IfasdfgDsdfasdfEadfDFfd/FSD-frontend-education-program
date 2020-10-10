import { createStore, Action } from '../../store/store';


const masked_text_fields = document.getElementsByClassName('text-field_masked');

enum actionTypes {
  ADD_NEW_INPUT,
  DELETE_LAST_INPUT,
}

const newAction = (name: actionTypes, value?: any): Action => ({
  name,
  value,
});


for (let index = 0; index != masked_text_fields.length; index++) {
  const input = masked_text_fields.item(index) as HTMLInputElement;

  const mask = new RegExp(input.getAttribute('data-mask') || '');
  const example = input.getAttribute('data-example') || '';
  const placeholder = input.getAttribute('data-placeholder') || '';

  const store = createStore('', ({name, value}, state: Array<string>) => {

    switch (name) {
      case actionTypes.ADD_NEW_INPUT:
        const nextState = [...state, value]
        if (nextState.length > example.length) return state;
        if (mask.test(nextState.join('') + example.slice(nextState.length))) {
          return nextState;
        }
        return state;
      case actionTypes.DELETE_LAST_INPUT:
        return state.slice(0, -1);
      default:
        return state;
    };
  });


  input?.addEventListener('focus', () => {
    input.setSelectionRange(0, -1);

    const unsubscribe = store.subscribe(storeState => {
      let caretPosition = storeState.length;

      input.value = placeholder.split('').map((value, index) => {
        if (value === '.') {
          if (storeState[index]) {
            caretPosition += 1;
          }
          storeState.splice(index, 0, null);
        }

        return storeState[index] ? storeState[index] : value;
      }).join('');

      input.setSelectionRange(caretPosition, caretPosition);
    });

    input?.addEventListener('blur', unsubscribe);
  });

  input?.addEventListener('input', (event: any) => {
    if (event.inputType.startsWith('deleteContent')) {
      store.dispatch(newAction(actionTypes.DELETE_LAST_INPUT));
    } else {
      store.dispatch(newAction(actionTypes.ADD_NEW_INPUT, event.data));
    }
  });
};
