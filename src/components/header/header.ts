const header = document.getElementById('header-id');

const hidingClass = 'header--hidden';
const attachingClass = 'header--attached';

let lastScrollYPosition = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY !== 0) {
    if (!header?.classList.contains(attachingClass)) {
      header?.classList.add(attachingClass);
    }
  } else {
    header?.classList.remove(attachingClass);
  }

  if (lastScrollYPosition < window.scrollY) {
    if (!header?.classList.contains(hidingClass)) {
      header?.classList.add(hidingClass);
    }
  } else {
    header?.classList.remove(hidingClass);
  }

  lastScrollYPosition = window.scrollY;
});
