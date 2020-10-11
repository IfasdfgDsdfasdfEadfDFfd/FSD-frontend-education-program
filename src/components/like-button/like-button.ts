import { createStore, Action } from '../../store/store';


const likeButtonContainer = Array(...document.getElementsByClassName('like-button') as unknown as Array<Element>);

const data = JSON.parse(window.localStorage.getItem('like-button-data') || '{}');

likeButtonContainer.forEach((likeButton) => {
  const likeButtonElement = likeButton.getElementsByTagName('input')[0];
  const likesCount = parseInt(<string>likeButton.getElementsByTagName('label')[0].textContent);
  const isLiked = likeButton.classList.contains('like-button--checked')

  data[likeButtonElement.id] = data[likeButtonElement.id] || {likesCount, isLiked};
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

    likeCounter.replaceChild(likesCountNode, likeCounter.firstChild as Node);

    element.classList.toggle('like-button--checked', isLiked);
  });
});

store.dispatch({name: 'COLD_START'});
