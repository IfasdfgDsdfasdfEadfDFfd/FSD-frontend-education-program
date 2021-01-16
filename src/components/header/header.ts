const header = document.getElementById('header-id');

const hidingClass = 'header_hidden';
const attachingClass = 'header_attached';

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
    if (header?.classList.contains(hidingClass))
      header?.classList.remove(hidingClass);
  }

  lastScrollYPosition = window.scrollY;
});
