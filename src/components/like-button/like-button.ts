import { createStore, Action } from '../../globals/store';


const likeButtonContainer = Array(...document.getElementsByClassName('like-button') as unknown as Array<Element>);

const data = JSON.parse(window.localStorage.getItem('like-button-data') || '{}');

likeButtonContainer.forEach((likeButton) => {
  const likeButtonElement = likeButton.getElementsByTagName('input')[0];
  data[likeButtonElement.id] = data[likeButtonElement.id] || {likesCount: 0, isLiked: false};
});


enum actions {
  TOGGLE,
};

const store = createStore(data, (action: Action, state: any) => {
  switch (action.name) {
    case actions.TOGGLE:
      if (state[action.value].isLiked) {
        state[action.value].likesCount -= 1;
      } else {
        state[action.value].likesCount += 1;
      }

      state[action.value].isLiked = !state[action.value].isLiked;

      return state;
    default:
      return state;
  };
});

likeButtonContainer.forEach((element) => {
  const likeButton = element.getElementsByTagName('input')[0];

  likeButton.addEventListener('click', (event: any) => {
    store.dispatch({name: actions.TOGGLE, value: event?.target.id});
  });
});


store.subscribe(state => {
  likeButtonContainer.forEach(element => {
    const likeButton = element.getElementsByTagName('input')[0];
    const likeCounter = element.getElementsByTagName('label')[0];

    const { likesCount, isLiked } = state[likeButton.id];
    const likesCountNode = document.createTextNode(likesCount);
    if (likeCounter.hasChildNodes()) {
      likeCounter.replaceChild(likesCountNode, likeCounter.firstChild as Node);
    } else {
      likeCounter.appendChild(likesCountNode);
    }

    if (isLiked) {
      likeButton.classList.add('like-button_checked');
      likeButton.setAttribute('checked', 'true');
    } else {
      likeButton.classList.remove('like-button_checked');
      likeButton.removeAttribute('checked');
    }
  });
});

store.dispatch({name: 'COLD_START'});
